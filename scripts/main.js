let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let precioCarrito = parseFloat(localStorage.getItem("valorCarrito")) || 0;

const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");


let imagenesCarrusel = [
    "images/banner.jpg",    
    "images/banner1.jpg",
    "images/banner2.jpg",
];

let indiceActual = 0;
const imagenCarrusel = document.getElementById("imagen-carrusel");

function cambiarImagenCarrusel() {
    indiceActual = (indiceActual + 1) % imagenesCarrusel.length;
    imagenCarrusel.src = imagenesCarrusel[indiceActual];
}

setInterval(cambiarImagenCarrusel, 3000);


function actualizarValorCarrito(precioASumar) {
    precioCarrito += precioASumar;

    
    if (precioCarrito < 0) {
        precioCarrito = 0;
    }

    localStorage.setItem("valorCarrito", precioCarrito.toFixed(2));
    totalElemento.textContent = `${precioCarrito.toFixed(2)}€`;
}


function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarValorCarrito(precio);
    renderCarrito();
}


function eliminarDelCarrito(index) {
    const productoEliminado = carrito[index];
    actualizarValorCarrito(-productoEliminado.precio);
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}


function vaciarCarrito() {
    carrito = [];
    precioCarrito = 0; // Restablecer el total a 0
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("valorCarrito", precioCarrito.toFixed(2));
    renderCarrito();
}


function renderCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - ${producto.precio.toFixed(2)}€`;
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("btn-eliminar");
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(index));
        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);
    });
    totalElemento.textContent = `${precioCarrito.toFixed(2)}€`;
}


botonVaciarCarrito.addEventListener("click", vaciarCarrito);

botonVaciarCarrito.addEventListener("click", vaciarCarrito)
renderCarrito();
