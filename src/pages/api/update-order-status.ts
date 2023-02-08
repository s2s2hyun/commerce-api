import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

async function updateOrderStatus(id: number, status: number) {
  try {
    const response = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        status: status,
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
  console.log(session);
  const { id, status, userId } = JSON.parse(req.body);
  if (session == null || session.user.id !== userId) {
    res
      .status(200)
      .json({ items: [], message: `no session or Invalid Session ` });
    return;
  }
  try {
    const wishlist = await updateOrderStatus(id, status);
    res.status(200).json({ items: wishlist, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
