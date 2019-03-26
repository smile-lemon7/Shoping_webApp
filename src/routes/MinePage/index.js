import { connect } from 'dva';
import { Flex, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import PanelTitle from '../../components/PanelTitle';
import { getLocalStorage } from '../../utils/utils';
import styles from './index.less';


function MinePage({orderIcon, onOrderType, onMyAddress, ...props}) {
  const { tel } = props;
  orderIcon = orderIcon.map(item => ({...item, onClick:()=>onOrderType(item.id)}));
  const addressInfo = JSON.parse(getLocalStorage('deliveryAddress'));
  const {receiver, phone, area, details} = addressInfo;

  return (
   <Flex className={styles.wrap} direction="column" align="center">
      <Flex className={styles.myInfo} >
        <img src="/avatar.png" alt="默认头像" />
        <Flex className={styles.phone}>
          <span>{tel}</span>
        </Flex>
      </Flex>
      <WhiteSpace />
      <WingBlank style={{width:'92%'}}>
        <Flex className={styles.myOrders} justify="around" direction="column">
          <PanelTitle title="我的订单" subTitle="查看全部订单" onClick={()=>onOrderType(0)}/>
          <Flex className={styles.myOrdersPanel} justify="around">
            {orderIcon.map(item => (
              <Flex direction="column" className={styles.iconCard} key={item.id} onClick={item.onClick}>
                <i className={item.icon} style={{color: '#fc8407',fontSize: 22}}></i>
                <span className={styles.title}>{item.title}</span>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <WhiteSpace size="lg" />
        <Flex className={styles.addressPanel} justify="around" direction="column">
          <PanelTitle title="我的收货地址" subTitle="查看全部地址" onClick={onMyAddress}/>
          <Flex className={styles.myAddressPanel} justify="around">
            <Flex className={styles.C} direction="column" align="start" >
              <Flex className={styles.CT}>
                <span className={styles.CTL}>{receiver}</span>
                <span>{phone}</span>
              </Flex>
              <Flex className={styles.CB} align="start">
                <span>{area}{details}</span>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </WingBlank>
   </Flex>
  )}

MinePage.defaultProps = {
  orderIcon: [
    {id: 1, title: '待付款', icon:'iconfont icon-moban'},
    {id: 2, title: '待发货', icon: 'iconfont icon-daifahuo1'},
    {id: 3, title: '待收货', icon: 'iconfont icon-daishouhuo2'},
  ],
   
}

const mapState2Props = ({user}) => ({
  tel: user.phone,
})
const mapDispatch2Props = (dispatch) => ({
  onOrderType(type) {
    dispatch(routerRedux.push(`/orders?type=${type}`))
  },
  onMyAddress() {
    dispatch(routerRedux.push('/address'));
  }

})
export default connect(mapState2Props, mapDispatch2Props)(MinePage);