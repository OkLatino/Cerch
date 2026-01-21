document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('buzon-form');
    const submitBtn = document.getElementById('submit-btn');

    // Lista básica de palabras prohibidas (Español Latino y Inglés)
    const badWords = [
        // Español
        'puto', 'puta', 'pendejo', 'pendeja', 'mierda', 'verga', 'cabron', 'cabrona', 'mamaguevo',
        'chingar', 'chingada', 'joder', 'estupido', 'estupida', 'idiota', 'imbecil', 'zorra', 'culero',
        'culo', 'pinche', 'bastardo', 'maldito', 'perra', 'verguear', 'coño',
        // English
        'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'whore', 'slut', 'bastard', 'cunt',
        'motherfucker', 'cock', 'wanker', 'twat'
    ];

    function containsBadWords(text) {
        const lowerText = text.toLowerCase();
        // Check for exact words or words contained within validation logic could be more complex, 
        // but checking inclusion of word surrounded by boundaries or spaces is safer to avoid false positives (like 'cassette')
        // For simplicity in this requirement, we'll check word boundaries.

        const words = lowerText.split(/\s+/);
        for (const word of words) {
            // Remove punctuation for checking
            const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
            if (badWords.includes(cleanWord)) {
                return true;
            }
        }
        return false;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const peticion = document.getElementById('peticion').value.trim();

        // 1. Validación de campos vacíos
        if (!nombre || !telefono || !correo || !peticion) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        // 2. Filtro de malas palabras
        if (containsBadWords(nombre) || containsBadWords(peticion)) {
            alert('Su mensaje contiene lenguaje inapropiado. Por favor, modifique su texto para poder enviarlo.');
            return;
        }

        // --- MODO VISTA PREVIA ---
        showPreview(nombre, telefono, correo, peticion);
    });

    // Validar input de teléfono
    const telInput = document.getElementById('telefono');
    telInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // --- LÓGICA DE VISTA PREVIA ---
    const previewModal = document.getElementById('preview-modal');
    const confirmBtn = document.getElementById('confirm-publish');
    const cancelBtn = document.getElementById('cancel-preview');

    // Estado temporal para guardar los datos mientras se previsualiza
    let tempFormData = null;

    function showPreview(nombre, telefono, correo, peticion) {
        // Llenar datos en el modal
        document.getElementById('preview-nombre').textContent = nombre;
        document.getElementById('preview-telefono').textContent = telefono;
        document.getElementById('preview-correo').textContent = correo;
        document.getElementById('preview-mensaje').textContent = peticion;
        document.getElementById('preview-fecha').textContent = new Date().toLocaleDateString();

        // Guardar temporalmente
        tempFormData = { nombre, telefono, correo, peticion };

        // Mostrar modal
        previewModal.style.display = 'flex';
    }

    cancelBtn.addEventListener('click', () => {
        previewModal.style.display = 'none';
        tempFormData = null;
    });

    confirmBtn.addEventListener('click', () => {
        if (!tempFormData) return;

        // 3. Guardar en localStorage REALMENTE
        saveComplaint(
            tempFormData.nombre,
            tempFormData.telefono,
            tempFormData.correo,
            tempFormData.peticion
        );

        // Ocultar modal y limpiar
        previewModal.style.display = 'none';
        form.reset();
        tempFormData = null;

        // Mensaje final
        alert('¡Tu comentario ha sido publicado exitosamente!');

        // Recargar la página para limpiar todo
        window.location.reload();
    });
});

// --- Lógica de Almacenamiento y Visualización ---

const STORAGE_KEY = 'cerch_complaints';
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos

// Esta función debe estar fuera del DOMContentLoaded para ser accesible si se llamara desde otro script, 
// pero como 'renderComplaints' se llama al final, la dejamos global o dentro del scope si solo se usa aquí.
// Para asegurar que corra en ambas páginas:
document.addEventListener('DOMContentLoaded', () => {
    // Intentar renderizar si existe el contenedor (esto correrá en comentarios.html)
    renderComplaints();
});

function saveComplaint(nombre, telefono, correo, mensaje) {
    const complaints = getComplaints();
    const newComplaint = {
        id: Date.now(),
        nombre: nombre,
        telefono: telefono,
        correo: correo,
        mensaje: mensaje,
        fecha: new Date().toISOString()
    };
    complaints.unshift(newComplaint); // Agregar al principio
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
}

function getComplaints(forPublicView = true) {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    let complaints = JSON.parse(stored);

    if (forPublicView) {
        // Filtrar comentarios más viejos de 1 mes SOLO PARA VISUALIZACIÓN
        // Ya no borramos del localStorage automáticamente para permitir que el Gestor los vea.
        const now = Date.now();
        const filteredComplaints = complaints.filter(c => {
            const complaintDate = new Date(c.fecha).getTime();
            return (now - complaintDate) < ONE_MONTH_MS;
        });
        return filteredComplaints;
    } else {
        // Return all complaints for internal use (e.g., saving new ones)
        return complaints;
    }
}

// Función auxiliar para obtener TODOS (usada por el gestor si comparte script, 
// pero el gestor tendrá su propio script que lee la misma key)
window.getPublicComplaints = () => getComplaints(true); // Exponer por si acaso

function renderComplaints() {
    const container = document.getElementById('lista-quejas');
    if (!container) return; // Si no estamos en la página de comentarios, no hacer nada

    const complaints = getComplaints(); // This will now get public-view complaints

    if (complaints.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: var(--text-light); font-style: italic;">No hay comentarios registrados aún.</div>';
        return;
    }

    container.innerHTML = '';
    complaints.forEach(c => {
        const date = new Date(c.fecha).toLocaleDateString();
        const card = document.createElement('div');
        card.style.cssText = `
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        `;

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; border-bottom: 1px solid #eee; padding-bottom: 0.75rem; margin-bottom: 0.5rem;">
                <div>
                    <h3 style="margin: 0; color: var(--primary-color); font-size: 1.1rem;">${escapeHtml(c.nombre)}</h3>
                </div>
                <span style="font-size: 0.8rem; color: #9ca3af; background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px;">${date}</span>
            </div>
            <p style="margin: 0; color: #374151; font-size: 1rem; line-height: 1.6;">${escapeHtml(c.mensaje)}</p>
        `;
        container.appendChild(card);
    });
}

// Prevención simple de XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
