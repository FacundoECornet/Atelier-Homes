import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
//import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
//const auth = getAuth(app);

export const getProduct = async () => {
  const querySnapshot = await getDocs(collection(db, 'propiedades'));  //Obtiene todos los documentos de la colección productos de Firestore
  return querySnapshot;//Devuelve el resultado
};

export const getCompra = async (nombre, precio, talle, cantidad, total) => {
  const querySnapshot = await getDocs(collection(db, 'pedidos'), { nombre, precio, talle, cantidad, total });
  return querySnapshot;
};

export const deleteProducto = async (productoId) => {
  try {
    const productoRef = doc(db, 'propiedades', productoId);
    await deleteDoc(productoRef);
    console.log("Producto eliminado correctamente desde Firestore");
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
};

export const eliminarProductos = async () => {
  try {
    // Obtener todos los documentos de la colección "productos"
    const querySnapshot = await getDocs(collection(db, 'propiedades'));

    // Iterar sobre los documentos y eliminar cada uno
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    console.log('Colección "productos" eliminada correctamente');
  } catch (error) {
    console.error('Error al eliminar la colección "productos":', error);
  }
};

export const agregarProducto = async (producto) => {
  try {
    await addDoc(collection(db, 'propiedades'), producto);
    console.log('Producto almacenado correctamente en la colección "productos"');
  } catch (error) {
    console.error('Error al almacenar el producto:', error);
  }
};

export const agregarPedido = async (pedido) => {
  try {
    await addDoc(collection(db, 'pedidos'), pedido);
    console.log('Pedido almacenado correctamente en la colección "pedidos"');
  } catch (error) {
    console.error('Error al almacenar el pedido:', error);
  }
};

export { db }
