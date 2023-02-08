import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOption } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function getComment(userId: string, orderItemId: number) {
  try {
    const response = await prisma.comment.findUnique({
      where: {
        orderItemId: orderItemId,
      },
    });

    console.log(response);
    if (response) {
      if (response.userId === userId) {
        return response;
      }
    }

    return { message: 'userId is not matched' };
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
  const { orderItemId } = req.query;
  const session = await getSession({ req });

  if (session == null) {
    res.status(200).json({ items: [], message: `no session ` });
    return;
  }

  if (orderItemId == null) {
    res.status(200).json({ items: [], message: `no orderItemId ` });
    return;
  }
  try {
    const wishlist = await getComment(
      String(session.user.id),
      Number(orderItemId)
    );
    res.status(200).json({ items: wishlist, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
