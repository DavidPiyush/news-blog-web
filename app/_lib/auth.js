// import { connectToDB } from "@/app/_lib/connectDB";
// import User from "@/models/UserModel";
// import bcrypt from "bcryptjs";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "youremail@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const { email, password } = credentials;

//           // Connect to the database
//           await connectToDB();

//           // Fetch user by email
//           const user = await User.findOne({ email });

//           if (!user) {
//             throw new Error("No user found with this email");
//           }

//           // Verify the password
//           const isMatch = await bcrypt.compare(password, user.password);

//           if (!isMatch) {
//             throw new Error("Incorrect password");
//           }

//           // Return user data for the session
//           return {
//             id: user._id.toString(),
//             name: user.name,
//             email: user.email,
//           };
//         } catch (error) {
//           throw new Error("Authentication failed: " + error.message);
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.email = token.email;
//       }
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login", // Custom Sign-In page
//   },

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.AUTH_SECRET,
// };

// export const { auth, signIn, signOut, GET, POST } = NextAuth(authOptions);
