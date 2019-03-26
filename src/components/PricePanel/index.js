import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.less';

function PricePanel({price, color, size, oth_size}) {
  const curr_price_integer = String(price).split('.')[0];
  const curr_price_decimal = String(price).split('.')[1] ? String(price).split('.')[1]: '00';
  return (
   <Flex className={styles.price}>
      <span className={styles.signMoney} style={{color:color, fontSize: oth_size, marginTop:2}}>￥</span>
      <span style={{color:color, fontSize: size}}>{curr_price_integer}.</span>
      <span className={styles.curr_price_decimal} style={{color:color, fontSize: oth_size, marginTop:2}}>{curr_price_decimal}</span>
    </Flex>
  )}

PricePanel.prototype = {
  price: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  oth_size: PropTypes.string,
}
export default PricePanel;