import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
    {
        id: {type: String},
        ordemDeCompra: {type: String, max: 30, required: true},
        client: {type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true},
        dataDeEmissao: {type: Date, required: true},
        previsaoDeChegada: {type: Date, required: true}
    }
)

const Invoice = mongoose.model('invoice', invoiceSchema);

export default Invoice;