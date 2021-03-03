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
          var _x = Number(this.getAttribute("x"));

          var _y = Number(this.getAttribute("y"));

          selectedShip = Number(selectedShip);
          var y_array = [-1, 1];
          save = true; // showMap();

          switch (shipsWay) {
            case ShipWay.right:
              var fixed_x = _x;

              for (var _i = _x; _i < fixed_x + selectedShip && save; ++_i) {
                save = fixed_x + selectedShip - 1 < 10;

                if (save) {
                  save = copy_map[_y][_i] == Map.field && save;

                  if (copy_map[_y][_i] == Map.field) {
                    copy_map[_y][_i] = Map.time_sheap;
                  } else {
                    return;
                  }
                } else {
                  return;
                }
              }

              for (var j = 0; j < 2; j++) {
                for (var _i2 = _x - 1; _i2 < fixed_x + selectedShip + 1; ++_i2) {
                  // save = copy_map[y + y_array[j]] != Map.ship && save;
                  if (copy_map[_y + y_array[j]]) {
                    save = copy_map[_y + y_array[j]][_i2] != Map.ship && save;

                    if (copy_map[_y + y_array[j]][_i2] != Map.ship) {
                      copy_map[_y + y_array[j]][_i2] = Map.time_ship_border;
                    } else {
                      return;
                    }
                  }
                }
              }

              if (copy_map[_y]) {
                save = copy_map[_y][_x + selectedShip] != Map.ship && save;

                if (copy_map[_y][_x + selectedShip] != Map.ship) {
                  copy_map[_y][_x + selectedShip] = Map.time_ship_border;
                } else {
                  return;
                }

                save = copy_map[_y][_x - 1] != Map.ship && save;

                if (copy_map[_y][_x - 1] != Map.ship) {
                  copy_map[_y][_x - 1] = Map.time_ship_border;
                } else {
                  return;
                }
              }

              break;

            case ShipWay.down:
              var fixed_y = _y;

              for (var _i3 = _y; _i3 < fixed_y + selectedShip && save; ++_i3) {
                save = fixed_y + selectedShip - 1 < 10;

                if (save) {
                  save = copy_map[_i3][_x] == Map.field && save;

                  if (copy_map[_i3][_x] == Map.field) {
                    copy_map[_i3][_x] = Map.time_sheap;
                  } else {
                    return;
                  }
                } else {
                  return;
                }
              }

              for (var _j = 0; _j < 2; _j++) {
                for (var _i4 = _y - 1; _i4 < fixed_y + selectedShip + 1; ++_i4) {
                  // save = copy_map[y + y_array[j]] != Map.ship && save;
                  if (copy_map[_y][_x + y_array[_j]]) {
                    save = copy_map[_i4][_x + y_array[_j]] != Map.ship && save;

                    if (copy_map[_i4][_x + y_array[_j]] != Map.ship) {
                      copy_map[_i4][_x + y_array[_j]] = Map.time_ship_border;
                    } else {
                      return;
                    }
                  }
                }
              }

              if (copy_map[_y]) {
                save = copy_map[_y + selectedShip][_x] != Map.ship && save;

                if (copy_map[_y + selectedShip][_x] != Map.ship) {
                  copy_map[_y + selectedShip][_x] = Map.time_ship_border;
                } else {
                  return;
                }

                save = copy_map[_y - 1][_x] != Map.ship && save;

                if (copy_map[_y - 1][_x] != Map.ship) {
                  copy_map[_y - 1][_x] = Map.time_ship_border;
                } else {
                  return;
                }
              }

          }

          if (save) {
            map = copy_map;
            showMap();
          }
        } // if((selectedShip != null)&& (shipsWay != null)){
        //     let x = this.getAttribute("x");
        //     x = Number(x);
        //     let y = this.getAttribute("y");
        //     y = Number(y);
        //     let change = false;
        //     selectedShip = Number(selectedShip);
        //     switch(shipsWay){
        //         case ShipWay.right:
        //             if((copy_map[y][x + (selectedShip - 1)] != null)){
        //                 let fixed_x =  x;
        //                 for(let i = x; i < selectedShip + fixed_x; i++){
        //                     if(copy_map[y][i]!= Map.ship){
        //                         copy_map[y][i] = Map.time_sheap;
        //                     }else{ 
        //                         copy_map = map;
        //                         return;
        //                     }
        //                     if(copy_map[y + 1]){
        //                         if(copy_map[y + 1][i] != Map.ship){
        //                             copy_map[y + 1][i] = Map.time_ship_border;
        //                         }else{ 
        //                             copy_map = map;
        //                         return;
        //                         }	
        //                         if(copy_map[y  + 1][fixed_x - 1] != Map.ship){
        //                             copy_map[y + 1][fixed_x - 1] = Map.time_ship_border;
        //                         }else{ 
        //                             copy_map = map;
        //                         return;
        //                         }
        //                         if(copy_map[y + 1][i + 1] != Map.ship){
        //                             copy_map[y + 1][i + 1] = Map.time_ship_border;
        //                         }else{ 
        //                             copy_map = map;
        //                             return;
        //                         }
        //                     }
        //                     if(copy_map[y - 1]){
        //                         if(copy_map[y - 1][i] != Map.ship){
        //                             copy_map[y - 1][i] = Map.time_ship_border;
        //                         }else{ 
        //                             copy_map = map;
        //                             return;
        //                         }
        //                         if(copy_map[y - 1][fixed_x - 1] != Map.ship){
        //                             copy_map[y - 1][fixed_x - 1] = Map.time_ship_border;
        //                         }else{ 
        //                             copy_map = map;
        //                             return;
        //                         }
        //                         if(copy_map[y - 1][i + 1] != Map.ship){
        //                             copy_map[y - 1][i + 1] = Map.time_ship_border;
        //                         }else{ 
        //                             copy_map = map;
        //                             return;
        //                         }
        //                     }
        //                     if(copy_map[y][i + 1] != Map.ship){
        //                         copy_map[y][i + 1] = Map.time_ship_border;
        //                     }else{ 
        //                         copy_map = map;
        //                         return;
        //                     }
        //                     if(copy_map[y][fixed_x - 1] != Map.ship){
        //                         copy_map[y][fixed_x - 1] = Map.time_ship_border;
        //                     }else{ 
        //                             copy_map = map;
        //                             return;
        //                     }
        //                 }
        //             }
        //             break;
        //     }
        // }


        map = copy_map;
        showMap();
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

    sessionStorage.setItem('map', JSON.stringify(map));
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

    if (quanity > 0) {
      ship[x].addEventListener('click', function () {
        selectedShip = this.getAttribute("size");
        showMap();
      });
    }
  }
}

