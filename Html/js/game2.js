function drawTable(map, player_color) {
    table = document.getElementById("table");
    for(y = 0; y < 15; y++) {
        line = document.createElement("tr");
        table.appendChild(line);
        for(x = 0; x < 15; x++) {
            cel = document.createElement("td");
            cel.setAttribute("class", "cell");
            cel.setAttribute("id","cell" + x + " " + y);


            cel.addEventListener("click", function(){
                if(player_color = "black") {
                    this.setAttribute("class", "click_black")
                } else {
                    this.setAttribute("class", 'click_white');
                }
            });
            line.appendChild(cel);
        }
    }
}
drawTable();