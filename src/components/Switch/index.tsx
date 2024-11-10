import { ChangeEvent } from 'react';
import styles from './index.module.scss';

interface Props extends PropsBase {
  checked?: boolean;
  defaultChecked?: boolean;
  leftText?: string;
  rightText?: string;
  onChange?: (value: boolean, event?: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

const Switch = (props: Props) => {
  const {
    checked = false,
    defaultChecked = false,
    leftText = '开启',
    rightText = '关闭',
    onChange = (value) => {},
    onClick = () => {},
  } = props;

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    onChange(value, event);
  };

  const propsData: Pick<Props, 'checked' | 'defaultChecked'> = {};

  if (typeof checked === 'boolean') {
    propsData.checked = checked;
  } else if (typeof defaultChecked === 'boolean') {
    propsData.defaultChecked = defaultChecked;
  } else {
    throw new Error('必须是受控组件或者非受控组件选其一！');
  }

  return (
    <div className={styles.switch}>
      <div className={styles['checkbox-wrapper-5']}>
        <div className={styles.check}>
          <input
            {...propsData}
            id='check-5'
            type='checkbox'
            onChange={change}
          />
          <label htmlFor='check-5' onClick={onClick}>
            <div></div>
          </label>
          <div
            className={styles.inputClone}
            onClick={(e) => e.defaultPrevented}>
            <div className={styles.leftText}>{leftText}</div>
            <div className={styles.rightText}>{rightText}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Switch;
