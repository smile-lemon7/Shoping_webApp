import { Flex } from 'antd-mobile';
import PricePanel from '../PricePanel';
import PropTypes from 'prop-types';
import styles from './ProdItem.less';

function ProdItem({id, cover_img, title, pay_counts, price, onClick}) {
  return (
    <Flex key={id} className={styles.card} direction="column" justify="around" onClick={onClick}>
      <img src={cover_img[0]} alt=""/>
      <Flex className={styles.title}>{title}</Flex>
        <Flex className={styles.priceWrap} justify="between" align="stretch">
          {/* <Flex className={curr_price}><span>￥</span><span className={styles.price}>{curr_price}</span></Flex> */}
          <PricePanel price={price} />
          <Flex className={styles.pay_counts}>{2}人付款</Flex>
        </Flex>
    </Flex>
  )
}

ProdItem.propTypes = {
  id: PropTypes.number, 
  cover_img: PropTypes.array, 
  title: PropTypes.string, 
  pay_counts: PropTypes.number, 
  price: PropTypes.number, 
  onClick: PropTypes.func,
}
export default PropTypes;