'use server';
import SidebarNoteItemContent from '@/components/SidebarNoteItemContent';
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader';

import cls from 'classnames';
import styles from './index.module.scss';

interface Props extends PropsBase {
  noteId: string;
  note: any;
}

export default async function SidebarNoteItem({ noteId, note }: Props) {
  const { title, content = '', updateTime } = note;

  const expandedChildren = (
    <p className={styles.excerpt}>
      {content.substring(0, 20) || <i>(No content)</i>}
    </p>
  );

  return (
    <SidebarNoteItemContent
      /**
       * 1.服务端组件可以导入客户端组件，但客户端组件并不能导入服务端组件
       * 2.从服务端组件到客户端组件传递的数据需要可序列化.
       *
       * 所谓可序列化，简单的理解就是 JSON.stringify() 这段数据不会出现错误，
       * 如果我们在这里传递一个函数 fun={() => {}}，就会出现错误提示：
       */
      // fun={() => {}} 不能传递函数
      id={noteId}
      /**
       * 第一种方式：可以将服务端组件以 props 的形式传给客户端组件，例如 expandedChildren
       * 第二种方式：children 也算是以 props 形式传递的组件
       */
      // 第一种方式
      expandedChildren={expandedChildren}>
      {/* 第二种方式 */}
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  );
}
