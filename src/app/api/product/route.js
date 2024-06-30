import { connectDB } from "@/helper/db2";
import { Products } from "@/models/productSchema";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request){
    const {product, description, userId} = await request.json();

    const token = request.cookies.get("auth-token")?.value
    const data = jwt.verify(token, process.env.JWT_KEY);

    console.log(data._id);

    try {
        await connectDB();
        const newProduct = new Products({
            product,
            description,
            userId: data._id,
        })

        await newProduct.save();
        return NextResponse.json({message: "product added successfully"}, {status: 200});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "error in addng product in the cart"}, {status: 500});
    }

    
}