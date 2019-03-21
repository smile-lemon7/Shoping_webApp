import { Flex } from 'antd-mobile';
import styles from './index.less';

function ProdCount({count, onAdd, onReduce}) {
  return (
    <Flex className={styles.count}>
      <Flex className={`iconfont icon-jian ${styles.L}`} onClick={onReduce}></Flex>
      <Flex className={styles.C}>{count?count: 1}</Flex>
      <Flex className={`iconfont icon-jia ${styles.R}`} onClick={onAdd}></Flex>
    </Flex>
  )}


export default ProdCount;