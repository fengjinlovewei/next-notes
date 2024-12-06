'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cls from 'classnames';

import { saveNoteSchema } from '@/lib/types';
import type { saveNoteSchemaType } from '@/lib/types';
import { success } from '@/util/client/toast';

import NotePreview from '@/components/NotePreview';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputTextarea from '@/components/InputTextarea';
import ScrollBar from '@/components/ScrollBar';
import { deleteNote, saveNoteForm } from '@/app/actions';
import Switch from '@/components/Switch';

import { formStateToast, initialUseFormState } from '@/util/client';

import styles from './index.module.scss';

interface Props extends PropsBase {
  noteId: string;
  initialTitle: string;
  initialBody: string;
}

// 这个组件必须摘出来，否则 useFormStatus 不起作用
// action 指明当前提交的是哪个 formAction
// const SaveButton = ({ formAction }: any) => {
//   const { pending, action } = useFormStatus();

//   return (
//     <Button.Default
//       className={styles.saveBtn}
//       disabled={pending}
//       type='submit'
//       formAction={formAction}>
//       <i className={cls('iconfont icon-select-bold', styles.btnImg)}></i>
//       <span>{action === formAction ? '保存中...' : '完成'}</span>
//     </Button.Default>
//   );
// };

// const DeleteButton = ({ formAction }: any) => {
//   const { pending, action } = useFormStatus();

//   return (
//     <Button.Red
//       disabled={pending}
//       className={styles.delete}
//       formAction={formAction}>
//       <i className={cls('iconfont icon-close-bold', styles.btnImg)}></i>
//       <span>{action === formAction ? '删除中...' : '删除'}</span>
//     </Button.Red>
//   );
// };

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody,
}: Props) {
  // const [saveState, saveFormAction] = useFormState(
  //   saveNoteForm,
  //   initialUseFormState,
  // );
  // const [delState, delFormAction] = useFormState(
  //   deleteNote,
  //   initialUseFormState,
  // );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<saveNoteSchemaType>({
    resolver: zodResolver(saveNoteSchema),
  });

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [preview, setPreview] = useState(false);
  const isAdd = !noteId;

  console.log('errors', errors);

  // useEffect(() => {
  //   formStateToast(saveState);
  // }, [saveState]);

  const onChange = (value: boolean, event?: ChangeEvent<HTMLInputElement>) => {
    console.log('value', value);
    setPreview(value);
  };

  const onSubmit = async (data: saveNoteSchemaType) => {
    console.log('datataaaa', data);
    const response = await saveNoteForm(data);

    console.log('saveNoteForm', response);

    if (response.errors) {
      // 显示服务端错误
      const errorKeys = Object.keys(response.errors);
      errorKeys.forEach((key) => {
        setError(key as any, {
          type: 'server',
          message: response?.errors?.[key],
        });
      });

      return;
    }

    reset();
  };

  return (
    <div className={styles.editor}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formTitle}>
          <input {...register('noteId')} type='hidden' value={noteId} />
          <input {...register('isAdd')} type='hidden' value={Number(isAdd)} />
          <div className={styles.menu}>
            <Button.Default
              className={styles.saveBtn}
              disabled={isSubmitting}
              type='submit'>
              <i className={cls('iconfont icon-select-bold', styles.btnImg)} />
              <span>完成</span>
            </Button.Default>
            {!isAdd && (
              <Button.Red disabled={isSubmitting} className={styles.delete}>
                <i className={cls('iconfont icon-close-bold', styles.btnImg)} />
                <span>删除</span>
              </Button.Red>
            )}
            <Switch
              defaultChecked={preview}
              onChange={onChange}
              leftText='预览'
            />
          </div>
          <Input
            {...register('title', {
              onChange: (e) => {
                setTitle(e.target.value);
              },
            })}
          />
        </div>
        <div className={styles.formTextarea}>
          <Controller
            render={({ field }) => (
              <InputTextarea
                {...field}
                onChange={(e) => {
                  setBody(e.target.value);
                  field.onChange(e.target.value);
                }}
              />
            )}
            name='content'
            control={control}
            defaultValue=''
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
