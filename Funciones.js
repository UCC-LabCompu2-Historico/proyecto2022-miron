/**
 * Función que comprueba los valores ingresados por el usuario.
 * @method Comprobar.
 * @return Ante cualquier error, retorna un mensaje de alerta para el usuario y deja los campos en blanco. Si no hay error, ejecuta la función de cálculo de raíces.
 */
function Comprobar() {
    let a, b, c, x1, x2;
    let flag = true;
    a = document.getElementById("cuadratica").value;
    b = document.getElementById("lineal").value;
    c = document.getElementById("constante").value;

    if (a.includes(",")) {
        a = a.replace(",", ".");
    } else {
        if (b.includes(",")) {
            b = b.replace(",", ".");
        } else {
            if (c.includes(",")) {
                c = c.replace(",", ".");
            }
        }
    }

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert("Al menos uno de los términos ingresados no corresponde a un valor numérico.");
        flag = false;
    } else {
        if (a == "" || b == "" || c == "") {
            alert("No puede quedar en blanco ningún campo a ingresar.");
            flag = false;
        } else {
            if (a == "0" && b == "0" && c == "0") {
                alert("Los 3 valores ingresados no pueden ser 0.");
                flag = false;
            } else{
                Raices();
                dibujarfuncion(x1, x2);
            }
        }
    }

    if (flag == false){
        document.getElementById("cuadratica").value = "";
        document.getElementById("lineal").value = "";
        document.getElementById("constante").value = "";
        document.getElementById("raiz1").innerHTML = "";
        document.getElementById("raiz2").innerHTML = "";
    }
}

/**
 * Función que calcula las raíces del polinomio de segundo grado o de primer grado si se da el caso.
 * @method Raices.
 * @return Retorna 2 raíces en caso de que sea un polinomio de segundo grado, una raíz en caso de que sea uno de primer grado o la palabra "no hay raíces" en caso de que así sea.
 */
function Raices() {
    let a, b, c;
    var x1, x2;
    let cont = 0;
    a = document.getElementById("cuadratica").value;
    b = document.getElementById("lineal").value;
    c = document.getElementById("constante").value;

    if (a == 0 && b == 0 && c != 0) {
       if (c==0){
           x1 = "Todos los reales.";
           x2 = " - ";
       }else{
           x1 = " - ";
           x2 = " - ";
       }
    } else {
        if (a == 0 && b != 0 && (c == 0 || c != 0)) {
            x1 = Math.round(-c / b * 100) / 100;
            x2 = " - ";
        } else {
            let det;
            det = b * b - 4 * a * c;
            if (det < 0) {
                x1 = "Raíces complejas.";
                x2 = "Raíces complejas.";
            } else {
                x1 = Math.round((-b + Math.sqrt(det)) / (2 * a) * 100) / 100;
                x2 = Math.round((-b - Math.sqrt(det)) / (2 * a) * 100) / 100;
            }
        }
    }
    document.getElementById("cuadratica").value = a;
    document.getElementById("lineal").value = b;
    document.getElementById("constante").value = c;
    document.getElementById("raiz1").innerHTML = x1;
    document.getElementById("raiz2").innerHTML = x2;
}

function dibujarcuadriculado(){
    let canvas = document.getElementById("graficadora");
    let ctx = canvas.getContext("2d");
    let cont = -14;

    let Anchomax = canvas.width;
    let Alturamax = canvas.height;

    canvas.width = canvas.width;

    //Lineas horizontales.

    for (let i=20; i<Alturamax;){
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(Anchomax, i);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();
        i=i+20;
    }

    //Lineas verticales.

    for (let i=20; i<Anchomax;){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, Alturamax);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();
        i=i+20;
    }

    //Eje X.
    ctx.beginPath();
    ctx.moveTo(0, Alturamax/2);
    ctx.lineTo(Anchomax, Alturamax/2);
    ctx.strokeStyle = "#0c3306";
    ctx.stroke();
    ctx.closePath();

    //Numeros Eje X.
    for (let i=20;i<Anchomax;){
        ctx.beginPath();
        if (cont !=0){
            ctx.font = "8pt Arial";
            ctx.fillStyle = "black";
            ctx.fillText(String(cont), i-3, Alturamax/2+15);
            ctx.closePath();
        }
        i=i+20;
        cont=cont+1;
    }
    cont = 9;

    //Eje Y.
    ctx.beginPath();
    ctx.moveTo(Anchomax/2, 0);
    ctx.lineTo(Anchomax/2, Alturamax);
    ctx.strokeStyle = "#0c3306";
    ctx.stroke();
    ctx.closePath();

    //Numeros Eje Y.
    for (let i=20;i<Alturamax;){
        if (cont!=0){
            ctx.beginPath();
            ctx.font = "8pt Arial";
            ctx.fillStyle = "black";
            ctx.fillText(String(cont), Anchomax/2-15, i+3);
            ctx.closePath();
        }
        i=i+20;
        cont=cont-1;
    }

    //Palabra "Eje X."
    ctx.beginPath();
    ctx.font="9pt Verdana";
    ctx.fillStyle="blue";
    ctx.fillText("Eje X.", Anchomax-39, Alturamax/2-7);
    ctx.closePath();

    //Palabra "Eje Y."
    ctx.beginPath();
    ctx.font="9pt Verdana";
    ctx.fillStyle="blue";
    ctx.fillText("Eje Y.", Anchomax/2+1, 15);
    ctx.closePath();

}

function dibujarfuncion(x1, x2){
    let a, b, c, x;
    let canvas = document.getElementById("graficadora");
    let ctx = canvas.getContext("2d");
    a = document.getElementById("cuadratica").value;
    b = document.getElementById("lineal").value;
    c = document.getElementById("constante").value;
    let det = b * b - 4 * a * c;

    let Anchomax = canvas.width;
    let Alturamax = canvas.height;

    if (a == 0 && b == 0 && c != 0) {
        ctx.beginPath();
        ctx.moveTo(0, (Alturamax / 2) - 20 * c);
        ctx.lineTo(Anchomax, (Alturamax / 2) - 20 * c);
        ctx.strokeStyle = "#ff0000";
        ctx.stroke();
        ctx.closePath();
    } else {
        if (a == 0 && b != 0 && (c != 0 || c == 0)) {
            ctx.beginPath();
            ctx.moveTo(((-10-c)/b)*20+Anchomax/2, Alturamax);
            ctx.lineTo(((10-c)/b)*20+Anchomax/2, 0);
            ctx.strokeStyle = "#ff0000";
            ctx.stroke();
            ctx.closePath();
        } else{
            if (a != 0 && (b == 0 || b != 0) || (c == 0 || c != 0)){
                ctx.beginPath();
                for (let x = -15 ; x <= 15 ;)
                {
                    let y = a*(x^2)+b*x+c;
                    ctx.beginPath();
                    ctx.lineTo(Anchomax/2+(20*x), Alturamax/2-(20*y));
                    ctx.strokeStyle = "#ff0000";
                    ctx.stroke();
                    x = x+0.1;
                }
                ctx.closePath();
            }
        }
    }
}

/*
x = -10
y =

 */