import  { Player } from './player_class';
export class Game {
    public gameId : string;
    public userTurn : Player;
    public maps : Array<string>;
    public players : Array<Player>;
    public construct (){
        this.getGame(this.getGameId());
        this.startGame();
    }

    public getUserTurn() : void{

    }
    public startGame (): void {

    }
    private getGameId () : any {
        let queryString : string = window.location.search;  
        let urlparams = new URLSearchParams(queryString);
        // return this.gameId = urlparams.get("id");
    }
    private getGame(gameId : string) : void{
        $.ajax({
            method: 'GET',
            url: "/api/API_Game/" + this.gameId,
            // beforeSend: function (xhr) { xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val().toString()); },
            contentType: 'application/json;charset=utf-8',
            success: function(game_return : Game){
                this.maps = game_return.maps;
                sessionStorage.setItem("game", JSON.stringify(game_return));
            },
            error: function (){
                alert("vse sdochlo");
            }
        });
    }

    public setGame() : void{

    }
    private convertThisToJsonStr() : string {
        return "";
    }
}