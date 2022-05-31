/**
 * Función que comprueba los valores ingresados por el usuario.
 * @method Comprobar.
 * @return Ante cualquier error, retorna un mensaje de alerta para el usuario y deja los campos en blanco.
 */
function Comprobar() {
    let a, b, c, x1, x2;
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
        a = "";
        b = "";
        c = "";
        x1 = "";
        x2 = "";
        document.getElementById("cuadratica").value = a;
        document.getElementById("lineal").value = b;
        document.getElementById("constante").value = c;
        document.getElementById("raiz1").innerHTML = x1;
        document.getElementById("raiz2").innerHTML = x2;
    } else {
        if (a == "" || b == "" || c == "") {
            alert("No puede quedar en blanco ningún campo a ingresar.");
            a = "";
            b = "";
            c = "";
            x1 = "";
            x2 = "";
            document.getElementById("cuadratica").value = a;
            document.getElementById("lineal").value = b;
            document.getElementById("constante").value = c;
            document.getElementById("raiz1").innerHTML = x1;
            document.getElementById("raiz2").innerHTML = x2;
        } else {
            if (a == "0" && b == "0" && c == "0") {
                alert("Los 3 valores ingresados no pueden ser 0.");
                a = "";
                b = "";
                c = "";
                x1 = "";
                x2 = "";
                document.getElementById("cuadratica").value = a;
                document.getElementById("lineal").value = b;
                document.getElementById("constante").value = c;
                document.getElementById("raiz1").innerHTML = x1;
                document.getElementById("raiz2").innerHTML = x2;
            } else{
                Raices();
            }
        }
    }
}

/**
 * Función que calcula las raíces del polinomio de segundo grado o de primer grado si se da el caso.
 * @method Raices.
 * @return Retorna 2 raíces en caso de que sea un polinomio de segundo grado, una raíz en caso de que sea uno de primer grado o la palabra "no hay raíces" en caso de que así sea.
 */
function Raices() {
    let a, b, c, x1, x2;
    a = document.getElementById("cuadratica").value;
    b = document.getElementById("lineal").value;
    c = document.getElementById("constante").value;

    if (a == 0 && b == 0 && c != 0) {
        x1 = "No hay raíces.";
        x2 = "No hay raíces.";
    } else {
        if (a == 0 && b != 0 && (c == 0 || c != 0)) {
            x1 = Math.round(c / b * 100) / 100;
            x2 = "";
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