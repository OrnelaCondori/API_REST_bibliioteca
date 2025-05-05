const express = require('express');
const router = express.Router();

const {
    getAllBooks,
    getBookById,
    createLibro,
    updateLibro,
    deleteLibro
} = require('../controllers/bookController');


router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createLibro);
router.put('/:id', updateLibro);
router.delete('/:id', deleteLibro);

module.exports = router;