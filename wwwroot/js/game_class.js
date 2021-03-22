import  * as Const from './Const.js';
import { Player } from './player_class.js'
export class Game {
    gameid;
    gameStatus;
    userTurnId;
    map;
    winnerId;
    players;
    currentPlayerId;
    constructor (){
        this.getCurrentPlayerId();
        var that = this;
        var david = setInterval(function(david){that.startGame()},1500);
    }
    startGame(){
        if(this.gameStatus == Const.GameStatus.over){
            let text;
            if(this.currentPlayerId == this.winnerId){
                text = "Congrats you had won";
            } else {
                text = "We are sorry but you loses";
            }
            alert(text);
            for (var i = 1; i < 99999; i++)
            window.clearInterval(i);
        } else if(this.gameStatus != Const.GameStatus.plaing){
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
        this.id = game_return.id;
        this.winnerId = game_return.winnerId;
        this.userTurnId = game_return.userTurnId;
        //set maps for player and enemy
        for(let i = 0; i < game_return.users.length; i++){    
            let user = game_return.users[i];
            // if it is a player
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
                //if it is enemy
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
        //if game is end ir not 
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
            error: function(){
            }
        });
    }
    generateMaps(){
        if(this.maps == null){
            this.maps = []; 
        }
        let map = [];

    }
    setGamer(){
        let link  = 'api/API_Game/' + that.gameId;
        var all_data = {};
        all_data['id'] = that.id;
        all_data['users'] = [];
        all_data['userTurnId'] = that.userTurnId;
        all_data['maps'] = [];
        var maps = {};
        maps['Map_str'] = JSON.stringify(that.maps);
        maps['Owner'] = {};
        let playerId;
        if(that.players[0].id == currentPlayerId){
            playerId= this.players[0].id;
        }else{
            playerId = this.players[0].id;
        }
        maps['Owner']['Id'] = playerId;
        all_data['maps'][0] = maps;
        $.ajax({
            mathod : 'PUT',
            url : link,
            beforeSend: function (xhr) { xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val()); },
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(all_data),
            success : function (message) {

            },
            error : function (massage) {
                alert('tada');
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
                let cell = document.getElementById(id_beg + x + '-' + y);
                if(cell != null){  
                    cell.addEventListener('click', function(){
                        let map = that.players['enemy'].map;
                        let x = Number(this.getAttribute("x"));
                        let y = Number(this.getAttribute("y"));
                        if((map[y][x] == Const.Map.field)){
                            map[y][x] = Const.Map.miss;
                            that.userTurnId = that.players['enemy'].id;
                        } else if(map[y][x] == Const.Map.ship){
                                map[y][x] = Const.Map.crash;
                                let win = true;
                                for(let i = 0; i < 10; i++){
                                    for(let j = 0; j < 10; j++){
                                        win = map[i][j] != Const.Map.ship && win;
                                    }
                                }
                                if(win){
                                    that.gameStatus = Const.GameStatus.over;
                                    that.winnerId = that.currentPlayerId;
                                    that.setGame();
                                }
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
        all_data['winnerId'] = this.winnerId;
        all_data['gameStatus'] = {};
        all_data['gameStatus']['name'] = this.gameStatus;
        let userTurnId;
        all_data['userTurnId'] = this.userTurnId
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
        $.ajax({
            method: "PUT",
            url: '/api/API_Game/' + this.gameId,
            beforeSend: function (xhr) { xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val()); },
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(all_data),
            success: function (message) {
            },
        });
    }
    showNames(){
        if(this.players['player'].id == this.userTurnId){
            this.players['player'].showName(true);
            this.players['enemy'].showName(false);
        } else{
            this.players['player'].showName(false);
            this.players['enemy'].showName(true);
        }
    }
}