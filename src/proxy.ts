


import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;


  if (pathname === "/") return NextResponse.next();


  const allowListStarts = [
    // "/login",        
    // "/api",         
    "/_next",       
    "/favicon.ico", 
    // "/public",     
  ];
  if (allowListStarts.some((p) => pathname.startsWith(p))) return NextResponse.next();

  
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  



   if (!token && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }


 


  if (pathname.startsWith("/login") && token) {
  if (token?.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (token?.role === "STAFF") {
    return NextResponse.redirect(new URL("/staff/dashboard", req.url));
  }
  // fallback for any other role
  return NextResponse.redirect(new URL("/", req.url));
}



 if(token){
   if (pathname.startsWith("/admin")) {
    if (token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (pathname.startsWith("/staff")) {
    if (token?.role !== "STAFF" && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

 }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api|favicon.ico).*)",
  ],
};
