let menuData = { menu: [] };

// 1. Cargar datos desde la API REST de Node.js
async function loadMenuData() {
    try {
        const response = await fetch('http://localhost:3000/api/menu');
        menuData = await response.json();
        renderMenu();
        populateParentSelect();
    } catch (error) {
        console.error("Error conectando con la API:", error);
        document.getElementById('dynamic-menu').innerHTML = '<p style="color:white; text-align:center;">Error al cargar el menú. Asegúrate de que el servidor Node.js esté corriendo.</p>';
    }
}

// 2. Renderizar el menú dinámicamente
function renderMenu() {
    const nav = document.getElementById('dynamic-menu');
    nav.innerHTML = '';
    const ul = document.createElement('ul');
    ul.className = 'menu-list';

    menuData.menu.forEach(item => {
        const li = document.createElement('li');
        li.className = 'menu-item';

        const a = document.createElement('a');
        a.href = item.enlace;
        a.className = 'menu-link';
        a.innerHTML = `${item.icono || '📄'} ${item.nombre}`;
        
        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('content').innerHTML = `<h2>Navegando a: ${item.nombre}</h2><p>Enlace: ${item.enlace}</p>`;
        });

        li.appendChild(a);

        if (item.submenus && item.submenus.length > 0) {
            const subUl = document.createElement('ul');
            subUl.className = 'submenu';
            item.submenus.forEach(sub => {
                const subLi = document.createElement('li');
                const subA = document.createElement('a');
                subA.href = sub.enlace;
                subA.textContent = sub.nombre;
                subA.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById('content').innerHTML = `<h2>Navegando a: ${sub.nombre}</h2>`;
                });
                subLi.appendChild(subA);
                subUl.appendChild(subLi);
            });
            li.appendChild(subUl);
        }
        ul.appendChild(li);
    });
    nav.appendChild(ul);
}

// 3. Llenar el select para elegir si es submenú
function populateParentSelect() {
    const select = document.getElementById('new-parent');
    select.innerHTML = '<option value="">-- Menú Principal --</option>';
    menuData.menu.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `Agregar como submenú de: ${item.nombre}`;
        select.appendChild(option);
    });
}

// 4. Enviar nueva opción a la API de Node.js (POST)
document.getElementById('add-menu-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const msgEl = document.getElementById('form-message');
    
    const payload = {
        id: parseInt(document.getElementById('new-id').value),
        nombre: document.getElementById('new-nombre').value,
        enlace: document.getElementById('new-enlace').value,
        icono: document.getElementById('new-icono').value || '📄',
        parentId: document.getElementById('new-parent').value || null
    };

    try {
        const response = await fetch('http://localhost:3000/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            menuData = result.data; // Actualizar estado local
            renderMenu();
            populateParentSelect();
            msgEl.textContent = '✅ Opción agregada y guardada en el servidor.';
            msgEl.className = 'success';
            this.reset();
        } else {
            msgEl.textContent = `❌ Error: ${result.error}`;
            msgEl.className = 'error';
        }
    } catch (error) {
        msgEl.textContent = '❌ Error de conexión con el servidor.';
        msgEl.className = 'error';
    }
});

// Inicializar
loadMenuData();