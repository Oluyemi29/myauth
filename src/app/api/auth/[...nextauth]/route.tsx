"use server";
import prisma from "@/lib/db";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "joe@gmail.com" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const myEmail = credentials?.email;
        const myPasswrod = credentials?.password;

        const user = await prisma.user.findUnique({
          where: {
            email: myEmail,
          },
        });
        if (!user) {
          return null;
        }
        const verifiedEmail = user.emailVerified;
        if (verifiedEmail === null) {
          return null;
        }
        const confirmPassword = await bcrypt.compare(
          myPasswrod as string,
          user.password as string
        );
        if (user && confirmPassword) {
          const { password, ...others } = user;
          return others;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.user = user as User;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
} as AuthOptions;

const handler = NextAuth(authOptions as AuthOptions);

export { handler as POST, handler as GET };
