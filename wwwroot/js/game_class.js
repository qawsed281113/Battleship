import  * as Const from './Const.js';
import { Player } from './player_class.js'
export class Game {
    gameid;
    gameStatus;
    userTurnId;
    maps;
    players;
    currentPlayerId;
    constructor (){
        this.getCurrentPlayerId();
        var that = this;
        setInterval(function(){that.startGame()},1500);
    }
    startGame(){
        if(this.gameStatus != Const.GameStatus.plaing){
            this.getGameId();
            this.getGame();
        } else {
            if(this.currentPlayerId != this.userTurnId){
                if(this.players){
                    this.players['player'].showMap();
                    this.players['enemy'].showMap();
                }
                this.getGame();
            } else {
                this.getGameId();
                this.getGame();
                this.players['player'].showMap();
                this.players['enemy'].showMap();
                this.setEventListeners();
            }
        }
    }
    getCurrentPlayerId(){
        this.currentPlayerId = document.getElementById('player_id').innerText;
    }
    GameInit(game_return){
        this.players = [];
        console.log(game_return);
        this.id = game_return.id;
        this.userTurnId = game_return.userTurnId;
        for(let i = 0; i < game_return.users.length; i++){    
            let user = game_return.users[i];
            if(user['id'] ==  this.currentPlayerId){
                let maps_ = game_return.maps;
                let map = null;
                for(let i = 0; i < maps_.length; i++){
                    if(maps_[i]['owner']['id'] == user['id']){
                        map = JSON.parse(maps_[i]['map_str']);
                    }
                }
                this.players['player'] = new Player(user['id'], user['userName'], map, 'player_one','player_one_name', user['id'] ==  this.currentPlayerId);
            } else {
                let maps_ = game_return.maps;
                let map = null;
                for(let i = 0; i < maps_.length; i++){
                    if(maps_[i]['owner']['id'] == user['id']){
                        map = JSON.parse(maps_[i]['map_str']);
                    }
                }
                this.players['enemy'] = new Player(user['id'], user['userName'], map, 'player_two','player_two_name', user['id'] ==  this.currentPlayerId);
            }
        }
        if(this.gameStatus != Const.GameStatus.plaing){}else{
            this.players['player'].showMap();
            this.players['enemy'].showMap();
            this.showNames();
            if(this.currentPlayerId != this.userTurnId){
            }else{
                this.setEventListeners();
            }
        }
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
                that.GameInit(game_return);
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
        var htmlMapId = this.players['enemy'].htmlMapId;
        var that = this;
        var id_beg = 'cell' + this.players['enemy'].htmlMapId+'-';
        for(let y = 0; y < 10; y++){
            for(let x = 0; x < 10; x++){
                // this.players[0].map[y][x]
                let cell = document.getElementById(id_beg + x + '-' + y);
                if(cell != null){
                    
                    cell.addEventListener('click', function(){
                        let map = that.players['enemy'].map;
                        let x = Number(this.getAttribute("x"));
                        let y = Number(this.getAttribute("y"));
                        if((map[y][x] == Const.Map.field)){
                            map[y][x] = Const.Map.miss;
                        } else if(map[y][x] == Const.Map.ship){
                            map[y][x] = Const.Map.crush;
                        } else {return;}
                        that.players['enemy'].map = map;
                        that.players['enemy'].showMap();
                        that.setGame();
                    }); 
                }
            }
        }
    }
    setGame(){
        let link_text = '/api/API_Game/' + this.gameId;
        var all_data = {}
        all_data['id'] = Number(this.gameId);
        all_data['users'] = [];
        let userTurnId;
        all_data['userTurnId'] = this.players['enemy'].id;
        all_data['maps'] = [];
        var maps_ = {};
        maps_['Map_str'] = JSON.stringify(this.players['enemy'].map);
        maps_["Owner"] = {};
        maps_["Owner"]["Id"] = this.players['enemy'].id;
        all_data['maps'][0] = maps_;
        var maps_ = {};
        maps_['Map_str'] = JSON.stringify(this.players['player'].map);
        maps_["Owner"] = {};
        maps_["Owner"]["Id"] = this.players['player'].id;
        all_data['maps'][1] = maps_;
        console.log(JSON.stringify(all_data));
        $.ajax({
            method: "PUT",
            url: '/api/API_Game/' + this.gameId,
            beforeSend: function (xhr) { xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val()); },
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(all_data),
            success: function (message) {
            },
            error: function (message) {
                alert('vse sdochlo');
            }
        });
    }
    getUserTurn(){

    }
    showNames(){
        this.players['player'].showName();
        this.players['enemy'].showName();
    }


}