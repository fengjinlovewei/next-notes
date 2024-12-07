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
          <div
            className='skeleton skeleton--button'
            style={{ width: '68px', height: '32px', marginLeft: '16px' }}
          />
        </div>
        <div className={styles.input}>
          <div className='skeleton v-stack' style={{ height: '50px' }} />
          <div className='skeleton v-stack' style={{ height: '100%' }} />
        </div>
      </div>
    </div>
  );
}
