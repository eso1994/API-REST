import Client from '../models/Client.js';
import { clientValidation, ifExistsCreate, ifExistsUpdate } from '../services/clientValidations.js';

class ClientController {

    static createClient = async (req, res) => {

        const { razaoSocial, nomeFantasia, CNPJ, email, telefone } = req.body;


        let validation = await clientValidation(res, razaoSocial, nomeFantasia, CNPJ, email, telefone);

        if (!validation.valid)
            return

        let existsValidation = await ifExistsCreate(res, razaoSocial, nomeFantasia, CNPJ, email, telefone);

        if (!existsValidation.valid)
            return


        const client = new Client({
            razaoSocial,
            nomeFantasia,
            CNPJ,
            email,
            telefone,
        })

        try {

            await client.save()

            return res.status(201).json({ msg: 'Client registered successfuly' })

        } catch (error) {

            console.log(error)

            return res.status(500).json({ msg: 'There was an error on the server. Please try again later' })

        }

    }

    static searchClient = async (req, res) => {
        Client.find((_, client) => {
            res.status(200).json(client)
        })
    }

    static searchClientById = async (req, res) => {

        const { id } = req.params;

        Client.findById(id, (err, client) => {
            if (err) {
                res.status(404).send(err)
            } else {
                res.status(200).json(client)
            }
        })
    }

    static updateClient = async (req, res) => {

        const { razaoSocial, nomeFantasia, CNPJ, email, telefone } = req.body;
        const { id } = req.params;

        let validation = await clientValidation(res, razaoSocial, nomeFantasia, CNPJ, email, telefone);

        if (!validation.valid)
            return

        let validationExists = await ifExistsUpdate(res, razaoSocial, nomeFantasia, CNPJ, email, telefone, id);

        if (!validationExists.valid)
            return

        Client.findByIdAndUpdate(id, { $set: req.body }, err => {
            if (!err) {
                res.status(200).json({ msg: 'Client successfuly update' })
            } else {
                res.status(500).json({ msg: err.message })
                console.log(err.code)
            }
        })

    }

    static deleteClient = async (req, res) => {

        const { id } = req.params;

        Client.findByIdAndDelete(id, err => {
            if (err) {
                console.log(err)
                res.status(500).json({ msg: "There was an error on the server. Please try again later" })
            } else {
                res.status(200).json({ msg: 'Client has been deleted'})
            }
        })
    }

}

export default ClientController