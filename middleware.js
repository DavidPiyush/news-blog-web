// Apply middleware to protect the dashboard route

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Import getToken to check JWT

export async function middleware(request) {
  // Get the session token from the request
  const token = await getToken({ req: request });

  // If no token is found, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists, allow the request to proceed
  return NextResponse.next();
}

// Apply middleware to protect the dashboard route
export const config = {
  matcher: "/dashboard/:path*",
};
