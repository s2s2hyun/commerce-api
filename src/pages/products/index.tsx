import React, { useCallback, useEffect, useState } from 'react';
import { products } from '@prisma/client';
import Image from 'next/image';
import styled from '@emotion/styled';
import { TAKE } from 'src/constants/products';

export default function Products() {
  const [skip, setSkip] = useState<number>(0);
  const [products, setProducts] = useState<products[]>([]);

  useEffect(() => {
    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setProducts(data.items);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const getProducts = useCallback(() => {
    const next = skip + TAKE;
    fetch(`/api/get-products?skip=${next}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          const list = products.concat(data.items);
          setProducts(list);
        }
      })
      .catch((error) => console.log(error));
    setSkip(next);
  }, [skip, products]);

  return (
    <div className="px-36 mt-36 mb-36">
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => (
            <div key={item.id}>
              <Image
                className="rounded"
                src={item.image_url || 'default_image_url'}
                height={200}
                width={300}
                alt={item.name}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
              />
              <div className="flex">
                <span>{item.name}</span>
                <span className="m-auto">
                  {item.price.toLocaleString('ko-KR')}원
                </span>
              </div>
              <span className="text-zinc-400">
                {item.category_id === 1 && '의류'}
              </span>
            </div>
          ))}
        </div>
      )}
      <button
        className="w-full rounded mt-20 bg-zinc-200 p-4"
        onClick={getProducts}
      >
        더보기
      </button>
    </div>
  );
}
