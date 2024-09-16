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

# Exportar los archivos estáticos de Next.js
RUN npm run export

# Instalar 'serve' para servir los archivos estáticos
RUN npm install -g serve

# Exponer el puerto en el que la app se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["serve", "-s", "out"]