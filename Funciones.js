/**
 * Función que comprueba los valores ingresados por el usuario.
 * @method Comprobar.
 * @return Ante cualquier error, retorna un mensaje de alerta para el usuario, deja los campos en blanco y limpia el canvas. Si no hay error, ejecuta la función de cálculo de raíces y gráfica de funciones.
 */
function Comprobar() {
    let a, b, c;
    let flag = true;
    let canvas = document.getElementById("graficadora");
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
        canvas.width = canvas.width;
        Dibujarcuadriculado();
    } else {
        if (a == "" || b == "" || c == "") {
            alert("No puede quedar en blanco ningún campo a ingresar.");
            flag = false;
            canvas.width = canvas.width;
            Dibujarcuadriculado();
        } else {
            if (a >= 10 || b >= 10 || c >= 10 || a <= -10 || b <= -10 || c <= -10) {
                alert("Ingrese un valor mayor a -10 o menor a 10 para cada campo.");
                flag = false;
                canvas.width = canvas.width;
                Dibujarcuadriculado();
            } else {
                Raices();
                canvas.width = canvas.width;
                Dibujarcuadriculado();
                Dibujarfuncion();
            }
        }
    }

    if (flag == false) {
        Blanquearcampo();
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
    a = document.getElementById("cuadratica").value;
    b = document.getElementById("lineal").value;
    c = document.getElementById("constante").value;

    if (a == 0 && b == 0 && c == 0) {
        x1 = "Todos los reales.";
        x2 = " - ";
    } else {
        if (a == 0 && b == 0 && c != 0) {
            x1 = " - ";
            x2 = " - ";
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
    }

    document.getElementById("cuadratica").value = a;
    document.getElementById("lineal").value = b;
    document.getElementById("constante").value = c;
    document.getElementById("raiz1").innerHTML = x1;
    document.getElementById("raiz2").innerHTML = x2;
}

/**
 * Función que grafica el cuadriculado de la calculadora.
 * @method Dibujarcuadriculado.
 * @return dibuja el cuadriculado sobre el canvas respetando una separación de 20 píxeles, junto con el nombre de los ejes y los valores de los mismos.
 */
function Dibujarcuadriculado() {
    let canvas = document.getElementById("graficadora");
    let ctx = canvas.getContext("2d");
    let cont = -14;

    let Anchomax = canvas.width;
    let Alturamax = canvas.height;

    //Lineas horizontales.
    for (let i = 20; i < Alturamax;) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(Anchomax, i);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();
        i = i + 20;
    }

    //Lineas verticales.
    for (let i = 20; i < Anchomax;) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, Alturamax);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();
        i = i + 20;
    }

    //Eje X.
    ctx.beginPath();
    ctx.moveTo(0, Alturamax / 2);
    ctx.lineTo(Anchomax, Alturamax / 2);
    ctx.strokeStyle = "#0c3306";
    ctx.stroke();
    ctx.closePath();

    //Numeros Eje X.
    for (let i = 20; i < Anchomax;) {
        ctx.beginPath();
        if (cont != 0) {
            ctx.font = "8pt Arial";
            ctx.fillStyle = "black";
            ctx.fillText(String(cont), i - 3, Alturamax / 2 + 15);
            ctx.closePath();
        }
        i = i + 20;
        cont = cont + 1;
    }
    cont = 9;

    //Eje Y.
    ctx.beginPath();
    ctx.moveTo(Anchomax / 2, 0);
    ctx.lineTo(Anchomax / 2, Alturamax);
    ctx.strokeStyle = "#0c3306";
    ctx.stroke();
    ctx.closePath();

    //Numeros Eje Y.
    for (let i = 20; i < Alturamax;) {
        if (cont != 0) {
            ctx.beginPath();
            ctx.font = "8pt Arial";
            ctx.fillStyle = "black";
            ctx.fillText(String(cont), Anchomax / 2 - 15, i + 3);
            ctx.closePath();
        }
        i = i + 20;
        cont = cont - 1;
    }

    //Palabra "Eje X."
    ctx.beginPath();
    ctx.font = "9pt Verdana";
    ctx.fillStyle = "blue";
    ctx.fillText("Eje X.", Anchomax - 39, Alturamax / 2 - 7);
    ctx.closePath();

    //Palabra "Eje Y."
    ctx.beginPath();
    ctx.font = "9pt Verdana";
    ctx.fillStyle = "blue";
    ctx.fillText("Eje Y.", Anchomax / 2 + 1, 15);
    ctx.closePath();

}

