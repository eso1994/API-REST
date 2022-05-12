import Produto from '../models/Produtos.js';
import apiProduto from '../services/apiProduto.js';

class ProdutoController {

    static createProduto = async (req, res) => {

        const { id } = req.body;

        const values = await apiProduto.apiFinder(id);

        const produto = new Produto(values);

        try {
            await produto.save()

            return res.status(201).json({ msg: 'Produto registered successfully' })

        } catch (error) {
            console.log(error)

            return res.status(500).json({ msg: 'There was an error on the server. please try again later' })
        }
    }

    static searchProduto = (req, res) => {
        Produto.find((_, produtos) => res.status(200).json(produtos))
    }

    static searchProdutoById = (req, res) => {
        const { id } = req.params;

        Produto.findById(id, (err, produto) => {
            if (err) {
                res.status(404).send(err)
            } else {
                res.status(200).json(produto)
            }
        })
    }

    static updateProduto = (req, res) => {
        const { id } = req.params;

        Produto.findByIdAndUpdate(id, { $set: req.body }, err => {
            if (!err) {
                res.status(200).json({ msg: 'Produto successfully updated' })
            } else {
                res.status(500).json({ msg: `${err.message} Produto update error` })
            }
        })
    }

    static deleteProduto = (req, res) => {
        const { id } = req.params;

        Produto.findByIdAndDelete(id, err => {
            if(err) {
                res.status(500).json({ msg: err.message })
            } else {
                res.status(200).json({ msg: 'Produto has been deleted' })
            }
        })
    }
}

export default ProdutoController;