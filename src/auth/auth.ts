import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "../db/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserByEmail } from '@/yap/db/services/users';
import { verifyUser } from "./verify";
import UserModel from "../db/models/UserModel";
import { emailValidator } from "../libs/validators";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const emailValidation = emailValidator.safeParse(credentials.email);
        if (!emailValidation.success) {
            throw new CredentialsSignin(emailValidation.error.message);
        }
        
        // are fields filled
        if (credentials.email === null || typeof(credentials.email) !== 'string' || credentials.password === null || typeof(credentials.password) !== 'string')
            return null;

        let user: UserModel | null = null;
        // check if user exists in database
        try {
          user = await getUserByEmail(credentials.email);
        } catch (e) {
          throw new CredentialsSignin("Invalid email or password");
        }

        if (user === null || !verifyUser(user, credentials.password))
          throw new CredentialsSignin("Invalid email or password")
        
        return user;
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7 // 1 week
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
    session: async ({ session, token, user }) => {
      if (token) {
        session.userId = token.id as string;
        session.user.id = token.id as string;

        session.user.name = token.name;
        session.user.image = token.picture;
        if (token.email)
          session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin'
  }
})