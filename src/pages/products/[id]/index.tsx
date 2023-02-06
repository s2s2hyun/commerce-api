import React, { useEffect, useState } from 'react';

import Carousel from 'nuka-carousel';
import Image from 'next/image';
import CustomEditor from 'src/components/Editor';
import { useRouter } from 'next/router';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { products } from '@prisma/client';
import { format } from 'date-fns';
import { CATEGORY_MAP } from 'src/constants/products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@mantine/core';
import { IconHeart, IconHeartbeat } from '@tabler/icons';
import MyHeart from 'src/components/commons/stlyes/MyHeart';
import { useSession } from 'next-auth/react';
import MyHeartBeat from 'src/components/commons/stlyes/MyHeart copy';

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

  // const { mutate, isLoading } = useMutation<unknown, unknown, string, any>(
  //   (productId: string) =>
  //     fetch('/api/update-wishlist', {
  //       method: 'POST',
  //       body: JSON.stringify({ productId }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => data.items),
  //   {
  //     onMutate: async (productId) => {
  //       //찜하기 업데이트 바로 반영
  //       await queryClient.cancelQueries(['/api/get-wishlist']);

  //       // Snapshot the previous value
  //       const previous = queryClient.getQueryData(['/api/get-wishlist']);

  //       // Optimistically update to the new value
  //       queryClient.setQueryData<string[]>(['/api/get-wishlist'], (old) =>
  //         old
  //           ? old.includes(String(productId))
  //             ? old.filter((id) => id !== String(productId))
  //             : old.concat(String(productId))
  //           : []
  //       );

  //       // Return a context object with the snapshotted value
  //       return { previous };
  //     },
  //     onError: (error, _, context) => {
  //       queryClient.setQueryData(['/api/get-wishlist'], context.previous);
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['/api/get-wishlist']);
  //     },
  //   }
  // );

  const product = props.product;

  const isWished =
    wishlist != null && productId != null
      ? wishlist.includes(String(productId))
      : false;

  // EditorState.createEmpty()

  console.log(typeof productId);

  return (
    <>
      {product != null && productId != null ? (
        <div className="p-24 flex flex-row">
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
              {CATEGORY_MAP[product.category_id - 1]}
            </div>
            <div className="text-lg font-semibold">{product.name}</div>
            <div className="text-lg">
              {product.price.toLocaleString('ko-kr')}원
            </div>
            <>{JSON.stringify(wishlist)}딱 대</>
            <Button
              loading={isLoading}
              style={{ backgroundColor: isWished ? 'red' : 'blue' }}
              leftIcon={isWished ? <MyHeartBeat /> : <MyHeart />}
              styles={{ root: { paddingRight: 14, height: 48 } }}
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
