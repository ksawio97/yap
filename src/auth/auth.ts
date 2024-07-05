import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "../db/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
// Your own logic for dealing with plaintext password strings; be careful!;
import { getUserByEmail } from '@/yap/db/services/users';
import { verifyUser } from "./verify";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        // Check if the user exists in your database
        if (credentials.email === null || typeof(credentials.email) !== 'string' || credentials.password === null || typeof(credentials.password) !== 'string')
            return null;
        const user = await getUserByEmail(credentials.email);
        if (user === null)
          return null;
        if (verifyUser(user, credentials.password))
          return user;
        return null;
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.userId = token.id as string;
        session.user.id = token.id as string;

        session.user.name = token.name;
        session.user.image = user.image;
        if (token.email)
          session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: undefined // If set, new users will be directed here on first sign in
  }
})