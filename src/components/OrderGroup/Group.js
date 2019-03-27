import { Flex, Button } from 'antd-mobile';
import PropTypes from 'prop-types';
import Item from './Item';
import PricePanel from '../PricePanel';
import styles from './Group.less';

function Group({list, user_id, onCancelOrder, onPay, onRemove, onConfirmReceive}) {
  return (
    <Flex className={styles.listWrap} direction="column">
      {list&&list.map(item => (
        <Flex key={item.order_id} justify="center" className={styles.panelWrap} direction="column">
          <Flex className={styles.top} direction="column" justify="center" onClick={item.onClick}>
            {item.status===0?<Flex className={styles.title} justify="end">等待买家付款</Flex>:null}
            {item.status===1?<Flex className={styles.title} justify="end">买家已付款</Flex>:null}
            {item.status===2?<Flex className={styles.title} justify="end">卖家已发货</Flex>:null}
            {item.status===3?<Flex className={styles.title} justify="end">交易成功</Flex>:null}
            <Item key={item.id} prodList={item.orderProdArr} />
            <Flex justify="end" className={styles.bottomWrap}>
              <Flex className={styles.counts}>共{item.orderProdArr.length}件商品</Flex>
              合计：<PricePanel price={item.sumprice} color="#000" />
            </Flex>
          </Flex>
          {/** 1：未付款*/}
          {item.status===0?  
            <Flex className={styles.btnWrap} justify="end">
              <Button size="small" className={styles.cancelBtn} onClick={() => onCancelOrder({user_id, id: item.order_id})}>取消订单</Button> 
              <Button size="small" className={styles.payBtn} onClick={()=> onPay({id: item.order_id})}>付款</Button>
            </Flex>:null
          }
          {/** 2：付款未发货*/}
          {/* {item.status===1?<Flex className={styles.btnWrap} justify="end">
              <Button size="small" className={styles.removeBtn}>删除订单</Button>
            </Flex>:null
          } */}

          {item.status===2?<Flex className={styles.btnWrap} justify="end">
              <Button size="small" className={styles.removeBtn} onClick={()=>onConfirmReceive({id: item.order_id})}>确认收货</Button>
            </Flex>:null
          }
          {item.status===3?<Flex className={styles.btnWrap} justify="end">
              <Button size="small" className={styles.removeBtn} onClick={()=> onRemove({id: item.order_id})}>删除订单</Button>
            </Flex>:null
          }
          
        </Flex>
      ))}
    </Flex>
  )}

  Group.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      status: PropTypes.number,
      sumPrice: PropTypes.number,
      orderProdArr: PropTypes.array,
    }))
  }
export default Group;