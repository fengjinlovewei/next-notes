import styles from './loading.module.scss';

export default function NoteSkeleton() {
  return (
    <div>
      <div className={styles.header}>
        <div
          className='skeleton'
          style={{ height: '48px', width: '65%', margin: '0 16px 0 12px' }}
        />
        <div
          className='skeleton skeleton--button'
          style={{ width: '88px', height: '40px' }}
        />
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
