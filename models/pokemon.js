const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    pokemonID: {
        type: Number
    },
    name: {
        type: String
    },
    img: {
        type: String
    },
    type: {
        type: String
    },
    likes: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    vault: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    //     String,
    // img: URL,
    // type: String,
    // likes: [userId]
});


module.exports = mongoose.model('Pokemon', pokemonSchema)