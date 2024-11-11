'use client';

import { useState, useEffect } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import cls from 'classnames';

import NotePreview from '@/components/NotePreview';
import Button from '@/components/Button';
import { deleteNote, saveNote } from '@/app/actions';

import checkmark from '@/images/checkmark.svg';
import cross from '@/images/cross.svg';

import styles from './index.module.scss';

interface Props extends PropsBase {
  noteId: string;
  initialTitle: string;
  initialBody: string;
}

// 这个组件必须摘出来，否则 useFormStatus 不起作用
// action 指明当前提交的是哪个 formAction
const SaveButton = ({ formAction }: any) => {
  const { pending, action } = useFormStatus();

  return (
    <Button.Default disabled={pending} type='submit' formAction={formAction}>
      <img
        src={checkmark}
        className={styles.btnImg}
        width='14px'
        height='10px'
        alt=''
      />
      {action === formAction ? '保存中...' : '完成'}
    </Button.Default>
  );
};

const DeleteButton = ({ formAction }: any) => {
  const { pending, action } = useFormStatus();

  return (
    <Button.Red
      disabled={pending}
      className={styles.delete}
      formAction={formAction}>
      <img
        src={cross}
        className={cls(styles.btnImg)}
        width='10px'
        height='10px'
        alt=''
      />
      {action === formAction ? '删除中...' : '删除'}
    </Button.Red>
  );
};

const initialState: { message: any; errors: any } = {
  message: null,
  errors: null,
};

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody,
}: Props) {
  const [saveState, saveFormAction] = useFormState(
    saveNote as any,
    initialState,
  );
  const [delState, delFormAction] = useFormState(
    deleteNote as any,
    initialState,
  );

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isAdd = !noteId;

  useEffect(() => {
    if (saveState.errors) {
      // 处理错误
      console.log(saveState.errors);
    }
  }, [saveState]);

  return (
    <div className={styles.editor}>
      <form className={styles.form} autoComplete='off'>
        <input type='hidden' name='noteId' value={noteId} />
        <input type='hidden' name='isAdd' value={Number(isAdd)} />
        <div className={styles.menu}>
          <SaveButton formAction={saveFormAction} />
          {!isAdd && <DeleteButton formAction={delFormAction} />}
        </div>
        <div className={styles.menu}>
          {saveState?.message}
          {saveState.errors && saveState.errors[0].message}
        </div>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          name='body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className={styles.preview}>
        {/* <div className={styles.label}>Preview</div> */}
        <h1 className={styles.title}>{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}
