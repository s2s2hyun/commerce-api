import React, { useCallback, useEffect, useState } from 'react';
import { categories, products } from '@prisma/client';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Input, Pagination, SegmentedControl, Select } from '@mantine/core';
import { CATEGORY_MAP, FILTERS, TAKE } from 'src/constants/products';
import { IconSearch } from '@tabler/icons';
// import MyIcon from '../../components/commons/stlyes/MyIcon';
import MyIcon from '../components/commons/stlyes/MyIcon';
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

export default function Home() {
  const { data: session } = useSession();
  const [activePage, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const [selectedCategory, setSelectedCategory] = useState<string>('-1');

  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    FILTERS[0].value
  );
  // 검색구현
  const [keyword, setKeyword] = useState<string>('');

  const debouncedKeyword = useDebounce<string>(keyword);
  const router = useRouter();

  const { data } = useQuery<{ items: Category[] }, unknown, Category[]>(
    [`/api/get-categories`],
    () => fetch(`/api/get-categories`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  const categories = data;

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
                {CATEGORY_MAP[item.category_id - 1]}
              </span>
            </div>
          ))}
        </div>
      )}
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
