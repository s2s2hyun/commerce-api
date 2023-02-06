import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

async function getWishlist(userId: string) {
  try {
    const response = await prisma.wishlist.findUnique({
      where: {
        userId: userId,
      },
    });

    console.log(response, '여기요');
    if (!response) return [];
    // productIds : '1,2,3' String 으로 저장
    return response?.productIds.split(',');
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
  if (session == null) {
    res.status(200).json({ items: [], message: `no Session ` });
    return;
  }
  try {
    const wishlist = await getWishlist(String(session?.user?.id));
    res.status(200).json({ items: wishlist, message: `Success 맞어?` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
