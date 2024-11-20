import Home from '@/components/Home';

import UpLoad from '@/components/UpLoad';

export default async function Page() {
  return (
    <>
      <div style={{ padding: '100px' }}>
        <img
          src='http://localhost:3455/api/static/image_processing20191028-23973-p5s8lo@4656051544ada9e9a9c2c7927fa9e697.gif'
          alt=''
        />
        <UpLoad />
      </div>

      <Home username='root' />
    </>
  );
}
