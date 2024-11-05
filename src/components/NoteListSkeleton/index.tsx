import cls from 'classnames';

import styles from './index.module.scss';

export default function NoteListSkeleton() {
  return (
    <div>
      <ul className={styles.list}>
        {Array(3)
          .fill(0)
          .map((item, index) => {
            return (
              <li className='v-stack' key={index}>
                <div className={cls('skeleton', styles.item)} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
