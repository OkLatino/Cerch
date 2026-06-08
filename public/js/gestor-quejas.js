import { db } from './firebase-config.js';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const COLLECTION_NAME = 'quejas';
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('admin-complaints-list');
    const emptyState = document.getElementById('empty-state');
    const modal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');

    // Subscribe to updates in real-time
    const q = query(collection(db, COLLECTION_NAME), orderBy("fecha", "desc"));

    onSnapshot(q, (snapshot) => {
        let complaints = [];
        snapshot.forEach((doc) => {
            complaints.push({ id: doc.id, ...doc.data() });
        });
        renderTable(complaints);
    });

    function renderTable(complaints) {
        tableBody.innerHTML = '';

        if (complaints.length === 0) {
            emptyState.style.display = 'block';
            return;
        }
        emptyState.style.display = 'none';

        const now = Date.now();

        complaints.forEach(c => {
            const date = c.fecha ? new Date(c.fecha).toLocaleDateString() + ' ' + new Date(c.fecha).toLocaleTimeString() : 'N/A';
            const isOld = c.fecha ? (now - new Date(c.fecha).getTime()) > ONE_MONTH_MS : false;

            const tr = document.createElement('tr');
            tr.className = 'complaint-row';
            tr.innerHTML = `
                <td>${date}</td>
                <td>${escapeHtml(c.nombre)}</td>
                <td>
                    <div>📞 ${escapeHtml(c.telefono)}</div>
                    <div>✉️ ${escapeHtml(c.correo)}</div>
                </td>
                <td style="max-width: 300px;">${escapeHtml(c.mensaje)}</td>
                <td>
                    <span class="status-badge ${isOld ? 'status-archived' : 'status-active'}">
                        ${isOld ? 'Archivado (>30 días)' : 'Visible'}
                    </span>
                </td>
                <td>
                    <button class="action-btn btn-edit" data-id="${c.id}">Editar</button>
                    <button class="action-btn btn-delete" onclick="window.deleteComplaint('${c.id}')">Borrar</button>
                </td>
            `;

            // Add event listener for edit button manually to avoid string implementation issues
            const editBtn = tr.querySelector('.btn-edit');
            editBtn.onclick = () => window.openEdit(c.id, c);

            tableBody.appendChild(tr);
        });
    }

    // --- Delete Logic ---
    window.deleteComplaint = async (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta queja permanentemente?')) {
            try {
                await deleteDoc(doc(db, COLLECTION_NAME, id));
                // No need to manually rerender; onSnapshot will trigger
            } catch (error) {
                console.error("Error deleting document: ", error);
                alert("Error al borrar el documento.");
            }
        }
    };

    // --- Edit Logic ---
    window.openEdit = (id, complaint) => {
        if (!complaint) return; // Should pass object to avoid extra fetches

        document.getElementById('edit-id').value = id;
        document.getElementById('edit-nombre').value = complaint.nombre;
        document.getElementById('edit-telefono').value = complaint.telefono;
        document.getElementById('edit-correo').value = complaint.correo;
        document.getElementById('edit-mensaje').value = complaint.mensaje;

        modal.style.display = 'flex';
    };

    window.closeModal = () => {
        modal.style.display = 'none';
        editForm.reset();
    };

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        const submitBtn = editForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = "Guardando...";

        try {
            const complaintRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(complaintRef, {
                nombre: document.getElementById('edit-nombre').value,
                telefono: document.getElementById('edit-telefono').value,
                correo: document.getElementById('edit-correo').value,
                mensaje: document.getElementById('edit-mensaje').value
            });
            closeModal();
        } catch (error) {
            console.error("Error updating document: ", error);
            alert("Error al editar la queja.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Guardar Cambios";
        }
    });

    // Close modal on click outside
    window.onclick = (event) => {
        if (event.target == modal) {
            closeModal();
        }
    };

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
