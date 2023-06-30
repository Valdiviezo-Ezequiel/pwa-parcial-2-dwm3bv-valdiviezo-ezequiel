window.addEventListener('DOMContentLoaded', function () { //carga del sw
    if (navigator.serviceWorker && navigator.serviceWorker.register){ //chequea si el navegador soporta sw
        navigator.serviceWorker.register('sw.js'); //registra el sw
    }else{
        console.log("no puedo usar service worker");
    }
})



function actualizarLocalStorage(json) {
    localStorage.setItem("storageProductos", JSON.stringify(json));}

function mostrarLocalStorage() { 
    return JSON.parse(localStorage.getItem("storageProductos")); 
}

let carritoDeCompra = new Carrito();

let arrayProductos = [];

let contenedorProducto = document.querySelector("#productos")

async function llamarProductos(){
try {
    await fetch('https://publishable-fumes.000webhostapp.com/productos.php')
    .then(res=>res.json())
    .then(json=>{
        actualizarLocalStorage(json)
        json.forEach((p)=>{
            contenedorProducto.append(crearTarjetaProducto(p));
        })
    })
} catch (error) {
    alerta('Alerta! No se pudo conectar a la API!');
    console.log(error)
    let mostrarProductos = mostrarLocalStorage()
    mostrarProductos.forEach((p)=>{
        contenedorProducto.append(crearTarjetaProducto(p));
    })
}
    
}


//Funcion que crea la tarjeta del producto
function crearTarjetaProducto (producto){

    arrayProductos.push(producto);
     //este es el div contenedor del card
     let divContenedorproducto = document.createElement("div");
     divContenedorproducto.className = "tarjetaContenedor";

      //esta imagen va dentro del div contenedor
      let imgCardProducto = document.createElement("img");
      imgCardProducto.className = "img"
      imgCardProducto.setAttribute("src", `${producto.imagen}`);
      imgCardProducto.setAttribute("alt", `remera`);
      
      //esta es el body del card
      let divCardBody = document.createElement("div");
     divCardBody.className = "bodyCard"

     //titulo del div card-body - nombre
     let tituloCardBody = document.createElement("h3");
     tituloCardBody.className = "tituloCardBody"
     tituloCardBody.innerText = `${producto.nombre}`

     //descripcion del producto
     let descriptCardBody = document.createElement("p");
     descriptCardBody.className = "descripcion";
     descriptCardBody.innerText = `${producto.descripcion}`;

     let precioCardBody = document.createElement("p")
     precioCardBody.className = "precio";
     precioCardBody.innerText = `Precio:  $${producto.precio}`

     //nombre de la categoria
    let nombreProducto = document.createElement("p");
    nombreProducto.className = "categoria";
    nombreProducto.innerText = `Categoria: ${producto.categoria}`

      //boton de comprar producto
      let botonCompraCardBody = document.createElement("button");
      botonCompraCardBody.className = "boton";
      botonCompraCardBody.innerText = "comprar";

      botonCompraCardBody.setAttribute("onclick",`agregarCarrito(${producto.id})`)


//boton de comprar producto
let botonModalCardBody = document.createElement("button");
botonModalCardBody.className = "boton";
botonModalCardBody.innerText = "Ver mas";

botonModalCardBody.setAttribute("onclick",`abrirModalProducto(${producto.id})`)


    //card body
      
      divCardBody.append(tituloCardBody);
      divCardBody.append(descriptCardBody);
      divCardBody.append(precioCardBody);
      divCardBody.append(nombreProducto);
      divCardBody.append(botonModalCardBody)
      divCardBody.append(botonCompraCardBody);

      //card
      divContenedorproducto.append(imgCardProducto);
      divContenedorproducto.append(divCardBody);

      //contenedor
      return divContenedorproducto;

}

//Funcion para agregar al carrito el producto 
function agregarCarrito(idProducto){
    carritoDeCompra.agregarProducto(buscarProducto(idProducto))
    mostrarCantidadDeProductos()
    mostrarCantidadDelPrecio()
}

function buscarProducto(idProducto){
 
    let miProducto;
    for (let i = 0; i < arrayProductos.length; i++) {
        if (arrayProductos[i].id == idProducto){
             miProducto = arrayProductos[i];
        }

    }
    return miProducto
}

function mostrarCantidadDeProductos(){
    document.querySelector("#cantidadProductos").innerText = `${carritoDeCompra.cantidadDeProductos()}`
    document.querySelector("#items").innerText = `${carritoDeCompra.cantidadDeProductos()}`
}

