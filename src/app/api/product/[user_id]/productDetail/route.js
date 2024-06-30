import { connectDB } from "@/helper/db2";
import { Products } from "@/models/productSchema";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    const userId = params.user_id;

    try{
        await connectDB();
        const products = await Products.find({
            userId: userId,
        });
        return NextResponse.json(products)
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}