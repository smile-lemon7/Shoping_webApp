import { Flex } from 'antd-mobile';
import PropTypes from 'prop-types';
import PricePanel from '../../components/PricePanel';
import styles from './Item.less';

function Item({info}) {
  const {price, title, cover_img, counts, onClick} = info;
  return (
    <Flex className={styles.card} onClick={onClick} justify="between">
      <img src={cover_img[0]} alt={cover_img[0]} />
      <Flex className={styles.CardR} direction="column" align="start">
        <p className={styles.title}>{title}</p>
        <Flex justify="between" style={{width:'90%',marginTop:10}}>
          <PricePanel price={price} />
          <span style={{color:'#888'}}>x{counts}</span>
        </Flex>
      </Flex>
    </Flex>
  )}

Item.propTypes = {
  info: PropTypes.shape({
    price: PropTypes.number, 
    title: PropTypes.string, 
    cover_img: PropTypes.array, 
    counts: PropTypes.number, 
    onClick: PropTypes.func
  })
}
export default Item;