'use client';
import { useEffect, useRef } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { userLogin, userRegister } from '@/app/actions';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import styles from './Form.module.scss';
import Button from '@/components/Button';
import Yzm, { HandleProps } from '@/components/Yzm';
import Input from '@/components/Input';
import { useUpdateEffect } from 'ahooks/es';

import { formStateToast, initialUseFormState } from '@/util/client';

const LoginButton = ({ formAction, onClick }: any) => {
  const { pending, action } = useFormStatus();

  return (
    <Button.Default
      className={styles.btn}
      type='submit'
      onClick={onClick}
      formAction={formAction}>
      {action === formAction ? '登录中...' : '登 录'}
    </Button.Default>
  );
};

const RegisterButton = ({ formAction, onClick }: any) => {
  const { pending, action } = useFormStatus();

  return (
    <Button.Default
      className={styles.btn}
      type='submit'
      onClick={onClick}
      formAction={formAction}>
      {action === formAction ? '注册中...' : '注 册'}
    </Button.Default>
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
    formStateToast(loginState);

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
        <Input name='username' placeholder='账号' />
        <Input name='password' placeholder='密码' type='password' />
        <div className={styles.yzmBox}>
          <Input className={styles.yzmInput} name='yzm' placeholder='验证码' />
          <Yzm className={styles.yzm} ref={loginYzmRef} />
        </div>
        <div className={styles.btnBox}>
          <LoginButton formAction={loginFormAction} />
        </div>
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
        <Input name='username' placeholder='账号' />
        <Input name='password' placeholder='密码' type='password' />

        {/* <input
      name='password2'
      placeholder='再次输入密码'
      type='password'
    /> */}
        <Input name='invitecode' placeholder='邀请码' />
        <div className={styles.yzmBox}>
          <Input className={styles.yzmInput} name='yzm' placeholder='验证码' />
          <Yzm className={styles.yzm} ref={registerYzmRef} />
        </div>
        <div className={styles.btnBox}>
          <RegisterButton formAction={registerFormAction} />
        </div>
      </form>
    </div>
  );
}
