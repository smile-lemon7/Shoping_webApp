import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './Item.less';
import ProdItem from '../ProductCom/ProdItem';

function Item({...prodInfo}) {
  return (
   <Flex className={styles.wrapItem}>
    <ProdItem {...prodInfo} />
   </Flex>
  )}

Item.prototype = {
  prodInfo: PropTypes.object
}
export default Item;