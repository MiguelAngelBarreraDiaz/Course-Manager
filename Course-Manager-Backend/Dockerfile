# Usa una imagen base ligera de Node.js
FROM node:18-alpine

# Crea y establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del package.json e instala las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código al contenedor
COPY . ./

# Expone el puerto donde se ejecutará el servicio
EXPOSE 3000

# Definir el comando para ejecutar la aplicación
CMD ["npm", "start"]