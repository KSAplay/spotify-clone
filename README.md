# Spotify Clone

Este proyecto es un clon de Spotify construido utilizando el stack MERN (MongoDB, Express, React, Node.js), Tailwind CSS y Vite.

## Tecnologías Utilizadas

- **MongoDB**: Base de datos NoSQL para almacenar datos de usuarios, playlists, canciones, etc.
- **Express**: Framework de Node.js para construir la API del backend.
- **React**: Biblioteca de JavaScript para construir la interfaz de usuario.
- **Node.js**: Entorno de ejecución para el backend.
- **Tailwind CSS**: Framework de CSS para estilizar la aplicación.
- **Vite**: Herramienta de construcción rápida para proyectos de frontend.

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/spotify-clone.git
   cd spotify-clone
   ```

2. Instala las dependencias del backend:

   ```bash
   cd backend
   npm install
   ```

3. Instala las dependencias del frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Configuración

Crea un archivo `.env` en la carpeta `backend` con las siguientes variables de entorno:

```
MONGO_URI=tu_mongo_uri
JWT_SECRET=tu_jwt_secret
```

## Ejecución

Para iniciar el servidor backend, ejecuta:

```bash
cd backend
npm run dev
```

Para iniciar el servidor frontend, ejecuta:

```bash
cd frontend
npm run dev
```

## Estructura del Proyecto

```
spotify-clone/
├── backend/        # Código del servidor backend
├── frontend/       # Código del cliente frontend
└── README.md       # Este archivo
```

## Características

- Autenticación de usuarios (registro e inicio de sesión)
- Creación y gestión de playlists
- Reproducción de canciones
- Búsqueda de canciones y artistas

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
