var currentRow = 0;

var colors = ["red", "green", "blue", "yellow", "purple", "black", "orange", "white"];

var code = [];

var mouseX, mouseY;

createBoard();
createColorSelector();
setCode();

function setCode() {
    for (var i = 65; i > 61; i--) {
        var color = colors[Math.floor(Math.random() * colors.length)]
        // document.getElementById("cell-img-" + i).style.backgroundColor = color;
        code.push(color);
    }
    // Temp ----------------------------------------------------------------------------
    // for (var i = (currentRow * 6) + 5; i > (currentRow * 6) + 1; i--) {
    //     var color = colors[Math.floor(Math.random() * colors.length)]
    //     document.getElementById("cell-img-" + i).style.backgroundColor = color;
    //     document.getElementById("cell-img-" + i).setAttribute("codeColor", color)
    //     document.getElementById("cell-img-" + i).setAttribute("played", "true")
    // }
    // submitAttempt();
    // ---------------------------------------------------------------------------------
}

function cellClicked(id, event) {

    var cell = document.getElementById("cell-img-" + id);
    var className = cell.classList[0];

    if (className === "cell-img-enabled") {
        setMouseCoords(event);
        console.log(mouseX)
        document.getElementById("cell-img-" + id).style.border = "3px solid red";
        document.getElementById("color-selector-div").style.left = (619 * (window.innerWidth / 1440)) + "px";
        document.getElementById("color-selector-div").style.top = mouseY + "px";
        show_hidePallette(true);

        for (var i in colors) {
            console.log(id)
            document.getElementById("color-select-" + colors[i]).setAttribute("onclick", `setCellColor("` + id + `","` + colors[i] + `");`)
        }
    }
}

function setCellColor(id, color) {
    document.getElementById("cell-img-" + id).setAttribute("played", "true");
    document.getElementById("cell-img-" + id).style.backgroundColor = color;
    document.getElementById("cell-img-" + id).setAttribute("codeColor", color);
    show_hidePallette(false);
    cancelHide = false;
}


function submitAttempt() {
    if (currentRow < 10) {
        var verification = verifyCells();
        if (verification) {
            for (var i = (currentRow * 6) + 5; i > (currentRow * 6) + 1; i--) {
                document.getElementById("cell-img-" + i).setAttribute("class", "cell-img-played");
                document.getElementById("cell-img-" + i).setAttribute("played", "false");
            }
            var gameStatus = giveHints()
            if (gameStatus === 1) {
                startConfetti();
                var l = 0;
                for (var k = 65; k > 61; k--) {
                    document.getElementById("cell-img-" + k).style.backgroundColor = code[l];
                    l++;
                }
                setTimeout(stopConfetti, 5000);
            }
            else if (gameStatus === 0) {
                var l = 0;
                for (var k = 65; k > 61; k--) {
                    document.getElementById("cell-img-" + k).style.backgroundColor = code[l];
                    l++;
                }
                document.getElementById("no-attempts").hidden = false;
            }
            else {
                currentRow++;
                for (var j = (currentRow * 6) + 5; j > (currentRow * 6) + 1; j--) {
                    document.getElementById("cell-img-" + j).setAttribute("class", "cell-img-enabled");
                }
            }
        }
        else {
            console.log("Please fill all cells with a color")
        }
    }
}

function verifyCells() {
    var foundWrong = false;
    for (var i = (currentRow * 6) + 5; i > (currentRow * 6) + 1; i--) {
        if (document.getElementById("cell-img-" + i).getAttribute("played") == "false") {
            foundWrong = true;
        }
    }
    return !foundWrong;
}

function giveHints() {
    for (let k = 1; k < 5; k++) {
        document.getElementById("cell-img-" + (currentRow + 1) + "-result-" + k).style.opacity = "100%";
    }

    var reds = 0;
    var whites = 0;
    var codeChecks = [false, false, false, false];
    var cellChecks = [false, false, false, false];

    // For matching colors and positions
    var n = (currentRow * 6) + 5;
    for (var i = 0; i < 4; i++) {
        if (n > (currentRow * 6) + 1) {
            var codeColor = code[i];
            var cellColor = document.getElementById("cell-img-" + n).getAttribute("codeColor");
            if (codeColor === cellColor) {
                cellChecks[i] = true;
                codeChecks[i] = true;
                reds++
            }
            n--;
        }
    }

    // For matching colors but different positions

    for (var j = 0; j < 4; j++) {
        if (codeChecks[j]) continue;

        var codeColor = code[j];
        var n = (currentRow * 6) + 5;

        for (var k = 0; k < 4; k++) {
            if (cellChecks[k] || codeChecks[j]) {
                n--;
                continue;
            };

            if (n > (currentRow * 6) + 1) {
                var cellColor = document.getElementById("cell-img-" + n).getAttribute("codeColor");

                if (cellColor === codeColor) {
                    codeChecks[j] = true;
                    cellChecks[k] = true;
                    whites++;
                }

                n--;
            }
        }
    }

    var gameOver = 2;
    if (reds === 4) gameOver = 1;
    if (currentRow >= 9) gameOver = 0;

    for (l = 1; l < 5; l++) {
        var resultCell = document.getElementById("cell-img-" + (currentRow + 1) + "-result-" + l);
        resultCell.style.opacity = "100%";
        if (reds !== 0) {
            resultCell.style.backgroundColor = "red";
            reds--;
        }
        else if (whites !== 0) {
            resultCell.style.backgroundColor = "white";
            whites--;
        }

    }
    return gameOver;
}

function setMouseCoords(event) {
    var eventDoc, doc, body;

    event = event || window.event;

    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }
    mouseX = event.pageX - 120;
    mouseY = event.pageY - 120;
}

var cancelHide = false;

function show_hidePallette(visibility) {
    var palletteStyle = document.getElementById("color-selector-div").style
    palletteStyle.opacity = visibility ? "100%" : 0;


    if (visibility) {
        for (var i in colors) {
            document.getElementById("color-select-" + colors[i]).hidden = false;
        }
        cancelHide = true;
    }
    else {
        for (var j = (currentRow * 6) + 5; j > (currentRow * 6) + 1; j--) {
            document.getElementById("cell-img-" + j).style.border = "2px solid black";
        }
        setTimeout(function () {
            if (!cancelHide) {
                for (var i in colors) {
                    document.getElementById("color-select-" + colors[i]).hidden = true;
                }
                cancelHide = false;
            }
        }, 300);
    }
}

document.onmousedown = function () {
    console.log("MOUSE DOWN")
    show_hidePallette(false);
    cancelHide = false;
}

window.onload = function () {
    document.getElementById("container").style.opacity = "100%";
    document.getElementById("container").style.zoom = document.getElementById("container").style.zoom * window.innerWidth / 1383;
}

window.onbeforeunload = function () {
    document.getElementById("container").style.opacity = 0;
}

function restart() {
    document.getElementById("container").style.opacity = 0;
    setTimeout(function () { location.reload(); }, 500);
}

function howToPlay() {
    document.getElementById("container").hidden = true;
    document.getElementById("how-to-play").hidden = false;
}

function closeHowToPlay() {
    document.getElementById("container").hidden = false;
    document.getElementById("how-to-play").hidden = true;
}

window.onresize = resizeElements;

function resizeElements() {
    if (document.body.getElementsByTagName("canvas")[0]) {
        document.body.getElementsByTagName("canvas")[0].style.width = window.innerWidth + 1000;
        document.body.getElementsByTagName("canvas")[0].style.height = window.innerHeight;
    }

    document.getElementById("container").style.zoom = document.getElementById("container").style.zoom * window.innerWidth / 1383;
}
