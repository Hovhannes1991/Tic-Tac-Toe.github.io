
var ok_btn = document.getElementById("ok");
ok_btn.addEventListener("click",chekConfig);

document.getElementsByClassName("contineu")[0].addEventListener("click", contineu);
document.getElementsByClassName("restart")[0].addEventListener("click", restart);

function contineu(){
	document.getElementsByClassName("gameOver")[0].style.display = 'none';
	start();
};

function restart(){
	document.getElementsByClassName("gameOver")[0].style.display = 'none';
	score_1 = 0;
	score_2 = 0;
	document.getElementById("player1").value = "";
	document.getElementById("player2").value = "";
	document.getElementsByTagName("table")[0].innerHTML = "";
	document.getElementsByClassName("config")[0].style.display = 'flex';
};


var score_1 = 0;
var score_2 = 0;

function chekConfig(){
    var pl1 = document.getElementById("player1");
    var pl2 = document.getElementById("player2");
    var r = document.getElementById("row");
    var c = document.getElementById("col");

    var status = true;    

    if (pl1.value == "" || pl1.value == "null" || pl1.value == "undefined"){
        pl1.style.border = "2px solid red";
        status = false;
    }
    else {
        pl1.style.border = "2px solid green";        
    };
    if (pl2.value == "" || pl2.value == "null" || pl2.value == "undefined"){
        pl2.style.border = "2px solid red";
        status = false;
    }
    else {
        pl2.style.border = "2px solid green";
    };
    if (r.value <= 5){
        r.style.border = "2px solid red";
        status = false;
    }
    else {
        r.style.border = "2px solid green";
    };
    if (c.value <= 5){
        c.style.border = "2px solid red";
        status = false;
    }
    else {
        c.style.border = "2px solid green";
    };
    

    if (status == true){
        start();
        document.getElementsByClassName("config")[0].style.display = "none";
    };
};


function start(){

var row = document.getElementById("row").value;
var col = document.getElementById("col").value;

var player1 = document.getElementById("player1").value;
var player2 = document.getElementById("player2").value;

if (player2 == player1){
    player2 += "(2)";
};




var td = "";
var tr = "";
for (let y = 0; y < col; y++) {
    td = "";
    for (let x = 0; x < row; x++) {
        td += `<td class="row-${x}"></td>`;
    }
    tr += `<tr class="col-${y}">${td}</tr>`;
};

document.getElementsByTagName("table")[0].innerHTML = tr;


var simbhol = "X";

var tdArray = document.getElementsByTagName("td");
for (let k = 0; k < tdArray.length; k++) {
    tdArray[k].addEventListener("click", addSimbhol);
    tdArray[k].addEventListener("click", check);
}

var matrix = new Array(); //matrix for dioganal check
var item = 0;
for (let k = 0; k < col; k++) {
    matrix[k] = new Array();
};
for (let y = 0; y < col; y++) {
    for (let x = 0; x < row; x++) {
        matrix[y][x] = tdArray[item];
        item++;
    };
};


function addSimbhol() {
    if (event.target.innerHTML != ""){
      return false;
    }
  
    if (simbhol == "X") {
        event.target.innerHTML = "X";
        event.target.style.backgroundColor = 'green';
        simbhol = "0";
    } else {
        event.target.innerHTML = "0";
        event.target.style.backgroundColor = 'lightbLUE';
        simbhol = "X";
    };
};

var winner = false;

function check() {
    // if (event.target.innerHTML != ""){
    //   return false;
    // }
  
    //vertical
    if (!winner) {

        var accept = 0;
        var yItems = document.getElementsByClassName(event.target.className); //select items in same column

        var start = (parseInt(event.target.parentNode.className.substring(4))) - 5; //try to check items only from -5 to +5  from last added
        if (start < 0) {
            var start = 0;
        };
        var end = (parseInt(event.target.parentNode.className.substring(4))) + 5;
        if (end > yItems.length) {
            var end = yItems.length - 1;
        };
        
        for (let k = start; k < end; k++) { //checking column 
            if (yItems[k].innerHTML == event.target.innerHTML) {
                accept++;
                if (accept == 5) {
                    gameOver();
                };
            } else {
                accept = 0;
            }
        };
    };

    //horizontal

    if (!winner) {

        accept = 0;
        var xItems = event.target.parentNode.children;

        var start = (parseInt(event.target.className.substring(4))) - 5;
        if (start < 0) {
            start = 0;
        };
        var end = (parseInt(event.target.className.substring(4))) + 5;
        if (end > xItems.length) {
            var end = xItems.length - 1;
        };

        for (let k = start; k < end; k++) { //checking column 
            if (xItems[k].innerHTML == event.target.innerHTML) {
                accept++;
                if (accept == 5) {
                    gameOver();
                };
            } else {
                accept = 0;
            }
        };
    };


    //diagonal  from left top  to right bottom
    if (!winner) {

        var accept = 0;

        var x = parseInt(event.target.className.substring(4)); //get horizontal and vertical ,,cordinats,,
        var y = parseInt(event.target.parentNode.className.substring(4));

        var x2 = x; //remember x and y values)))))
        var y2 = y;

        for (let k = 0; k < 5; k++) { // ,,go to,, start item
            if (x != 0 && y != 0) {
                x--;
                y--;
            };
        };


        for (let k = 0; k < 11; k++) {
            if (x > row - 1 || y > col - 1) {
                break;
            };
            
            if (matrix[y][x].innerHTML == event.target.innerHTML) {
                accept++;
                if (accept == 5) {
                    gameOver();
                };
            } else {
                accept = 0;
            };
            x++;
            y++;

        };
    };


    //diagonal  from right top  to left bottom

    if (!winner) {

        var accept = 0;
        var x = x2;
        var y = y2;

        
        for (let k = 0; k < 5; k++) { // ,,go to,, start item    					
            if (x != row - 1 && y != 0) {
                x++;
                y--;
            };
        };
        


        for (let k = 0; k < 11; k++) {
            if (x < 0 || y > col - 1) {                
                break;
            };
            
            if (matrix[y][x].innerHTML == event.target.innerHTML) {
                accept++;
                if (accept == 5) {
                    gameOver();
                };
            } else {
                accept = 0;
            };
            x--;
            y++;

        };
    };
};

function gameOver() {
    for (let k = 0; k < tdArray.length; k++) {
        tdArray[k].removeEventListener("click", addSimbhol);
        tdArray[k].removeEventListener("click", check);
    };

    if (event.target.innerHTML == "X") {
        winner = player1;
        score_1++;
    } else {
        winner = player2;
        score_2++;
    };

    setTimeout(function() {
    	document.getElementsByClassName("lastWinner")[0].innerHTML = `winner is ${winner}`;    	
    	document.getElementsByClassName("text1")[0].innerHTML = player1 + " - " + score_1;
    	document.getElementsByClassName("text2")[0].innerHTML = player2 + " - " + score_2;
    	document.getElementsByClassName("gameOver")[0].style.display = "flex";
    	document.getElementsByClassName('gameOver')[0].classList.add("fade");        
    }, 500);
};



};