import express from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);
const jsonFile = '../productos.json';

const app = express();
app.get('/products', (req, res) => {
    let productos = fs.readFileSync(path.resolve(__dirname,jsonFile),"utf-8");
    console.log(typeof(productos));
    res.send(JSON.parse(productos));
});

app.get('/usuario', (req, res) => {
    res.send({
        nombre: 'Juan',
        apellido: 'Perez',
        edad: 25,
        correo: 'juan.perez@coderhouse.com'
    })
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});

// Path: src\app.js