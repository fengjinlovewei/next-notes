'use client';

import { useState } from 'react';
import { fetchPost } from '@/util/client';

import Switch from '@/components/Switch';

interface Props extends PropsBase {
  note: Note;
}

export default function Public(props: Props) {
  const { note } = props;
  console.log('note', note);
  const [value, setValue] = useState(note.public);
  const onChange = (value: boolean) => {
    console.log(value);
  };
  const onClick = async () => {
    const json = await fetchPost('/api/setNotePublic', {
      noteId: note.id,
      public: !value,
    });

    console.log('2222', json);
    setValue(json.data);
  };

  return (
    <Switch
      checked={value}
      onClick={onClick}
      leftText='公开'
      rightText='私密'
    />
  );
}
