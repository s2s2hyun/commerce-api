import React, { useEffect, useState } from 'react';

import Carousel from 'nuka-carousel';
import Image from 'next/image';
import CustomEditor from 'src/components/Editor';
import { useRouter } from 'next/router';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { products } from '@prisma/client';

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
  const { id: productId } = router.query;
  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents))
        )
      : EditorState.createEmpty()
  );

  const product = props.product;

  // EditorState.createEmpty()

  return (
    <>
      <div>edit</div>
      <Carousel
        animation="zoom"
        autoplay
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
            width={500}
            height={300}
          />
        ))}
      </Carousel>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {product.images.map((url, index) => (
          <div key={`${url}-thumb-${index}`} onClick={() => setIndex(index)}>
            <Image src={url} alt="img" width={100} height={100} />
          </div>
        ))}
      </div>
      {editorState != null && (
        <CustomEditor editorState={editorState} readOnly={true} />
      )}
    </>
  );
}
