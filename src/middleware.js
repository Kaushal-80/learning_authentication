import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("middlerware executed")

    const authToken = request.cookies.get("auth-token")?.value;
    // console.log("middleware console log: ",authToken);

    if(request.nextUrl.pathname === '/api/login' ||
      request.nextUrl.pathname === '/api/auth'
    ){
      return;
    }

    const loginUserNotAccessPath = 
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

    if(loginUserNotAccessPath){
      if(authToken){
        return NextResponse.redirect(new URL("/", request.url))
      }
    } else{
      if(!authToken){

        try{
          if(request.nextUrl.pathname.startsWith("/api")){
            return NextResponse.json({
              message: "access denied !!"
            },{status: 401})
          } 
        }catch(error){
          console.log("error: ",error.message)
        }
        return NextResponse.redirect(new URL("/login", request.url))
        
      }
    }
    // return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/api/:path*",
    "/product/:path*",
    "/addProduct",
    "/showProduct"
  ],
}