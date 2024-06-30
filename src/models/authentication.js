import mongoose, {Schema} from "mongoose"

const AuthSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

export const Users = mongoose.models.users || mongoose.model("users", AuthSchema )