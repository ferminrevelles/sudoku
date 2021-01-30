console.log("SUDOKU");

// Creación del aaray multidimensional para crear y rellenar sudoku

var contador=1000;
for (var i=0;i<16;i++){
    // Crear matriz

     if (contador==1000){
        var tablero = new Array(4);
        tablero[0] = new Array(4);
        tablero[1] = new Array(4);
        tablero[2] = new Array(4);
        tablero[3] = new Array(4);
        contador=0;
        i=0;
     }
    //Colocación de valor de forma aleatoria.
    var x = Math.floor(Math.random() * 4);  //valor aleatorio entre 1 y 4 para la fila
    var y = Math.floor(Math.random() * 4);  //valor aleatorio entre 1 y 4 para la columna
    if (tablero[x][y]==null){
        //console.log(x+"-"+y);
        var valor = Math.floor((Math.random() * 4) + 1);  //valor aleatorio entre 1 y 4
        var encontroFilaColumna = comprobarFilasColumnas(x,y,valor);
        var encontroZona = comprobarZona(0,0,valor);
        var encontroZona = comprobarZona(0,2,valor);
        var encontroZona = comprobarZona(2,0,valor);
        var encontroZona = comprobarZona(2,2,valor);
        //tablero[x][y]=valor;
        
        if (encontroFilaColumna!=undefined ||encontroZona!=undefined) {
            i--;
        }else {
            tablero[x][y]=valor;
        }
        //comprobarZona(x,y);
    }else{
        //console.log("lleno");
        i--;
        contador++;
    }
}
console.log(tablero);

function comprobarFilasColumnas(x,y,valor){
    var found = undefined;
    //Comprobar fila
    found = tablero[x].find(element=> element==valor);
    //Comprobar columna
   for (var i=0;i<4;i++){
        if (tablero[i][y]==valor) found=valor;
    }
    return found;
}

function comprobarZona(h,k,valor){
    //Comprobar zona 1

   if ((tablero[h][k]==valor) || (tablero[h+1][k]==valor) || (tablero[h][k+1]==valor) || (tablero[h+1][k+1]==valor)){
       return "encontrado";
   }else{
       return undefined;
   }
}
//Crear eventos para poder intervenir en la web
document.getElementById("A0").addEventListener('blur',inputNumber);
document.getElementById("A1").addEventListener('blur',inputNumber);
document.getElementById("A2").addEventListener('blur',inputNumber);
document.getElementById("A3").addEventListener('blur',inputNumber);
document.getElementById("B0").addEventListener('blur',inputNumber);
document.getElementById("B1").addEventListener('blur',inputNumber);
document.getElementById("B2").addEventListener('blur',inputNumber);
document.getElementById("B3").addEventListener('blur',inputNumber);
document.getElementById("C0").addEventListener('blur',inputNumber);
document.getElementById("C1").addEventListener('blur',inputNumber);
document.getElementById("C2").addEventListener('blur',inputNumber);
document.getElementById("C3").addEventListener('blur',inputNumber);
document.getElementById("D0").addEventListener('blur',inputNumber);
document.getElementById("D1").addEventListener('blur',inputNumber);
document.getElementById("D2").addEventListener('blur',inputNumber);
document.getElementById("D3").addEventListener('blur',inputNumber);

// Mostrar datos en interfaz del SUDOKU creado.

var datos=7;  // número de datos que aparezcan resueltos
var inputRestantes = 16-datos;
var pista =0;
var showNumber = new Array;
while (pista<datos) {
    var x = Math.floor(Math.random() * 4);  //valor aleatorio entre 1 y 4 para la fila
    var y = Math.floor(Math.random() * 4);  //valor aleatorio entre 1 y 4 para la columna
    
    var num = tablero[x][y];
    if (x==0) x="A";
    if (x==1) x="B";
    if (x==2) x="C";
    if (x==3) x="D";
    
    var positionDOM = x+""+y;
    //console.log(positionDOM);
    if (showNumber.find(element=> element==positionDOM)){
        //console.log("existe");
        pista-2;
    }else{
    showNumber.push(positionDOM);
    document.getElementById(positionDOM).value = num;
    //document.getElementById(positionDOM).removeEventListener('blur',inputNumber);
    document.getElementById(positionDOM).setAttribute('readonly','');
    document.getElementById(positionDOM).style = 'background-color:lightblue';
    pista++;
    }
}
console.log(showNumber);

// CODIGO PARA COMENZAR EL CONTADOR DEL SUDOKU
document.getElementById("comprobar").addEventListener('click',comprobar);
document.getElementById("zonaContador").innerHTML = "Tiempo:"+"0sg";
var proceso;
var n=1;
primerDato = false;

function inputNumber(zone){
    if (primerDato==false){
        proceso = setInterval(function(){
            document.getElementById("zonaContador").innerHTML = 'Tiempo:'+n+'sg';
            n++;
        },1000);
        primerDato=true;
    }
    //console.log(zone.path[0].id);
   var validLetter = /[^0-9]+$/;
    var datoComprobar = document.getElementById(zone.path[0].id).value
    if (datoComprobar.match(validLetter)) {
        console.log("valor no válido");
        document.getElementById(zone.path[0].id).value="";
    }
}

function comprobar(){
    console.log("Comprueba SUDOKU");
    var sudokuOk0 = false;
    var sudokuOk1 = false;
    var sudokuOk2 = false;
    var sudokuOk3 = false;
    var arrayA = new Array();
    var arrayB = new Array();
    var arrayC = new Array();
    var arrayD = new Array();
    for (var t=0;t<4;t++){
    arrayA.push(parseInt(document.getElementById("A"+t).value));
    var a =JSON.stringify(arrayA);
    var b =JSON.stringify(tablero[0]);
    if (a===b)  sudokuOk0=true;
    else sudokuOk0=false;
    }
    console.log(sudokuOk0);
    for (t=0;t<4;t++){
        arrayB.push(parseInt(document.getElementById("B"+t).value));
        var a =JSON.stringify(arrayB);
        var b =JSON.stringify(tablero[1]);
        if (a===b)  sudokuOk1=true;
        else sudokuOk1=false;
    }
    console.log(sudokuOk1);
    for (var t=0;t<4;t++){
        arrayC.push(parseInt(document.getElementById("C"+t).value));
        var a =JSON.stringify(arrayC);
        var b =JSON.stringify(tablero[2]);
        if (a===b)  sudokuOk2=true;
        else sudokuOk2=false;
    }
    console.log(sudokuOk2);
    for (var t=0;t<4;t++){
        arrayD.push(parseInt(document.getElementById("D"+t).value));
        var a =JSON.stringify(arrayD);
        var b =JSON.stringify(tablero[3]);
        if (a===b)  sudokuOk3=true;
        else sudokuOk3=false;
    }
    console.log(sudokuOk3);
    if (sudokuOk0==true && sudokuOk1==true && sudokuOk2==true && sudokuOk3==true){
        document.getElementById("winner").innerHTML = "Has resuelto el sudoku";
        document.getElementById("view_winner").style = "display:block;";
        clearInterval(proceso);
    }else{
        document.getElementById("winner").innerHTML = "El sudoku no es correcto";
        document.getElementById("view_winner").style = "display:block;";
    }
}
