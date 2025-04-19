// encuesta.js
// Guardar respuestas anónimas de la encuesta en Firestore

import { db } from "../../firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Referencias al DOM
const form = document.querySelector("#formEncuesta");
const mensaje = document.querySelector("#mensajeEncuesta");

// Colección de encuestas
const encuestasRef = collection(db, "encuestas");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const sabor = parseInt(form.sabor.value);
  const local = parseInt(form.local.value);
  const atencion = parseInt(form.atencion.value);
  const observacion = form.observacion.value.trim();

  if (isNaN(sabor) || isNaN(local) || isNaN(atencion)) {
    mensaje.textContent = "Por favor completa todas las calificaciones.";
    return;
  }

  const data = {
    sabor,
    local,
    atencion,
    observacion: observacion || null,
    fecha: serverTimestamp()
  };

  try {
    await addDoc(encuestasRef, data);
    mensaje.textContent = "¡Gracias por compartir tu opinión!";
    form.reset();
  } catch (error) {
    console.error("Error al enviar encuesta:", error);
    mensaje.textContent = "Hubo un error al enviar la encuesta. Inténtalo más tarde.";
  }
});
