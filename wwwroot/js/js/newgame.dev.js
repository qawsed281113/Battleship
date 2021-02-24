"use strict";

var Map = {
  'field': 'field',
  'no_ship': 'no_ship',
  'ship': 'ship',
  'time_sheap': 'time_sheap',
  'time_ship_border': 'ship_border',
  'ship_border': 'ship_border'
};
var ShipWay = {
  'up': 1,
  'down': 2,
  'right': 3,
  'left': 4
};
var Keys = {
  'ArrowLeft': 'ArrowLeft',
  'ArrowRight': 'ArrowRight',
  'ArrowDown': 'ArrowDown',
  'ArrowUp': 'ArrowUp',
  'Enter': 'Enter'
};

function showMap() {
  var element = document.getElementById('map_field');

  while (element.lastElementChild) {
    element.removeChild(element.lastElementChild);
  }

  for (var y = 0; y < 10; y++) {
    var line = document.createElement('tr');
    line.setAttribute('id', 'line-' + y);
    line.setAttribute('class', 'line');
    document.getElementById('map_field').appendChild(line);

    for (var x = 0; x < 10; x++) {
      cell = document.createElement('td');
      cell.setAttribute("x", x);
      cell.setAttribute("y", y);
      cell.setAttribute("id", 'cell-' + x + '-' + y);
      cell.setAttribute("class", "field");

      switch (map[y][x]) {
        case Map.field:
          cell.setAttribute("class", 'field');
          break;

        case Map.time_sheap:
          cell.setAttribute('class', 'ship');
          break;

        case Map.ship:
          cell.setAttribute('class', 'ship');
          break;

        case Map.ship_border:
          cell.setAttribute('class', 'ship_border');
          break;
      }

      line.appendChild(cell);
    }
  }

  setListenersMap();
}

function clearAllTrash() {
  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < 10; x++) {
      if (map[y][x] != Map.ship) {
        map[y][x] = Map.field;
      }
    }
  }
}

function saveTimeShip() {
  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < 10; x++) {
      if (map[y][x] == Map.time_sheap) {
        map[y][x] = Map.ship;
      }
    }
  }
}

