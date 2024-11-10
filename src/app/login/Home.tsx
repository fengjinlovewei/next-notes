'use client';

import { useState, useEffect } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

import { userLogin, userRegister } from '@/app/actions';

import cls from 'classnames';
import styles from './Home.module.scss';

import Button from '@/components/Button';

const initialState: { message: any; errors: any } = {
  message: null,
  errors: null,
};

const LoginButton = ({ formAction, onClick }: any) => {
  const { pending, action } = useFormStatus();

  return (
    <Button.Unstyle
      className={styles.btn}
      type='submit'
      onClick={onClick}
      formAction={formAction}>
      {action === formAction ? '登录中...' : '登 录'}
    </Button.Unstyle>
  );
};

const RegisterButton = ({ formAction, onClick }: any) => {
  const { pending, action } = useFormStatus();

  return (
    <Button.Unstyle
      className={styles.btn}
      type='submit'
      onClick={onClick}
      formAction={formAction}>
      {action === formAction ? '注册中...' : '注 册'}
    </Button.Unstyle>
  );
};

export default function Login() {
  const [login, setLogin] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const [loginState, loginFormAction] = useFormState(
    userLogin as any,
    initialState,
  );

  const [registerState, registerFormAction] = useFormState(
    userRegister as any,
    initialState,
  );

  const router = useRouter();

  useEffect(() => {
    console.log(registerState);
    if (registerState.errors) {
      // 处理错误
      toast.error(registerState.errors, {
        position: 'top-center',
        autoClose: false,
      });
    }

    if (registerState.message) {
      // 成功
      toast.success(registerState.message, {
        position: 'top-center',
        autoClose: 1000,
      });
      toggle();
    }
  }, [registerState]);

  useEffect(() => {
    if (loginState.errors) {
      // 处理错误
      toast.error(loginState.errors, {
        position: 'top-center',
        autoClose: false,
      });
    }
    if (loginState.message) {
      // 成功
      setActive(true);
      setTimeout(() => {
        router.push(`/note`);
      }, 1000);
    }
  }, [loginState]);

  const toggle = () => {
    setLogin(!login);
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
                <form
                  method='post'
                  action='/api/auth/callback/credentials'
                  className={styles.tableCell}>
                  <input name='username' placeholder='username' type='text' />
                  <input
                    name='password'
                    placeholder='password'
                    type='password'
                  />
                  <LoginButton formAction={loginFormAction} />
                </form>
              </div>
            </div>
            <div className={cls(styles.formItem, styles.signUp)}>
              <div className={styles.table}>
                <form className={styles.tableCell}>
                  <input name='username' placeholder='username' type='text' />
                  <input name='password' placeholder='password' type='text' />
                  {/* <input
                    name='password'
                    placeholder='password'
                    type='password'
                  /> */}
                  <RegisterButton formAction={registerFormAction} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
