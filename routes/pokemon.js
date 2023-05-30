const express = require('express');
const router = express.Router();
const pokemonCtrl = require('../controllers/pokemon');

router.get('/search', pokemonCtrl.getPokemon);
router.post('/', pokemonCtrl.create);
router.get('/', pokemonCtrl.index);
router.get('/', pokemonCtrl.getAll)
router.delete('/:id', pokemonCtrl.delete);


module.exports = router;