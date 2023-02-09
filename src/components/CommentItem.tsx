import styled from '@emotion/styled';
import format from 'date-fns/format';
import { convertFromRaw, EditorState } from 'draft-js';
import { CommentItemType } from 'src/pages/products/[id]';
import CommenRateIcon from './commons/stlyes/svgIcon/CommenRateIcon';
import CustomEditor from './Editor';

const Warpper = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px;
`;

export default function CommentItem({ item }: { item: CommentItemType }) {
  console.log(item);
  return (
    <Warpper>
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <CommenRateIcon
                  key={index}
                  fill={index < item.rate ? 'red' : 'none'}
                  stroke={index < item.rate ? 0 : 1}
                  index={0}
                  item={item}
                />
              ))}
            </div>
            <span className="text-zinc-300 text-xs">
              {item.price.toLocaleString('ko-kr')}원 * {item.quantity}개 ={' '}
              {item.amount.toLocaleString('ko-kr')}원
            </span>
          </div>
          <p className="text-zinc-300 ml-auto">
            {format(new Date(item?.updatedAt), 'yyyy년 M월 d일')}
          </p>
        </div>
        <CustomEditor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(item.contents ?? ''))
          )}
          readOnly
          noPadding
        />
      </div>
    </Warpper>
  );
}
