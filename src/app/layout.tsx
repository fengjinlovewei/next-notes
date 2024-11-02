import './reset.css';
import './common.css';
import Sidebar from '@/components/Sidebar';
import styles from './layout.module.scss';

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
          <div className={styles.main}>
            <Sidebar />
            <section className={styles.note_viewer}>
              <div className={styles.note_viewer_info}>{children}</div>
            </section>
          </div>
        </div>
      </body>
    </html>
  );
}
