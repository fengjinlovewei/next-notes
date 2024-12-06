'use client';
import { useRef } from 'react';
import { userLogin, userRegister } from '@/app/actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useUpdateEffect } from 'ahooks/es';

import { userLoginSchema, userRegisterSchema } from '@/lib/types';
import type { userLoginSchemaType, userRegisterSchemaType } from '@/lib/types';
import { success } from '@/util/client/toast';

import Button from '@/components/Button';
import Yzm, { HandleProps } from '@/components/Yzm';
import Input from '@/components/Input';

import styles from './Form.module.scss';

export function LoginForm(props: { setActive: Func; registerShow: boolean }) {
  const { setActive, registerShow } = props;
  const loginYzmRef = useRef<HandleProps | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<userLoginSchemaType>({
    resolver: zodResolver(userLoginSchema),
  });

  const router = useRouter();

  useUpdateEffect(() => {
    if (!registerShow) {
      reset();
      loginYzmRef.current?.updataYzm();
    }
  }, [registerShow]);

  const onSubmit = async (data: userLoginSchemaType) => {
    const response = await userLogin(data);

    if (response.errors) {
      // 显示服务端错误
      const errorKeys = Object.keys(response.errors);
      errorKeys.forEach((key) => {
        setError(key as any, {
          type: 'server',
          message: response?.errors?.[key],
        });
      });

      loginYzmRef.current?.updataYzm();

      return;
    }

    setActive(true);
    setTimeout(() => {
      router.push(`/note`);
    }, 1000);

    reset();
  };

  return (
    <div className={styles.table}>
      <form className={styles.tableCell} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('username')}
          placeholder='账号'
          error={errors?.username?.message as string}
        />
        <Input
          {...register('password')}
          placeholder='密码'
          type='password'
          autoComplete='new-password'
          error={errors?.password?.message as string}
        />
        <div className={styles.yzmBox}>
          <Input
            {...register('yzm')}
            className={styles.yzmInput}
            maxLength={4}
            placeholder='验证码'
            error={errors?.yzm?.message as string}
          />
          <Yzm className={styles.yzm} ref={loginYzmRef} />
        </div>
        <div className={styles.btnBox}>
          <Button.Default
            className={styles.btn}
            type='submit'
            disabled={isSubmitting}>
            登 录
          </Button.Default>
        </div>
      </form>
    </div>
  );
}

export function RegisterForm(props: { toggle: Func; registerShow: boolean }) {
  const { toggle, registerShow } = props;
  const registerYzmRef = useRef<HandleProps | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<userRegisterSchemaType>({
    resolver: zodResolver(userRegisterSchema),
  });

  useUpdateEffect(() => {
    console.log(registerShow);
    if (registerShow) {
      reset();
      registerYzmRef.current?.updataYzm();
    }
  }, [registerShow]);

  const onSubmit = async (data: userRegisterSchemaType) => {
    const response = await userRegister(data);

    if (response.errors) {
      // 显示服务端错误
      const errorKeys = Object.keys(response.errors);
      errorKeys.forEach((key) => {
        setError(key as any, {
          type: 'server',
          message: response?.errors?.[key],
        });
      });

      registerYzmRef.current?.updataYzm();

      return;
    }

    success('注册成功');
    toggle();
    reset();
  };

  return (
    <div className={styles.table}>
      <form className={styles.tableCell} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('username')}
          placeholder='账号'
          error={errors?.username?.message as string}
        />
        <Input
          {...register('password')}
          placeholder='密码'
          type='password'
          autoComplete='new-password'
          error={errors?.password?.message as string}
        />

        {/* <input
      name='password2'
      placeholder='再次输入密码'
      type='password'
    /> */}
        <Input
          {...register('invitecode')}
          placeholder='邀请码'
          error={errors?.invitecode?.message as string}
        />
        <div className={styles.yzmBox}>
          <Input
            className={styles.yzmInput}
            {...register('yzm')}
            maxLength={4}
            placeholder='验证码'
            error={errors?.yzm?.message as string}
          />
          <Yzm className={styles.yzm} ref={registerYzmRef} />
        </div>
        <div className={styles.btnBox}>
          <Button.Default
            className={styles.btn}
            type='submit'
            disabled={isSubmitting}>
            注 册
          </Button.Default>
        </div>
      </form>
    </div>
  );
}
