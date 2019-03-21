import { Flex } from 'antd-mobile';
import styles from './index.less';

function ProdCount({count}) {
  
  return (
    <Flex className={styles.count}>
      <Flex className={`iconfont icon-jian ${styles.L}`}></Flex>
      <Flex className={styles.C}>{count?count: 1}</Flex>
      <Flex className={`iconfont icon-jia ${styles.R}`}></Flex>
    </Flex>
  )}


export default ProdCount;