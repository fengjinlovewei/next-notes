import styles from './index.module.scss';

export default function Empty() {
  return (
    <div className={styles.empty}>
      <span className={styles.text}>点击左边的笔记来查看一些东西! 🥺</span>
    </div>
  );
}
