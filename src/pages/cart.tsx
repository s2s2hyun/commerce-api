import styled from '@emotion/styled';
import { Button } from '@mantine/core';
import { Cart, OrderItem, products } from '@prisma/client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import IconDeleteX from 'src/components/commons/stlyes/svgIcon/IconDeleteX';
import IconRefresh from 'src/components/commons/stlyes/svgIcon/IconRefresh';
import MyShopCart from 'src/components/commons/stlyes/svgIcon/MyShopCart';
import { CountControl } from 'src/components/CountControl';
import { CATEGORY_MAP } from 'src/constants/products';
import { ORDER_QUERY_KEY } from './mypage';

interface CartItem extends Cart {
  name: string;
  price: number;
  image_url: string;
}

export const CART_QUERY_KEY = '/api/get-cart';

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useQuery<{ items: Cart[] }, unknown, CartItem[]>(
    [`/api/get-cart`],
    () =>
      fetch(`/api/get-cart`)
        .then((res) => res.json())
        .then((data) => data.items)
  );

  const { mutate: addOrder } = useMutation<
    unknown,
    unknown,
    Omit<OrderItem, 'id'>[],
    any
  >(
    (items) =>
      fetch(ORDER_QUERY_KEY, {
        method: 'POST',
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => data.items),

    {
      onMutate: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
      onSuccess: () => {
        router.push('/mypage');
      },
    }
  );

  const diliveryAmount = data && data.length > 0 ? 5000 : 0;
  const disCountAmount = 0;

  const totalAmount = useMemo(() => {
    if (data == null) {
      return 0;
    }
    return data
      .map((item) => item.amount)
      .reduce((prev, curr) => prev + curr, 0);
  }, [data]);

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [`/api/get-products?skip=0&take=3`],
    () => fetch(`/api/get-products?skip=0&take=3`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  const ClickOrder = () => {
    if (data == null) {
      return;
    }
    addOrder(
      data?.map((cart) => ({
        productId: cart.productId,
        price: cart.price,
        amount: cart.amount,
        quantity: cart.quantity,
      }))
    );
    alert(`장바구니에서 ${JSON.stringify(data)} 구매`);
  };

  return (
    <div>
      <span className="text-2xl mb-3">Cart ({data ? data.length : 0})</span>
      <div className="flex justify-center">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {data ? (
            data.length > 0 ? (
              data.map((item, index) => <Item key={index} {...item} />)
            ) : (
              <div>장바구니에 담겨진 상품이 없습니다.</div>
            )
          ) : (
            <div>불러오는중</div>
          )}
        </div>
        <div className="px-4">
          <div
            className="flex flex-col p-4 space-y-4"
            style={{ minWidth: 300, border: '1px solid grey' }}
          >
            <div>Info</div>
            <Row>
              <span>금액 </span>
              <span>{totalAmount.toLocaleString('ko-kr')}원</span>
            </Row>
            <Row>
              <span>배송비 </span>
              <span>{diliveryAmount.toLocaleString('ko-kr')}원</span>
            </Row>
            <Row>
              <span>할인금액 </span>
              <span>{disCountAmount.toLocaleString('ko-kr')}원</span>
            </Row>
            <Row>
              <span className="font-semibold">결제금액 </span>
              <span className="font-semibold text-red-500">
                {(totalAmount + diliveryAmount - disCountAmount).toLocaleString(
                  'ko-kr'
                )}
                원
              </span>
            </Row>
            <Button
              style={{ backgroundColor: 'black' }}
              leftIcon={<MyShopCart width="20" height="20" />}
              styles={{ root: { paddingRight: 14, height: 48 } }}
              size="md"
              onClick={ClickOrder}
            >
              구매하기
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-36">
        <p>추천상품</p>
        {products && (
          <div className="grid grid-cols-3 gap-3">
            {products.map((item) => (
              <div
                key={item.id}
                style={{ maxWidth: 300 }}
                onClick={() => router.push(`/products/${item.id}`)}
              >
                <Image
                  className="rounded"
                  src={item.image_url || 'default_image_url'}
                  height={250}
                  width={250}
                  alt={item.name}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
                />
                <div className="flex">
                  <span style={{ fontSize: '12px' }}>{item.name}</span>
                  <span className="m-auto" style={{ fontSize: '12px' }}>
                    {item.price.toLocaleString('ko-KR')}원
                  </span>
                </div>
                <span className="text-zinc-400">
                  {CATEGORY_MAP[item.category_id ? item.category_id - 1 : 0]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
const Item = (props: CartItem) => {
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updateCart } = useMutation<unknown, unknown, Cart, any>(
    (item) =>
      fetch('/api/update-cart', {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (item) => {
        //찜하기 업데이트
        await queryClient.cancelQueries([CART_QUERY_KEY]);

        const previous = queryClient.getQueryData([CART_QUERY_KEY]);

        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== item.id).concat(item)
        );

        return { previous };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context.previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
    }
  );

  const { mutate: deleteCart } = useMutation<unknown, unknown, number, any>(
    (id) =>
      fetch('/api/delete-cart', {
        method: 'POST',
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: async (id) => {
        //삭제하기
        await queryClient.cancelQueries([CART_QUERY_KEY]);

        const previous = queryClient.getQueryData([CART_QUERY_KEY]);

        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== id)
        );

        return { previous };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context.previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
    }
  );

  const ClickUpdate = () => {
    //TODO 장바구니에서 수정 기능 구현
    // alert(`장바구니에서 ${props.name} 업데이트`);
    if (quantity == null) {
      alert('최소 수량을 선택하세요 ');
      return;
    }
    updateCart({
      ...props,
      quantity: quantity,
      amount: props.price * quantity,
    });
  };

  const ClickDelete = async () => {
    //TODO 장바구니에서 삭제 기능 구현

    await deleteCart(props.id);
    alert(`장바구니에서 ${props.name}삭제`);
  };

  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price);
    }
  }, [quantity, props.price]);

  //   위에 useState amount 와는 별개로 useMemo 를 사용하기 위한 변수 amount 이다.
  //   const amount = useMemo(() => {
  //     if (quantity != null) {
  //       return quantity * props.price;
  //     }
  //   }, [quantity, props.price]);

  return (
    <div
      className="w-full flex  p-4"
      style={{ borderBottom: '1px solid grey' }}
    >
      <Image
        src={props.image_url}
        width={155}
        height={195}
        alt={props.name}
        onClick={() => router.push(`/products/${props.productId}`)}
      />
      <div className="flex flex-col ml-4">
        <span className="font-semibold mb-2">{props.name}</span>
        <span className="mb-auto">
          가격:{props.price.toLocaleString('ko-kr')}원
        </span>
        <div className="flex items-center space-x-4">
          <CountControl value={quantity} setValue={setQuantity} max={5} />
          <div onClick={ClickUpdate}>
            <IconRefresh />
          </div>
        </div>
      </div>
      <div className="flex ml-auto space-x-4">
        <span>{amount?.toLocaleString('ko-kr')}원</span>
        <div onClick={ClickDelete}>
          <IconDeleteX />
        </div>
      </div>
    </div>
  );
};

const Row = styled.div`
  display: flex;
  * ~ * {
    margin-left: auto;
  }
`;
