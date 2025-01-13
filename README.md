# Course-Manager

## Descripción del Proyecto: Course-Manager
El proyecto Course-Manager es una aplicación web diseñada para gestionar cursos y usuarios. La aplicación está dividida en dos partes principales: el frontend y el backend. A continuación se describe la arquitectura, las librerías utilizadas y la configuración del proyecto.

## Arquitectura
Frontend: Desarrollado con Angular, se encarga de la interfaz de usuario y la interacción con el usuario.
Backend: Desarrollado con Node.js y Express, maneja la lógica del negocio y la comunicación con la base de datos.
Base de Datos: Utiliza MySQL para almacenar la información de los cursos y usuarios.

    +-------------+       +---------------+         +--------------+
    |   Cliente   |       |    Proxy      |         |   Backend    | 
    |  (Frontend) |＜---->|   Server      | ＜----> |  (Node.js)   |
    +-------------+       +---------------+         +--------------+

## Instrucciones de uso

> [!IMPORTANT]
> Es necesario tener Docker instalado en su máquina para desplegar el proyecto localmente. Asegúrese de tener Docker Engine y Docker Compose configurados correctamente. Puede descargar Docker desde [Docker Hub](https://www.docker.com/products/docker-desktop) y seguir las instrucciones de instalación para su sistema operativo.

Clonamos el repositorio del proyecto:

    $ git clone https://github.com/MiguelAngelBarreraDiaz/Course-Manager/tree/main
    $ cd Course-Manager
    $ docker-compose up --build

Una vez ingrese a la aplicación va a acceder por la siguiente url:

    http://localhost/login
    
    Para ingresar a la aplicación use las siguientes credenciales:

    email: admin@example.com
    password: adminpassword