function setListenersMap() {
  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < 10; x++) {
      cell = document.getElementById('cell-' + x + '-' + y);
      cell.addEventListener('mouseover', function () {
        clearAllTrash();
        var copy_map = map;

        if (selectedShip != null && shipsWay != null) {
          var _x = this.getAttribute("x");

          _x = Number(_x);

          var _y = this.getAttribute("y");

          _y = Number(_y);
          var change = false;
          selectedShip = Number(selectedShip);

          switch (shipsWay) {
            case ShipWay.right:
              if (copy_map[_y][_x + (selectedShip - 1)] != null && copy_map[_y][_x + selectedShip] != ship) {
                var fixed_x = _x;

                for (var _i = _x; _i < selectedShip + fixed_x; _i++) {
                  if (copy_map[_y][_i] != Map.ship) {
                    copy_map[_y][_i] = Map.time_sheap;
                  } else {
                    return;
                  }

                  if (copy_map[_y + 1]) {
                    if (copy_map[_y + 1][_i] != Map.ship) {
                      copy_map[_y + 1][_i] = Map.time_ship_border;
                    } else {
                      return;
                    }

                    if (copy_map[_y + 1][fixed_x - 1] != Map.ship) {
                      copy_map[_y + 1][fixed_x - 1] = Map.time_ship_border;
                    } else {
                      return;
                    }

                    if (copy_map[_y + 1][_i + 1] != Map.ship) {
                      copy_map[_y + 1][_i + 1] = Map.time_ship_border;
                    } else {
                      return;
                    }
                  }

                  if (copy_map[_y - 1]) {
                    if (copy_map[_y - 1][_i] != Map.ship) {
                      copy_map[_y - 1][_i] = Map.time_ship_border;
                    } else {
                      return;
                    }

                    if (copy_map[_y - 1][fixed_x - 1] != Map.ship) {
                      copy_map[_y - 1][fixed_x - 1] = Map.time_ship_border;
                    } else {
                      return;
                    }

                    if (copy_map[_y - 1][_i + 1] != Map.ship) {
                      copy_map[_y - 1][_i + 1] = Map.time_ship_border;
                    } else {
                      return;
                    }
                  }

                  if (copy_map[_y][_i + 1] != Map.ship) {
                    copy_map[_y][_i + 1] = Map.time_ship_border;
                  } else {
                    return;
                  }

                  if (copy_map[_y][fixed_x - 1] != Map.ship) {
                    copy_map[_y][fixed_x - 1] = Map.time_ship_border;
                  } else {
                    return;
                  }

                  map = copy_map;
                }
              }

              break;

            case ShipWay.left:
              if (copy_map[_y][_x - (selectedShip - 1)] != null) {
                var _fixed_x = _x;

                for (var _i2 = _x; _i2 > _fixed_x - selectedShip; _i2--) {
                  copy_map[_y][_i2] = copy_map.time_sheap;
                }
              }

              break;

            case ShipWay.down:
              if (copy_map[_y + selectedShip - 1][_x] != null) {
                var fixed_y = _y;

                for (var _i3 = _y; _i3 < selectedShip + fixed_y; _i3++) {
                  copy_map[_i3][_x] = copy_map.time_sheap;
                }
              }

              break;

            case ShipWay.up:
              m = copy_map[_y - (selectedShip - 1)];

              if (m != null) {
                var _fixed_y = _y;

                if (_fixed_y >= selectedShip - 1) {
                  for (var _i4 = _y; _i4 > _fixed_y - selectedShip; _i4--) {
                    copy_map[_i4][_x] = copy_map.time_sheap;
                  }
                }
              }

              break;
          }

          map = copy_map;
          showMap();
        }
      }, false);
    }
  }
}

function initMap() {
  map = [];

  for (var y = 0; y < 10; y++) {
    map[y] = [];

    for (var x = 0; x < 10; x++) {
      map[y][x] = Map.field;
    }
  }
}

function showShips() {
  var element = document.getElementById('ships_field');

  while (element.lastElementChild) {
    element.removeChild(element.lastElementChild);
  }

  var place = document.getElementById('ships_field');

  for (var y = 4; y > 0; --y) {
    var _ship = document.createElement('table');

    var tr = document.createElement('tr');

    _ship.setAttribute('class', 'ship_line');

    for (i = 0; i < y; i++) {
      var _td = document.createElement('td');

      if (ships[y] > 0) {
        _td.setAttribute('class', Map.ship);
      } else {
        _td.setAttribute('class', Map.no_ship);
      }

      tr.appendChild(_td);
    }

    var td = document.createElement('td');
    td.innerHTML = 'X' + ships[y];
    tr.appendChild(td);
    tr.setAttribute('class', 'ship_get');
    tr.setAttribute('size', y);

    _ship.appendChild(tr);

    place.appendChild(_ship);
  }

  setListenersShips();
}

function setListenersShips() {
  ship = document.getElementsByClassName('ship_get');

  for (var x = 0; x < ship.length; x++) {
    size = ship[x].getAttribute('size');
    var quanity = ships[size];
    shipsWay = ShipWay.right;
    if (quanity > 0) ship[x].addEventListener('click', function () {
      selectedShip = this.getAttribute("size");
      showMap();
    });
  }
}

function initShips() {
  ships[4] = 1;
  ships[3] = 2;
  ships[2] = 3;
  ships[1] = 4;
}

