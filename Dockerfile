# Imagen base oficial de Node
FROM node:18-alpine

# Crear carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json primero (mejor práctica para cache)
COPY backend/package*.json ./backend/

# Instalar dependencias
WORKDIR /app/backend
RUN npm install

# Volver a la raíz y copiar todo el proyecto
WORKDIR /app
COPY . .

# Exponer el puerto
EXPOSE 4000

# Comando para iniciar la app
CMD ["node", "backend/server.js"]