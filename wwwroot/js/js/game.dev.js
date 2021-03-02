"use strict";

var Map = {
  'field': 'field',
  'ship': 'ship',
  'crush': 'crush',
  'miss': "miss",
  'ship_hover': 'ship_hover',
  'fire': 'fire'
};

function showMap(mapId) {
  for (y = 0; y < 10; y++) {
    var line = document.createElement("tr");
    line.setAttribute("id", 'line-' + y);
    document.getElementById(mapId).appendChild(line);

    for (x = 0; x < 10; x++) {
      var column = document.createElement("td");
      column.setAttribute("id", 'column-' + x + '-' + y);
      column.setAttribute("class", map[y][x]);
      column.setAttribute("x", x);
      column.setAttribute("y", y);
      line.appendChild(column);
    }
  }
}

function setListenerOnMap(mapId) {
  for (y = 0; y < 10; y++) {
    for (x = 0; x < 10; x++) {
      var cell = document.getElementById('column-' + x + '-' + y);
      cell.addEventListener('hover', function () {
        if (this.getAttribute("class") == Map.field) {
          this.setAttribute("class", Map.ship_hover);
        }
      });
      cell.addEventListener("click", function () {
        x = Number(this.getAttribute("x"));
        y = Number(this.getAttribute("y"));
        map[y][x] = Map.fire;
      }, false);
    }
  }
}

function initMap() {}

function setMap(playerTurn) {
  $.ajax({
    method: "GET",
    url: "/api/API_Game/" + gameId + "/",
    beforeSend: function beforeSend(xhr) {
      xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
    },
    contentType: 'application/json;charset=utf-8',
    succes: function succes(mapp) {
      if (playerTurn == userOneName) {
        mapUserOne = mapp;
      } else {
        mapUserTwo = mapp;
      }
    },
    error: function error(massage) {
      alert('vse sdochlo');
    }
  });
}

function showUserName(userName) {}

function getUserName() {}

function getGameId() {
  var queryString = window.location.search;
  var urlparams = new URLSearchParams(queryString);
  gameId = urlparams.get("id");
}

function getGame() {
  $.ajax({
    method: 'GET',
    url: "/api/API_Game/" + gameId,
    beforeSend: function beforeSend(xhr) {
      xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
    },
    contentType: 'application/json;charset=utf-8',
    success: function success(game_return) {
      sessionStorage.setItem("game", JSON.stringify(game_return));
    },
    error: function error() {
      alert("vse sdochlo");
    }
  });
}

function getTurn() {
  getGameId();
  getGame();
  game = JSON.parse(sessionStorage.getItem("game"));
  console.log(game);

  if (game != null) {
    playerTurn = game["userTurnId"];
  }
}

function main() {
  if (gameId != null) {} else {
    getGameId();
  }
}

var game = null;
var gameId = null;
var mapUserOne = {};
var mapUserTwo = {};
var userOneName = "";
var userTwoName = "";
var playerTurn = ''; // setInterval(main, 1500);

getTurn();