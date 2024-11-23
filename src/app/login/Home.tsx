'use client';

import { useState } from 'react';

import cls from 'classnames';
import styles from './Home.module.scss';

import { LoginForm, RegisterForm } from './Form';

export default function Login() {
  const [register, setRegister] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setActive(true);
  //   }, 2000);
  // }, []);

  const toggle = () => {
    setRegister(!register);
  };

  return (
    <div className={styles.loginContainer}>
      <div
        className={cls(styles.container, {
          [styles.register]: register,
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
            <div className={cls(styles.formItem, styles.register)}>
              <LoginForm setActive={setActive} register={register} />
            </div>
            <div className={cls(styles.formItem, styles.signUp)}>
              <RegisterForm toggle={toggle} register={register} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
