// admin.js
// CRUD completo con Firestore para el panel de administrador

import { db } from "../../firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Referencias
const form = document.querySelector("#formProducto");
const btnReset = document.querySelector("#btnReset");
const lista = document.querySelector("#listaProductosAdmin");

const productosRef = collection(db, "productos");

// Estado actual
let editando = false;
let idEditando = null;

// Mostrar productos existentes
const cargarProductos = async () => {
  lista.innerHTML = "";
  const snapshot = await getDocs(productosRef);

  if (snapshot.empty) {
    lista.innerHTML = "<p class='mensaje-vacio'>No hay productos aún.</p>";
    return;
  }

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const id = docSnap.id;

    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <div class="producto-imagen">
        <img src="${data.imagenURL}" alt="${data.nombre}" />
      </div>
      <div class="producto-detalles">
        <h3>${data.nombre}</h3>
        <p>${data.descripcion}</p>
        <span class="precio">$${data.precio}</span>
        <div class="acciones-admin">
          <button data-id="${id}" class="btn-editar">✏️</button>
          <button data-id="${id}" class="btn-borrar">🗑️</button>
        </div>
      </div>
    `;

    lista.appendChild(card);
  });

  // Asignar eventos
  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.onclick = () => editarProducto(btn.dataset.id);
  });
  document.querySelectorAll(".btn-borrar").forEach((btn) => {
    btn.onclick = () => borrarProducto(btn.dataset.id);
  });
};

// Guardar producto (nuevo o editado)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = form.nombre.value.trim();
  const descripcion = form.descripcion.value.trim();
  const precio = parseFloat(form.precio.value);
  const imagenURL = form.imagenURL.value.trim();
  const destacado = form.destacado.checked;

  const data = { nombre, descripcion, precio, imagenURL, destacado };

  if (editando) {
    const ref = doc(db, "productos", idEditando);
    await updateDoc(ref, data);
  } else {
    await addDoc(productosRef, data);
  }

  resetFormulario();
  cargarProductos();
});

// Rellenar form para edición
const editarProducto = async (id) => {
  const ref = doc(db, "productos", id);
  const snap = await getDocs(productosRef);
  snap.forEach((docSnap) => {
    if (docSnap.id === id) {
      const data = docSnap.data();
      form.nombre.value = data.nombre;
      form.descripcion.value = data.descripcion;
      form.precio.value = data.precio;
      form.imagenURL.value = data.imagenURL;
      form.destacado.checked = data.destacado;
      editando = true;
      idEditando = id;
    }
  });
};

// Eliminar producto
const borrarProducto = async (id) => {
  const confirmacion = confirm("¿Eliminar este producto?");
  if (!confirmacion) return;

  await deleteDoc(doc(db, "productos", id));
  cargarProductos();
};

// Cancelar edición
btnReset.addEventListener("click", () => resetFormulario());

// Reiniciar formulario
const resetFormulario = () => {
  form.reset();
  editando = false;
  idEditando = null;
};

// Inicial
cargarProductos();

