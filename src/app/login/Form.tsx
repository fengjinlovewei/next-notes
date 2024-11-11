'use client';

import { useFormStatus, useFormState } from 'react-dom';
import { userLogin, userRegister } from '@/app/actions';

import styles from './Home.module.scss';
import Button from '@/components/Button';

const initialState: { message: any; errors: any } = {
  message: null,
  errors: null,
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

export function LoginForm() {
  const [registerState, registerFormAction] = useFormState(
    userRegister as any,
    initialState,
  );
  return (
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
  );
}
