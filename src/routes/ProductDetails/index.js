import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { getQueryString } from '../../utils/utils';
import ProductPanel from  '../../components/Details/ProductPanel';
import DetailsPanel from  '../../components/Details/DetailsPanel';
import RecommendPanel from  '../../components/Details/RecommendPanel';
import PricePanel from '../../components/PricePanel';
import ProdCount from '../../components/ProdCount';
import Loading from '../../components/Loading';
import styles from './index.less';
import { saveLocalStorage, getLocalStorage } from '../../utils/utils';
import { Flex, Tabs, Button, WingBlank, Modal, List, Icon, NavBar } from 'antd-mobile';

class ProductDetailsPage extends Component {
  state = {
    modal: false,
    addressModal: false,
    currentAddress: {},
    count: 1,
    page: 0,
    addressList: [],
  }
  componentDidMount() {
    const { query, user_id } = this.props;
    query({id: getQueryString('id')});
    this.setState({id: getQueryString('id')});

    if(!!!getLocalStorage('deliveryAddress')) {
      this.setState({currentAddress: JSON.parse(getLocalStorage('deliveryAddress'))})
    }
    // console.log( {addressList: JSON.parse(getLocalStorage('address'))} )
    if(JSON.stringify(getLocalStorage('address'))!=='[]') {
      this.setState({addressList: JSON.parse(getLocalStorage('address'))})
    }
  }
  componentWillReceiveProps() {
    if(this.state.id !== getQueryString('id')) {
      this.props.query({id: getQueryString('id')});
      this.setState({id: getQueryString('id')});
    }
  }
  onAdd = () => {
    this.setState({count: ++this.state.count})
  }
  onReduce = () => {
    let count = this.state.count;
    if(count > 1) {
      this.setState({count: --count})
    }else {
      this.setState({count: 1})
    }
  }
  showModal = (e) => {
    e.preventDefault();
    this.setState({modal: true})
  }
  onClose = () => {
    this.setState({modal: false})
  }
  cartHandle = (params) => {
    console.log(params)
    this.setState({modal: false})
    this.props.onCart(params);
  }
  onAddressClose = () => {
    this.setState({addressModal: false})
  }
  onSelectAddress = (e) => {
    if( this.state.addressList.length>0 ) {
      e.preventDefault();
      this.setState({addressModal: true})
    }else {
      e.preventDefault();
      this.props.onAddAddress();
    }
  }
  onAddressBack = () => {
    this.setState({addressModal: false})
  }
  onSelect = (item) => {
    this.setState({currentAddress: item})
    saveLocalStorage({type: 'deliveryAddress', value:JSON.stringify(item)});
    this.setState({addressModal: false})
  }
  onChange = ({id}) => {
    this.setState({page: id});
  }

  render() {
    
    const {onBack, onBuy, onDetails} = this.props;
    let {product, user_id, list, loading, tabs } = this.props;
    const { id, cover_img, price, stock } = product;
    list = list.map(item => ({...item, onSelect: ()=>this.onSelect(item)}));
    const {count, currentAddress, addressList} = this.state;
    return (
      <Flex className={styles.wrap} align="start" justify="around">
        <Flex className={styles.backBtn}><img src="/back.png" onClick={onBack}/></Flex>
          {JSON.stringify(product)!=='{}'?
            <Tabs tabs={tabs} 
              swipeable={false}
              initialPage={this.state.page}
              onChange={this.onChange}
            >
              <Flex justify="center" align="start" className={styles.contentWrap} ><ProductPanel onDetails={onDetails} productInfo={product} currentAddress={currentAddress}/></Flex>
              <Flex justify="center" align="start" className={styles.contentWrap}><DetailsPanel content={product.content} /></Flex>
              <Flex justify="center" align="start" className={styles.contentWrap}><RecommendPanel list={product.sameProducts} onDetails={onDetails}/></Flex>
            </Tabs>: <Loading />
          }
        <Flex className={styles.bottomWrap} justify="between">
          <Flex direction="column" className={styles.service}>
            <i className="iconfont icon-kefu"></i>
            <span>客服</span>
          </Flex>
          <Flex className={styles.bottomBtnWrap} justify="end">  
            <Button className={styles.cart} size="small" onClick={this.showModal}>加入购物车</Button>
            <Button className={styles.buy} size="small" onClick={()=>onBuy({user_id, product})}>立即购买</Button>
          </Flex>
          <Modal
              popup
              visible={this.state.modal}
              animationType="slide-up"
              onClose={this.onClose}
            >
              <WingBlank>
                <List style={{height: 410}} renderHeader={() => <Flex className={styles.modalTop}>
                    <img src={cover_img[0]} alt={cover_img[0]} width="120" style={{marginRight: 10}} />
                    <Flex direction="column" align="start" justify="around" style={{height: 80}}>
                      <PricePanel price={price} />
                      <Flex style={{fontSize: 12}}>库存<span>{stock}</span>件</Flex>
                      {/* <Flex style={{fontSize: 12, color: '#000'}}>配送至：<span>{currentAddress.area}</span></Flex> */}
                    </Flex>
                  </Flex>} 
                >
                  <Flex style={{width: '100%', height:80 ,borderTop: '1px solid #f1f1f1'}} direction="column" align="start" onClick={this.onSelectAddress}>
                    <WingBlank>
                      <p style={{color:'#000',fontSize:13}}>配送区域<span style={{color:'#888',fontSize:12}}>（配送地会影响收货，请正确选择）</span></p>
                    </WingBlank>
                    <Flex justify="between" style={{width:'100%',borderBottom: '1px solid #f1f1f1',boxSizing:'border-box',padding:'4px 15px 10px 15px'}}>
                      <Flex justify="between" style={{width:'100%'}}>
                        <span style={{fontSize: 13, color:'#666'}}>{JSON.stringify(currentAddress)!=='{}'?currentAddress.details:'请添加地址'}</span>
                      </Flex>
                      <Icon type="right" size="sm" color="#888" />
                    </Flex>
                  </Flex>
                  <Flex justify="between" style={{padding: '0px 15px',height:54,boxSizing:'border-box'}}>
                    <span style={{fontSize: 13,color:'#000'}}>购买数量</span>
                    <ProdCount count={count} onAdd={this.onAdd} onReduce={this.onReduce} />
                  </Flex>
                </List>
                <Button 
                  type="primary" 
                  onClick={()=>this.cartHandle({user_id, prod_id:id, count, address_id: currentAddress.id})} 
                  style={{height: '40px',lineHeight: '40px',fontSize: 13,color:'#fff',marginBottom:20,borderRadius: 20}}>确定</Button>
              </WingBlank>
            </Modal>
            <Modal
              popup
              visible={this.state.addressModal}
              animationType="slide-up"
              onClose={this.onAddressClose}
              style={{height:'100%'}}
            >
              <div style={{width:'100%',display:'flex',justifyContent:'center',flexDirection:'column'}} direction="column">
                <NavBar
                  mode="light"
                  icon={<Icon type="left" style={{color:'#000'}}/>}
                  onLeftClick={this.onAddressBack}
                >配送至</NavBar>
                <WingBlank style={{width:'92%',height:'100%',margin:'45px auto 0 auto'}} size="md">
                  <Flex style={{width:'100%'}} direction="column">
                    {/* {list.map(item => ( */}
                    {addressList.map(item => (
                      <Flex key={item.id} style={{width:'100%',padding:'12px 0',border:'1px solid #f1f1f1'}} direction="column" align="start" justify="start" onClick={item.onSelect}>
                        <Flex justify="between" style={{width: '94%',margin: '0 3%',color:'#000',fontSize:13}}>
                          <span>{item.receiver}</span>
                          <span>{item.phone}</span>
                        </Flex>
                        <Flex style={{width: '94%',margin: '3px 3% 0 3%',color:'#000',fontSize:12}} align="start">
                          <p style={{margin:0}}>{
                            item.isDefault?<span style={{color: '#fc8407', marginRight:10}}>[默认地址]</span>:null}
                            {item.area}{item.details}
                          </p>
                        </Flex>
                      </Flex>
                    ))
                    }
                  </Flex>
                </WingBlank>
              </div>
            </Modal>
            
        </Flex>
      </Flex>
    );
  }
}

