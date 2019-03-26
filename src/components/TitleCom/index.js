import { Flex } from 'antd-mobile';
import styles from './index.less';

function TitleCom({title}) {
  return (
    <Flex className={styles.wrap}><span className={styles.title}>{title}</span></Flex>
  )
}

export default TitleCom