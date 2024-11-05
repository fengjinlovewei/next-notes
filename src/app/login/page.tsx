'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import cls from 'classnames';
import styles from './page.module.scss';

export default function Login() {
  const [login, setLogin] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const router = useRouter();

  const showDetails = () => {
    router.push(`/note`);
  };

  const toggle = () => {
    setLogin(!login);
  };

  const submit = () => {
    setActive(true);
    setTimeout(() => {
      showDetails();
    }, 1000);
  };
  return (
    <div className={styles.loginContainer}>
      <div
        className={cls(styles.container, {
          [styles.logIn]: login,
          [styles.active]: active,
        })}>
        <div className={styles.box}></div>
        <div className={styles.containerForms}>
          <div className={styles.containerInfo}>
            <div className={styles.infoItem}>
              <div className={styles.table}>
                <div className={styles.tableCell}>
                  <p>已经有账号了?</p>
                  <div className={styles.btn} onClick={toggle}>
                    登 录
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.table}>
                <div className={styles.tableCell}>
                  <p>还没有账号?</p>
                  <div className={styles.btn} onClick={toggle}>
                    注 册
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.containerForm}>
            <div className={cls(styles.formItem, styles.logIn)}>
              <div className={styles.table}>
                <div className={styles.tableCell}>
                  <input name='Username' placeholder='Username' type='text' />
                  <input
                    name='Password'
                    placeholder='Password'
                    type='Password'
                  />
                  <div className={styles.btn} onClick={submit}>
                    登 录
                  </div>
                </div>
              </div>
            </div>
            <div className={cls(styles.formItem, styles.signUp)}>
              <div className={styles.table}>
                <div className={styles.tableCell}>
                  <input name='email' placeholder='Email' type='text' />
                  <input name='fullName' placeholder='Full Name' type='text' />
                  <input name='Username' placeholder='Username' type='text' />
                  <input
                    name='Password'
                    placeholder='Password'
                    type='Password'
                  />
                  <div className={styles.btn}>注 册</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
