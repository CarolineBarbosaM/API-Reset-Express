import mongoose from "mongoose";

const AutorSherma = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        nacionalidade: {type: String}
    },
    {
        versionKey: false
    }
);

const autores = mongoose.model('autores', AutorSherma)

export default autores