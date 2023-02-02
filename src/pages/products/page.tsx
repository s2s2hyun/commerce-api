import React, { useCallback, useEffect, useState } from 'react';
import { categories, products } from '@prisma/client';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Input, Pagination, SegmentedControl, Select } from '@mantine/core';
import { CATEGORY_MAP, FILTERS, TAKE } from 'src/constants/products';
import { IconSearch } from '@tabler/icons';
import MyIcon from '../../components/commons/stlyes/MyIcon';
import useDebounce from 'hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// const TAKE = 9;
type Category = {
  id: number;
  name: string;
};

export default function Products() {
  const { data: session } = useSession();
  const [activePage, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  // const [categories, setCategories] = useState<categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('-1');
  //   const [skip, setSkip] = useState<number>(0);
  // const [products, setProducts] = useState<products[]>([]);

  // constants 에 있는 배열안에 있는 객체의 0번째 최신순 / 1번째 가격 높은순 / 2번째 가격이 낮은순 셋팅
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    FILTERS[0].value
  );
  // 검색구현
  const [keyword, setKeyword] = useState<string>('');

  const debouncedKeyword = useDebounce<string>(keyword);
  const router = useRouter();
  // 카테고리 fetch
  // useEffect(() => {
  //   fetch(`/api/get-categories`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.items) {
  //         setCategories(data.items);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  const { data } = useQuery<{ items: Category[] }, unknown, Category[]>(
    [`/api/get-categories`],
    () => fetch(`/api/get-categories`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  const categories = data;
  // const [categories, setCategories] = useState<categories[]>([]); 위에 주석처리를 해두었다.

  // 카테고리 변경에 따라 일부 부작용을 수행하려는 경우 useEffect 를 사용할수 있다.
  // useEffect(() => {
  //   console.log(categories);
  // }, [categories]);

  // useEffect(() => {
  //   fetch(
  //     `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.items) {
  //         setTotal(Math.ceil(data.items / TAKE));
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, [selectedCategory, debouncedKeyword]);

  const { data: totalData } = useQuery(
    [
      `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`
      )
        .then((res) => res.json())
        .then((data) => Math.ceil(data.items / TAKE))
  );

  // react Query 셋팅전에 주석처리
  // useEffect(() => {
  //   const skip = TAKE * (activePage - 1);
  //   fetch(
  //     `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.items) {
  //         setProducts(data.items);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, [activePage, selectedCategory, selectedFilter, debouncedKeyword]);
  // useEffect 가 아닌 react Query 를 통해서 api 호출
  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [
      `/api/get-products?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  // console.log(typeof products, '타입');

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="px-36 mt-36 mb-36">
      {session && (
        <p style={{ fontSize: '2rem' }}>안녕하세요 , {session.user?.name}님</p>
      )}

      <div className="mb-4">
        <Input
          placeholder="search"
          icon={<MyIcon />}
          value={keyword}
          onChange={handlerChange}
        />
      </div>
      <div className="mb-4">
        <Select
          value={selectedFilter}
          onChange={setSelectedFilter}
          data={FILTERS}
        />
      </div>
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
            <div
              key={item.id}
              style={{ maxWidth: 300 }}
              onClick={() => router.push(`/products/${item.id}`)}
            >
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
        {totalData && (
          <Pagination
            className="m-auto"
            page={activePage}
            onChange={setPage}
            total={totalData}
          />
        )}
      </div>
    </div>
  );
}
