import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOption } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function updateComment({
  userId,
  orderItemId,
  rate,
  contents,
}: {
  userId: string;
  orderItemId: number;
  rate: number;
  contents: string;
}) {
  try {
    const response = await prisma.comment.upsert({
      where: {
        orderItemId,
      },
      update: {
        contents,
        rate,
      },
      create: {
        userId,
        orderItemId,
        contents,
        rate,
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
  const { orderItemId, rate, contents } = JSON.parse(req.body);
  if (session == null) {
    res.status(200).json({ items: [], message: `no session ` });
    return;
  }
  try {
    const wishlist = await updateComment({
      userId: String(session.user.id),
      orderItemId: orderItemId,
      rate: rate,
      contents: contents,
    });
    res.status(200).json({ items: wishlist, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
