import { Flex, Button } from 'antd-mobile';
import Item from './Item';
import PricePanel from '../PricePanel';
import styles from './Group.less';

function Group({list, type}) {
  return (
    <Flex className={styles.listWrap} direction="column">
      {list&&list.map(item => (
        <Flex key={item.id} justify="center" className={styles.panelWrap} direction="column">
          {item.status===1?<Flex className={styles.title} justify="end">等待买家付款</Flex>:null}
          {item.status===2?<Flex className={styles.title} justify="end">买家已付款</Flex>:null}
          {item.status===3?<Flex className={styles.title} justify="end">卖家已发货</Flex>:null}
          {item.status===4?<Flex className={styles.title} justify="end">交易成功</Flex>:null}
          <Item key={item.id} prodList={item.orderProdArr} />
          <Flex justify="end" className={styles.bottomWrap}>
            <Flex className={styles.counts}>共{item.orderProdArr.length}件商品</Flex>
            合计：<PricePanel price={item.sumPrice} color="#000" />
          </Flex>
          {/** 1：未付款*/}
          {item.status===1?  
              <Flex className={styles.btnWrap} justify="end">
                <Button size="small" className={styles.cancelBtn}>取消订单</Button> 
                <Button size="small" className={styles.payBtn}>付款</Button>
              </Flex>:null
          }
          {/** 2：付款未发货*/}
          {item.status===2?<Flex className={styles.btnWrap} justify="end">
              <Button size="small" className={styles.removeBtn}>删除订单</Button>
            </Flex>:null
          }
          {item.status===4?<Flex className={styles.btnWrap} justify="end">
              <Button size="small" className={styles.removeBtn}>删除订单</Button>

            </Flex>:null
          }
          
        </Flex>
      ))}
    </Flex>
  )}


export default Group;