//Crear una funcion, llamar #cantidadTotalPrecio, Ponerle un innerText, Llama a carrito de compra, y carrito de compra mostrarPrecioTotalDeLaCompra.
function mostrarCantidadDelPrecio(){
    document.querySelector("#cantidadTotalPrecio").innerText = `${carritoDeCompra.mostrarPrecioTotalDeLaCompra()}` 
    document.querySelector("#total").innerText = `${carritoDeCompra.mostrarPrecioTotalDeLaCompra()}` 
}



document.querySelector("select").addEventListener("change", (e) => {
    /* Guardo el option elegido */

    let categoria = e.target.value;
    
    let filtrado = arrayProductos.filter((productos) => productos.categoria ==categoria);
    contenedorProducto.replaceChildren();

    if(categoria == "todas"){
        arrayProductos.forEach((p)=>{
            contenedorProducto.append(crearTarjetaProducto(p));
        });
    }

    filtrado.forEach((p)=>{
        contenedorProducto.append(crearTarjetaProducto(p));
    });

    mostrarOferta(categoria)
});


// Cerrar Modal productos
function cerrarProductos(){
    document.querySelector("#modalProducto").style.display = "none"
}



// Abrir Modal productos
function abrirModalProducto(idProducto){
    contenedorModalProductos.replaceChildren()
    document.querySelector("#modalProducto").style.display = "block"
    productosModal(buscarProducto(idProducto))
}

let contenedorModalProductos = document.querySelector("#modalDeProductos")

function productosModal(idProducto){
    contenedorModalProductos.append(crearModalProductos(idProducto));
}

function crearModalProductos(idProducto){

    let divContenedorProductos = document.createElement("div");
    divContenedorProductos.className = "modalDeProductos";

    //img
    let imgProducto = document.createElement("img");
    imgProducto.className = "imgModal"
    imgProducto.setAttribute("src", `${idProducto.imagen}`);
    imgProducto.setAttribute("alt", `${idProducto.imagen}`);

     //este nombre
     let nombreProducto = document.createElement("h3");
     nombreProducto.className = "nombre"
     nombreProducto.innerText = `${idProducto.nombre}`

     //este descripcion
     let descripcionProducto = document.createElement("p");
     descripcionProducto.className = "descripcion"
     descripcionProducto.innerText = `${idProducto.descripcion}`

     //este precio
     let precioProducto = document.createElement("p");
     precioProducto.className = "precio"
     precioProducto.innerText = `$${idProducto.precio}`

     //boton de comprar producto
     let botonCompra = document.createElement("button");
     botonCompra.className = "boton";
     botonCompra.innerText = "comprar";

     botonCompra.setAttribute("onclick",`agregarCarrito(${idProducto.id})`)



     //Contenedor Carrito
     divContenedorProductos.append(imgProducto);
     divContenedorProductos.append(nombreProducto);
     divContenedorProductos.append(descripcionProducto);
     divContenedorProductos.append(precioProducto);
     divContenedorProductos.append(botonCompra);



     //contenedor
     return divContenedorProductos;
}



// Cerrar Carrito
function cerrarCarrito(){
    document.querySelector("#modalCarrito").style.display = "none"
}


//Abrir Carrito
function abrirCarrito(){
    let listita = document.querySelector("#listita")
    listita.replaceChildren()
    carritoModal()
    document.querySelector("#modalCarrito").style.display = "block"
}


//Funcion Eliminar Lista Producto
function eliminarProducto(idProducto){
    carritoDeCompra.quitarProductoDelCarrito(idProducto)
    mostrarCantidadDeProductos()
    mostrarCantidadDelPrecio()

let listita = document.querySelector("#listita")
    listita.replaceChildren()
    carritoModal()
}

//Funcion para vaciar el carrito
function vaciar(){
    carritoDeCompra.vaciarCarrito()
    mostrarCantidadDeProductos()
    mostrarCantidadDelPrecio()
    let listita = document.querySelector("#listita")
    listita.replaceChildren();
}

let carrito = [];

let contenedorCarritos = document.querySelector("#listita")

function carritoModal(){
    carritoDeCompra.devolverProductos().forEach((p)=>{
        contenedorCarritos.append(crearDatosCarrito(p));
    });
}

