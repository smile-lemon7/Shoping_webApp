import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PricePanel from '../../components/PricePanel';
import { saveLocalStorage } from '../../utils/utils';
import Loading from '../../components/Loading';
import cartServices from '../../services/shopingCart';
import { Flex, NavBar, Icon, Button, Checkbox, Toast } from 'antd-mobile';
import styles from './index.less';
const AgreeItem = Checkbox.AgreeItem;

class ShopingCartPage extends Component {
  state = {
    list: [],
    selected: [],
    allChecked: false,
    sumPrice: 0,
    removeFlag: false,
    loading: true,
  }
  async componentWillMount() {
    const {user_id} = this.props;
    let { data:list } = await cartServices.query({user_id});
    list?this.setState({list, loading: false}): this.setState({loading: true});
    // this.setState({list});
  }
  onChangeSum = (e) => {
    let { list } = this.props;
    if( e.target.checked ) {
      let idArr = [];
      list.forEach(item => {
        idArr.push(item.id)
      })
      this.setState({
        selected: idArr,
        allChecked: true,
      })
    }else {
      this.setState({
        selected: [],
        allChecked: false,
      })
    }
  }
  onChangeItem = (id) => {
    let { selected, list } = this.state;
    if( this.refs[`item_${id}`].props.checked ) {
      selected.forEach((item, index) => {
        if(id === item) {
          selected.splice(index, 1);
        }
      })
      this.setState({
        selected,
        allChecked: false,
      })
    }else {
      selected.push(id)
      if(selected.length === list.length) {
        this.setState({
          selected,
          allChecked: true,
        })
      }else {
        this.setState({
          selected,
        })
      }
      
    }
  }
  onReduce = (e, item) => {
    const { user_id, reduceCounts } = this.props;
    e.preventDefault();
    let list = this.state.list;
    list.forEach(itm => {
      if(itm.id === item.id) {
        if( itm.counts > 1 ) {
          itm.counts -= 1;
          reduceCounts({user_id, pro_id:itm.id, number:1});
        }else {
          itm.counts = 1;
        }
      }
    })
    this.setState({list})
  }
  onAdd = (e, item) => {
    const { user_id, addCounts } = this.props;
    e.preventDefault();
    let list = this.state.list;
    list.forEach(itm => {
      if(itm.id === item.id) {
        itm.counts += 1;
        addCounts({user_id, pro_id:itm.id, number:1});
      }
    })
    this.setState({list})
  }
  onProdDetails = (e, id) => {
    e.preventDefault();
    this.props.onProdDetails(id);
  }
  removeHandle = () => {
    if(this.state.removeFlag) {
      this.setState({
        selected: [],
        allChecked: false,
      })
    }
    this.setState({removeFlag: !this.state.removeFlag});
  }

  onRemove = async ({orderProdArr, user_id}) => {
    for(let item of orderProdArr) {
      await cartServices.del({user_id, id: item.id});
    }
    let { data:list } = await cartServices.query({user_id});
    this.setState({list});
  }

