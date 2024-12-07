import styles from './loading.module.scss';

export default function NoteSkeleton() {
  return (
    <div>
      <div className={styles.header}>
        <div
          className='skeleton'
          style={{ height: '48px', width: '40%', margin: '0 16px 0 12px' }}
        />
        <div className={styles.right}>
          {/* <div
            className='skeleton'
            style={{ width: '180px', height: '32px', marginRight: '30px' }}
          /> */}
          <div
            className='skeleton skeleton--button'
            style={{ width: '80px', height: '40px', marginRight: '16px' }}
          />
          <div
            className='skeleton skeleton--button'
            style={{ width: '88px', height: '40px' }}
          />
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <div className='skeleton v-stack' style={{ height: '24px' }} />
        <div className='skeleton v-stack' style={{ height: '24px' }} />
        <div className='skeleton v-stack' style={{ height: '24px' }} />
        <div className='skeleton v-stack' style={{ height: '24px' }} />
        <div className='skeleton v-stack' style={{ height: '24px' }} />
      </div>
    </div>
  );
}
