import './style.css';
import Sidebar from '@/components/Sidebar';

interface Props extends PropsBase {}

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