/**
 * Función que grafica exclusivamente las funciones.
 * @method Dibujarfuncion.
 * @return grafica la función dependiendo de los datos que se ingresan. Si se le pasa solo el valor de c, grafica el valor de y constante, pero si le pasamos valores b y c nos grafica una función lineal. Por último, si pasamos valores a, b y c nos grafica una parábola.
 */
function Dibujarfuncion() {
    let a, b, c, y1, y2;
    let i = -15;
    let canvas = document.getElementById("graficadora");
    let ctx = canvas.getContext("2d");
    a = Number(document.getElementById("cuadratica").value);
    b = Number(document.getElementById("lineal").value);
    c = Number(document.getElementById("constante").value);

    let Anchomax = canvas.width;
    let Alturamax = canvas.height;

    if (a == 0 && b == 0 && c != 0) {
        setInterval(function () {
            if (i <= 14.9) {
                y1 = Math.round((c) * 100) / 100;
                ctx.beginPath();
                ctx.moveTo(Anchomax / 2 + (20 * i), (Alturamax / 2) - (20 * y1));
                ctx.lineTo(Anchomax / 2 + (20 * (i + 0.1)), (Alturamax / 2) - (20 * y1));
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = "#ff0000";
                ctx.stroke();
                ctx.closePath();
                i = Math.round((i + 0.1) * 100) / 100;
            } else {
                clearInterval();
            }
        }, 5)
    } else {
        if (a == 0 && b != 0 && (c != 0 || c == 0)) {
            setInterval(function () {
                if (i <= 14.9) {
                    y1 = Math.round((b * (i) + c) * 100) / 100;
                    y2 = Math.round((b * (i + 0.1) + c) * 100) / 100;
                    ctx.beginPath();
                    ctx.moveTo(Anchomax / 2 + (20 * i), Alturamax / 2 - (20 * y1))
                    ctx.lineTo(Anchomax / 2 + (20 * (i + 0.1)), Alturamax / 2 - (20 * y2));
                    ctx.lineWidth = 1.5;
                    ctx.strokeStyle = "#ff0000";
                    ctx.stroke();
                    ctx.closePath();
                    i = Math.round((i + 0.1) * 100) / 100;
                } else {
                    clearInterval();
                }
            }, 5)
        } else {
            if (a != 0 && (b == 0 || b != 0) || (c == 0 || c != 0)) {
                setInterval(function () {
                    if (i <= 14.9) {
                        y1 = Math.round((a * Math.pow(i, 2) + b * (i) + c) * 100) / 100;
                        y2 = Math.round((a * Math.pow(i + 0.1, 2) + b * (i + 0.1) + c) * 100) / 100;
                        ctx.beginPath();
                        ctx.moveTo(Anchomax / 2 + (20 * i), Alturamax / 2 - (20 * y1))
                        ctx.lineTo(Anchomax / 2 + (20 * (i + 0.1)), Alturamax / 2 - (20 * y2));
                        ctx.lineWidth = 1.5;
                        ctx.strokeStyle = "#ff0000";
                        ctx.stroke();
                        ctx.closePath();
                        i = Math.round((i + 0.1) * 100) / 100;
                    } else {
                        clearInterval();
                    }
                }, 5)
            }
        }
    }
}

/**
 * Función que blanquea los campos incorrectos.
 * @method Blanquearcampo.
 * @return al introducirse un valor para a, b o c, si alguno de ellos es incorrecto, lo blanquea, y en caso contrario, lo deja como estaba.
 */
function Blanquearcampo() {
    let a, b, c;
    a = document.getElementById("cuadratica").value;
    b = document.getElementById("lineal").value;
    c = document.getElementById("constante").value;

    if (isNaN(a) || a == "" || a >= 10 || a <= -10) {
        document.getElementById("cuadratica").value = "";
    }
    if (isNaN(b) || b == "" || b >= 10 || b <= -10) {
        document.getElementById("lineal").value = "";
    }
    if (isNaN(c) || c == "" || c >= 10 || c <= -10) {
        document.getElementById("constante").value = "";
    }

    document.getElementById("raiz1").value = "";
    document.getElementById("raiz2").value = "";
}