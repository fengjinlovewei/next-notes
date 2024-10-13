'use client';

import { useState, useEffect } from 'react';
import { useFormStatus, useFormState } from 'react-dom';

import NotePreview from '@/components/NotePreview';
import { deleteNote, saveNote } from '@/app/actions';

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
    <button
      className='note-editor-done'
      disabled={pending}
      type='submit'
      formAction={formAction}
      role='menuitem'>
      <img
        src='/checkmark.svg'
        width='14px'
        height='10px'
        alt=''
        role='presentation'
      />
      {action === formAction ? 'Saving' : 'Done'}
    </button>
  );
};

const DeleteButton = ({ formAction }: any) => {
  const { pending, action } = useFormStatus();

  return (
    <button
      className='note-editor-delete'
      disabled={pending}
      formAction={formAction}
      role='menuitem'>
      <img
        src='/cross.svg'
        width='10px'
        height='10px'
        alt=''
        role='presentation'
      />

      {action === formAction ? 'Deleting' : 'Delete'}
    </button>
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
    <div className='note-editor'>
      <form className='note-editor-form' autoComplete='off'>
        <input type='hidden' name='noteId' value={noteId} />
        <input type='hidden' name='isAdd' value={Number(isAdd)} />
        <div className='note-editor-menu' role='menubar'>
          <SaveButton formAction={saveFormAction} />
          {!isAdd && <DeleteButton formAction={delFormAction} />}
        </div>
        <div className='note-editor-menu'>
          {saveState?.message}
          {saveState.errors && saveState.errors[0].message}
        </div>
        <label className='offscreen' htmlFor='note-title-input'>
          Enter a title for your note
        </label>
        <input
          id='note-title-input'
          type='text'
          name='title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className='offscreen' htmlFor='note-body-input'>
          Enter the body for your note
        </label>
        <textarea
          name='body'
          value={body}
          id='note-body-input'
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className='note-editor-preview'>
        <div className='label label--preview' role='status'>
          Preview
        </div>
        <h1 className='note-title'>{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}
