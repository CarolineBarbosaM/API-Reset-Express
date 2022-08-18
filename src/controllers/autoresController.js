import autores from '../models/Autor.js';

class AutorController {

    static listarAutores = ((req, res) => {
        autores.find((err, autor) => {
            res.status(200).json(autor)
        })
    });

    static listarAutorPorId = ((req, res) => {
        const id = req.params.id;

        autores.findById(id, (err, autor) => {
            if(err) {
                res.status(400).send({ message: `${ err.message } - Falha ao listar um novo Autor` })
            } else {
                res.status(200).send(autor)
            }
        })
    })

    static cadastrarAutor = ((req, res) => {
        let autor = new autores(req.body)
        autores.save((err) => {
            if(err) {
                res.status(500).send({ message: `${ err.message } - Falha ao cadastrar um novo Autor` })
            } else {
                res.status(201).send(autor.toJSON())
            }
        })
    })

    static atualizarAutor = ((req, res) => {
        const id = req.params.id;
        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({ message: 'Autor atualizado com sucesso!' })
            } else {
                res.status(500).send({ message: `${ err.message } - Falha ao atualizar um novo Autor` })
            }
        })
    })

    static deletarAutor = ((req, res) => {
        const id = req.params.id;
        autores.findByIdAndRemove(id, (err) => {
            if(!err) {
                res.status(200).send({ message: 'Autor deletado com sucesso!' })
            } else {
                res.status(500).send({ message: `${ err.message } - Falha ao deletar um novo Autor` })
            }
        })
    })
}

export default AutorController;