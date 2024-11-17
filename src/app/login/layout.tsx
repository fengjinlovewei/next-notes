import cls from 'classnames';

import { headers, cookies } from 'next/headers';

interface Props extends PropsBase {}

export default async function LoginLayout({ children }: Props) {
  const cookieStore = await cookies();
  //console.log('cookieStore', cookieStore.getAll());

  return <div className='login'>{children}</div>;
}
