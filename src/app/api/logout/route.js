import { NextResponse } from "next/server";

export async function POST(request){
    const response = NextResponse.json({message: "Logout Out !!"},{status: 200})

    response.cookies.set("auth-token", "", {
        expires: new Date(0),
    });

    return response;
}