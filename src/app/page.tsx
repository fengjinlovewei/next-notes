import Home from '@/components/Home';

import UpLoad from '@/components/UpLoad';
import Input from '@/components/Input';

export default async function Page() {
  return (
    <>
      <div style={{ padding: '100px' }}>
        <Input bottom={<div>wqweqwe</div>} />
        <UpLoad />
      </div>

      <Home username='root' />
    </>
  );
}
