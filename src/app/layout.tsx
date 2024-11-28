import './reset.css';
import './common.scss';
import { Ma_Shan_Zheng, Noto_Sans_SC } from 'next/font/google';
import localFont from 'next/font/local';
import cls from 'classnames';

import { headers, cookies } from 'next/headers';

import Common from './common';
import styles from './layout.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 退出数据缓存
export const dynamic = 'force-dynamic';

interface Props extends PropsBase {}

// 2. 实例化字体对象，设置使用子集等
const NotoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-NotoSansSC',
});

const IconFont = localFont({
  src: './fonts/iconfont.woff2',
  variable: '--font-IconFont',
  display: 'swap',
});

export default async function RootLayout({ children }: Props) {
  //const Headers = await headers();
  const cookieStore = await cookies();
  // console.log('headers', [...Headers.keys()], [...Headers.values()]);
  // console.log('cookieStore', cookieStore.getAll());

  return (
    <html lang='en' className={cls(NotoSansSC.variable, IconFont.variable)}>
      <body>
        <Common />
        <div className={styles.container}>{children}</div>
        <ToastContainer />
      </body>
    </html>
  );
}
