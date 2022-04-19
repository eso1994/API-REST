import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id: {type: String},
        email: {type: String, max: 50, required: true},
        password: {type: String, required: true},
        ativo: {type: Boolean, default: true}
    }
)

const User = mongoose.model('user', userSchema);

export default User;