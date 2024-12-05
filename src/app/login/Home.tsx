'use client';

import { useState } from 'react';

import cls from 'classnames';
import styles from './Home.module.scss';

import { LoginForm, RegisterForm } from './Form';

import Button from '@/components/Button';

export default function Login() {
  const [register, setRegister] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const toggle = () => {
    setRegister(!register);
  };

  const list = [
    { t1: '已经有账号了?', t2: '登 录' },
    { t1: '还没有账号?', t2: '注 册' },
  ].map((item) => {
    return (
      <div className={styles.infoItem} key={item.t1}>
        <div className={styles.table}>
          <div className={styles.tableCell}>
            <p>{item.t1}</p>
            <div className={styles.tableBtn}>
              <Button.Line className={styles.btn} onClick={toggle}>
                {item.t2}
              </Button.Line>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.loginContainer}>
      <div
        className={cls(styles.container, {
          [styles.register]: register,
          [styles.active]: active,
        })}>
        {/* <div className={styles.box}></div> */}
        <div className={styles.containerForms}>
          <div className={styles.containerInfo}>{list}</div>
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
