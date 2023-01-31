import React, { useEffect, useState } from 'react';

import Carousel from 'nuka-carousel';
import Image from 'next/image';
import CustomEditor from 'src/components/Editor';
import { useRouter } from 'next/router';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1016/1000/600/',
    thumbnail: 'https://picsum.photos/id/1016/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1013/1000/600/',
    thumbnail: 'https://picsum.photos/id/1013/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1011/1000/600/',
    thumbnail: 'https://picsum.photos/id/1011/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1012/1000/600/',
    thumbnail: 'https://picsum.photos/id/1012/250/150/',
  },
  {
    original:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
    thumbnail:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
  },
  {
    original:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1.jpg',
    thumbnail:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1.jpg',
  },
  {
    original:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/2.jpg',
    thumbnail:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/2.jpg',
  },
  {
    original:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/3.jpg',
    thumbnail:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/3.jpg',
  },
];

export default function Products() {
  const [index, setIndex] = useState<number>(0);
  const router = useRouter();
  const { id: productId } = router.query;
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );

  useEffect(() => {
    if (productId != null) {
      fetch(`/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items && data.items.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents))
              )
            );
          } else {
            setEditorState(EditorState.createEmpty());
          }
        });
    }
  }, [productId]);

  const handleSave = () => {
    if (editorState) {
      fetch(`/api/update-product`, {
        method: 'POST',
        body: JSON.stringify({
          id: String(productId),
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert('Success!');
        });
    }
  };

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
        {images.map((item) => (
          <Image
            key={item.original}
            src={item.original}
            alt="img"
            width={1000}
            height={500}
            layout="responsive"
          />
        ))}
      </Carousel>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {images.map((item, index) => (
          <div key={index} onClick={() => setIndex(index)}>
            <Image src={item.original} alt="img" width={100} height={100} />
          </div>
        ))}
      </div>
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </>
  );
}
