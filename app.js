const API_URL = 'http://localhost:3000/api';

// Navigation Logic
function showSection(section) {
    document.getElementById('duenos-section').classList.add('hidden-section');
    document.getElementById('duenos-section').classList.remove('active-section');
    document.getElementById('mascotas-section').classList.add('hidden-section');
    document.getElementById('mascotas-section').classList.remove('active-section');

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(`${section}-section`).classList.remove('hidden-section');
    document.getElementById(`${section}-section`).classList.add('active-section');
    event.currentTarget.classList.add('active');

    if (section === 'duenos') loadDuenos();
    if (section === 'mascotas') loadMascotas();
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadDuenos();
});

// Toast Notificaction
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${isError ? 'error' : ''}`;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// ------ API Calls: Dueños ------

async function loadDuenos() {
    try {
        const res = await fetch(`${API_URL}/duenos`);
        const data = await res.json();
        const tbody = document.querySelector('#duenos-table tbody');
        tbody.innerHTML = '';

        if (data.length === 0) {
            document.getElementById('duenos-empty').classList.remove('hidden');
            document.getElementById('duenos-table').classList.add('hidden');
            return;
        }

        document.getElementById('duenos-empty').classList.add('hidden');
        document.getElementById('duenos-table').classList.remove('hidden');

        data.forEach(dueno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${dueno.Id_dueño}</td>
                <td><strong>${dueno.Nombre_dueño}</strong></td>
                <td>${dueno.Dirección || '-'}</td>
                <td>${dueno.Teléfono || '-'}</td>
                <td>${dueno.Correo || '-'}</td>
                <td class="action-links">
                    <a onclick="editDueno(${dueno.Id_dueño})">Editar</a>
                    <a class="delete" onclick="deleteDueno(${dueno.Id_dueño})">Eliminar</a>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        showToast('Error al cargar dueños', true);
    }
}

async function handleDuenoSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('duenoId').value;
    const body = {
        Nombre_dueño: document.getElementById('duenoNombre').value,
        Dirección: document.getElementById('duenoDireccion').value,
        Teléfono: document.getElementById('duenoTelefono').value,
        Correo: document.getElementById('duenoCorreo').value,
        Fecha_registro: document.getElementById('duenoFecha').value
    };

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/duenos/${id}` : `${API_URL}/duenos`;

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            showToast(`Dueño ${id ? 'actualizado' : 'creado'} exitosamente`);
            closeModal('duenoModal');
            loadDuenos();
        } else {
            showToast('Error al guardar dueño', true);
        }
    } catch (error) {
        showToast('Error de red', true);
    }
}

async function editDueno(id) {
    try {
        const res = await fetch(`${API_URL}/duenos/${id}`);
        const data = await res.json();

        document.getElementById('duenoId').value = data.Id_dueño;
        document.getElementById('duenoNombre').value = data.Nombre_dueño;
        document.getElementById('duenoDireccion').value = data.Dirección || '';
        document.getElementById('duenoTelefono').value = data.Teléfono || '';
        document.getElementById('duenoCorreo').value = data.Correo || '';

        // Format date for date input
        if (data.Fecha_registro) {
            const d = new Date(data.Fecha_registro);
            document.getElementById('duenoFecha').value = d.toISOString().split('T')[0];
        }

        document.getElementById('duenoModalTitle').textContent = 'Editar Dueño';
        openModal('duenoModal');
    } catch (error) {
        showToast('Error al obtener datos', true);
    }
}

async function deleteDueno(id) {
    if (!confirm('¿Seguro que deseas eliminar este dueño? También se eliminarán sus mascotas.')) return;

    try {
        const res = await fetch(`${API_URL}/duenos/${id}`, { method: 'DELETE' });
        if (res.ok) {
            showToast('Dueño eliminado');
            loadDuenos();
        } else {
            showToast('Error al eliminar', true);
        }
    } catch (error) {
        showToast('Error de red', true);
    }
}


// ------ API Calls: Mascotas ------

