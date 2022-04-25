import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
    {
        id: {type: String},
        razaoSocial: {type: String, max: 50, required: true},
        nomeFantasia: {type: String, max: 50, required: true},
        CNPJ: {type: String, max: 14, required: true},
        email: {type: String, max: 80, required: true},
        telefone: {type: String, max: 12, required: true}
    }
)

const Client = mongoose.model('client', clientSchema);

export default Client;