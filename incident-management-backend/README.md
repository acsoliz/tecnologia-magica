# Incident Management Backend

Bienvenido al backend de la plataforma de gestión de incidencias, un sistema para registrar y rastrear incidencias con autenticación basada en JWT y paginación de resultados. Este proyecto está diseñado para funcionar con Docker y se basa en NodeJS, PostgreSQL y Sequelize.

## Funcionalidades

1. **Login del Guerrero del Código**
   - Los usuarios pueden iniciar sesión utilizando sus credenciales mediante la api de auth/login.

2. **Listado de Incidencias con Paginación y Filtros**
   - Visualización de incidencias paginadas.
   - Filtros disponibles:
     - Estado: Abiertas o Cerradas.
     - Asignación: Sin Asignación, Asignadas a Mí o Asignadas a Otros.

3. **Tabla de Incidencias con Detalles**
   - Columnas mostradas:
     - Fecha de Creación
     - Título de la Incidencia
     - Estado
     - Persona Asignada
     - Prioridad

4. **Gestión de Incidencias**
   - Los usuarios pueden asignarse incidencias a sí mismos.
   - Cambiar el estado de una incidencia a Abierta o Cerrada.

5. **Autenticación y Autorización**
   - Implementación de JWT para la autenticación.
   - Guards para proteger rutas y controlar el acceso basado en roles.

## Tecnologías Utilizadas

- **Backend**: NodeJS con Express
- **Base de Datos**: PostgreSQL con Sequelize
- **Autenticación**: JWT
- **Docker**: Para contenedorización y despliegue

## Instalación y Ejecución

### Requisitos Previos

- Docker y Docker Compose instalados en tu máquina.

### Pasos para Levantar la Aplicación

1. **Clona el Repositorio**

   git clone <URL_DEL_REPOSITORIO>
   cd incident-management-backend

2. **Clona el Repositorio**

    docker build -t incident-management-backend
    docker-compose up

3. **Acceso a la aplicación**
- La aplicación estará disponible en http://localhost:3000.

4. **Configuración**
Asegúrate de configurar las variables de entorno necesarias en un archivo .env. Aquí tienes un ejemplo básico de .env:
    DB_NAME=nombre_base_datos
    DB_USER=usuario
    DB_PASSWORD=contraseña
    DB_HOST=localhost
    DB_PORT=5432



