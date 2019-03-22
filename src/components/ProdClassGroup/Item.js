import { Flex } from 'antd-mobile';
import styles from './Item.less';
import ProdItem from '../ProductCom/ProdItem';

function Item({...prodInfo}) {
  return (
   <Flex className={styles.wrapItem}>
    <ProdItem {...prodInfo} />
   </Flex>
  )}


export default Item;