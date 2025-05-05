const express = require('express');
const router = express.Router();

const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    addBook
} = require('../controllers/authorController');


router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', createAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);
router.put('/:id/addBook/:bookId', addBook);

module.exports = router;
