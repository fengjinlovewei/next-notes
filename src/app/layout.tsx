import './style.css';
import Sidebar from '@/components/Sidebar';

// 退出数据缓存
export const dynamic = 'force-dynamic';

interface Props extends PropsBase {
  params: any;
  searchParams: any;
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body>
        <div className='container'>
          <div className='main'>
            <Sidebar />
            <section className='col note-viewer'>{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
