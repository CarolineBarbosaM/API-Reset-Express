import { query } from 'express';
import livros from '../models/Livros.js';

class LivroController {

    static listarLivros = ((req, res) => {
        livros.find()
            .populate('autor')
            .exec((err, livro) => {
                res.status(200).json(livro)
            })
    });

    static listarLivroPorId = ((req, res) => {
        const id = req.params.id;

        livros.findById(id)
            .populate('autor', 'nome')
            .exec(
                (err, livros) => {
                if(err) {
                    res.status(400).send({ message: `${ err.message } - Falha ao listar um novo livro` })
                } else {
                    res.status(200).send(livros)
                }
            })
    })

    static listarLivroPorEditora = ((req, res) => {
        const editora = req.query.editora

        livros.find({'editora': editora}, {}, (err, livros) => {
            res.status(200).send(livros)
        })
    })


    static cadastrarLivro = ((req, res) => {
        let livro = new livros(req.body)
        livro.save((err) => {
            if(err) {
                res.status(500).send({ message: `${ err.message } - Falha ao cadastrar um novo livro` })
            } else {
                res.status(201).send(livro.toJSON())
            }
        })
    })

    static atualizarLivro = ((req, res) => {
        const id = req.params.id;
        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({ message: 'Livro atualizado com sucesso!' })
            } else {
                res.status(500).send({ message: `${ err.message } - Falha ao atualizar um novo livro` })
            }
        })
    })

    static deletarLivro = ((req, res) => {
        const id = req.params.id;
        livros.findByIdAndRemove(id, (err) => {
            if(!err) {
                res.status(200).send({ message: 'Livro deletado com sucesso!' })
            } else {
                res.status(500).send({ message: `${ err.message } - Falha ao deletar um novo livro` })
            }
        })
    })
}

export default LivroController;