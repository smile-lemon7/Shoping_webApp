import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile';
import { saveLocalStorage, getLocalStorage } from '../../utils/utils';
import Carousel from '../../components/Carousel';
import addressServices from '../../services/address';
import PricePanel from '../../components/PricePanel';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';
import Title from '../../components/Title';
import styles from './index.less';

class HomePage extends Component {
  async componentDidMount() {
    // const { BMap } = window;
    // let geolocation = new BMap.Geolocation();
    // geolocation.enableSDKLocation();
    // geolocation.getCurrentPosition(function(r){
    // let myGeo = new BMap.Geocoder();      
    // myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){      
    //   if (result){      
    //     if(!getLocalStorage('deliveryAddress')) {
    //       saveLocalStorage({type:'deliveryAddress', value: JSON.stringify({area: result.address})})
    //     }
    //   }      
    // });
    // });
    const { user_id } = this.props;
    const { data } = await addressServices.query_all({user_id});
    if( data.length >0 ) {
      let currect_address = data.filter(item => {return item.isDefault});
      currect_address = currect_address.length>0?currect_address[0]:data[0];
      saveLocalStorage({type:'deliveryAddress', value: JSON.stringify(currect_address)})
      saveLocalStorage({type:'address', value: JSON.stringify(data)})
    }
  }
  render() {
    let { carouselList, recommend_list, loading } = this.props;
    const { onDetails, onCarousel} = this.props;
    recommend_list = recommend_list.map( item => ({...item, onClick: onDetails}));
    carouselList = carouselList.map(item => ({...item, onClick: ()=>onCarousel(item.id)})); 

    return (
      <Flex className={styles.wrap} align="center" direction="column">
        <Flex justify='between' className={styles.searchBox} justify="center">
          <SearchBar />
        </Flex>
        <Flex className={styles.container} direction="column">
          <WhiteSpace size="lg" />
          <Carousel list={carouselList} />
          <WhiteSpace size="lg" />
          <Title title={"为你推荐"} />
          <WingBlank size="lg" >
            {loading?<Loading />:
              <Flex className={styles.productWrap} align="start" justify="between" wrap="wrap">
                {recommend_list.map( item => (
                  <Flex key={item.id} className={styles.card} direction="column" justify="around" onClick={()=>item.onClick(item.id)}>
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
              }
          </WingBlank>
        </Flex>
      </Flex>
    )
  }
}

HomePage.defaultProps = {
  list: [
    {
      id: 1,
      cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
      title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
      price: 1.00,
      old_price: 1.00,
      pay_counts: 3,
    },{
      id: 2,
      cover_img: ["http://img07.jiuxian.com/2017/1024/a1d17002462048019f3237afa5b5bdcd2.jpg"],
      title: "汾酒特卖 55°汾酒盘古汾酒500ml*4",
      price: 2.00,
      old_price: 1.00,
      pay_counts: 8,
    }
  ],
  carouselList: [
    // {id:1, cover_img:'//m.360buyimg.com/mobilecms/s750x366_jfs/t1/23703/6/10784/144136/5c89f7eaEa5b2130f/c4758059ca4835ed.jpg!cr_1125x549_0_72!q70.jpg.dpg', content: []},
    {id:1, cover_img:'//m.360buyimg.com/mobilecms/s750x366_jfs/t1/17399/17/11926/96713/5c924706E5c23537c/396d768a729e0f4d.jpg!cr_1125x549_0_72!q70.jpg.dpg', content: []}
  ]
};

const mapState2Poprs = ({ user, products, address, loading: { effects } }) => ({
  user_id: user.id,
  recommend_list: products.recommend_list,
  loading: effects['products/query_recommend'],
})

const mapDispatch2Props = (dispatch) => ({
  onDetails(id) {
    dispatch(routerRedux.push(`/details?id=${id}`))
  },
  onCarousel(id) {
    dispatch(routerRedux.push(`/carouselDetails?id=${id}`))
  },
  getAddress(user_id) {
    dispatch({type: 'address/query', payload: user_id})
  },
})

export default connect(mapState2Poprs, mapDispatch2Props)(HomePage);
