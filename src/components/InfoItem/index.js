import { Flex } from 'antd-mobile';
import styles from './index.less';

export default function InfoItem({title, value}) {
  return (
    <Flex className={styles.Panel}>
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </Flex>
  )
}