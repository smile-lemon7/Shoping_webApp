import React,{ Component } from 'react';
import { connect } from 'dva';
import { Flex, Icon, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
import Item from '../../components/ProductCom/Item';
import PricePanel from '../../components/PricePanel';
import InfoItem from '../../components/InfoItem';
import styles from './index.less';
import { routerRedux } from 'dva/router';


function OrderDetails({onBack, onSelectAddress, ...props}) {
  let { info } = props;
  let arr = [
    {type:1, value:<Flex className={styles.topText}>
      {info.status===1?<Flex className={styles.orderStatusPanel} justify="between">
          <span className={styles.statusText}>等待买家付款</span>
          <i className='iconfont icon-daifukuan1' style={{fontSize: 42}}></i>
        </Flex>:null
      }
      </Flex>
    },{
      type: 2, value: <Flex className={styles.topText}>
      {info.status===2?<Flex className={styles.orderStatusPanel} justify="between">
          <span className={styles.statusText}>买家已付款</span>
          <i className='iconfont icon-daifahuo1' style={{fontSize: 42}}></i>
        </Flex>:null
      }
      </Flex>
    },{
      type: 3, value: <Flex className={styles.topText}>
      {info.status===3?<Flex className={styles.orderStatusPanel} justify="between">
          <span className={styles.statusText}>卖家已发货</span>
          <i className='iconfont icon-daishouhuo2' style={{fontSize: 42}}></i>
        </Flex>:null
      }
      </Flex>
    },{
      type: 4, value: <Flex className={styles.topText}>
      {info.status===4?<Flex className={styles.orderStatusPanel} justify="between">
          <span className={styles.statusText}>交易成功</span>
          <i className='iconfont icon-qunfengjiaoyichenggong' style={{fontSize: 42}}></i>
        </Flex>:null
      }
      </Flex>
    }
  ]
  let statusText = arr.filter(item => {return item.type === info.status});

  return (
    <Flex className={styles.wrap} direction="column"> 
      <Flex className={styles.topBar}>
        <Icon type="left" style={{color:'#fff'}} size="md" onClick={onBack}/>
        <span>订单详情</span>
      </Flex>
      <Flex className={styles.container} direction="column" align="start">
        {statusText[0].value}
        <Flex className={styles.addressPanelWrap} align="center" justify="between" onClick={onSelectAddress}>
          <Flex className={styles.L} justify="center"><i className="iconfont icon-ditu-dibiao" style={{color: '#fff'}}></i></Flex>
          <Flex className={styles.C} direction="column" align="start">
            <Flex className={styles.CT}>
              <span className={styles.CTL}>{info.address.receiver}</span>
              <span>{info.address.phone}</span>
            </Flex>
            <Flex className={styles.CB} align="start">
              <p>{info.address.details}</p>
            </Flex>
          </Flex>
        </Flex>
        <WhiteSpace size="lg" />
        <Flex className={styles.prodWrap} direction="column">
          <Flex direction="column" style={{width:'100%'}} justify="center">
            {info.orderProdArr&&info.orderProdArr.map(item=> (
              <Item info={item} key={item.id} />
            ))}
          </Flex>
          <Flex className={styles.totalPricePanel} justify="between">
            <span>订单总价</span>
            <PricePanel price={info.sumPrice} color={'#000'} size={'13px'} />
          </Flex>
          <Flex className={styles.linePanel} justify="between">
            <span>实付款</span>
            <PricePanel price={info.sumPrice} size={'13px'} />
          </Flex>
        </Flex>
        <WhiteSpace size="lg" />
        <Flex className={styles.orderDetail} direction="column" align="start">
          <Flex className={styles.title}>订单信息</Flex>
          <InfoItem title={"订单编号:"} value={info.number} />
          <InfoItem title={"创建时间:"} value={info.create_at} />
          <InfoItem title={"付款时间:"} value={info.pay_date} />
          <InfoItem title={"发货时间:"} value={info.send_date} /> 
          <InfoItem title={"成交时间:"} value={info.success_date} />
        </Flex>
        <Flex justify="end" className={styles.confirmBottom} justify="end">
          {/** 1：未付款*/}
          {info.status===1?  
            <Flex className={styles.btnWrap} justify="end">
              <Button size="small" className={styles.cancelBtn}>取消订单</Button> 
              <Button size="small" className={styles.payBtn}>付款</Button>
            </Flex>:null
          }
          {/** 2：付款未发货*/}
          {info.status===2?<Flex className={styles.btnWrap} justify="end">
              <Button size="small" className={styles.removeBtn}>退款</Button>
            </Flex>:null
          }
          {/** 3：已发货*/}
          {info.status===3?<Flex className={styles.btnWrap} justify="end">
              <Button size="small" className={styles.confirmBtn}>确认收货</Button>
            </Flex>:null
          }
          {/** 4：交易成功*/}
          {info.status===4?<Flex className={styles.btnWrap} justify="end">
              <Button size="small" className={styles.removeBtn}>删除订单</Button>
            </Flex>:null
          }
        </Flex>
      </Flex>
    </Flex>
  )
}

OrderDetails.defaultProps = {
  info: {
    id: 2,
    sumPrice: 52,
    status: 1,
    number: '2019032199',
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
    address: {
      id: 2,
      area: '上海 上海市 浦东新区 蒲兴路街道2',
      details: '上海市浦东新区 xxx小区 博兴路 xx弄 xx号xxx2',
      isDefault: false,
      phone: 13872363311,
      receiver: '张三',
    },
    create_at: '2019-03-21 18:48:15',
    pay_date: '2019-03-21 19:34:15',
    send_date: '2019-03-23 19:34:15',
    success_date: '2019-03-29 19:34:15',

  }
}

function mapDispatch2Props(dispatch) {
  return {
    onBack() {
      window.history.back();
    },
  }
}
export default connect(()=>({}), mapDispatch2Props)(OrderDetails);