import { connect } from 'dva';
import { Flex, WingBlank } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import PanelTitle from '../../components/PanelTitle';
import styles from './index.less';


function MinePage({orderIcon, onOrderType,onMyAddress, ...props}) {
  orderIcon = orderIcon.map(item => ({...item, onClick:()=>onOrderType(item.id)}))
  return (
   <Flex className={styles.wrap} direction="column" align="start">
      <WingBlank style={{width:'92%'}}>
        <Flex className={styles.myOrders} justify="around" direction="column">
          <PanelTitle title="我的订单" subTitle="查看全部订单" onClick={onOrderType}/>
          <Flex className={styles.myOrdersPanel} justify="around">
            {orderIcon.map(item => (
              <Flex direction="column" className={styles.iconCard} key={item.id} onClick={item.onClick}>
                <i className={item.icon} style={{color: '#fc8407',fontSize: 22}}></i>
                <span className={styles.title}>{item.title}</span>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex onClick={onMyAddress} justify="center">地址管理</Flex>
      </WingBlank>
   </Flex>
  )}

MinePage.defaultProps = {
  orderIcon: [
    {id: 1, title: '待付款', icon:'iconfont icon-moban'},
    {id: 2, title: '待发货', icon: 'iconfont icon-daifahuo1'},
    {id: 3, title: '待收货', icon: 'iconfont icon-daishouhuo2'},
  ] 
}
const mapDispatch2Props = (dispatch) => ({
  onOrderType(type) {
    dispatch(routerRedux.push(`/orders?type=${type}`))
  },
  onMyAddress() {
    dispatch(routerRedux.push('/address'));
  }

})
export default connect(()=>({}), mapDispatch2Props)(MinePage);