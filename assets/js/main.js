// main.js
// Carga dinámica de productos desde Firebase Firestore

import { db } from "../../firebase-config.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.querySelector("#productos");

  if (!contenedor) return;

  try {
    const productosRef = collection(db, "productos");
    const q = query(productosRef, orderBy("nombre", "asc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      contenedor.innerHTML = `<p class="mensaje-vacio">No hay productos disponibles en este momento.</p>`;
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      const card = crearCardProducto(data);
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = `<p class="error-carga">Ocurrió un error al cargar los productos.</p>`;
  }
});

// Genera una tarjeta visualmente atractiva para un producto
function crearCardProducto({ nombre, descripcion, precio, imagenURL }) {
  const div = document.createElement("div");
  div.classList.add("producto-card");

  div.innerHTML = `
    <div class="producto-imagen">
      <img src="${imagenURL}" alt="${nombre}" loading="lazy" />
    </div>
    <div class="producto-detalles">
      <h3>${nombre}</h3>
      <p>${descripcion}</p>
      <span class="precio">$${precio}</span>
    </div>
  `;

  return div;
}
