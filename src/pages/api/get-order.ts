import { OrderItem, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOption } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function getOrder(userId: string) {
  try {
    //orders 테이블에서 나의 주문들을 조회한다.

    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    });

    console.log(orders);

    let response = [];

    // 그리고 orders 안에 있는 orderItemIds 로 orderItem 을 꺼내고 products 테이블에서 이미지 등 정보를 조합한다.

    for (const order of orders) {
      let orderItems: OrderItem[] = [];
      for (const id of order.orderItemIds
        .split(',')
        .map((item) => Number(item))) {
        const res: OrderItem[] =
          await prisma.$queryRaw`SELECT i.id, quantity,amount, i.price,name,image_url,productId FROM OrderItem as i JOIN products as p ON i.productId=p.id WHERE i.id=${id};`;
        orderItems.push.apply(orderItems, res);
      }
      response.push({ ...order, orderItems });
    }

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
  // console.log(session?.user.id);
  if (session == null) {
    res.status(200).json({ items: [], message: `no Session ` });
    return;
  }
  try {
    const wishlist = await getOrder(String(session.user.id));
    res.status(200).json({ items: wishlist, message: `Success 맞어?` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
