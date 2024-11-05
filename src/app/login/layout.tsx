import cls from 'classnames';

import { headers } from 'next/headers';

interface Props extends PropsBase {}

export default async function LoginLayout({ children }: Props) {
  const nonce = headers().get('x-nonce');
  console.log('nonce-page', nonce);

  return <div className='login'>{children}</div>;
}
