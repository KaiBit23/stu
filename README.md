# Veterinaria App

Un sistema simple de gestión para una clínica veterinaria que permite administrar **dueños** y **mascotas**.

## Estructura del Proyecto

- `backend/`: Contiene la API REST construida con Node.js y Express.
- `/` (Raíz): Contiene el frontend básico (HTML, CSS y JavaScript puro) para interactuar con la API.

## Requisitos Previos

Asegúrate de tener instalado en tu computadora:
- [Node.js](https://nodejs.org/) (incluye `npm`).
- (Opcional) Un servidor web estático o la extensión *Live Server* de VSCode para probar el frontend.

## Instalación y Uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/KaiBit23/stu.git
cd stu
```

### 2. Levantar el Servidor (Backend)

Abre una terminal y navega a la carpeta del backend para instalar las dependencias:

```bash
cd backend
npm install
```

*(Opcional) Si la aplicación usa variables de entorno para la conexión a la base de datos, crea un archivo `.env` en la carpeta `backend/` basándote en la configuración de `server.js` o `db.js`.*

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```
*(Si no tienes nodemon, puedes usar `npm start` que ejecuta `node server.js`)*.

La API estará corriendo por defecto en `http://localhost:3000`.

### 3. Levantar el Cliente (Frontend)

Para ver la interfaz gráfica, tienes dos opciones simples:
1. Darle doble clic al archivo `index.html` en la raíz del proyecto para abrirlo en tu navegador.
2. Si usas **VSCode**, dale clic derecho al archivo `index.html` y selecciona **"Open with Live Server"**.

La interfaz del cliente se comunicará automáticamente con la API en el puerto 3000.

## Base de Datos

En la carpeta raíz encontrarás el archivo `veterinaria.sql` por si necesitas montar una base de datos externa en MySQL. De lo contrario, la carpeta `backend/config/` parece incluir una base de datos local pre-configurada (`veterinaria.sqlite`).

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Bases de Datos**: SQLite3 / MySQL2
