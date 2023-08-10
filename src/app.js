import express from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);
const jsonFile = '../productos.json';

const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/products', (req, res) => {
    

    let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname,jsonFile),"utf-8")).Productos;
    let id = req.params;
    console.log("El id solicitado es"+id);
    let limite = req.query.limit;
    if (limite == undefined) {
        res.send(productos)
    }
    else {
        let limiteProductos = [];
        for (let i = 0; i < limite; i++) {
            limiteProductos.push(productos[i]);
        }
        res.send(limiteProductos);
    }
});

app.get('/products/:id', (req, res) => {

    let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname,jsonFile),"utf-8")).Productos;
    const { id } = req.params;
    console.log("El id solicitado es "+id);

    const producto = function () {
        let busqueda = productos.find(element => element.id == id);
        if (busqueda == undefined) {
            console.log("No existe el producto "+id);
            return undefined;
        } else {
            
            return busqueda;
        }
    }();

    producto == undefined ? res.send("No existe el producto "+id) : res.send(producto);
});


app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});

// Path: src\app.js