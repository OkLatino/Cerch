import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const COLLECTION_NAME = 'quejas';
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos

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
    if (!text) return false;
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);
    for (const word of words) {
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
        if (badWords.includes(cleanWord)) {
            return true;
        }
    }
    return false;
}

// Prevención simple de XSS (Definida al inicio para ser usada)
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('buzon-form');

    // Si estamos en la página del buzón (tiene formulario)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const peticion = document.getElementById('peticion').value.trim();

            if (!nombre || !telefono || !correo || !peticion) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }

            if (containsBadWords(nombre) || containsBadWords(peticion)) {
                alert('Su mensaje contiene lenguaje inapropiado. Por favor, modifique su texto para poder enviarlo.');
                return;
            }

            showPreview(nombre, telefono, correo, peticion);
        });

        const telInput = document.getElementById('telefono');
        if (telInput) {
            telInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        }
    }

    // Modal logic is reusable
    setupModalLogic(form);

    // Intentar renderizar si existe el contenedor de lista (comentarios.html)
    renderComplaints();
});

// --- Lógica del Modal ---
let tempFormData = null;

function setupModalLogic(form) {
    const previewModal = document.getElementById('preview-modal');
    const confirmBtn = document.getElementById('confirm-publish');
    const cancelBtn = document.getElementById('cancel-preview');

    if (!previewModal) return;

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            previewModal.style.display = 'none';
            tempFormData = null;
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', async () => {
            if (!tempFormData) return;

            confirmBtn.textContent = 'Publicando...';
            confirmBtn.disabled = true;

            try {
                await saveComplaint(
                    tempFormData.nombre,
                    tempFormData.telefono,
                    tempFormData.correo,
                    tempFormData.peticion
                );

                previewModal.style.display = 'none';
                if (form) form.reset();
                tempFormData = null;

                alert('¡Tu comentario ha sido publicado exitosamente!');
                window.location.reload();

            } catch (error) {
                console.error("Error adding document: ", error);
                alert("Hubo un error al guardar tu comentario. Intenta de nuevo.");
                confirmBtn.textContent = 'Confirmar y Publicar';
                confirmBtn.disabled = false;
            }
        });
    }
}

function showPreview(nombre, telefono, correo, peticion) {
    const previewModal = document.getElementById('preview-modal');
    if (!previewModal) return;

    document.getElementById('preview-nombre').textContent = nombre;
    document.getElementById('preview-telefono').textContent = telefono;
    document.getElementById('preview-correo').textContent = correo;
    document.getElementById('preview-mensaje').textContent = peticion;
    document.getElementById('preview-fecha').textContent = new Date().toLocaleDateString();

    tempFormData = { nombre, telefono, correo, peticion };
    previewModal.style.display = 'flex';
}

// --- Firebase Operations ---

async function saveComplaint(nombre, telefono, correo, mensaje) {
    try {
        await addDoc(collection(db, COLLECTION_NAME), {
            nombre: nombre,
            telefono: telefono,
            correo: correo,
            mensaje: mensaje,
            fecha: new Date().toISOString()
        });
    } catch (e) {
        throw e;
    }
}

async function getComplaints(forPublicView = true) {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("fecha", "desc"));
        const querySnapshot = await getDocs(q);

        let complaints = [];
        querySnapshot.forEach((doc) => {
            complaints.push({ id: doc.id, ...doc.data() });
        });

        if (forPublicView) {
            const now = Date.now();
            return complaints.filter(c => {
                const complaintDate = new Date(c.fecha).getTime();
                return (now - complaintDate) < ONE_MONTH_MS;
            });
        } else {
            return complaints;
        }
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
}

async function renderComplaints() {
    const container = document.getElementById('lista-quejas');
    if (!container) return;

    container.innerHTML = '<div style="text-align: center;">Cargando comentarios...</div>';

    const complaints = await getComplaints();

    if (complaints.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: var(--text-light); font-style: italic;">No hay comentarios registrados aún.</div>';
        return;
    }

    container.innerHTML = '';
    complaints.forEach(c => {
        const date = new Date(c.fecha).toLocaleDateString();
        const card = document.createElement('div');
        // Usar clases para estilo mejor, pero mantendremos estilos inline por consistencia previa
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
