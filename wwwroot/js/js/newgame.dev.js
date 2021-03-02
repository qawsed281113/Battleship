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
  sessionStorage.setItem('map', JSON.stringify(map));
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
          }

          map = copy_map;
          showMap();
        }
      }, false);
    }
  }
}

function initMap() {
  var new_ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (new_ || sessionStorage.getItem('map') == null) {
    map = {};

    for (var y = 0; y < 10; y++) {
      map[y] = {};

      for (var x = 0; x < 10; x++) {
        map[y][x] = Map.field;
      }
    }
  } else {
    map = JSON.parse(sessionStorage.getItem('map'));
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
  sessionStorage.setItem('ships', JSON.stringify(ships));
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
  var new_ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (new_ || sessionStorage.getItem('ships') == null) {
    ships[4] = 1;
    ships[3] = 2;
    ships[2] = 3;
    ships[1] = 4;
  } else {
    ships = JSON.parse(sessionStorage.getItem('ships'));
  }
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
      saveTimeShip();
      clearAllTrash();
      showMap();
      ships[selectedShip]--;
      showShips();
      selectedShip = null;
      var goToGame = true;

      for (var _i2 = 1; _i2 < 5; _i2++) {
        goToGame = ships[_i2] == 0 && goToGame;
      }
      /**
       * {
              "id": 0,
              "cells": [
                  {
                  "id": 0,
                  "cellTypes": [
                      {
                      "id": 0,
                      "typeName": "string",
                      "cells": [
                          null
                      ]
                      }
                  ]
                  }
              ]       
          }
       */


      if (!goToGame) {
        var link = document.getElementById('go_to_game');
        link.removeAttribute('hidden');
        sessionStorage.clear();
        link.addEventListener('click', function () {
          var id = document.getElementById('game_id').innerText;
          link_text = '/api/API_Game/' + id;
          var all_data = {};
          all_data['id'] = Number(id);
          all_data['users'] = [];
          all_data['userTurn'] = {};
          all_data['maps'] = [];
          var maps = {};
          maps['cells'] = [];

          for (var _i3 = 0, line = 0; _i3 < 10; ++_i3, line += 10) {
            for (var j = 0; j < 10; ++j) {
              maps['cells'][line + j] = {};
              maps['cells'][line + j]['cellTypes'] = [];
              maps['cells'][line + j]['cellTypes'][0] = {};
              maps['cells'][line + j]['cellTypes'][0]['TypeName'] = map[_i3][j];
            }
          }

          all_data['maps'][0] = maps;
          console.log(JSON.stringify(all_data));
          $.ajax({
            method: "PUT",
            url: link_text,
            beforeSend: function beforeSend(xhr) {
              xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(all_data),
            success: function success(message) {
              window.location.replace('/Game/Game?id=' + id);
            },
            error: function error(message) {
              alert('vse sdochlo');
            }
          });
        });
      }

      break;
  }
}); //document.getElementById('game_id').innerText,