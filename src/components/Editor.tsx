import dynamic from 'next/dynamic';
import React, { Dispatch, SetStateAction } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from '@emotion/styled';
import { EditorState } from 'draft-js';
import Button from './Button';

const Editor = dynamic<EditorProps>(
  () => import(`react-draft-wysiwyg`).then((module) => module.Editor),
  {
    ssr: false,
  }
);

const Wrapper = styled.div<{ readOnly: boolean; noPadding: boolean }>`
  /* padding: 1rem; */
  ${(props) => (props.noPadding ? '' : 'padding: 1rem')}
  /* border: 1px solid black;
  border-radius: 8px; */
  ${(props) =>
    props.readOnly ? '' : 'border: 1px solid black; border-radius:8px; '}
`;

export default function CustomEditor({
  editorState,
  readOnly = false,
  noPadding = false,
  onEditorStateChange,
  onSave,
}: {
  editorState: EditorState;
  readOnly?: boolean;
  noPadding?: boolean;
  onSave?: () => void;
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>;
}) {
  return (
    <Wrapper readOnly={readOnly} noPadding={noPadding}>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['inline', 'list', 'textAlign', 'link'],
        }}
        localization={{
          locale: 'ko',
        }}
      />
      {!readOnly && onSave && <Button onClick={onSave}>Save</Button>}
    </Wrapper>
  );
}
