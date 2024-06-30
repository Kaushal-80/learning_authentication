import { Users } from "@/models/authentication";
import { NextResponse } from "next/server";
import bcrypt from"bcryptjs"
import jwt from "jsonwebtoken";
import { connectDB } from "@/helper/db2";



export async function POST(request){
    const {email, password} = await request.json();
    try {
        await connectDB();
        //1.step
        const user = await Users.findOne({
            email:email,
        });

        if(user == null) {
            throw new Error("user not found");
        }

        //2.step
        const matched = bcrypt.compareSync(password, user.password)
        if(!matched){
            throw new Error("password not matched");
        }


        //3.step
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
        }, process.env.JWT_KEY);

        const response = NextResponse.json(user,{
            message: "Login successfull",
            
        }, {status: 200})

        response.cookies.set("auth-token", token, {
            expiresIn: "1d",
            httpOnly: true,
        });

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Error in login"}, {status: 500})
    }
}