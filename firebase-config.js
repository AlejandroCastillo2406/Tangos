// firebase-config.js
// Configuración de Firebase para el sitio web de Tango's

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Configuración oficial extraída de Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSybLAz-K3HpMYlbgp-ah1cdfFOEPC1YWOY8",
  authDomain: "tangos-95f47.firebaseapp.com",
  projectId: "tangos-95f47",
  storageBucket: "tangos-95f47.appspot.com",
  messagingSenderId: "855547635827",
  appId: "1:855547635827:web:5d96d87666c8ba3ca6e206",
  measurementId: "G-1CNC1YSLRE"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
