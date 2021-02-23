const Map = {
    'field' :               'field',
    'no_ship' :             'no_ship',
    'ship' :                'ship',
    'time_sheap' :          'time_sheap',
    'time_ship_border' :    'ship_border',
    'ship_border' :         'ship_border',
}
const ShipWay = {
    'up' :      1,
    'down' :   2,
    'right' :    3,
    'left' :     4
}
const Keys =  {
    'ArrowLeft' :   'ArrowLeft',
    'ArrowRight' :  'ArrowRight',
    'ArrowDown' :   'ArrowDown',
    'ArrowUp' :     'ArrowUp',
    'Enter' :       'Enter',
}
function showMap(){
    let element = document.getElementById('map_field');
    while(element.lastElementChild) {
        element.removeChild(element.lastElementChild)
    }
    for(let y = 0; y < 10; y++){
        let line = document.createElement('tr');
        line.setAttribute('id', 'line-'+y);
        line.setAttribute('class', 'line');
        document.getElementById('map_field').appendChild(line);
        for(let x = 0; x < 10; x++){
            cell = document.createElement('td');
            cell.setAttribute("x",x);
            cell.setAttribute("y",y);
            cell.setAttribute("id",'cell-'+x+'-'+ y);
            cell.setAttribute("class","field");
            switch(map[y][x]){
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
}
function clearAllTrash(){
    for(let y = 0; y < 10; y++){
        for(let x = 0; x < 10; x++){
            if(map[y][x] != Map.ship){
                map[y][x] = Map.field;
            }
        }
    }
}
function saveTimeShip(){
    for(let y = 0; y < 10; y++){
        for(let x = 0; x < 10; x++){
            if(map[y][x] == Map.time_sheap){
                map[y][x] = Map.ship;
            }
        }
    }
}
function setListenersMap(){
    for(let y = 0; y < 10; y++){
        for(let x = 0; x < 10; x++){
            cell = document.getElementById('cell-'+x + '-' + y);
            cell.addEventListener('mouseover', function(){
                clearAllTrash();
                let copy_map = map;
                if((selectedShip != null)&& (shipsWay != null)){
                    let x = this.getAttribute("x");
                    x = Number(x);
                    let y = this.getAttribute("y");
                    y = Number(y);
                    let change = false;
                    selectedShip = Number(selectedShip);
                    switch(shipsWay){
                        case ShipWay.right:
                            if((copy_map[y][x + (selectedShip - 1)] != null) && (copy_map[y][x + selectedShip] != ship)){
                                let fixed_x =  x;
                                for(let i = x; i < selectedShip + fixed_x; i++){
                                    if(copy_map[y][i]!= Map.ship){
                                        copy_map[y][i] = Map.time_sheap;
                                    }else{ 
                                        return;
                                    }
                                    if(copy_map[y + 1]){
                                        if(copy_map[y + 1][i] != Map.ship){
                                            copy_map[y + 1][i] = Map.time_ship_border;
                                        }else{ 
                                            return;
                                        }	
                                        if(copy_map[y  + 1][fixed_x - 1] != Map.ship){
                                            copy_map[y + 1][fixed_x - 1] = Map.time_ship_border;
                                        }else{ 
                                            return;
                                        }
                                        if(copy_map[y + 1][i + 1] != Map.ship){
                                            copy_map[y + 1][i + 1] = Map.time_ship_border;
                                        }else{ 
                                            return;
                                        }
                                    }
                                    if(copy_map[y - 1]){
                                        if(copy_map[y - 1][i] != Map.ship){
                                            copy_map[y - 1][i] = Map.time_ship_border;
                                        }else{ 
                                            return;
                                        }
                                        
                                        if(copy_map[y - 1][fixed_x - 1] != Map.ship){
                                            copy_map[y - 1][fixed_x - 1] = Map.time_ship_border;
                                        }else{ 
                                            return;
                                        }
                                        if(copy_map[y - 1][i + 1] != Map.ship){
                                            copy_map[y - 1][i + 1] = Map.time_ship_border;
                                        }else{ 
                                            return;
                                        }
                                    }
                                    if(copy_map[y][i + 1] != Map.ship){
                                        copy_map[y][i + 1] = Map.time_ship_border;
                                    }else{ 
                                        return;
                                    }
                                    if(copy_map[y][fixed_x - 1] != Map.ship){
                                        copy_map[y][fixed_x - 1] = Map.time_ship_border;
                                    }else{ 
                                        return;
                                    }
                                    map = copy_map;
                                }
                            }
                            break;
                        case ShipWay.left:
                            if(copy_map[y][x - (selectedShip - 1)] != null){
                                let fixed_x = x;
                                for(let i = x; i > fixed_x - selectedShip; i--){
                                    copy_map[y][i] = copy_map.time_sheap;
                                }
                            }
                            break;
                        case ShipWay.down:
                            if((copy_map[y + (selectedShip) - 1][x] != null)){
                                let fixed_y =  y;
                                for(let i = y; i < (selectedShip + fixed_y); i++){
                                    copy_map[i][x] = copy_map.time_sheap;
                                }
                            }
                            break;
                        case ShipWay.up:
                            m = copy_map[y - (selectedShip - 1)];
                            if((m!= null)){
                                let fixed_y =  y;
                                if(fixed_y >= selectedShip - 1){
                                    for(let i = y; i >  fixed_y - selectedShip; i--){
                                        copy_map[i][x] = copy_map.time_sheap;
                                    }
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
function initMap(){
    map = [];
    for(let y = 0; y < 10;y++){
        map[y] = [];
        for(let x = 0; x < 10;x++){
            map[y][x]  = Map.field;
        }
    }
}
function showShips(){
    let element = document.getElementById('ships_field');
    while(element.lastElementChild) {
        element.removeChild(element.lastElementChild)
    }
    let place = document.getElementById('ships_field');
    for(let y = 4; y > 0; --y){
        let ship = document.createElement('table');
        let tr = document.createElement('tr');
        ship.setAttribute('class', 'ship_line');
        for(i = 0; i < y; i++){
            let td = document.createElement('td');
            if(ships[y] > 0){
                td.setAttribute('class', Map.ship);
            }else{
                td.setAttribute('class', Map.no_ship);
            }
            tr.appendChild(td);
        }
        let td = document.createElement('td');
        td.innerHTML = 'X'+ships[y];
        tr.appendChild(td);
        tr.setAttribute('class','ship_get');
        tr.setAttribute('size', y);
        ship.appendChild(tr);
        place.appendChild(ship);
    }
    setListenersShips();
}
function setListenersShips(){
    ship = document.getElementsByClassName('ship_get');
    for(let x = 0; x < ship.length; x++){
        size = ship[x].getAttribute('size');
        let quanity = ships[size];
        shipsWay = ShipWay.right;
        if(quanity > 0)
            ship[x].addEventListener('click',function(){
                selectedShip = this.getAttribute("size");
                showMap();
            })
    }
}
function initShips(){
    ships[4] = 1;
    ships[3] = 2;
    ships[2] = 3;
    ships[1] = 4;
}
let selectedShip = null;
let shipsWay = null;
let map = [];
let ships = [];
initShips();
initMap();
showMap();
showShips();

document.addEventListener('keydown', (event) => {
    let keyName = event.key;
    console.log(keyName);
    switch(keyName){
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
            let goToGame = true;
            for(let i = 1; i < 5; i++){
                goToGame = (ships[i] == 0) && goToGame;
            }
            if(goToGame){
                let link = document.getElementById('go_to_game');
                link.removeAttribute('hidden');
                link.addEventListener('click', function(){
                    $.ajax({
                        method: "POST",
                        url: "/api/",
                        beforeSend: function (xhr) { xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val()); },
                        contentType: "application/json;charset=utf-8",
                        data: JSON.stringify(obj),
                        success: function (message) {
                            alert(JSON.stringify(obj));
                        },
                        error: function (message) {
                            alert("Nifiga ne robit");
                        }
                    });
                });
            }
            break;       
    }
});
