import React,{ Component } from 'react';
import { connect } from 'dva';
import { Flex, Icon, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Item from '../../components/ProductCom/Item';
import PricePanel from '../../components/PricePanel';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import { getLocalStorage } from '../../utils/utils';


class confirmOrder extends Component {
  state={
    currentAddress: {},
    unConfirmOrder: {},
  }
  componentDidMount() {
    if(getLocalStorage('deliveryAddress')) {
      this.setState({currentAddress: JSON.parse(getLocalStorage('deliveryAddress'))})
    }
    this.setState({unConfirmOrder: JSON.parse(getLocalStorage('unConfirmOrder'))})
  }
  render() {
    const {onBack, onConfirmOrder, onSelectAddress} = this.props;
    let { unConfirmOrder } = this.state;
    let {orderProdArr, sumPrice} = unConfirmOrder;
    let list = orderProdArr;
    const { currentAddress } = this.state;
    return (
      <Flex className={styles.wrap} direction="column"> 
        <Flex className={styles.topBar}>
          <Icon type="left" style={{color:'#fff'}} size="md" onClick={onBack}/>
          <span>确认订单</span>
        </Flex>
        <Flex className={styles.container} direction="column" align="center">
          <WingBlank style={{width: '92%'}}>
            <Flex className={styles.addressPanelWrap} align="center" justify="between" onClick={onSelectAddress}>
              <Flex className={styles.L} justify="center"><i className="iconfont icon-ditu-dibiao" style={{color: '#fff'}}></i></Flex>
              {currentAddress?<Flex className={styles.C} direction="column" align="start">
                <Flex className={styles.CT}>
                  <span className={styles.CTL}>{currentAddress.receiver}</span>
                  <span>{currentAddress.phone}</span>
                </Flex>
                <Flex className={styles.CB} align="start">
                  <p>{currentAddress.details}</p>
                </Flex>
              </Flex>:<Flex className={styles.C} direction="column" align="start">请选择收货地址</Flex>
              }
              
              <Icon type="right" style={{color:'#000'}} size="md"/>
            </Flex>
            <WhiteSpace size="lg" />
            <Flex className={styles.prodWrap} direction="column">
              <Flex direction="column" style={{width:'100%'}} justify="center">
                {list&&list.map(item=> (
                  <Item info={item} key={item.id} />
                ))}
              </Flex>
            </Flex>
          </WingBlank>
          <Flex justify="end" className={styles.confirmBottom} justify="end">
            <Flex className={styles.sumCounts}>共{orderProdArr&&orderProdArr.length}件</Flex>
            <Flex className={styles.sumPrice}>合计: <PricePanel price={sumPrice}/></Flex>
            <Button className={styles.order} size="small" onClick={() => onConfirmOrder({currentAddress, unConfirmOrder})}>提交订单</Button>
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

confirmOrder.defaultProps = {
 
}

const mapState2Props = ({ order }) => ({

})

const mapDispatch2Props = (dispatch) => ({
  onBack() {
    window.history.back();
  },
  onConfirmOrder(params) {
    let {currentAddress, unConfirmOrder} = params;
    unConfirmOrder.address_id = currentAddress.id;
    // unConfirmOrder.address_id = 22;
    let orderProdArr = unConfirmOrder.orderProdArr;
    unConfirmOrder.sumprice = unConfirmOrder.sumPrice;
    delete unConfirmOrder.sumPrice;
    unConfirmOrder.products = JSON.stringify(orderProdArr.map(item => ({id:item.id, count: item.counts})))
    delete unConfirmOrder.orderProdArr;

    // console.log(unConfirmOrder)
    // console.log('提交订单，支付')
    dispatch({type: 'order/submitOrder', payload: unConfirmOrder})
  },
  onSelectAddress() {
    dispatch(routerRedux.push('/address'))
  }
})
export default connect(mapState2Props, mapDispatch2Props)(confirmOrder);