var selectedShip = null;
var shipsWay = null;
var map = [];
var ships = [];
initShips();
initMap();
showMap();
showShips();
document.addEventListener('keydown', function (event) {
  var keyName = event.key;
  console.log(keyName);

  switch (keyName) {
    case Keys.ArrowRight:
      shipsWay = ShipWay.right;
      showMap();
      break;

    case Keys.ArrowLeft:
      shipsWay = ShipWay.left;
      showMap();
      break;

    case Keys.ArrowUp:
      shipsWay = ShipWay.up;
      showMap();
      break;

    case Keys.ArrowDown:
      shipsWay = ShipWay.down;
      showMap();
      break;

    case Keys.Enter:
      $.ajax({
        method: "PUT",
        url: "/api/API_Game/1",
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
        },
        contentType: "application/json;charset=utf-8",
        data: '{"id":1,"users":[{"id":"string","userName":"string","normalizedUserName":"string","email":"string","normalizedEmail":"string","emailConfirmed":true,"passwordHash":"string","securityStamp":"string","concurrencyStamp":"string","phoneNumber":"string","phoneNumberConfirmed":true,"twoFactorEnabled":true,"lockoutEnd":"2021-02-24T11:00:22.767Z","lockoutEnabled":true,"accessFailedCount":0,"nickName":"string"}],"userTurn":{"id":"string","userName":"string","normalizedUserName":"string","email":"string","normalizedEmail":"string","emailConfirmed":true,"passwordHash":"string","securityStamp":"string","concurrencyStamp":"string","phoneNumber":"string","phoneNumberConfirmed":true,"twoFactorEnabled":true,"lockoutEnd":"2021-02-24T11:00:22.768Z","lockoutEnabled":true,"accessFailedCount":0,"nickName":"string"},"maps":[{"id":0,"cells":[{"id":0,"cellTypes":[{"id":0,"typeName":"string","cells":[null]}]}]}]}',
        success: function success(message) {
          alert(JSON.stringify(map));
        },
        error: function error(message) {
          alert("Nifiga ne robit");
        }
      });
      break;
      saveTimeShip();
      clearAllTrash();
      showMap();
      ships[selectedShip]--;
      showShips();
      selectedShip = null;
      var goToGame = true;

      for (var _i5 = 1; _i5 < 5; _i5++) {
        goToGame = ships[_i5] == 0 && goToGame;
      }

      if (goToGame) {
        var link = document.getElementById('go_to_game');
        link.removeAttribute('hidden');
        link.addEventListener('click', function () {// $.ajax({
          //     method: "POST",
          //     url: "/api/API_Game/put/9",
          //     beforeSend: function (xhr) { xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val()); },
          //     contentType: "application/json;charset=utf-8",
          //     data: JSON.stringify('{"id":9,"users":[{"id":"string","userName":"string","normalizedUserName":"string","email":"string","normalizedEmail":"string","emailConfirmed":true,"passwordHash":"string","securityStamp":"string","concurrencyStamp":"string","phoneNumber":"string","phoneNumberConfirmed":true,"twoFactorEnabled":true,"lockoutEnd":"2021-02-24T11:00:22.767Z","lockoutEnabled":true,"accessFailedCount":0,"nickName":"string"}],"userTurn":{"id":"string","userName":"string","normalizedUserName":"string","email":"string","normalizedEmail":"string","emailConfirmed":true,"passwordHash":"string","securityStamp":"string","concurrencyStamp":"string","phoneNumber":"string","phoneNumberConfirmed":true,"twoFactorEnabled":true,"lockoutEnd":"2021-02-24T11:00:22.768Z","lockoutEnabled":true,"accessFailedCount":0,"nickName":"string"},"maps":[{"id":0,"cells":[{"id":0,"cellTypes":[{"id":0,"typeName":"string","cells":[null]}]}]}]}'),
          //     success: function (message) {
          //         alert(JSON.stringify(map));
          //     },
          //     error: function (message) {
          //         alert("Nifiga ne robit");
          //     }
          // });
        });
      }

      break;
  }
}); //document.getElementById('game_id').innerText,