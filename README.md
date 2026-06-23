# 🍰 Recetario Maestro

¡Bienvenido a Recetario Maestro! Una aplicación web diseñada para que los amantes de la cocina puedan descubrir, explorar y guardar sus recetas favoritas. Todo esto envuelto en una interfaz moderna, limpia y con un estilo rosa pastel muy cuidado.

## ✨ ¿Qué contiene este proyecto?

Esta aplicación cuenta con varias funcionalidades clave:

- **Catálogo de Recetas:** Una página principal donde puedes explorar diferentes platos, ver su tiempo de preparación, dificultad y más detalles.
- **Autenticación Segura:** Sistema de registro e inicio de sesión. Utilizamos JWT (JSON Web Tokens) guardados en cookies para mantener tu sesión activa de forma segura.
- **Sistema de Favoritos:** ¿Te gustó una receta? Puedes marcarla como favorita. Estas se guardan en tu cuenta y puedes acceder a ellas fácilmente desde la sección "Mis Favoritos".
- **Correos de Bienvenida:** Al registrarte, recibirás un correo electrónico de bienvenida automático con un diseño bonito (configurado mediante Nodemailer).
- **Diseño Responsivo:** Se adapta perfectamente tanto a computadoras de escritorio como a dispositivos móviles.

## 🛠️ Tecnologías que utilizamos

- **Frontend:** Next.js (App Router), React, Tailwind CSS (para darle ese toque rosa pastel) y componentes de HeroUI.
- **Backend:** Next.js Server Actions y API Routes.
- **Base de Datos:** MongoDB con Mongoose para gestionar usuarios, recetas y favoritos.
- **Seguridad y Utilidades:** `bcryptjs` para encriptar contraseñas, `jsonwebtoken` para manejar las sesiones y `nodemailer` para el envío de correos.

## 🚀 Cómo correr el proyecto en tu computadora

Sigue estos pasos para tener la aplicación funcionando de forma local:

### Requisitos previos

Asegúrate de tener instalado:
- **Node.js** (versión 18 o superior recomendada).
- Una cuenta en **MongoDB Atlas** (o MongoDB corriendo localmente) para la base de datos.
- Una cuenta de correo (ej. Gmail) para configurar el envío de emails.

### Pasos de instalación

1. **Clona el repositorio** o descarga los archivos en tu computadora.
2. Abre una terminal en la carpeta del proyecto y **descarga las dependencias** corriendo el siguiente comando:
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo llamado `.env` en la raíz del proyecto basándote en el `.env.local` si existe. Deberá contener lo siguiente:

   ```env
   # Conexión a la base de datos
   MONGODB_URI=tu_url_de_conexion_a_mongodb

   # Secreto para firmar los tokens (puedes poner cualquier cadena de texto segura)
   JWT_SECRET=tu_secreto_super_seguro

   # Configuración de correo (para los mensajes de bienvenida)
   EMAIL_USER=tu_correo@gmail.com
   EMAIL_PASS=tu_contraseña_de_aplicacion_gmail

   # URL de tu app (útil para links en correos)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
   *Nota: Si usas Gmail, recuerda generar una "Contraseña de aplicación" en los ajustes de seguridad de Google.*

4. **¡Enciende el servidor local!**
   Una vez configurado todo, arranca el entorno de desarrollo con:
   ```bash
   npm run dev
   ```

5. **Abre tu navegador** y ve a `http://localhost:3000`. ¡Listo! Ya puedes empezar a explorar recetas.

## 💡 Notas adicionales
- **Recetas de prueba:** Si tu base de datos está vacía, asegúrate de tener alguna forma de insertar recetas de prueba en la colección `recipes` de MongoDB para que el catálogo no aparezca vacío, o créalas directamente desde la base de datos.
