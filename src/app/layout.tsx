import './reset.css';
import './common.css';
import { Ma_Shan_Zheng } from 'next/font/google';
import cls from 'classnames';

import { headers } from 'next/headers';

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
  const nonce = headers().get('x-nonce');
  console.log('nonce-page', nonce);

  return (
    <html lang='en' className={cls(MaShanZheng.variable)}>
      <body>
        <div className='container'>{children}</div>
      </body>
    </html>
  );
}
