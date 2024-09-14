# Dockerfile para el Frontend (Next.js)
FROM node:20

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar la aplicación Next.js para producción
RUN npm run build

# Exponer el puerto en el que la app se ejecutará
EXPOSE 3001

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "start"]
