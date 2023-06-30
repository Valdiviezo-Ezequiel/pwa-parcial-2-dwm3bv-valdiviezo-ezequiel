class Carrito{
  
    productos;
   
    constructor(){
      this.productos = [];
    }
  
    //Agrega un producto al arreglo de productos
    agregarProducto(producto){
      this.productos.push(producto);
    }

    //Devuelve el arrays productos
    devolverProductos(){
      return this.productos;
    }
  
    //Devuelve la cantidad de producto dentro del arrays productos
    cantidadDeProductos(){
      return this.productos.length;
    }

    
     quitarProductoDelCarrito(idProducto){
       let producto = null; 
  
       this.productos.forEach(element => {
         if (element.id == idProducto){
           producto = element;
         }
       });
  
  
       this.productos.splice(this.productos.indexOf(producto), 1);
     }

    
    mostrarPrecioTotalDeLaCompra(){
        let total = 0;
        this.productos.forEach(p => {
          total += p.precio; 
        });
        return total; 
      }
      

    vaciarCarrito(){
      this.productos = [];
    }




    mostrarCardProducto(p){
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
  
}


