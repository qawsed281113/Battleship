function getData(){

}
function fire(y,x, map){
}
function createTable(player_field_id, map, enemy) {
    for(y = 0; y < 10; y++){
        line = document.createElement("tr");
        line.setAttribute("id",'line-' + y);
        line.setAttribute("class","line");
        document.getElementById(player_field_id).appendChild(line);
        for(x =0; x < 10; x++){
            column = document.createElement("td");
            column.setAttribute("id",'column-' + x + '-' + y);
            column.setAttribute("class","field");
            if(map[y][x] == 'ship_border'){
                column.setAttribute("class", "ship_border");
            }
            if(map[y][x] == 'ship'){
                column.setAttribute("class","ship");                
            }
            if(map[y][x] == 'crashed'){
                column.setAttribute("class","crashed");
            }
            if(map[y][x] == 'miss'){
                column.setAttribute("class","miss");
            }
            column.setAttribute("x",x);
            column.setAttribute("y",y);
            column.addEventListener("click", function(){
                id = this.getAttribute("id");
                if(id == "enemy_field") {
                    x = this.getAttribute("x");
                    y = this.getAttribute("y");
                }
            });
            line.appendChild(column);
        } 
    }
}
map = [
    ['crashed','','','','ship','','','','',''],
    ['ship','','','','','','','','',''],
    ['ship','','','','ship','','','','',''],
    ['','','','','ship','','','miss','',''],
    ['s','','','','ship','','','ship','',''],
    ['ship','','','','','','','','',''],
    ['ship','','','','','','','','',''],
    ['ship','','','','ship','','','','',''],
    ['ship','','','','ship','','','','',''],
    ['ship','','','','ship','','','','',''],
    ['ship','','','','ship','','','','',''],
];
map_enemy = [
    ['crashed','','','','ship','','','','',''],
    ['ship','','','','','','','','',''],
    ['ship','','','','ship','','','','',''],
    ['','','','','ship','','','miss','',''],
    ['s','','','','ship','','','','',''],
    ['ship','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['ship','','','','ship','','','','',''],
    ['ship','','','','ship','','','','',''],
    ['ship','','','','ship','','','','',''],
];
createTable('player_field', map,false);
createTable('enemy_field', map_enemy,true);