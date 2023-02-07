import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOption } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function getCart(userId: string) {
  try {
    const cart =
      await prisma.$queryRaw`SELECT c.id, userId, quantity, amount, price ,name,image_url,productId FROM Cart as c JOIN products as p WHERE c.productId = p.id AND c.userId=${userId}`;

    console.log(cart);
    return cart;
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
  const session = await getSession({ req });
  // console.log(session?.user.id);
  if (session == null) {
    res.status(200).json({ items: [], message: `no Session ` });
    return;
  }
  try {
    const wishlist = await getCart(String(session.user.id));
    res.status(200).json({ items: wishlist, message: `Success 맞어?` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
