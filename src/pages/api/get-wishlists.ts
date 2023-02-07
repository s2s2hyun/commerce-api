import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOption } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function getWishlists(userId: string) {
  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: userId,
      },
    });

    console.log(wishlist);

    const productsId = wishlist?.productIds
      .split(',')
      .map((item) => Number(item));

    if (productsId && productsId.length > 0) {
      const response = await prisma.products.findMany({
        // orderbycondition 을 그냥 넣어주면 동작을 안합니다. 객체로 주입을 해주고 있고 그 객체가 constans 에
        // 정의 해두었던 포맷에 내용물만 전달해주려면 ... 스프레드를 사용해야만 한다.
        // orderBy: {
        //   price: 'asc',
        // },
        where: {
          id: {
            in: productsId,
          },
        },
      });
      console.log(response);
      return response;
    }
    return [];
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
    const wishlist = await getWishlists(String(session.user.id));
    res.status(200).json({ items: wishlist, message: `Success 맞어?` });
  } catch (err) {
    res.status(400).json({ message: `Fail  ` });
  }
}
