const express = require('express')
const mongoose = require('mongoose')
require ('dotenv').config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');
app.use('/libros', bookRoutes);
app.use('/autors', authorRoutes);


mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Conectado a Mongo"))
.catch(err => console.log("Error al conectar con Mongo", err))

app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`)
})