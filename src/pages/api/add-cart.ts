import { Cart, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOption } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function addCart(userId: string, item: Omit<Cart, 'id' | 'userId'>) {
  try {
    const response = await prisma.cart.create({
      data: {
        userId,
        ...item,
      },
    });

    console.log(response);
    // productIds : '1,2,3' String 으로 저장
    return response;
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
  const { item } = JSON.parse(req.body);
  if (session == null) {
    res.status(200).json({ items: [], message: `no session ` });
    return;
  }
  try {
    const wishlist = await addCart(String(session.user.id), item);
    res.status(200).json({ items: wishlist, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