function initShips() {
  var new_ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (new_ || sessionStorage.getItem('ships') == null) {
    ships[4] = 1;
    ships[3] = 2;
    ships[2] = 3;
    ships[1] = 4;
    sessionStorage.setItem('ships', JSON.stringify(ships));
  } else {
    ships = JSON.parse(sessionStorage.getItem('ships'));
  }
}

var save = false;
var selectedShip = null;
var shipsWay = null;
var map = [];
var ships = [];
initShips();
initMap();
showMap();
showShips();
document.getElementById('clear_map').addEventListener('click', function () {
  initMap(true);
  initShips(true);
  showMap();
  showShips();
});
document.addEventListener('keydown', function (event) {
  var keyName = event.key;

  switch (keyName) {
    case Keys.ArrowRight:
      shipsWay = ShipWay.right;
      showMap();
      break;

    case Keys.ArrowLeft:
      shipsWay = ShipWay.right;
      showMap();
      break;

    case Keys.ArrowUp:
      shipsWay = ShipWay.down;
      showMap();
      break;

    case Keys.ArrowDown:
      shipsWay = ShipWay.down;
      showMap();
      break;

    case Keys.Enter:
      if (save) {
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
            maps['Map_str'] = JSON.stringify(map);
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


      break;
  }
}); //document.getElementById('game_id').innerText,