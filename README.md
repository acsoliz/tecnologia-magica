# Proyecto de Gestión de Incidencias

Este es un proyecto de gestión de incidencias que incluye un frontend y un backend, ambos dockerizados utilizando `docker-compose`. A continuación, encontrarás información sobre cómo configurar y ejecutar el proyecto, así como detalles sobre los componentes del mismo.

## Estructura del Proyecto

El proyecto está organizado en las siguientes carpetas:

- `incident-management-backend`: Contiene el código del backend.
- `plataforma-epica`: Contiene el código del frontend.

Además, el proyecto incluye los siguientes archivos relevantes:

- `.dockerignore`: Define qué archivos y carpetas deben ser ignorados por Docker.
- `.gitattributes`: Configuraciones específicas de Git para el proyecto.
- `.gitignore`: Archivos y carpetas que Git debe ignorar.
- `docker-compose.yml`: Archivo de configuración para Docker Compose.

## Requisitos

- Docker
- Docker Compose

## Configuración y Ejecución

Para iniciar el proyecto, sigue estos pasos:

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

Memoria actualizada
Aquí tienes un ejemplo de un archivo README.md para la raíz de tu proyecto. Puedes ajustarlo según los detalles específicos de tu aplicación:

markdown
Copiar código
# Proyecto de Gestión de Incidencias

Este es un proyecto de gestión de incidencias que incluye un frontend y un backend, ambos dockerizados utilizando `docker-compose`. A continuación, encontrarás información sobre cómo configurar y ejecutar el proyecto, así como detalles sobre los componentes del mismo.

## Estructura del Proyecto

El proyecto está organizado en las siguientes carpetas:

- `incident-management-backend`: Contiene el código del backend.
- `plataforma-epica`: Contiene el código del frontend.

Además, el proyecto incluye los siguientes archivos relevantes:

- `.dockerignore`: Define qué archivos y carpetas deben ser ignorados por Docker.
- `.gitattributes`: Configuraciones específicas de Git para el proyecto.
- `.gitignore`: Archivos y carpetas que Git debe ignorar.
- `docker-compose.yml`: Archivo de configuración para Docker Compose.

## Requisitos

- Docker
- Docker Compose

## Configuración y Ejecución

Para iniciar el proyecto, sigue estos pasos:

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2. **Construir y ejecutar los contenedores**  

Utiliza Docker Compose para construir y ejecutar los contenedores de la aplicación:

    ```bash
    docker-compose up --build
    ```
Esto construirá las imágenes necesarias y levantará los contenedores para el frontend y el backend.
Acceder a la aplicación

3. **Acceder a la aplicacion**

- Frontend: Accede a la aplicación frontend en http://localhost:3000 (ajusta el puerto si es necesario).

- Backend: El backend se ejecuta en el puerto configurado en el docker-compose.yml (generalmente no es necesario acceder directamente al backend).

**Credenciales de Usuario**
- Para acceder a la aplicación, puedes usar las siguientes 

credenciales:

Usuario Admin
Username: centinela
Password: CodeLandia

Usuario Regular
Username: padawan
Password: CodeLandia

Estas credenciales están preconfiguradas en el sistema para facilitar el acceso durante el desarrollo y las pruebas.

**Estructura de Docker**
El archivo `docker-compose.yml` está configurado para construir y ejecutar los siguientes servicios:

Frontend: Se basa en la imagen construida desde la carpeta plataforma-epica.

Backend: Se basa en la imagen construida desde la carpeta incident-management-backend.

Base de datos: Usa la imagen oficial de PostgreSQL.

