import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
    {
        id: {},
        ordemDeCompra: {},
        client: {},
        dataDeEmissao: {},
        previsaoDeChegada: {}
    }
)