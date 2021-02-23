const ShipWay = {
    "top": 1,
    'bottom': 2,
    'right' : 3,
    'left' : 4
}
function SendMap(){

}
function showTablePlayer(field_id, map,hover) {
    myNode = document.getElementById(field_id);
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
      }
    for(y = 0; y < 10; y++){
        line = document.createElement("tr");
        line.setAttribute("id",'line-' + y);
        line.setAttribute("class","line");
        document.getElementById(field_id).appendChild(line);
        for(x =0; x < 10; x++){
            column = document.createElement("td");
            column.setAttribute("id",'column-' + x + '-' + y);
            column.setAttribute("x",x);
            column.setAttribute("y",y);
            column.setAttribute("class","field");
            if(map[y][x] == 'ship'){
                column.setAttribute("class","ship");                
            }
            line.appendChild(column);
        }
    }
}
function putShip(ship){
    ship_type = ship.getAttribute("type");
    for(y =0; y < 10; y++){
        for(x =0; x < 10; x++){
            cell = document.getElementById('column-' + x + '-' + y);
            cell.addEventListener('mouseenter',function(event){
                this.className = 'ship';
                x = this.getAttribute("x");
                y = this.getAttribute("y");
                if(shipActive !== false){
                    switch(shipWay){
                        case ShipWay.left:
                            for(x1 = x; x1 > x - shipActive && (x - shipActive >= -1); --x1){
                                data = document.getElementById('column-' + x1 + '-' + y);
                                data.className ='ship';
                            }
                            break;
                    }
                }
            }, false);
            cell.addEventListener('mouseout',function(event){
                this.className = 'ship';
                x = this.getAttribute("x");
                y = this.getAttribute("y");
                if(shipActive !== false){
                    switch(shipWay){
                        case ShipWay.left:

                            for(x1 = x; x1 > x - shipActive && (x - shipActive >= -1); --x1){
                                data = document.getElementById('column-' + x1 + '-' + y);
                                data.className ='field';
                            }
                            break;
                    }
                }
            }, false);
        }
    }
}
function showShips(ships){
    place = document.getElementById('ships_field');
    for(y = 1; y < 5; ++y){
        ship = document.createElement('table');
        place.appendChild(ship);
        ship.setAttribute('class', 'ship_line');
        tr = document.createElement('tr');
        ship.appendChild(tr);
        for(i = 0; i < ships[y]; i++){
            td = document.createElement('td');
            tr.appendChild(td);
            td.setAttribute('class', 'ship');
        }
        td = document.createElement('td');
        td.innerHTML = 'X'+ships[i];
        tr.appendChild(td);
        tr.setAttribute('type', ships[i]);
        tr.addEventListener('click',function(){
            putShip(this);
        })
    }
}
shipWay = ShipWay.left;
shipActive = 2;
ships = [];
ships[4] = 1;
ships[3] = 2;
ships[2] = 3;
ships[1] = 4;
map = [
    ['ship','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','ship','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','','']
];
showTablePlayer('map_field',map);
showShips(ships);