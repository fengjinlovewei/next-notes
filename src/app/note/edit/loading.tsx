import cls from 'classnames';
import styles from './loading.module.scss';

export default function EditSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.form}>
        <div className={styles.menu}>
          <div
            className={cls('skeleton ', 'skeleton--button')}
            style={{ width: '120px', height: '40px' }}
          />
          <div
            className='skeleton skeleton--button'
            style={{ width: '120px', height: '40px', marginLeft: '16px' }}
          />
        </div>
        <div className={styles.input}>
          <div className='skeleton v-stack' style={{ height: '50px' }} />
          <div className='skeleton v-stack' style={{ height: '100%' }} />
        </div>
      </div>
      <div className={styles.preview}>
        <div
          className='note-title skeleton'
          style={{ height: '50px', width: '200px', margin: '12px 1em' }}
        />
        <div style={{ marginTop: '50px' }}>
          <div className='skeleton v-stack' style={{ height: '1.5em' }} />
          <div className='skeleton v-stack' style={{ height: '1.5em' }} />
          <div className='skeleton v-stack' style={{ height: '1.5em' }} />
          <div className='skeleton v-stack' style={{ height: '1.5em' }} />
          <div className='skeleton v-stack' style={{ height: '1.5em' }} />
        </div>
      </div>
    </div>
  );
}
