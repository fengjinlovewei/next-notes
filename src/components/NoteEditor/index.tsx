'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import cls from 'classnames';

import NotePreview from '@/components/NotePreview';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputTextarea from '@/components/InputTextarea';
import ScrollBar from '@/components/ScrollBar';
import { deleteNote, saveNoteForm } from '@/app/actions';
import Switch from '@/components/Switch';

import { formStateToast, initialUseFormState } from '@/util/client';

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
    <Button.Default
      className={styles.saveBtn}
      disabled={pending}
      type='submit'
      formAction={formAction}>
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

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody,
}: Props) {
  const [saveState, saveFormAction] = useFormState(
    saveNoteForm,
    initialUseFormState,
  );
  const [delState, delFormAction] = useFormState(
    deleteNote,
    initialUseFormState,
  );

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [preview, setPreview] = useState(false);
  const isAdd = !noteId;

  useEffect(() => {
    formStateToast(saveState);
  }, [saveState]);

  const onChange = (value: boolean, event?: ChangeEvent<HTMLInputElement>) => {
    console.log('value', value);
    setPreview(value);
  };

  return (
    <div className={styles.editor}>
      <form className={styles.form} autoComplete='off'>
        <div className={styles.formTitle}>
          <input type='hidden' name='noteId' value={noteId} />
          <input type='hidden' name='isAdd' value={Number(isAdd)} />
          <div className={styles.menu}>
            <SaveButton formAction={saveFormAction} />
            {!isAdd && <DeleteButton formAction={delFormAction} />}
            <Switch
              defaultChecked={preview}
              onChange={onChange}
              leftText='预览'
            />
          </div>
          <Input
            name='title'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className={styles.formTextarea}>
          <InputTextarea
            name='content'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </form>
      <div className={cls(styles.preview, { [styles.hide]: !preview })}>
        <ScrollBar>
          <h1 className={styles.title}>{title}</h1>
          <NotePreview>{body}</NotePreview>
        </ScrollBar>
      </div>
    </div>
  );
}
