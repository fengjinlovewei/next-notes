'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cls from 'classnames';

import { saveNoteSchemaForm } from '@/lib/types';
import type { saveNoteSchemaFormType } from '@/lib/types';
import { success, error } from '@/util/client/toast';

import NotePreview from '@/components/NotePreview';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputTextarea from '@/components/InputTextarea';
import ScrollBar from '@/components/ScrollBar';
import { deleteNote, saveNoteForm } from '@/app/actions';
import Switch from '@/components/Switch';

import styles from './index.module.scss';

interface Props extends PropsBase {
  noteId: string;
  initialTitle: string;
  initialContent: string;
}

export default function NoteEditor({
  noteId,
  initialTitle,
  initialContent,
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<saveNoteSchemaFormType>({
    resolver: zodResolver(saveNoteSchemaForm),
  });

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [preview, setPreview] = useState(false);
  const isAdd = !noteId;

  console.log('errors', errors);

  useEffect(() => {
    Object.values(errors).forEach((item) => {
      error(item.message);
    });
  }, [errors]);

  const onChange = (value: boolean, event?: ChangeEvent<HTMLInputElement>) => {
    console.log('value', value);
    setPreview(value);
  };

  const onSubmit = async (data: saveNoteSchemaFormType, event: any) => {
    const btn = event.nativeEvent.submitter as HTMLButtonElement;

    const btnType = btn.getAttribute('data-type');

    if (!btnType) return;

    let response: ResponesData = {};

    if (btnType === 'submit') {
      response = await saveNoteForm(data);
    }

    if (btnType === 'delete') {
      response = await deleteNote(data);
    }

    console.log('saveNoteForm', response);

    if (response.errors) {
      // 显示服务端错误
      Object.keys(response.errors).forEach((key) => {
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
      <div className={cls(styles.formBox, { [styles.scale]: preview })}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formTitle}>
            <input {...register('noteId')} type='hidden' value={noteId} />
            <input {...register('isAdd')} type='hidden' value={Number(isAdd)} />
            <div className={styles.menu}>
              <Button.Default
                className={styles.saveBtn}
                disabled={isSubmitting}
                data-type='submit'
                type='submit'>
                <i
                  className={cls('iconfont icon-select-bold', styles.btnImg)}
                />
                <span>完成</span>
              </Button.Default>
              {!isAdd && (
                <Button.Red
                  disabled={isSubmitting}
                  className={styles.delete}
                  data-type='delete'>
                  <i
                    className={cls('iconfont icon-close-bold', styles.btnImg)}
                  />
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
              defaultValue={title}
            />
          </div>
          <div className={styles.formTextarea}>
            <Controller
              render={({ field }) => (
                <InputTextarea
                  {...field}
                  onChange={(e) => {
                    setContent(e.target.value);
                    field.onChange(e.target.value);
                  }}
                />
              )}
              name='content'
              control={control}
              defaultValue={content}
            />
          </div>
        </form>
      </div>

      {preview && (
        <div className={cls(styles.preview, { [styles.hide]: !preview })}>
          <ScrollBar>
            <h1 className={styles.title}>{title}</h1>
            <NotePreview>{content}</NotePreview>
          </ScrollBar>
        </div>
      )}
    </div>
  );
}
