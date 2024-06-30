import { NextResponse } from "next/server";
import { Users } from "@/models/authentication";
import { connectDB } from "@/helper/db2";
import bcrypt from "bcryptjs";



// get api for login 
export async function GET(request) {
    try {
        await connectDB();
        const user = await Users.find().select("-password");
        return NextResponse.json(user, { status: "200" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "failed to get users" }, { status: "200" })
    }
}



//post api for signup 
export async function POST(request) {
    const { name, email, password } = await request.json();

    // Check if email already exists in database
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ message: 'Email already exists' });
    }

    const user = new Users({
        name,
        email,
        password,
    })

    try {
        user.password = bcrypt.hashSync(
            user.password,
            parseInt(process.env.BCRYPT_SALT)
        )
        const createdUser = await user.save();
        return NextResponse.json({ message: "User created successfully", createdUser }, { status: "200" })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "failed to create user" })
    }
}

