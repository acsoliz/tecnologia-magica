# Usar una imagen base oficial de Node.js
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que usa la aplicación (3000 es el puerto por defecto)
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "start"]
