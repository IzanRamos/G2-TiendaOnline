let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let precioCarrito = parseFloat(localStorage.getItem("valorCarrito")) || 0;

const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");

// Función para actualizar el valor del carrito
function actualizarValorCarrito(precioASumar) {
    precioCarrito += precioASumar;

    // Asegurarse de que el total no sea negativo
    if (precioCarrito < 0) {
        precioCarrito = 0;
    }

    localStorage.setItem("valorCarrito", precioCarrito.toFixed(2));
    totalElemento.textContent = `${precioCarrito.toFixed(2)}€`;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarValorCarrito(precio);
    renderCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    const productoEliminado = carrito[index];
    actualizarValorCarrito(-productoEliminado.precio);
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    precioCarrito = 0; // Restablecer el total a 0
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("valorCarrito", precioCarrito.toFixed(2));
    renderCarrito();
}

// Función para renderizar el carrito
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

// Evento para vaciar el carrito al hacer clic en el botón
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

// Inicializar el carrito cuando la página carga
renderCarrito();
