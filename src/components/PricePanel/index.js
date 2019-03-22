import { Flex } from 'antd-mobile';
import styles from './index.less';

function PricePanel({price, color, size}) {
  const curr_price_integer = String(price).split('.')[0];
  const curr_price_decimal = String(price).split('.')[1] ? String(price).split('.')[1]: '00';
  return (
   <Flex className={styles.price}>
      <span className={styles.signMoney} style={{color:color, fontSize: size, marginTop:size?-2:4}}>￥</span>
      <span style={{color:color, fontSize: size}}>{curr_price_integer}.</span>
      <span className={styles.curr_price_decimal} style={{color:color, fontSize: size, marginTop:size?2:4}}>{curr_price_decimal}</span>
    </Flex>
  )}


export default PricePanel;