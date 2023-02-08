import styled from '@emotion/styled';
import { Badge, Button } from '@mantine/core';
import { Cart, OrderItem, Orders, products } from '@prisma/client';
import { IconX } from '@tabler/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import IconDeleteX from 'src/components/commons/stlyes/svgIcon/IconDeleteX';
import { CountControl } from 'src/components/CountControl';

interface OrderItemDetail extends OrderItem {
  name: string;
  image_url: string;
}

interface OrderDetail extends Orders {
  orderItems: OrderItemDetail[];
}

const ORDER_STATUS_MAP = [
  '주문취소',
  '주문대기',
  '결제대기',
  '결제완료',
  '배송대기',
  '배송중',
  '배송완료',
  '환불대기',
  '환불완료',
  '반품대기',
  '반품완료',
];

export const ORDER_QUERY_KEY = '/api/add-order';

export default function MyPage() {
  const router = useRouter();

  const { data } = useQuery<{ items: OrderDetail[] }, unknown, OrderDetail[]>(
    [ORDER_QUERY_KEY],
    () =>
      fetch('/api/get-order')
        .then((res) => res.json())
        .then((data) => data.items)
  );

  return (
    <div>
      <span className="text-2xl mb-3">주문내역 ({data ? data.length : 0})</span>
      <div className="flex justify-center">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {data ? (
            data.length > 0 ? (
              data.map((item, index) => <DetailItem key={index} {...item} />)
            ) : (
              <div>주문하신 상품이 없습니다.</div>
            )
          ) : (
            <div>불러오는중</div>
          )}
        </div>
      </div>
    </div>
  );
}
const DetailItem = (props: OrderDetail) => {
  const queryClient = useQueryClient();
  //리액트 쿼리를 사용중이기에 옵티미스틱한 업데이트가 필요하다.

  const { mutate: updateOrderStatus } = useMutation<
    unknown,
    unknown,
    number,
    any
  >(
    (status) =>
      fetch('/api/update-order-status', {
        method: 'POST',
        body: JSON.stringify({
          id: props.id,
          status: props.status,
          userId: props.userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => data.status),
    {
      onMutate: async (status) => {
        //order 상태  업데이트
        await queryClient.cancelQueries([ORDER_QUERY_KEY]);

        const previous = queryClient.getQueryData([ORDER_QUERY_KEY]);

        queryClient.setQueryData<Cart[]>([ORDER_QUERY_KEY], (old) =>
          old?.map((c) => {
            if (c.id === props.id) {
              return { ...c, status: status };
            }
            return c;
          })
        );

        return { previous };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([ORDER_QUERY_KEY], context.previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
    }
  );

  const ClickPayment = () => {
    // 주문 상태를 5로 바꿔준다.
    updateOrderStatus(5);
  };

  const ClickCancel = () => {
    // 주문상태를 -1 로 바꿔주라
    updateOrderStatus(-1);
  };
  return (
    <div
      className="w-full flex flex-col  p-4 rounded-md"
      style={{ border: '1px solid grey' }}
    >
      <div className="flex justify-between">
        <Badge color={props.status < 1 ? 'red' : ''} className="mb-2">
          {ORDER_STATUS_MAP[props.status + 1]}
        </Badge>
        <div onClick={ClickCancel}>
          <IconDeleteX style={{ marginRight: '1rem' }} />
        </div>

        {/* <IconX /> */}
      </div>
      <div>
        {props.orderItems.map((orderItem, index) => (
          <Item key={index} {...orderItem} status={props.status} />
        ))}
        <div className="flex mt-4">
          <div className="flex flex-col">
            <span className="mb-2">주문 정보</span>
            <span>받는사람:{props.receiver ?? '입력필요'}</span>
            <span>주소:{props.adress ?? '입력필요'}</span>
            <span>연락처:{props.phoneNumber ?? '입력필요'}</span>
          </div>
          <div className="flex flex-col ml-auto mr-4 text-right">
            <span className="mb-2 font-semibold">
              합계 금액:
              <span className="text-red-500">
                {props.orderItems
                  .map((item) => item.amount)
                  .reduce((prev, cur) => prev + cur, 0)
                  .toLocaleString('ko-kr')}
                원
              </span>
            </span>
            <span className="text-zinc-400 mt-auto mb-auto">
              주문일자:{' '}
              {format(new Date(props.createdAt), 'yyyy년 M월 d일 HH:mm:ss')}
            </span>
            <Button
              style={{ backgroundColor: 'black', color: 'white' }}
              onClick={ClickPayment}
            >
              {props.status + 1 > 3 ? '결제완료' : '결제 처리'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Item = (props: OrderItemDetail & { status: number }) => {
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);
  const router = useRouter();

  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price);
    }
  }, [quantity, props.price]);

  const ClickComment = () => {
    router.push(`/comment/edit?orderItemId=${props.id}`);
  };

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
        </div>
      </div>
      <div className="flex flex-col ml-auto space-x-4">
        <span>{amount?.toLocaleString('ko-kr')}원</span>
        {props.status === 5 && (
          <Button
            style={{
              backgroundColor: 'black',
              color: 'white',
              marginTop: 'auto',
            }}
            onClick={ClickComment}
          >
            후기작성
          </Button>
        )}
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
