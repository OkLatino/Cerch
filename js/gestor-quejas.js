document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'cerch_complaints';
    const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;
    const tableBody = document.getElementById('admin-complaints-list');
    const emptyState = document.getElementById('empty-state');
    const modal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');

    // Load and render
    renderTable();

    function getAllComplaints() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    function saveAllComplaints(complaints) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
        renderTable();
    }

    function renderTable() {
        const complaints = getAllComplaints();
        tableBody.innerHTML = '';

        if (complaints.length === 0) {
            emptyState.style.display = 'block';
            return;
        }
        emptyState.style.display = 'none';

        const now = Date.now();

        complaints.forEach(c => {
            const date = new Date(c.fecha).toLocaleDateString() + ' ' + new Date(c.fecha).toLocaleTimeString();
            const isOld = (now - new Date(c.fecha).getTime()) > ONE_MONTH_MS;

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
                    <button class="action-btn btn-edit" onclick="openEdit(${c.id})">Editar</button>
                    <button class="action-btn btn-delete" onclick="deleteComplaint(${c.id})">Borrar</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // --- Delete Logic ---
    window.deleteComplaint = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta queja permanentemente?')) {
            const complaints = getAllComplaints().filter(c => c.id !== id);
            saveAllComplaints(complaints);
        }
    };

    // --- Edit Logic ---
    window.openEdit = (id) => {
        const complaints = getAllComplaints();
        const complaint = complaints.find(c => c.id === id);
        if (!complaint) return;

        document.getElementById('edit-id').value = complaint.id;
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

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('edit-id').value);
        const complaints = getAllComplaints();
        const index = complaints.findIndex(c => c.id === id);

        if (index !== -1) {
            complaints[index].nombre = document.getElementById('edit-nombre').value;
            complaints[index].telefono = document.getElementById('edit-telefono').value;
            complaints[index].correo = document.getElementById('edit-correo').value;
            complaints[index].mensaje = document.getElementById('edit-mensaje').value;
            // Optionally update date? No, keep original date.

            saveAllComplaints(complaints);
            closeModal();
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
