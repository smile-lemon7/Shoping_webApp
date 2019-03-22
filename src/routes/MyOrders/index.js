import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Flex, NavBar, Icon, Tabs } from 'antd-mobile';
import { getQueryString } from '../../utils/utils';
import Group from '../../components/OrderGroup/Group';
import styles from './index.less';

class MyOrders extends Component {
  state = {
    type: 0,
  }
  componentWillMount() {
    this.setState({type: getQueryString('type')});
  }
  onChange = ({id}) => {
    this.setState({type: id});
  }
  render() {
    const tabs = [
      {title: '全部',id:0}, 
      {title: '待付款',id:1}, 
      {title: '待发货',id:2},
      {title: '待收货',id:3},
    ];
    const {onBack, onDetails} = this.props;
    let { list, list1 } = this.props;
    list = list.map(item => ({...item, onClick:()=>onDetails(item.id)}));
    list1 = list1.map(item => ({...item, onClick:()=>onDetails(item.id)}));
    return (
      <div className={styles.wrap}>
        <NavBar
          mode="light"
          icon={<Icon type="left" style={{color:'#000'}}/>}
          onLeftClick={onBack}
        >我的订单</NavBar>
        <Tabs tabs={tabs} 
          swipeable={false}
          initialPage={this.state.type*1}
          onChange={this.onChange}
        >
          {/* <Flex justify="center" className={styles.contentWrap}>全部</Flex> */}
          <Flex justify="center" className={styles.contentWrap}><Group list={list} type={this.state.type*1} /></Flex>
          <Flex justify="center" className={styles.contentWrap}><Group list={list1} type={this.state.type*1}/></Flex>
          <Flex justify="center" className={styles.contentWrap} type={this.state.type*1}>待发货</Flex>
          <Flex justify="center" className={styles.contentWrap} type={this.state.type*1}>待收货</Flex>
        </Tabs>

      </div>
    )
  }
}

MyOrders.defaultProps = {
  list: [
    {
      orderProdArr: [
        {
          id: 1, 
          cover_img: ['//img12.360buyimg.com/mobilecms/s316x316_jfs/t4843/261/711274114/224176/10cb1af1/58e736ddNc1181853.jpg!q70.dpg.webp'],
          curr_price: 1,
          old_price: 1,
          stock: 20,
          counts: 2,
          title: "法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒 整箱装 750ml*6瓶（ASC)",
        },{
          id: 2, 
          cover_img: ['//img11.360buyimg.com/mobilecms/s316x316_jfs/t23020/156/2652121330/409887/b42f9f9e/5b88e069Ne8f1f76d.jpg!q70.dpg.webp'],
          curr_price: 32,
          old_price: 1,
          stock: 10,
          counts: 1,
          title: "送2香槟杯 尚尼酒庄魔幻云星空酒起泡葡萄酒4支组合整箱 火焰酒女士钟爱的配制甜红酒气泡果酒 4*750ml",
        },{
          id: 3, 
          cover_img: ['//img11.360buyimg.com/mobilecms/s316x316_jfs/t23020/156/2652121330/409887/b42f9f9e/5b88e069Ne8f1f76d.jpg!q70.dpg.webp'],
          curr_price: 32,
          old_price: 1,
          stock: 10,
          counts: 1,
          title: "送2香槟杯 尚尼酒庄魔幻云星空酒起泡葡萄酒4支组合整箱 火焰酒女士钟爱的配制甜红酒气泡果酒 4*750ml",
        }    
      ],
      sumPrice: 34,
      status: 4,
      id: 1,
    },{
      orderProdArr: [
        {
          id: 3, 
          cover_img: ['//img12.360buyimg.com/mobilecms/s316x316_jfs/t3226/244/1527006044/158729/80570ddc/57cebb81Na9dcc29b.jpg!q70.dpg.webp'],
          curr_price: 20,
          id: 1,
          old_price: 1,
          stock: 10,
          counts: 1,
          title: "长城（GreatWall）红酒 特选5年橡木桶解百纳干红葡萄酒 整箱装 750ml*6瓶",
        }  
      ],
      sumPrice: 20,
      id: 2,
      status: 3,
    }
  ],
  list1: [
    {
      orderProdArr: [
        {
          id: 3, 
          cover_img: ['//img12.360buyimg.com/mobilecms/s316x316_jfs/t3226/244/1527006044/158729/80570ddc/57cebb81Na9dcc29b.jpg!q70.dpg.webp'],
          curr_price: 20,
          id: 1,
          old_price: 1,
          stock: 10,
          counts: 1,
          title: "长城（GreatWall）红酒 特选5年橡木桶解百纳干红葡萄酒 整箱装 750ml*6瓶",
        }  
      ],
      sumPrice: 20,
      id: 2,
      status: 1,
    }
  ]
}

const mapDispatch2Props = (dispatch) => ({
  onBack() {
    window.history.back();
  },
  onDetails(id) {
    dispatch(routerRedux.push(`/orderDetails?id=${id}`))
  }
})

export default connect(()=>({}), mapDispatch2Props)(MyOrders);