ProductDetailsPage.defaultProps = {
  tabs:[
    {title: '商品',id: 0}, 
    {title: '详情', id: 1}, 
    {title: '推荐', id: 2},
  ],
  product: {
    id: 1,
    cover_img: ['//m.360buyimg.com/mobilecms/s750x750_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q80.dpg.webp',
                '//m.360buyimg.com/mobilecms/s843x843_jfs/t1/21510/22/9978/416978/5c8217efEd2430763/b911c8bdf32c4f6e.jpg!q70.dpg.webp',
                '//m.360buyimg.com/mobilecms/s843x843_jfs/t1/21510/22/9978/416978/5c8217efEd2430763/b911c8bdf32c4f6e.jpg!q70.dpg.webp',
                '//m.360buyimg.com/mobilecms/s843x843_jfs/t1/28304/9/9631/611913/5c7f7f91E8c60fe4a/95279b064009f8f0.jpg!q70.dpg.webp'
                ],
    title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
    price: 1.00,
    old_price: 1.00,
    stock: 20,
  },
  list: [
    {
      id: 1,
      area: '上海 上海市 浦东新区 蒲兴路街道',
      details: '上海市浦东新区 xxx小区 博兴路 xx弄 xx号xxx上海市浦东新区 xxx小区 博兴路 xx弄 xx号xxx',
      isDefault: true,
      phone: 16383722211,
      receiver: '李文',
    },
    {
      id: 22,
      area: '上海 上海市 浦东新区 蒲兴路街道2',
      details: '上海市浦东新区 xxx小区 博兴路 xx弄 xx号xxx2',
      isDefault: false,
      phone: 13872363311,
      receiver: '张三',
    }
  ]
};

function mapState2Props({user, products, address, cart, loading: { effects }}) {
  return {
    user_id: user.id,
    product: products.product,
    loading: effects['products/query_product']
  }
}

function mapDispatch2Props(dispatch) {
  return {
    onBack() {
      window.history.back();
    },
    onCart({user_id, prod_id, count, address_id}) {
      dispatch({type: 'cart/addCart', payload: {user_id, pro_id: prod_id, number: count, address_id}});
    },
    onBuy({user_id, product}) {
      product.counts = 1;
      let arr = [];
      arr.push(product);
      saveLocalStorage({type: 'unConfirmOrder', value: JSON.stringify({user_id, sumPrice: product.price, orderProdArr: arr})})
      dispatch(routerRedux.push('/confirmOrder'));
    },
    query(id) {
      dispatch({type: 'products/query_product', payload: id})
    },
    onDetails(id) {
      dispatch(routerRedux.push(`/details?id=${id}`))
    },
    onAddAddress() {
      dispatch(routerRedux.push(`/address`))
    },
  }
}
export default connect(mapState2Props, mapDispatch2Props)(ProductDetailsPage);
