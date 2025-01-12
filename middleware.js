import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Import getToken to check JWT

export async function middleware(request) {
  const response = NextResponse.next();

  // Set CORS headers
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://news-blog-web.vercel.app"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle preflight requests (OPTIONS method)
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: response.headers,
      status: 200,
    });
  }

  // Get the session token from the request
  const token = await getToken({ req: request });

  // If no token is found, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists, allow the request to proceed
  return response;
}

// Apply middleware to protect the dashboard route
export const config = {
  matcher: "/dashboard/:path*",
};
