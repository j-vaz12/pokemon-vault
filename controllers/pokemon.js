const Pokemon = require("../models/pokemon");

const baseUrl = 'https://pokeapi.co/api/v2/';
module.exports = {
    getPokemon,
    create,
    index,
}

async function index(req, res) {
   pokemon = await Pokemon.find({vault: req.user._id});
    res.render('pokemon/vault', { pokemon });
}
async function getPokemon(req, res) {
    try {
        const pokemon = await fetch(`${baseUrl}/pokemon/${req.query.pokemon}`).then(res => res.json());
        // console.log(pokemon)
        res.render('pokemon/index', {pokemon});
    } catch (err) {
        console.log('err')
        res.render('pokemon/index', {pokemon: null,});
    }
}

async function create(req, res) {
    // console.log(req.body)
    
    let pokemon = await Pokemon.exists({pokemonID: req.body.pokemonID});
    console.log('pokemon', pokemon)
     if (pokemon) {
        console.log('already exists')
        let poke = await Pokemon.findById(pokemon._id)
        console.log(poke)
        if (!poke.vault.includes(req.user._id)) {
            poke.vault.push(req.user._id);
            await poke.save();
        }
    } else {
        console.log('adding new pokemon' )
        req.body.vault = req.user._id
        pokemon = await Pokemon.create(req.body)
        await pokemon.save();
        pokemon.vault.push(req.user_id);
    }
    res.redirect(`/pokemon/${req.user._id}/vault`)
    // res.redirect(`/pokemon/${req.body.vault.user_id}`)
    // res.redirect(`/pokemon/${req.user._id}`)
    console.log(pokemon)
}