const express = require('express');
const router = express.Router();
const pokemonCtrl = require('../controllers/pokemon');
const ensureLoggedIn = require('../config/ensureLoggedIn')
router.get('/search', ensureLoggedIn, pokemonCtrl.getPokemon);
router.post('/', ensureLoggedIn, pokemonCtrl.create);
router.get('/', ensureLoggedIn, pokemonCtrl.index);
router.get('/allPokeIndex', ensureLoggedIn, pokemonCtrl.getAll)
router.delete('/:id', ensureLoggedIn, pokemonCtrl.delete);


module.exports = router;