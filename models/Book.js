const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    resumen: {type: String, required: true},
    resumen: {
        type: String,
        enum: ["novela", "poesia", "ensayo"],
        default: "novela"
    },
    publicacion : {type: Date, required: true},
    disponible: {type: Boolean, required: true}
})

module.exports = mongoose.model('Book', bookSchema)