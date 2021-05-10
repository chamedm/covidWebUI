
## FRONT-END##

# traemos la imagen de node 12 con kernel de alpine
FROM node:12-alpine
# cremos el directorio de la app
WORKDIR /usr/src/app
# copiamos el archivo a nuestra carpeta 
COPY package*.json ./
# instalamos las dependencias
RUN npm install
# copiamos todo al directorio de trabajo
COPY . .
# exponemos el puerto
EXPOSE 3000
# start app

# start app
CMD ["npm", "start"]  