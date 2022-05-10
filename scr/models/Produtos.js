import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
    {
        id: {type: String},
        brand: {type: String, required: true},
        name: {type: String, required: true},
        price: {type: String, required: true}
    }
)

const Produto = mongoose.model('produto', produtoSchema);

export default Produto;