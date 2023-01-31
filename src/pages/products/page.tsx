import React, { useCallback, useEffect, useState } from 'react';
import { categories, products } from '@prisma/client';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Pagination, SegmentedControl } from '@mantine/core';
import { CATEGORY_MAP, TAKE } from 'src/constants/products';

// const TAKE = 9;

export default function Products() {
  const [activePage, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [categories, setCategories] = useState<categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('-1');
  //   const [skip, setSkip] = useState<number>(0);
  const [products, setProducts] = useState<products[]>([]);

  useEffect(() => {
    fetch(`/api/get-categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setCategories(data.items);
        }
      })
      .catch((error) => console.log(error));

    // fetch(`/api/get-products?skip=0&take=${TAKE}&category=${selectedCategory}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.items) {
    //       setProducts(data.items);
    //     }
    //   })
    //   .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`/api/get-products-count?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setTotal(Math.ceil(data.items / TAKE));
        }
      })
      .catch((error) => console.log(error));
  }, [selectedCategory]);

  useEffect(() => {
    const skip = TAKE * (activePage - 1);
    fetch(
      `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setProducts(data.items);
        }
      })
      .catch((error) => console.log(error));
  }, [activePage, selectedCategory]);

  //   const getProducts = useCallback(() => {
  //     const next = skip + TAKE;
  //     fetch(`/api/get-products?skip=${next}&take=${TAKE}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.items) {
  //           const list = products.concat(data.items);
  //           setProducts(list);
  //         }
  //       })
  //       .catch((error) => console.log(error));
  //     setSkip(next);
  //   }, [skip, products]);

  return (
    <div className="px-36 mt-36 mb-36">
      {categories && (
        <div className="mb-4">
          <SegmentedControl
            value={selectedCategory}
            onChange={setSelectedCategory}
            data={[
              { label: 'ALL', value: '-1' },
              ...categories.map((category) => ({
                label: category.name,
                value: String(category.id),
              })),
            ]}
            color="dark"
          />
        </div>
      )}

      {/* {categories &&
        categories.map((category) => (
          <div key={category.id}>{category.name}</div>
        ))} */}
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => (
            <div key={item.id} style={{ maxWidth: 300 }}>
              <Image
                className="rounded"
                src={item.image_url || 'default_image_url'}
                height={310}
                width={310}
                alt={item.name}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
              />
              <div className="flex">
                <span style={{ fontSize: '14px' }}>{item.name}</span>
                <span className="m-auto" style={{ fontSize: '12px' }}>
                  {item.price.toLocaleString('ko-KR')}원
                </span>
              </div>
              <span className="text-zinc-400">
                {/* {item.category_id === 1 && '의류'} */}
                {CATEGORY_MAP[item.category_id - 1]}
              </span>
            </div>
          ))}
        </div>
      )}
      {/* <button
        className="w-full rounded mt-20 bg-zinc-200 p-4"
        onClick={getProducts}
      >
        더보기
      </button> */}
      <div className="w-full flex mt-5">
        <Pagination
          className="m-auto"
          page={activePage}
          onChange={setPage}
          total={total}
        />
      </div>
    </div>
  );
}
