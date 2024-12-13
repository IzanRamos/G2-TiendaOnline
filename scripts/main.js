let precioCarrito = localStorage.getItem("valorCarrito") || 0;

function actualizarValorCarrito(precioASumar){
    precioCarrito+=precioASumar
    localStorage.setItem("valorCarrito",precioCarrito)
}
function limpiarPrecioCarrito(){
    localStorage.removeItem("valorCarrito");
}
