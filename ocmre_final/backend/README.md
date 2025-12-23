# Intrucciones para subir proyecto por primera vez

## Crear carpeta para el proyecto
- mkdir _ococmre_

## Clonar repositorio gitlab
- git clone -b main --depth 1 git@repo.defensoria.gob.pe:supervisiones/backend/ococmre.git backend

## Crear nueva rama de desarrollador
- cd backend
- git checkout -b dev-back-**_nombre-usuario_**

## Copiar todos los archivos de su proyecto a la carpeta _ococmre_ y luego ejecutar
- git add .
- git commit -m "Initial Commit"
- git push -u origin dev-back-**_nombre-usuario_**

# Generar un Merge Request en el servidor gitlab
- Ingresar el repositorio de su proyecto http://repo.defensoria.gob.pe/supervisiones/backend/ococmre
- En el menú *Merge Requests* genere un Merge Request desde la rama dev-back-**_nombre-usuario_** hacia la rama **main** 