function crearDatosCarrito(producto){

    //esto es lista
    let divContenedorCarrito = document.createElement("li");
    divContenedorCarrito.className = "listaCarrito";

     //este nombre
     let nombreCarrito = document.createElement("span");
     nombreCarrito.className = "name"
     nombreCarrito.innerText = `${producto.nombre}`

     //este precio
     let precioCarrito = document.createElement("span");
     precioCarrito.className = "precioo"
     precioCarrito.innerText = `$${producto.precio}`

    
    //boton eliminar
      let eliminarCarrito = document.createElement("a");
      eliminarCarrito.className = "cantidadd";
      eliminarCarrito.innerText = "Eliminar"
      eliminarCarrito.setAttribute("onclick", `eliminarProducto(${producto.id})`)
      eliminarCarrito.setAttribute("style", `cursor: pointer`)

     //Contenedor Carrito
     divContenedorCarrito.append(nombreCarrito);
     divContenedorCarrito.append(precioCarrito);
     //divContenedorCarrito.append(cantidadCarrito);
     divContenedorCarrito.append(eliminarCarrito);
    //  divContenedorCarrito.append(nombreProducto);


     //contenedor
     return divContenedorCarrito;
}



//Funcion banner
function mostrarOferta(categoria) {

    let banner = document.querySelector("#banner");

    banner.innerText = "";

    let cardOferta = document.createElement("div");
    cardOferta.className = "card";
    cardOferta.setAttribute("id", "oferta");

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    switch (categoria) {
        case "remeras":
            cardBody.innerText = "¡POR ESTA SEMANA 15% DE DESCUENTO LLEVANDO 3 REMERAS!";
            break;
        case "pantalones":
            cardBody.innerText = "¡POR ESTA SEMANA 20% DE DESCUENTO EN TODOS LOS PANTALONES";
            break;
        case "musculosas":
            cardBody.innerText = "¡POR ESTA SEMANA 50% DE DESCUENTO EN TODAS LAS MUSCULOSAS";
            break;

        case "buzos":
            cardBody.innerText = "¡POR ESTA SEMANA COMPRA 3 BUZOS Y LLEVATE EL TERCERO GRATIS";
            break;
    
        default:
            cardBody.innerText = "Disfrutá 6 cuotas sin interés en todos los productos de la tienda.";
            break;
    }
    

    cardOferta.append(cardBody);

    banner.append(cardOferta);

    setTimeout(() => {

        document.querySelector("#oferta").remove();

    }, 10000);
};


//Checkout
function checkout(){
    let formularioFinal = document.querySelector("#formulario")
    document.querySelector("#modalFormulario").style.display = "block"
}

function cerrarFormulario(){
    document.querySelector("#modalFormulario").style.display = "none"
}


//Validar Formulario

function validarNumeroTelefono(numeroTelefonico){
    if(isNaN(numeroTelefonico)){
        alert("Ingrese por favor números solamente")
    }
}

function validarCampoVacio(valor, campo){
    if( valor === ""){
        alert(`${campo} no puede quedar vacio`)
    }
}

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    let numeroTelefonico = document.querySelector("#validaNumero").value;
    validarNumeroTelefono(numeroTelefonico);

    validarCampoVacio(numeroTelefonico, "Numero de telefono")
    
    let nombreUsuario = document.querySelector("#validarNombre").value;
    validarCampoVacio(nombreUsuario, "Nombre");

    let mailUsuario = document.querySelector("#validarMail").value;
    validarCampoVacio(mailUsuario, "Email");

    let lugarEntrega = document.querySelector("#validaLugar").value;
    validarCampoVacio(lugarEntrega, "Lugar de entrega")

    let fechaEntrega = document.querySelector("#validaFecha").value;
    validarCampoVacio(fechaEntrega, "Fecha de entrega")

    let MetodoPago = document.querySelector("#ValidaMetodo").value;
    validarCampoVacio(MetodoPago, "Metodo de pago")

})

let divbotonDescarga = document.getElementById('divbotonDescarga');

function instalarApp() {
    if (accionInstalar) {
        accionInstalar.prompt();
        accionInstalar.userChoice
            .then(respuesta => {
                if (respuesta.outcome == 'accepted') {
                    console.log('El usuario aceptó instalar la app');
                    divbotonDescarga.style.display = 'none';
                } else {
                    console.log('El usuario no aceptó instalar la app');
                }
            })
    }
}

function mostrarBtnInstalar() {
    if (botonDescarga != undefined) {
        divbotonDescarga.style.display = 'block';
        botonDescarga.addEventListener('click', instalarApp)
    }
}

window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    accionInstalar = e;
    mostrarBtnInstalar();
})



function alerta(message){
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    alertPlaceholder.text = ""
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
    `<div class="alertaMensaje" role="alert">`,
    `   <div>${message}</div>`,
    '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
    console.log(wrapper);
}


llamarProductos();