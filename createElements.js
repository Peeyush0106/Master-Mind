function createBoard() {
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var cellId = 66;
    for (var i = 0; i < 11; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < 6; j++) {
            var td = document.createElement("td");
            var img = document.createElement("img");

            if (cellId % 6 === 0) {
                td.setAttribute("id", "rowNo" + (cellId / 6));
                td.innerText = (cellId / 6) === 11 ? "Code" : (cellId / 6);
                td.setAttribute("class", "cell-head")
            }
            else {
                if ((cellId + 5) % 6 === 0) {
                    td.setAttribute("id", "cell-result-" + (((cellId - 1) / 6) + 1));
                    td.setAttribute("class", "cells");

                    var tableResult = document.createElement("table");
                    var resultCellNo = 1;
                    for (var l = 0; l < 2; l++) {
                        var trResult = document.createElement("tr");
                        for (var k = 0; k < 2; k++) {
                            var tdResult = document.createElement("td");
                            var imgResult = document.createElement("img");

                            imgResult.setAttribute("src", "cell.png");
                            imgResult.setAttribute("width", "0");
                            imgResult.setAttribute("id", "cell-img-" + (((cellId - 1) / 6) + 1) + "-result-" + resultCellNo);
                            imgResult.setAttribute("class", "cell-img-result");

                            tdResult.appendChild(imgResult);
                            trResult.appendChild(tdResult);

                            resultCellNo++;
                        }
                        tableResult.appendChild(trResult);
                    }
                    td.appendChild(tableResult);
                }
                else {
                    td.setAttribute("id", "cell-" + cellId);
                    td.setAttribute("class", "cells");
                    
                    img.setAttribute("onclick", "cellClicked(" + cellId + ")");
                    img.setAttribute("src", "cell.png");
                    img.setAttribute("width", "0");
                    img.setAttribute("id", "cell-img-" + cellId);
                    img.setAttribute("played", "false")
                    img.setAttribute("codeColor", "blank")

                    if (cellId >= 62) img.setAttribute("class", "cell-img-ans");
                    else if (cellId <= 5) img.setAttribute("class", "cell-img-enabled");
                    else img.setAttribute("class", "cell-img");

                    td.appendChild(img);
                }
            }

            tr.appendChild(td);

            cellId--;
        }
        thead.appendChild(tr);
    }
    table.setAttribute("id", "board-table");
    table.appendChild(thead);
    document.getElementById("board-div").appendChild(table);
}

function createColorSelector() {
    for (var i = 0; i < colors.length; i++) {
        var color = colors[i];

        var btn = document.createElement("button");

        btn.style.backgroundColor = color;
        btn.style.color = "white";
        btn.setAttribute("class", "color-select-boxes");
        if (color === "yellow" || color === "orange" || color === "white") {
            btn.style.color = "black";
        }

        btn.setAttribute("name", "color-select");
        btn.setAttribute("id", ("color-select-" + color));
        btn.setAttribute("class", "color-select-btns");
        btn.innerHTML = "<br>";

        document.getElementById("color-select-" + (i + 1)).appendChild(btn);
    }
}