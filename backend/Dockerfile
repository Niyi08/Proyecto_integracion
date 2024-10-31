# Usa una imagen base de Node.js
FROM node:14

# Crea y define el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json e instala dependencias
COPY package.json .
RUN npm install

# Copia el resto del código de la aplicación
COPY app.js .

# Expone el puerto 5000
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
