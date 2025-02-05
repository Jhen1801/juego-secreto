//FUNCIONES, PARAMETROS Y LISTAS
let numeroSecreto = 0; //se deja asi para incializar la variable, porque la funcion condicionesIniciales le va a dar su valor correcto
let intentos = 0; //se deja asi para incializar la variable, porque la funcion condicionesIniciales le va a dar su valor correcto
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); // en esta linea, la funcion esta trayendo el valor que el usuario puso en la cajita de texto definida en el archivo HTML 
    console.log(numeroSecreto); //para mostrar el numero secreto en la consola con f12
    //console.log(intentos);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el numero en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled'); //este codigo activa el boton de nuevo juego cuando el usuario gana, ese boton esta por defecto deshabilitado en el HTML
    } else {
        //el usuario no acertó 
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El numero secreto es menor')
        } else {
            asignarTextoElemento('p','El numero secreto es mayor')
        }
        intentos++; // es lo mismo que poner intentos = intentos + 1
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = ''; //estamos definiendoo que el valor de la caja se limpie para llamar esta funcion cuando no acertemos
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //le preguntamos a la funcion si ya sorteamos todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','ya se sortearon todos los numeros posibles');
    } else {

        // si el numero generado esta incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del numero secreto');
    asignarTextoElemento('p',`Indica un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //limpiar la caja
    limpiarCaja();
    //indicar mensajes y condiciones iniciales
    condicionesIniciales();
    //deshabilitar el boton de nuevo juego 
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();

