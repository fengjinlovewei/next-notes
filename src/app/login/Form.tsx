'use client';
import { useEffect, useRef } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { userLogin, userRegister } from '@/app/actions';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import styles from './Form.module.scss';
import Button from '@/components/Button';
import Yzm, { HandleProps } from '@/components/Yzm';
import { useUpdateEffect } from 'ahooks/es';

import { formStateToast, initialUseFormState } from '@/util/client';

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

export function LoginForm(props: { setActive: Func; register: boolean }) {
  const { setActive, register } = props;
  const loginYzmRef = useRef<HandleProps | null>(null);

  const [loginState, loginFormAction] = useFormState(
    userLogin,
    initialUseFormState,
  );

  const router = useRouter();

  useEffect(() => {
    if (loginState.errors) {
      // 处理错误
      toast.error(loginState.errors, {
        position: 'top-center',
        autoClose: false,
      });
    }

    if (loginState.code == 102) {
      return loginYzmRef.current?.updataYzm();
    }

    if (loginState.message) {
      // 成功
      setActive(true);
      setTimeout(() => {
        router.push(`/note`);
      }, 1000);
    }
  }, [loginState]);

  useUpdateEffect(() => {
    console.log(register);
    if (!register) {
      loginYzmRef.current?.updataYzm();
    }
  }, [register]);

  return (
    <div className={styles.table}>
      <form className={styles.tableCell}>
        <input name='username' placeholder='username' type='text' />
        <input name='password' placeholder='password' type='password' />
        <div className=''>
          <input name='yzm' placeholder='输入验证码' type='text' />
          <Yzm ref={loginYzmRef} />
        </div>
        <LoginButton formAction={loginFormAction} />
      </form>
    </div>
  );
}

export function RegisterForm(props: { toggle: Func; register: boolean }) {
  const { toggle, register } = props;
  const registerYzmRef = useRef<HandleProps | null>(null);

  const [registerState, registerFormAction] = useFormState(
    userRegister,
    initialUseFormState,
  );

  useEffect(() => {
    formStateToast(registerState);

    if (registerState.code == 102) {
      return registerYzmRef.current?.updataYzm();
    }

    if (registerState.message) {
      // 成功
      toggle();
    }
  }, [registerState]);

  useUpdateEffect(() => {
    console.log(register);
    if (register) {
      registerYzmRef.current?.updataYzm();
    }
  }, [register]);

  return (
    <div className={styles.table}>
      <form className={styles.tableCell}>
        <input name='username' placeholder='输入账号' type='text' />
        <input name='password' placeholder='输入密码' type='password' />
        {/* <input
      name='password2'
      placeholder='再次输入密码'
      type='password'
    /> */}
        <div className=''>
          <input name='yzm' placeholder='输入验证码' type='text' />
          <Yzm ref={registerYzmRef} />
        </div>

        <input name='invitecode' placeholder='输入邀请码' type='text' />
        <RegisterButton formAction={registerFormAction} />
      </form>
    </div>
  );
}
