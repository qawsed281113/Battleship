import { Map } from './Const.js';
export class Player{
    id; 
    name;
    map;
    htmlMapId;
    htmlUserNameId;
    me;
    constructor(id_, name_, map_, htmlMapId_,htmlUserNameId_, me_){
        this.id = id_;
        this.name = name_;
        this.map = map_;
        this.htmlMapId = htmlMapId_;
        this.htmlUserNameId = htmlUserNameId_;
        this.me = me_;
        // this.showMap();
    }
    showMap(){
        let element = document.getElementById(this.htmlMapId);
        while(element.lastElementChild) {
            element.removeChild(element.lastElementChild)
        }
        if(this.map != null){

            for(let y = 0; y < 10; y++){
                let line = document.createElement('tr');
                line.setAttribute('id', 'line-' + y);
                document.getElementById(this.htmlMapId).appendChild(line);
                for(let x = 0; x < 10; x++){
                    let cell = document.createElement('td');
                    cell.setAttribute('id', 'cell'+ this.htmlMapId +'-' + x + '-' + y);
                    cell.setAttribute('x', x);
                    cell.setAttribute('y', y);
                    if((this.me) && (this.map != null)){
                        cell.setAttribute('class', this.map[y][x]);
                    } else {
                        let className = this.map[y][x] == Map.ship ?  Map.field : this.map[y][x];
                        cell.setAttribute('class', className);
                    }
                    line.appendChild(cell);
                }
            }
        }
    }
    showName(fire){
        let nameEl = document.getElementById(this.htmlUserNameId);
        nameEl.innerText = this.name;
        if(fire){
            nameEl.setAttribute('class', 'step_text');
        } else{
            nameEl.className = '';
        }
    }
}