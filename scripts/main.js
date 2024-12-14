let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let precioCarrito = parseFloat(localStorage.getItem("valorCarrito")) || 0;

const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");

function actualizarValorCarrito(precioASumar) {
    precioCarrito += precioASumar;
    localStorage.setItem("valorCarrito", precioCarrito.toFixed(2));
    totalElemento.textContent = `${precioCarrito.toFixed(2)}€`;
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarValorCarrito(precio);
    renderCarrito();
}

function renderCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - ${producto.precio.toFixed(2)}€`;
        listaCarrito.appendChild(li);
    });
    totalElemento.textContent = `${precioCarrito.toFixed(2)}€`;
}

renderCarrito();
