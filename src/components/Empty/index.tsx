import styles from './index.module.scss';

export default function Empty() {
  return (
    <div className={styles.empty}>
      <span className={styles.text}>
        Click a note on the left to view something! 🥺
      </span>
    </div>
  );
}
