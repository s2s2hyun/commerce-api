import React, { useEffect, useState } from 'react';

import Carousel from 'nuka-carousel';
import Image from 'next/image';
import CustomEditor from 'src/components/Editor';
import { useRouter } from 'next/router';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Cart, products } from '@prisma/client';
import { format } from 'date-fns';
import { CATEGORY_MAP } from 'src/constants/products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@mantine/core';
import { IconHeart, IconHeartbeat } from '@tabler/icons';
import MyHeart from 'src/components/commons/stlyes/svgIcon/MyHeart';
import { useSession } from 'next-auth/react';
import MyHeartBeat from 'src/components/commons/stlyes/svgIcon/MyHeartBeat';
import MyShopCart from 'src/components/commons/stlyes/svgIcon/MyShopCart';
import { CountControl } from 'src/components/CountControl';
import { CART_QUERY_KEY } from 'src/pages/cart';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const product = await fetch(
    `http://localhost:3000/api/get-product?id=${context.params?.id}`
  )
    .then((data) => data.json())
    .then((data) => data.items);
  return { props: { product: { ...product, images: [product.image_url] } } };
}

export default function Products(props: {
  product: products & { images: string[] };
}) {
  const [index, setIndex] = useState<number>(0);

  const router = useRouter();
  const { data: session } = useSession();
  const { id: productId } = router.query;
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState<number | undefined>(1);
  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents))
        )
      : EditorState.createEmpty()
  );

  const { data: wishlist } = useQuery(['/api/get-wishlist'], () =>
    fetch('/api/get-wishlist')
      .then((res) => res.json())
      .then((data) => data.items)
  );

  const { mutate, isLoading } = useMutation<unknown, unknown, string, any>(
    (productId: string) =>
      fetch('/api/update-wishlist', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (productId) => {
        //찜하기 업데이트
        await queryClient.cancelQueries(['/api/get-wishlist']);

        const previous = queryClient.getQueryData(['/api/get-wishlist']);

        queryClient.setQueryData<string[]>(['/api/get-wishlist'], (old) =>
          old
            ? old.includes(String(productId))
              ? old.filter((id) => id !== String(productId))
              : old.concat(String(productId))
            : []
        );

        return { previous };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData(['/api/get-wishlist'], context.previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['/api/get-wishlist']);
      },
    }
  );

  const product = props.product;

  const { mutate: addCart } = useMutation<
    unknown,
    unknown,
    Omit<Cart, 'id' | 'userId'>,
    any
  >(
    (item) =>
      fetch('/api/add-cart', {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((data) => data.items),

    {
      onMutate: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
      onSuccess: () => {
        router.push('/cart');
      },
    }
  );

  const validate = (type: 'cart' | 'order') => {
    if (quantity == null) {
      alert('장바구니로 이동');
      return;
    }
    if (type == 'cart') {
      addCart({
        productId: product.id,
        quantity: quantity,
        amount: product.price * quantity,
      });
    }
  };

  // 장바구니 등록 기능추가

  const isWished =
    wishlist != null && productId != null
      ? wishlist.includes(String(productId))
      : false;

  // EditorState.createEmpty()

  return (
    <>
      {product != null && productId != null ? (
        <div className=" flex flex-row">
          <div style={{ maxWidth: 800, marginRight: 52 }}>
            <Carousel
              animation="zoom"
              withoutControls={true}
              wrapAround
              speed={5}
              slideIndex={index}
            >
              {product.images.map((url, index) => (
                <Image
                  key={`${url}-carousel-${index}`}
                  src={url}
                  alt="img"
                  width={600}
                  height={400}
                />
              ))}
            </Carousel>
            <div className="flex space-x-4 mt-2">
              {product.images.map((url, index) => (
                <div
                  key={`${url}-thumb-${index}`}
                  onClick={() => setIndex(index)}
                >
                  <Image src={url} alt="img" width={150} height={150} />
                </div>
              ))}
            </div>
            {editorState != null && (
              <CustomEditor editorState={editorState} readOnly={true} />
            )}
          </div>
          <div style={{ maxWidth: 600 }} className="flex flex-col space-y-6">
            <div className="text-lg text-zinc-400">
              {CATEGORY_MAP[product.category_id ? product.category_id - 1 : 0]}
            </div>
            <div className="text-lg font-semibold">{product.name}</div>
            <div className="text-lg">
              {product.price.toLocaleString('ko-kr')}원
            </div>

            <div>
              <span className="text-lg mb-5">수량</span>
              <CountControl value={quantity} setValue={setQuantity} max={5} />
            </div>

            <div className="flex space-x-3">
              <Button
                loading={isLoading}
                style={{ backgroundColor: 'black' }}
                leftIcon={<MyShopCart width="20" height="20" />}
                styles={{ root: { paddingRight: 14, height: 48 } }}
                size="md"
                onClick={() => {
                  if (session == null) {
                    alert('로그인이 필요합니다.');
                    router.push('/auth/login');
                    return;
                  }
                  validate('cart');
                }}
              >
                장바구니
              </Button>
              <Button
                loading={isLoading}
                style={{ backgroundColor: isWished ? 'red' : 'blue' }}
                leftIcon={
                  isWished ? (
                    <MyHeartBeat width="20" height="20" />
                  ) : (
                    <MyHeart width="20" height="20" />
                  )
                }
                styles={{ root: { paddingRight: 14, height: 48 } }}
                size="md"
                onClick={() => {
                  if (session == null) {
                    alert('로그인이 필요합니다.');
                    router.push('/auth/login');
                    return;
                  }
                  mutate(String(productId));
                }}
              >
                찜하기
              </Button>
            </div>
            <div className="text-lg text-zinc-300">
              등록 {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
            </div>
          </div>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}
