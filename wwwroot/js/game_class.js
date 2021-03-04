import  * as Const from './Const.js';
import { Player } from './player_class.js'
export class Game {
    gameid;
    gameStatus;
    userTurnId;
    maps;
    uesrs;
    currentPlayerId;
    constructor (){
        this.getCurrentPlayerId();
        setInterval(this.startGame(),1200);
    }
    startGame(){
        if(this.gameStatus != Const.GameStatus.plaing){
            this.getGameId();
            this.getGame();
        } else {
        }
    }
    getCurrentPlayerId(){
        this.currentPlayerId = document.getElementById('player_id').innerText;
    }
    GameInit(game_return){
        console.log(game_return);
        this.id = game_return.id;
        this.users = [];
        let user = game_return.users[0];
        let maps_ = game_return.maps;
        let map = null;
        for(let i = 0; i < maps_.length; i++){
            if(maps_[i]['owner']['id'] == user['id']){
                map = JSON.parse(maps_[i]['map_str']);
            }
        }
        this.users[0] = new Player(user['id'], user['userName'], map, 'player_one','playerOneName', user['id'] ==  this.currentPlayerId);
    }
    getGame(){
        var that = this;
        $.ajax({
            method: 'GET',
            url: "/api/API_Game/" + this.gameId,
            beforeSend: function (xhr) { xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val()); },
            contentType: 'application/json;charset=utf-8',
            success: function(game_return){
                that.gameStatus = game_return.gameStatus['name'];
                that.GameInit(game_return)
            },
            error: function (){
                alert("vse sdochlo");
            }
        });
    }
    getGameId(){
        let queryString = window.location.search;  
        let urlparams = new URLSearchParams(queryString);
        return this.gameId = urlparams.get("id");
    }
    setEventListeners(){

    }
    setGame(){

    }
    getUserTurn(){

    }
    showMaps(){

    }
    showNames(){

    }


}