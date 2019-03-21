import { Flex } from 'antd-mobile';
import PricePanel from '../../components/PricePanel';
import styles from './item.less';

function Item({info}) {
  const {price, title, cover_img, counts, onClick} = info;
  return (
    <Flex className={styles.card} onClick={onClick}>
      <img src={cover_img[0]} alt={cover_img[0]} />
      <Flex className={styles.CardR} direction="column" align="start">
        <p className={styles.title}>{title}</p>
        <Flex justify="between" style={{width:'90%'}}>
          <PricePanel price={price} />
          <span style={{color:'#888'}}>x{counts}</span>
        </Flex>
      </Flex>
    </Flex>
  )}


export default Item;