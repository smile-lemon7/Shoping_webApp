import { Flex } from 'antd-mobile';
import styles from './index.less';

export default function Title({title, color}) {
  return (
    <Flex className={styles.wrap} justify="center">
      <span className={styles.text} style={{color: color}}>{title}</span>
      <Flex className={styles.line}></Flex>
    </Flex>
  )
}