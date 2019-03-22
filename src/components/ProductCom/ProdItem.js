import { Flex } from 'antd-mobile';
import PricePanel from '../PricePanel';
import styles from './ProdItem.less';

export default function ProdItem({id, cover_img, title, pay_counts, curr_price, onClick}) {
  return (
    <Flex key={id} className={styles.card} direction="column" justify="around" onClick={onClick}>
      <img src={cover_img[0]} alt=""/>
      <Flex className={styles.title}>{title}</Flex>
        <Flex className={styles.priceWrap} justify="between" align="stretch">
          {/* <Flex className={curr_price}><span>￥</span><span className={styles.price}>{curr_price}</span></Flex> */}
          <PricePanel price={curr_price} />
          <Flex className={styles.pay_counts}>{2}人付款</Flex>
        </Flex>
    </Flex>
  )
}