import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOption } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function getComments(productId: number) {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        productId,
      },
    });

    console.log(orderItems);

    let response = [];

    // orderItemId 를 기반으로 Comment 를 조회한다.

    for (const orderItem of orderItems) {
      const res = await prisma.comment.findUnique({
        where: {
          orderItemId: orderItem.id,
        },
      });

      response.push({ ...orderItem, ...res });
    }

    console.log(response);

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
  const { productId } = req.query;

  if (productId == null) {
    res.status(200).json({ items: [], message: `no productId ` });
    return;
  }

  try {
    const wishlist = await getComments(Number(productId));
    res.status(200).json({ items: wishlist, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
