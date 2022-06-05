## Description

API REST creada mediante Nest.js para el manejo de la base de datos del TFM.

## Installation

```bash
$ npm install
```

## Configuration
Antes de poder ejecutar la API, se necesita crear un fichero .env en la raiz del proyecto, a la altura de la carpeta src y el package.json. Este fichero contendrá las variables necesarias para realizar la conexión con la base de datos, esto se proporciona en la entrega del proyecto, en el fichero environment. Copiar el contenido de ese fichero dentro de nuestro .env que acabamos de crear.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# REST API

Ejemplo de llamada a la API REST.

## Get eventos

### Request

`GET /api/eventos`

    http://localhost:3000/api/eventos
