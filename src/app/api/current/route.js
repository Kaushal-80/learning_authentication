import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Users } from "@/models/authentication";

export async function GET(request) {
    const token = request.cookies.get("auth-token")?.value;
    // console.log("current api: ",token);
    const data = jwt.verify(token, process.env.JWT_KEY);
    // console.log("current data: ",data);
    await connectDB();
    const user = await Users.findById(data._id).select("-password");

    return NextResponse.json(user);
}