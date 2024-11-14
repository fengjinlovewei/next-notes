import Home from '@/components/Home';

import UpLoad from '@/components/UpLoad';
import UpLoad2 from '@/components/UpLoad2';

export default async function Page() {
  return (
    <>
      <div style={{ padding: '100px' }}>
        <UpLoad2 />
      </div>

      <div style={{ padding: '100px' }}>
        <UpLoad />
      </div>

      <Home username='root' />
    </>
  );
}
