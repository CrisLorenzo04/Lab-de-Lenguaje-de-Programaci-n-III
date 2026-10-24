# 🌿 EcoTurismo RD - Menú Dinámico

## Descripción

Aplicación web que demuestra la creación de un menú dinámico basado en una estructura de datos JSON, consumida a través de una API REST construida con Node.js y Express.

## 🚀 Características

- **Menú dinámico**: Se genera automáticamente desde un archivo `menu.json`.
- **API REST**: Backend construido con Node.js y Express.
- **Gestión sin código**: Formulario para agregar opciones al menú sin modificar el código fuente.
- **Validaciones**: Verifica IDs únicos y formatos de enlace válidos.
- **Seguridad**: Sanitización de entradas para prevenir inyecciones de código.
- **Responsive**: Se adapta a móviles, tabletas y escritorio.

## 🛠️ Tecnologías utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Estructura de datos**: JSON
- **Comunicación**: API REST (HTTP GET y POST)

## 📂 Estructura del proyecto

menu-dinamico-ecoturismo/
├── menu.json # Estructura de datos del menú
── server.js # Servidor API REST (Node.js + Express)
├── package.json # Configuración de Node.js
── .gitignore # Excluye node_modules de Git
├── README.md # Documentación del proyecto
└── public/ # Archivos del frontend
├── index.html
├── styles.css
└── app.js

## 📖 Conceptos aplicados

- **API**: Interfaz que permite la comunicación entre el frontend y el backend.
- **REST**: Arquitectura basada en HTTP (GET para leer, POST para crear).
- **JSON**: Formato ligero para intercambio de datos.
- **Node.js**: Entorno de ejecución de JavaScript en el servidor.

## 🚦 Cómo ejecutar el proyecto

1. Instalar Node.js desde https://nodejs.org/
2. Clonar el repositorio
3. Ejecutar `npm install` para instalar dependencias
4. Ejecutar `node server.js` para iniciar el servidor
5. Abrir http://localhost:3000 en el navegador

## 👨‍💻 Autor

Cristian Lorenzo
