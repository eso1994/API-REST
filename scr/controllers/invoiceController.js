import Invoice from '../models/Invoice.js';
import moment from 'moment';

class invoiceController {

    static createInvoice = async (req, res) => {
        let values = req.body;

        let previsaoDeChegada = moment(values.previsaoDeChegada, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:MM:SS');
        let dataDeEmissao = moment().format('YYYY-MM-DD HH:mm:ss');

        let previsaoDeChegadaValidation = moment(previsaoDeChegada).isSameOrAfter(dataDeEmissao);
        let ordemDeCompraValidation = await Invoice.findOne({ ordemDeCompra: values.ordemDeCompra });

        let validations = [{
            field: 'previsao de chegada',
            valid: previsaoDeChegadaValidation,
            err: 'Estimed arrival must be after the current date'
        }, {
            field: 'client',
            valid: !ordemDeCompraValidation,
            err: `Ordem de compra already registered. Please use another one`
        }]

        let err = validations.filter(key => key.valid !== true);
        let hasErr = err.length

        if (hasErr)
            return res.status(400).json(err);

        const invoice = new Invoice({ ...values, previsaoDeChegada, dataDeEmissao });

        try {
            await invoice.save()

            return res.status(201).json({ msg: 'Invoice has been created' })

        } catch (error) {
            console.log(error)

            return res.status(500).json({ msg: 'There was an error on the server. Plaease try again later' })
        }

    }

    static searchInvoice = (req, res) => {
        Invoice
            .find()
            .populate('client')
            .exec((_, invoice) => res.status(200).json(invoice))
    }

    static searchInvoiceById = (req, res) => {
        let { id } = req.params
        Invoice
            .findById(id)
            .populate('client')
            .exec((err, invoice) => {
                if (err) {
                    res.status(400).json({ msg: 'Invoice not found' })
                } else {
                    res.status(200).json(invoice)
                }
            })
    }

    static updateInvoice = (req, res) => {
        let { id } = req.params;
        let values = req.body;

        if (values.previsaoDeChegada) {
            let previsaoDeChegada = moment(values.previsaoDeChegada, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:MM:SS');
            let dataDeEmissao = moment().format('YYYY-MM-DD HH:mm:ss');
            let previsaoDeChegadaValidation = moment(previsaoDeChegada).isSameOrAfter(dataDeEmissao);

            let validations = {
                field: 'previsao de chegada',
                valid: previsaoDeChegadaValidation,
                err: 'Estimed arrival must be after the current date'
            };

            if (validations.valid == false)
                return res.status(400).json(validations.err);
        }

        Invoice.findByIdAndUpdate(id, { $set: values }, err => {
            if (err) {
                res.status(500).json(err.message)
            } else {
                res.status(200).json({ msg: 'Invoice successfully update' })
            }
        })
    }

    static deleteInvoice = (req, res) => {
        const { id } = req.params;

        Invoice.findByIdAndDelete(id, err => {
            if (err) {
                res.status(500).json({ msg: 'There was an error on the server please try again later' })
            } else {
                res.status(200).json({ msg: 'Invoice deleted successfully' })
            }
        })
    }

}

export default invoiceController;