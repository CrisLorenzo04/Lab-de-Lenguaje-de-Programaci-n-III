
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
     apiKey: "AIzaSyB2g1_q3o_UUWcuD3wSnCJ1Vgzfu5c6lTE",
  authDomain: "gestion-estudiantes-rd.firebaseapp.com",
  projectId: "gestion-estudiantes-rd",
  storageBucket: "gestion-estudiantes-rd.firebasestorage.app",
  messagingSenderId: "760982331891",
  appId: "1:760982331891:web:641ec5e012172ce090b286"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = "estudiantes"; 


const form = document.getElementById('studentForm');
const studentsList = document.getElementById('studentsList');
const btnCancelar = document.getElementById('btnCancelar');
const btnGuardar = document.getElementById('btnGuardar');



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('studentId').value;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const carrera = document.getElementById('carrera').value;

    const data = { nombre, email, telefono, carrera };

    try {
        if (id) {

            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, data);
            alert('✅ Estudiante actualizado correctamente');
        } else {

            await addDoc(collection(db, collectionName), data);
            alert('✅ Estudiante registrado correctamente');
        }
        
        form.reset();
        document.getElementById('studentId').value = '';
        btnCancelar.style.display = 'none';
        btnGuardar.textContent = '💾 Guardar';
        loadStudents(); 
    } catch (error) {
        console.error("Error al guardar: ", error);
        alert('❌ Error al guardar los datos');
    }
});



async function loadStudents() {
    studentsList.innerHTML = ''; 
    const querySnapshot = await getDocs(collection(db, collectionName));
    
    querySnapshot.forEach((doc) => {
        const student = doc.data();
        const id = doc.id;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.nombre}</td>
            <td>${student.email}</td>
            <td>${student.telefono}</td>
            <td>${student.carrera}</td>
            <td class="actions">
                <button class="btn-edit" onclick="editStudent('${id}', '${student.nombre}', '${student.email}', '${student.telefono}', '${student.carrera}')">✏️ Editar</button>
                <button class="btn-delete" onclick="deleteStudent('${id}')">🗑️ Borrar</button>
            </td>
        `;
        studentsList.appendChild(row);
    });
}



window.deleteStudent = async (id) => {
    if(confirm('¿Estás seguro de eliminar este registro?')) {
        try {
            await deleteDoc(doc(db, collectionName, id));
            alert('🗑️ Estudiante eliminado');
            loadStudents();
        } catch (error) {
            console.error("Error al eliminar: ", error);
        }
    }
}



window.editStudent = (id, nombre, email, telefono, carrera) => {
    document.getElementById('studentId').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('email').value = email;
    document.getElementById('telefono').value = telefono;
    document.getElementById('carrera').value = carrera;
    
    btnGuardar.textContent = '🔄 Actualizar';
    btnCancelar.style.display = 'inline-block';
    window.scrollTo(0, 0); 
}

btnCancelar.addEventListener('click', () => {
    form.reset();
    document.getElementById('studentId').value = '';
    btnCancelar.style.display = 'none';
    btnGuardar.textContent = '💾 Guardar';
});

loadStudents();