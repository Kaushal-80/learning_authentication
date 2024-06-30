import mongoose, { Schema } from "mongoose"

const ProductSchema = new Schema({
    product: String,
    description: String,
    userId: {
        type: mongoose.ObjectId,
        required: true,
    },
})

export const Products = mongoose.models.products || mongoose.model("products", ProductSchema);