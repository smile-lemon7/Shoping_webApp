import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';
import PricePanel from '../PricePanel';
import styles from './RecommendPanel.less';

function RecommendPanel({list, onDetails}) {
  return (
    <Flex className={styles.wrap} align="start" justify="between" wrap="wrap">
      {list.map(item => (
        <Flex key={item.id} className={styles.card} direction="column" justify="around" onClick={()=>onDetails(item.id)}>
          <img src={item.cover_img[0]} alt=""/>
          <Flex className={styles.title}>{item.title}</Flex>
            <Flex className={styles.priceWrap} justify="between" align="stretch">
              <Flex className={styles.currentPrice} justify="between" align="stretch"><PricePanel price={item.price} size={15} oth_size={12} /></Flex>
              <Flex className={styles.pay_counts}>库存{item.stock}</Flex>
          </Flex>
        </Flex>
      ))
      }
    </Flex>
  )}

  RecommendPanel.propTypes = {
    list: PropTypes.array,
    onDetails: PropTypes.func,
  }

export default RecommendPanel;