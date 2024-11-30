import { TextareaHTMLAttributes } from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

import ScrollBar from '@/components/ScrollBar';

import styles from './index.module.scss';

interface Props extends TextareaAutosizeProps {}

export default function Textarea(props: Props) {
  const { children, className, ...other } = props;
  return (
    <div className={styles.textareaBox}>
      <ScrollBar>
        <div>
          <TextareaAutosize className={styles.textarea} {...other} />
        </div>
      </ScrollBar>
    </div>
  );
}
