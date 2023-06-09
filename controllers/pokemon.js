const Pokemon = require("../models/pokemon");
const User = require("../models/user");
const baseUrl = 'https://pokeapi.co/api/v2/';
module.exports = {
    getPokemon,
    create,
    index,
    delete: deleteOne,
    getAll,
}

async function getAll(req, res) {
    const pokemonStatus = await fetch(`${baseUrl}/pokemon?limit=151`).then(res => res.json()); 
    // console.log(pokemon)
    const pokemon= await Promise.all(pokemonStatus.results.map(p=> fetch(p.url).then(res => res.json())));
    res.render('pokemon/allPokeIndex', { pokemon })
}


async function deleteOne(req, res) {
    let pokemon = await Pokemon.findOne({_id: req.params.id});
    console.log(pokemon)
    pokemon.vault.remove(req.user._id)
    console.log('removed', pokemon)
    await pokemon.save();
    res.redirect(`/pokemon`)
}

async function index(req, res) {
   pokemon = await Pokemon.find({vault: req.user._id,});
   user = await User.find({user: req.user._id})
//    user = User.name
    res.render('pokemon/index', { pokemon, user: req.user});
}
async function getPokemon(req, res) {
    try {
        const pokemon = await fetch(`${baseUrl}/pokemon/${req.query.pokemon.toLowerCase()}`).then(res => res.json());
        if (pokemon.species.name === '') {
            return 
        }
        // console.log(pokemon)
        res.render('pokemon/search', {pokemon});
    } catch (err) {
        console.log('err')
        res.render('pokemon/search', {pokemon: null,});
    }
}

async function create(req, res) {
    // console.log(req.body)
    
    // let pokemon = await Pokemon.exists({pokemonID: req.body.pokemonID});
    let pokemon = await Pokemon.findOne({pokemonID: req.body.pokemonID})
    // console.log('pokemon', pokemon)
     if (pokemon) {
        console.log('already exists')
        if (!pokemon.vault.includes(req.user._id)) {
            pokemon.vault.push(req.user._id);
            await pokemon.save();
        }
    } else {
        console.log('adding new pokemon' )
        req.body.vault = req.user._id
        pokemon = await Pokemon.create(req.body)
        await pokemon.save();
    }
    res.redirect(`/pokemon`)
    // res.redirect(`/pokemon/${req.body.vault.user_id}`)
    // res.redirect(`/pokemon/${req.user._id}`)
    console.log(pokemon)
}