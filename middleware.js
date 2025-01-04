import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function middleware(request) {
  const session = await getSession({ req: request });

  // If no session, redirect to the login page
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If session exists, allow the request to proceed
  return NextResponse.next();
}

// Apply middleware to protect the dashboard route
export const config = {
  matcher: "/dashboard/:path*",
};
