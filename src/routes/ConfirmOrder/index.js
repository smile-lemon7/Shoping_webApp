import React,{ Component } from 'react';
import { connect } from 'dva';
import { Flex, Icon, WingBlank, WhiteSpace, Modal, Button, Toast } from 'antd-mobile';
import ListCom from '../../components/ListCom';
import Item from '../../components/ProductCom/Item';
import { isPhoneNum } from '../../utils/utils';
import styles from './index.less';

class confirmOrder extends Component {
  state={
    modal: false,
    receiver: '',
    phone: '',
    details: ''
  }
  showModal = () => {
    this.setState({modal: true})
  }
  onClose = () => {
    this.setState({modal: false})
  }
  onBtnClick = () => {
    this.setState({modal: false})
    let {receiver, phone, details} = this.state;
    if(!details || !receiver || !phone) {
      Toast.info('收货人信息不完整！');
      this.setState({
        receiver: '',
        phone: '',
        details: ''
      })
    }
    if(phone) {
      phone = phone.split(' ').join('');
      if(!isPhoneNum(phone)) {
        Toast.info('该联系方式不存在');
        this.setState({
          receiver: '',
          phone: '',
          details: ''
        })
      }
    }
  }
  onInputChange = ({value, type}) => {
    if(value) {
      this.setState({
        [type]: value
      })
    }
  }
  render() {
    const {onBack, onConfirmOrder} = this.props;
    let { list } = this.props;
    const {receiver, phone, details} = this.state;
    return (
      <Flex className={styles.wrap} direction="column"> 
        <Flex className={styles.topBar}>
          <Icon type="left" style={{color:'#fff'}} size="md" onClick={onBack}/>
          <span>确认订单</span>
        </Flex>
        <Flex className={styles.container} direction="column" align="start">
          <WingBlank style={{width: '92%'}}>
            <Flex className={styles.addressPanelWrap} align="center" justify="between" onClick={this.showModal}>
              <Flex className={styles.L} justify="center"><i className="iconfont icon-ditu-dibiao" style={{color: '#fff'}}></i></Flex>
              {details&&receiver&&phone?<Flex className={styles.C} direction="column" align="start">
                <Flex className={styles.CT}>
                  <span className={styles.CTL}>{receiver}</span>
                  <span>{phone}</span>
                </Flex>
                <Flex className={styles.CB} align="start">
                  <p>{details}</p>
                </Flex>
              </Flex>:<Flex className={styles.C} style={{color:'#888'}}>请输入收货人信息</Flex>
              }
              <Icon type="right" style={{color:'#000'}} size="md"/>
            </Flex>
            <Modal
              popup
              visible={this.state.modal}
              animationType="slide-up"
              onClose={this.onClose}
            >
              <WingBlank style={{width: '92%',height:400}}>
                <Flex direction="column" className={styles.receiverPanel}>
                  <ListCom title={'收货人'} icon={'iconfont icon-lianxiren'} type="receiver" onChange={this.onInputChange}/>
                  <ListCom title={'联系方式'} type={'phone'} onChange={this.onInputChange}/>
                  <ListCom title={'详细地址'} type={'details'} onChange={this.onInputChange}/>
                </Flex>
              </WingBlank>
              <Button 
                type="primary" 
                onClick={this.onBtnClick} 
                style={{height: '40px',lineHeight: '40px',fontSize: 13,color:'#fff',borderRadius: '20px',backgroundColor:'#fc8407'}}>确定</Button>
            </Modal>
            <WhiteSpace size="lg" />
            <Flex className={styles.prodWrap} direction="column">
              {list&&list.map(item=> (
                <Item info={item} key={item.id} />
              ))}
            </Flex>
          </WingBlank>
          <Flex justify="end" className={styles.confirmBottom} justify="end">
            <Flex className={styles.sumCounts}>共{4}件</Flex>
            <Flex className={styles.sumPrice}>合计: <Flex className={styles.price}>50</Flex>积分</Flex>
            <Button className={styles.order} size="small" onClick={() => onConfirmOrder()}>提交订单</Button>
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

confirmOrder.defaultProps = {
  list: [
    {
      id: 1,
      cover_img: ["https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3977635211,1533938152&fm=26&gp=0.jpg"],
      title: "善存佳维片",
      price: 1.00,
      counts: 2,
    },{
      id: 2,
      cover_img: ["https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3977635211,1533938152&fm=26&gp=0.jpg"],
      title: "云南白药 创可贴创口贴（经济型）50片（止血镇痛消炎）",
      price: 2.00,
      counts: 3,
    }
  ]
}

function mapDispatch2Props(dispatch) {
  return {
    onBack() {
      window.history.back();
    },
    onConfirmOrder() {
      console.log('确认订单')
    }
  }
}
export default connect(()=>({}), mapDispatch2Props)(confirmOrder);