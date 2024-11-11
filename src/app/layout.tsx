import './reset.css';
import './common.css';
import { Ma_Shan_Zheng } from 'next/font/google';
import cls from 'classnames';

import { headers, cookies } from 'next/headers';

import Common from './common';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 退出数据缓存
export const dynamic = 'force-dynamic';

interface Props extends PropsBase {}

// 2. 实例化字体对象，设置使用子集等
const MaShanZheng = Ma_Shan_Zheng({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-MaShanZheng',
});

export default async function RootLayout({ children }: Props) {
  //const Headers = await headers();
  const cookieStore = await cookies();
  // console.log('headers', [...Headers.keys()], [...Headers.values()]);
  console.log('cookieStore', cookieStore.getAll());

  return (
    <html lang='en' className={cls(MaShanZheng.variable)}>
      <body>
        <Common />
        <div className='container'>{children}</div>
        <ToastContainer />
      </body>
    </html>
  );
}
