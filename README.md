# Spotify Clone

Este proyecto es un clon de Spotify construido utilizando el stack MERN (MongoDB, Express, React, Node.js), Tailwind v4 y Vite.

## Tecnologías Utilizadas

- **MongoDB**: Base de datos NoSQL para almacenar datos de usuarios, playlists, canciones, etc.
- **Express**: Framework de Node.js para construir la API del backend.
- **React**: Biblioteca de JavaScript para construir la interfaz de usuario.
- **Node.js**: Entorno de ejecución para el backend.
- **Tailwind CSS**: Framework de CSS para estilizar la aplicación.
- **Vite**: Herramienta de construcción rápida para proyectos de frontend.
- **Cloudinary**: Servicio de almacenamiento y gestión de imágenes y videos en la nube.
- **Clerk**: Servicio de autenticación y gestión de usuarios.

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
CLOUDINARY_CLOUD_NAME=tu_cloudinary_cloud_name
CLOUDINARY_API_KEY=tu_cloudinary_api_key
CLOUDINARY_API_SECRET=tu_cloudinary_api_secret
ADMIN_EMAIL=tu_admin_email
PORT=5000
```

Crea un archivo `.env.local` en la carpeta `frontend` con las siguientes variables de entorno:

```
VITE_CLERK_PUBLISHABLE_KEY=tu_clerk_publishable_key
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
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── seeds/
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── frontend/       # Código del cliente frontend
│   ├── src/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── utils/
│   │   └── main.tsx
│   ├── .env.local
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── LICENSE         # Archivo de licencia
└── README.md       # Este archivo
```

## Características

- Autenticación de usuarios con Google
- Creación y gestión de playlists
- Reproducción de canciones
- Búsqueda avanzada de canciones y artistas (🚧 en desarrollo)
- Subida y gestión de canciones
- Interfaz de usuario responsiva y moderna
- Soporte para múltiples idiomas (🚧 en desarrollo)
- Notificaciones en tiempo real (🚧 en desarrollo)
- Visualización de usuarios conectados y lo que están escuchando (🚧 en desarrollo)
- Chat en tiempo real con otros usuarios (🚧 en desarrollo)
- Modo oscuro y claro (🚧 en desarrollo)

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
