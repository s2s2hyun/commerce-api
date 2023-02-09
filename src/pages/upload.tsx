import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Button from 'src/components/Button';

const AutoSizeImageWrapper = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
`;

export default function ImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<String>('');

  const ClickUpload = () => {
    if (inputRef.current && inputRef.current.files) {
      const fd = new FormData();
      fd.append(
        'image',
        inputRef.current.files[0],
        inputRef.current.files[0].name
      );
      // imagebb 서버가 터졌나? 왜이러냐
      fetch('', {
        method: 'POST',
        body: fd,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setImage(data.data.image.url);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*"></input>
      <Button onClick={ClickUpload}>업로드</Button>
      {image != '' && (
        <AutoSizeImageWrapper>
          {/* <Image
            src={image}
            alt="uploadImg"
            layout="fill"
            objectFit="contain"
          /> */}
        </AutoSizeImageWrapper>
      )}
    </div>
  );
}
