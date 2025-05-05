const Book = require('../models/Book')

const getAllBooks = async (req, res) => {
    try {
        const libros = await Book.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({message: "Error al obtener los libros", error})
    }
}

const getBookById = async (req, res) => {
    try {
        const libro = await Book.findById(req.params.id);

        if(!libro) {
            return res.status(404).json({message: "El libro no existe"});
        }

        res.json(libro);
    } catch (error) {
        res.status(500).json({message: "Error al obtener el libro por id", error})
    }
}
const createLibro = async (req, res) => {
    const { titulo, resumen, genero, publicacion, disponible} = req.body;
    try {
        const newLibro = new Libro({
            titulo,
            resumen,
            genero,
            publicacion,
            disponible
        })
        await newLibro.save();
        res.status(201).json(newLibro)
    } catch (error) {
        res.status(500).json({message: "Error al ¿crear el libro", error})
    }
}
const updateLibro = async (req, res) => {
    const {id } = req.params;
    const { titulo, resumen, genero, publicacion, disponible} = req.body;
    try {
        const updatedLibro = await Libro.findByIdAndUpdate(
            id, {
            titulo,
            resumen,
            genero,
            publicacion,
            disponible
        }, { new: true}
        )
        
        if(!libro) {
            return res.status(404).json({message: "El libro no existe"});
        }

        res.json(updatedLibro);
    } catch (error) {
        res.status(500).json({message: "Error al ¿crear el libro", error})
    }
}
const deleteLibro = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLibro = await Book.findByIdAndDelete(id);
        if (!deletedLibro) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        res.json({ message: "Libro eliminado correctamente", book: deletedLibro });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el libro", error });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createLibro,
    updateLibro,
    deleteLibro
}