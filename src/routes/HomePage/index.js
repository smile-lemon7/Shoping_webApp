import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Flex, WingBlank } from 'antd-mobile';
import { saveLocalStorage } from '../../utils/utils';
import styles from './index.less';

class HomePage extends Component {
  componentDidMount() {
    const { BMap } = window;
    let geolocation = new BMap.Geolocation();
    geolocation.enableSDKLocation();
    geolocation.getCurrentPosition(function(r){
    let myGeo = new BMap.Geocoder();      
    myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){      
      if (result){      
        saveLocalStorage({type:'deliveryAddress', value: JSON.stringify({area: result.address})})
      }      
    });
    });
  }
  render() {
    let { list } = this.props;
    const { onDetails } = this.props;
    list = list.map( item => ({...item, onClick: onDetails})) 
    return (
      <WingBlank>
        <Flex className={styles.wrap} align="start">
          <Flex className={styles.productWrap} align="start" justify="around">
            {list.map( item => (
              <Flex key={item.id} className={styles.card} direction="column" justify="around" onClick={()=>item.onClick(item.id)}>
                <img src={item.cover_img[0]} alt=""/>
                <Flex className={styles.title}>{item.title}</Flex>
                  <Flex className={styles.priceWrap} justify="start" align="stretch"><Flex className={styles.currentPrice}><span>￥</span><span className={styles.price}>{item.curr_price}</span></Flex>
                  <Flex className={styles.pay_counts}>{item.pay_counts}人付款</Flex></Flex>
              </Flex>
            ))
            }
          </Flex>
        </Flex>
      </WingBlank>
    )
  }
}

HomePage.defaultProps = {
  list: [
    {
      id: 1,
      cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
      title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
      curr_price: 1.00,
      old_price: 1.00,
      pay_counts: 3,
    },{
      id: 2,
      cover_img: ["http://img07.jiuxian.com/2017/1024/a1d17002462048019f3237afa5b5bdcd2.jpg"],
      title: "汾酒特卖 55°汾酒盘古汾酒500ml*4",
      curr_price: 2.00,
      old_price: 1.00,
      pay_counts: 8,
    }
  ]
};

const mapDispatch2Props = (dispatch) => ({
  onDetails(id) {
    dispatch(routerRedux.push(`/details?id=${id}`))
  }
})

export default connect(()=>({}), mapDispatch2Props)(HomePage);
