import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './Item.less';
import ProdItem from '../ProductCom/ProdItem';

function Item({prodInfo}) {
  return (
   <Flex className={styles.wrapItem} justify="center">
    <ProdItem {...prodInfo} />
   </Flex>
  )}

Item.prototype = {
  prodInfo: PropTypes
}
export default Item;