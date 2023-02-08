import { Cart, OrderItem, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOption } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function addOrder(
  userId: string,
  items: Omit<OrderItem, 'id'>[],
  orderInfo?: { receiver: string; address: string; phoneNumber: string }
) {
  try {
    // orderItem 들을 만든다.

    let orderItemIds = [];
    for (const item of items) {
      const orderItem = await prisma.orderItem.create({
        data: {
          ...item,
        },
      });
      console.log(`Created id : ${orderItem.id} `);
      orderItemIds.push(orderItem.id);
    }

    console.log(JSON.stringify(orderItemIds));

    // 만들어진 orderItemIds 를 포함한 order를 만든다.

    const response = await prisma.orders.create({
      data: {
        userId,
        orderItemIds: orderItemIds.join(','),
        ...orderInfo,
        status: 0,
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
  const { items, orderInfo } = JSON.parse(req.body);
  if (session == null) {
    res.status(200).json({ items: [], message: `no session ` });
    return;
  }
  try {
    const wishlist = await addOrder(String(session.user.id), items, orderInfo);
    res.status(200).json({ items: wishlist, message: `Success ` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
