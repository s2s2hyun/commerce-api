import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, categories } from '@prisma/client';
import jwtDecode from 'jwt-decode';

const prisma = new PrismaClient();

async function signUp(credential: string) {
  const decoded: { name: string; email: string; picture: string } =
    jwtDecode(credential);
  try {
    const response = await prisma.user.upsert({
      where: {
        email: decoded.email,
      },
      update: {
        name: decoded.name,
        image: decoded.picture,
      },
      create: {
        email: decoded.email,
        name: decoded.name,
        image: decoded.picture,
      },
    });
    console.log(decoded);
    return decoded;
  } catch (err) {
    console.log(err);
  }
}

type Data = {
  items?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { credential } = req.query;
  try {
    const tokens = await signUp(String(credential));
    res.status(200).json({ items: tokens, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