  render() {
    const {onBack, onSettlement} = this.props;
    let {user_id} = this.props;
    let {list, selected, allChecked, sumPrice, removeFlag, loading} = this.state;
    let orderProdArr = [];
    selected.forEach(item => {
      list.forEach(itm => {
        if(item === itm.id) {
          sumPrice += itm.price * itm.counts;
          orderProdArr.push(itm);
        }
      })
    })
    
    return (
      <div className={styles.wrap} direction="column">
        <NavBar
          mode="light"
          icon={<Icon type="left" style={{color:'#fff'}}/>}
          onLeftClick={onBack}
          rightContent={removeFlag?<span style={{color:'#fff',fontSize:12}} onClick={this.removeHandle}>完成</span>:
            <span style={{color:'#fff',fontSize:12}} onClick={this.removeHandle}>管理</span>}
        >购物车</NavBar>
        {loading?<Flex style={{paddingTop:'45px',height:'100%'}} justify="center"><Loading /></Flex>:
          <Flex className={styles.container} direction="column" align="start">
            {list.length>0?
              <Flex className={styles.panel} direction="column">
                {list.map(item => (
                  <Flex className={styles.card} key={item.id}>
                    <AgreeItem 
                      ref={`item_${item.id}`}
                      checked={selected.includes(item.id)}
                      onChange={() => this.onChangeItem(item.id)}
                      >
                      <Flex style={{width: '100%'}}>
                        <img src={item.cover_img[0]} alt={item.cover_img[0]} onClick={(e)=>{this.onProdDetails(e, item.id)}} />
                        <Flex className={styles.CardR} direction="column" align="start">
                          <p className={styles.title}>{item.title}</p>
                          <Flex justify="between" style={{width:'90%'}}>
                            <PricePanel price={item.price} />
                            <Flex className={styles.count}>
                              <Flex className={`iconfont icon-jian ${styles.L}`} onClick={(e)=>{this.onReduce(e,item)}}></Flex>
                              <Flex className={styles.C}>{item.counts?item.counts: 1}</Flex>
                              <Flex className={`iconfont icon-jia ${styles.R}`} onClick={(e)=>{this.onAdd(e,item)}}></Flex>
                            </Flex>
                            {/* <ProdCount addCount={item.onAddCount} reduceCount={item.onReduceCount} counts={item.counts} /> */}
                          </Flex>
                        </Flex>
                      </Flex>
                    </AgreeItem>
                  </Flex>
                ))
                }
                <Flex className={styles.bottomWrap} justify="between" align="center">
                  <AgreeItem onChange={this.onChangeSum} checked={allChecked}>全选</AgreeItem>
                  {removeFlag?<Flex justify="end" style={{flex:1}}>
                      <Button className={styles.rmBtn} size="small" onClick={() => this.onRemove({orderProdArr, user_id})}>删除</Button>
                    </Flex>:
                    <Flex justify="end" style={{flex:1}}>
                      <Flex className={styles.sumPrice} justify="end">合计: <PricePanel price={sumPrice} /></Flex>
                      <Button type="primary" className={styles.accounts} size="small" onClick={() => onSettlement({orderProdArr, user_id, sumPrice})}>结算</Button>
                    </Flex>
                  }
                </Flex>
              </Flex>: <Flex style={{width:'100%',height:'100%',marginTop:30}} justify="center">购物车还没有商品，快去添加吧!</Flex>
            }
          </Flex>
        }
      </div>
    )}
  }
  
  ShopingCartPage.defaultProps = {
    list: [
      {
        id: 1,
        cover_img: ['//img12.360buyimg.com/mobilecms/s316x316_jfs/t4843/261/711274114/224176/10cb1af1/58e736ddNc1181853.jpg!q70.dpg.webp'],
        title: "法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒 整箱装 750ml*6瓶（ASC)",
        price: 0.1,
        old_price: 1.00,
        stock: 20,
      },{
        id: 2,
        cover_img: ['//img12.360buyimg.com/mobilecms/s316x316_jfs/t3226/244/1527006044/158729/80570ddc/57cebb81Na9dcc29b.jpg!q70.dpg.webp'],
        title: "长城（GreatWall）红酒 特选5年橡木桶解百纳干红葡萄酒 整箱装 750ml*6瓶",
        price: 2.00,
        old_price: 2.00,
        stock: 20,
      },{
        id: 3,
        cover_img: ['//img13.360buyimg.com/mobilecms/s316x316_jfs/t1/16873/18/2092/374603/5c18b9bdE95f96d11/723dce42e947842a.jpg!q70.dpg.webp'],
        title: "江左盟 酒库清仓  茅台镇白酒高度酒53度酱香型坛装窖藏老酒纯粮酿造原浆酒自酿 剩800坛",
        price: 3.00,
        old_price: 3.00,
        stock: 20,
      },
    ]
  }

const mapState2Props = ({user, cart}) => ({
  user_id: user.id,
})

const mapDispatch2Props = (dispatch) => ({
  onBack() {
    window.history.back();
  },
  onSettlement(params) {
    let {orderProdArr} = params;
    if( orderProdArr.length>0) {
      // console.log( params )
      saveLocalStorage({type:'unConfirmOrder', value: JSON.stringify(params)})
      dispatch(routerRedux.push('/confirmOrder'));
    }else {
      Toast.info('请选择商品', 1);
    }
  },
  addCounts(info) {
    dispatch({type: 'cart/addCounts', payload: info})
  },
  reduceCounts(info) {
    dispatch({type: 'cart/reduceCounts', payload: info})
  },
  onProdDetails(id) {
    dispatch(routerRedux.push(`/details?id=${id}`))
  },
})
export default connect(mapState2Props, mapDispatch2Props)(ShopingCartPage);