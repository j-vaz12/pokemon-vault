const express = require('express');
const router = express.Router();
const pokemonCtrl = require('../controllers/pokemon');

router.get('/search', pokemonCtrl.getPokemon);
router.post('/', pokemonCtrl.create);
router.get('/:id/vault', pokemonCtrl.index)

module.exports = router;