async function loadMascotas() {
    try {
        const res = await fetch(`${API_URL}/mascotas`);
        const data = await res.json();
        const tbody = document.querySelector('#mascotas-table tbody');
        tbody.innerHTML = '';

        if (data.length === 0) {
            document.getElementById('mascotas-empty').classList.remove('hidden');
            document.getElementById('mascotas-table').classList.add('hidden');
            return;
        }

        document.getElementById('mascotas-empty').classList.add('hidden');
        document.getElementById('mascotas-table').classList.remove('hidden');

        data.forEach(mascota => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${mascota.Id_mascota}</td>
                <td><strong>${mascota.Nombre}</strong></td>
                <td>${mascota.Especie || '-'} / ${mascota.Raza || '-'}</td>
                <td>${mascota.Id_dueño}</td>
                <td>
                    <span style="color: ${mascota.Estado === 'activo' ? 'var(--success-color)' : 'var(--text-secondary)'}">
                        ${mascota.Estado}
                    </span>
                </td>
                <td class="action-links">
                    <a onclick="editMascota(${mascota.Id_mascota})">Editar</a>
                    <a class="delete" onclick="deleteMascota(${mascota.Id_mascota})">Eliminar</a>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        showToast('Error al cargar mascotas', true);
    }
}

async function handleMascotaSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('mascotaId').value;
    const body = {
        Nombre: document.getElementById('mascotaNombre').value,
        Especie: document.getElementById('mascotaEspecie').value,
        Raza: document.getElementById('mascotaRaza').value,
        Sexo: document.getElementById('mascotaSexo').value,
        Color: document.getElementById('mascotaColor').value,
        Fecha_nacimiento: document.getElementById('mascotaFecha').value,
        Peso: parseFloat(document.getElementById('mascotaPeso').value),
        Id_dueño: parseInt(document.getElementById('mascotaDuenoId').value),
        Estado: document.getElementById('mascotaEstado').value
    };

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/mascotas/${id}` : `${API_URL}/mascotas`;

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            showToast(`Mascota ${id ? 'actualizada' : 'creada'} exitosamente`);
            closeModal('mascotaModal');
            loadMascotas();
        } else {
            showToast('Error al guardar mascota', true);
        }
    } catch (error) {
        showToast('Error de red', true);
    }
}

async function editMascota(id) {
    try {
        const res = await fetch(`${API_URL}/mascotas/${id}`);
        const data = await res.json();

        document.getElementById('mascotaId').value = data.Id_mascota;
        document.getElementById('mascotaNombre').value = data.Nombre;
        document.getElementById('mascotaEspecie').value = data.Especie || '';
        document.getElementById('mascotaRaza').value = data.Raza || '';
        document.getElementById('mascotaSexo').value = data.Sexo || 'M';
        document.getElementById('mascotaColor').value = data.Color || '';
        document.getElementById('mascotaPeso').value = data.Peso || '';
        document.getElementById('mascotaDuenoId').value = data.Id_dueño || '';
        document.getElementById('mascotaEstado').value = data.Estado || 'activo';

        if (data.Fecha_nacimiento) {
            const d = new Date(data.Fecha_nacimiento);
            document.getElementById('mascotaFecha').value = d.toISOString().split('T')[0];
        }

        document.getElementById('mascotaModalTitle').textContent = 'Editar Mascota';
        openModal('mascotaModal');
    } catch (error) {
        showToast('Error al obtener datos', true);
    }
}

async function deleteMascota(id) {
    if (!confirm('¿Seguro que deseas eliminar esta mascota?')) return;

    try {
        const res = await fetch(`${API_URL}/mascotas/${id}`, { method: 'DELETE' });
        if (res.ok) {
            showToast('Mascota eliminada');
            loadMascotas();
        } else {
            showToast('Error al eliminar', true);
        }
    } catch (error) {
        showToast('Error de red', true);
    }
}

// ------ Modals General ------

function openModal(id) {
    document.getElementById(id).classList.add('show');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
    // Reset forms
    if (id === 'duenoModal') {
        document.getElementById('duenoForm').reset();
        document.getElementById('duenoId').value = '';
        document.getElementById('duenoModalTitle').textContent = 'Nuevo Dueño';
    } else if (id === 'mascotaModal') {
        document.getElementById('mascotaForm').reset();
        document.getElementById('mascotaId').value = '';
        document.getElementById('mascotaModalTitle').textContent = 'Nueva Mascota';
    }
}
