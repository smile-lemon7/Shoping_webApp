import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Flex, Tabs } from 'antd-mobile';
import Group from '../../components/ProdClassGroup/Group';
import SearchBar from '../../components/SearchBar';
import styles from './index.less';

class MyOrders extends Component {
  state = {
    page: 0,
    list_all: [],
  }
  componentWillMount() {
    let { classes, class_item, onDetails } = this.props;
    classes.forEach(item => {
      if(item.id === class_item.id) {
        class_item.prods = class_item.prods.map(item => ({...item, onClick: () => onDetails(item.id)}))
        item.prods = class_item.prods;
      }
    })
    this.setState({classes_id: 1, list_all: classes});
  }
  onChange = ({id}) => {
    this.props.classes.forEach((item, index) => {
      if(item.id === id) {
        this.setState({page: index});
      }
    })
  }
  render() {
    const {onBack} = this.props;
    let { classes } = this.props;
    let { list_all } = this.state;
    return (
      <div className={styles.wrap}>
        <Flex justify='between' className={styles.searchBox} justify="center">
          <SearchBar />
        </Flex>
        <Tabs tabs={classes} 
          tabBarPosition="left"
          tabDirection="vertical"
          swipeable={true}
          initialPage={this.state.page}
          onChange={this.onChange}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={8} />}
        >
          {list_all.map(item => (
            <Flex key={item.id} justify="center" className={styles.contentWrap}>
              <Group list={item.prods} />
            </Flex>
          ))
          }
        </Tabs>

      </div>
    )
  }
}

MyOrders.defaultProps = {
  classes: [
    {id: 1,title: '白酒'},
    {id: 2,title: '葡萄酒'},
    {id: 3,title: '啤酒'},
    {id: 4,title: '黄酒'},
    {id: 5,title: '白兰地'},
    {id: 6,title: '鸡尾酒'},
    {id: 7,title: '鸡尾酒2'},
  ],
  class_item: {
    id: 1,
    prods: [
      { 
        id: 1,
        cover_img: ["http://img07.jiuxian.com/2017/1024/a1d17002462048019f3237afa5b5bdcd2.jpg"],
        title: "汾酒特卖 55°汾酒盘古汾酒500ml*4",
        curr_price: 2.00,
        old_price: 1.00,
        pay_counts: 8
      },{ 
        id: 2,
        cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
        title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
        curr_price: 1.00,
        old_price: 1.00,
        pay_counts: 3,
      },{ 
        id: 3,
        cover_img: ["http://img07.jiuxian.com/2017/1024/a1d17002462048019f3237afa5b5bdcd2.jpg"],
        title: "汾酒特卖 55°汾酒盘古汾酒500ml*4",
        curr_price: 2.00,
        old_price: 1.00,
        pay_counts: 8
      },{ 
        id: 4,
        cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
        title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
        curr_price: 1.00,
        old_price: 1.00,
        pay_counts: 3,
      },{ 
        id: 5,
        cover_img: ["http://img07.jiuxian.com/2017/1024/a1d17002462048019f3237afa5b5bdcd2.jpg"],
        title: "汾酒特卖 55°汾酒盘古汾酒500ml*4",
        curr_price: 2.00,
        old_price: 1.00,
        pay_counts: 8
      },{ 
        id: 6,
        cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
        title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
        curr_price: 1.00,
        old_price: 1.00,
        pay_counts: 3,
      },{ 
        id: 7,
        cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
        title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
        curr_price: 1.00,
        old_price: 1.00,
        pay_counts: 3,
      },{ 
        id: 8,
        cover_img: ["http://img07.jiuxian.com/2017/1024/a1d17002462048019f3237afa5b5bdcd2.jpg"],
        title: "汾酒特卖 55°汾酒盘古汾酒500ml*4",
        curr_price: 2.00,
        old_price: 1.00,
        pay_counts: 8
      },{ 
        id: 9,
        cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
        title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
        curr_price: 1.00,
        old_price: 1.00,
        pay_counts: 3,
      },
    ]
  }
  
}

const mapDispatch2Props = (dispatch) => ({
  onBack() {
    window.history.back();
  },
  onDetails(id) {
    dispatch(routerRedux.push(`/details?id=${id}`))
  }
})

export default connect(()=>({}), mapDispatch2Props)(MyOrders);