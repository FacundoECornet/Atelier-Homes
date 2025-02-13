import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAPJefZTfomIZq6YrBddho8ddjJpDNTY3Q",
    authDomain: "atelierhomesarg.firebaseapp.com",
    projectId: "atelierhomesarg",
    storageBucket: "atelierhomesarg.firebasestorage.app",
    messagingSenderId: "639541890234",
    appId: "1:639541890234:web:e0d5353bb8715b1c8c4683",
    measurementId: "G-JNKCG2H10L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Obtener todas las propiedades
export const getPropiedades = async () => {
    const querySnapshot = await getDocs(collection(db, 'propiedades'));
    return querySnapshot;
};

// 🔹 Obtener información de "Nosotros"
export const getNosotros = async () => {
    const querySnapshot = await getDocs(collection(db, 'Nosotros'));
    return querySnapshot;
};

export { db };
