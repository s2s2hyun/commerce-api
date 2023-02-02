import { CLIENT_ID, CLIENT_SECRET } from 'src/constants/googleAuth';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
// import prisma from "../../../lib/prismadb"

const prisma = new PrismaClient();

const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60,
  },
};

export default NextAuth(authOption);
