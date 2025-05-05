const Author = require('../models/Author');

const getAllAuthors = async (req, res) => {
    try {
        const autores = await Author.find().populate('libros');
        res.json(autores);
    } catch (error) {
        res.status(500).json({message: "Error al obtener los autores", error})
    }
}

const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('libros');

        if(!author) {
            return res.status(404).json({message: "El author no existe"});
        }

        res.json(author);
    } catch (error) {
        res.status(500).json({message: "Error al obtener el author por id", error})
    }
}
const createAuthor = async (req, res) => {
    const { nombre, bio, fechaNacimiento, nacionalidad, libros} = req.body;
    try {
        const newAutor = new Author({
            nombre,
            bio,
            fechaNacimiento,
            nacionalidad,
            libros
        })
        await newAutor.save();
        res.status(201).json(newAutor)
    } catch (error) {
        res.status(500).json({message: "Error al crear Author", error})
    }
}
const updateAuthor = async (req, res) => {
    const {id } = req.params;
    const { nombre, bio, fechaNacimiento, nacionalidad, libros} = req.body;
    try {
        const updatedAutor = await Author.findByIdAndUpdate(
            id, {
            nombre,
            bio,
            fechaNacimiento,
            nacionalidad,
            libros
        }, { new: true}
        )
        
        if(!updatedAutor) {
            return res.status(404).json({message: "El author no existe"});
        }

        res.json(updatedAutor);
    } catch (error) {
        res.status(500).json({message: "Error al update el author", error})
    }
}
const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAuthor = await Project.findByIdAndDelete(id);
        if (!deletedAuthor) {
            return res.status(404).json({ message: "Author no encontrado" });
        }

        res.json({ message: "Author eliminado correctamente", author: deletedAuthor });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el author", error });
    }
};
const addBook = async (req, res) => {
    const { id , bookId} = req.params;
    try {
        const author = await Author.findById(id);
        if(!author) {
            return res.status(404).json({message: "Author no encontrado"});
        }

        //evitar duplicados
        if(author.includes(bookId)) {
            return res.status(404).json({message: "Libro ya esta asignado a este Author"});
        }
        //agregar al libro
        author.libros.push(bookId);
        await author.save();

        res.json(author)
    } catch (error) {
        res.status(500).json({ message: "Error al agregar un libro", error });
    }
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    addBook
}