const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares: Permiten recibir JSON y aceptan peticiones del frontend
app.use(cors());
app.use(express.json());
// Sirve los archivos estáticos (HTML, CSS, JS) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'menu.json');

// 1. Endpoint GET: Obtener el menú (API REST)
app.get('/api/menu', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el menú' });
        }
        res.json(JSON.parse(data));
    });
});

// 2. Endpoint POST: Agregar nueva opción al menú (API REST)
app.post('/api/menu', (req, res) => {
    const { id, nombre, enlace, icono, parentId } = req.body;

    // Validación básica de seguridad (Sanitización)
    const safeNombre = String(nombre).replace(/[<>]/g, ''); // Previene inyección HTML básica
    const safeEnlace = String(enlace).trim();
    const safeIcono = String(icono || '📄').replace(/[<>]/g, '');

    // Validación 4.b: Enlace válido
    if (!safeEnlace.startsWith('#') && !/^https?:\/\//.test(safeEnlace)) {
        return res.status(400).json({ error: 'El enlace debe empezar con "#" o "http://" / "https://"' });
    }

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer datos' });

        const menuData = JSON.parse(data);
        
        // Validación 4.a: ID único (revisa IDs principales y de submenús)
        const allIds = menuData.menu.flatMap(item => 
            item.submenus ? [item.id, ...item.submenus.map(s => s.id)] : [item.id]
        );

        if (allIds.includes(Number(id))) {
            return res.status(400).json({ error: 'El ID ya existe. Debe ser único.' });
        }

        // Lógica de agregación
        if (parentId) {
            const parent = menuData.menu.find(item => item.id === Number(parentId));
            if (parent) {
                if (!parent.submenus) parent.submenus = [];
                parent.submenus.push({ id: Number(id), nombre: safeNombre, enlace: safeEnlace });
            }
        } else {
            menuData.menu.push({ id: Number(id), nombre: safeNombre, enlace: safeEnlace, icono: safeIcono });
        }

        // Guardar cambios en el archivo JSON (Actualización sin tocar código fuente)
        fs.writeFile(DATA_FILE, JSON.stringify(menuData, null, 2), 'utf8', (writeErr) => {
            if (writeErr) return res.status(500).json({ error: 'Error al guardar el menú' });
            res.json({ message: 'Opción agregada exitosamente', data: menuData });
        });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor API REST corriendo en http://localhost:${PORT}`);
});