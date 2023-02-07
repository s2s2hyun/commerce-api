import { products } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CATEGORY_MAP } from 'src/constants/products';

export default function Wishlist() {
  const router = useRouter();
  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [`/api/get-wishlists`],
    () => fetch(`/api/get-wishlists`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  return (
    <div>
      <p className="text-2xl mb-10">내가찜한 상품</p>
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
  );
}
