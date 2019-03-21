import { Flex } from 'antd-mobile';
import styles from './index.less';

function PricePanel({price}) {
  const curr_price_integer = String(price).split('.')[0];
  const curr_price_decimal = String(price).split('.')[1] ? String(price).split('.')[1]: '00';
  return (
   <Flex className={styles.price}>
      <span className={styles.signMoney}>￥</span>
      <span>{curr_price_integer}.</span>
      <span className={styles.curr_price_decimal}>{curr_price_decimal}</span>
    </Flex>
  )}


export default PricePanel;