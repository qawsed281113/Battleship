function createTablePlayer(player_field_id, map) {
    for(y = 0; y < 10; y++){
        line = document.createElement("tr");
        line.setAttribute("id",'line-' + y);
        line.setAttribute("class","line");
        docume4etElementById(player_field_id).appendChild(line);
        for(x =0; x < 10; x++){
            column = document.createElement("td");
            column.setAttribute("id",'column-' + x + '-' + y);
            column.setAttribute("class","field");
            column.setAttribute("type","enemy");
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
            line.appendChild(column);
        } 
    }
}
function createEnemyTable(table_id, map, shoot){
    myNode = document.getElementById(table_id);
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
      }
    for(y = 0; y < 10; y++){
        line = document.createElement("tr");
        line.setAttribute("id",'line-' + y);
        line.setAttribute("class","line");
        document.getElementById(table_id).appendChild(line);
        for(x =0; x < 10; x++){
            column = document.createElement("td");
            column.setAttribute("id",'column-' + x + '-' + y);
            column.setAttribute("type","enemy");
            column.setAttribute("x",x);
            column.setAttribute("y",y);
            if(map[y][x] == 'crashed'){
                column.setAttribute("class","crashed");
            }
            if(map[y][x] == 'miss'){
                column.setAttribute("class","miss");
            }
            if(shoot){
                column.setAttribute("class","field");
                column.addEventListener("click", function(){
                    type = this.getAttribute("type");
                    if(type == "enemy") {
                        x = this.getAttribute("x");
                        y = this.getAttribute("y");
                        this.setAttribute('class', 'crashed');
                    }
                });
            } else {
                column.setAttribute('class', 'no_shoot_field');
            }
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

createTablePlayer('player_field', map,false);
turn = document.getElementById('turn');
// turn.innerText = 'Player';
setInterval(function(){ 
    turn = document.getElementById('turn');
    if (turn.innerText == 'Player'){

    } else {
        map_enemy = [
            ['crashed','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','miss','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
        ];
        createEnemyTable('enemy_field', map_enemy,true);
    }
 }, 3000);