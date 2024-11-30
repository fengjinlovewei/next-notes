'use client';

import { Suspense } from 'react';

import SimpleBar from 'simplebar-react';

import './index.scss';

interface Props extends PropsBase {}

export default function ScrollBar(props: Props) {
  const { children } = props;
  return (
    <>
      <SimpleBar style={{ height: '100%' }}>
        <div className='simpleBar--notes--box-info'>{children}</div>
      </SimpleBar>
    </>
  );
}
