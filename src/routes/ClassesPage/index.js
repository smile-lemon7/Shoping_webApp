import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Flex, Tabs } from 'antd-mobile';
import Group from '../../components/ProdClassGroup/Group';
import classesServices from '../../services/classes';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import styles from './index.less';

class ClassesPage extends Component {
  state = {
    page: 0,
    list_all: [],
    classes: [],
    loading_classes: true,
    loading_classesItem: true,
  }
  async componentWillMount() {
    let { onDetails } = this.props;
    let { data: classes } = await classesServices.query();
    let { data: classItem } = await classesServices.query_classes_item({cls_id: classes[0].id});
    classes?this.setState({loading_classes: false}):null
    classItem?this.setState({loading_classesItem: false}):null
    let cls = classes;
    cls.forEach(item => {
      if(item.id === classItem.id*1) {
        classItem.prods = classItem.prods.map(item => ({...item, onClick: () => onDetails(item.id)}))
        item.prods = classItem.prods;
      }
    })
    this.setState({list_all: cls, classes});
  }
  onChange = async ({id}) => {
    let { classes } = this.state;
    let { onDetails } = this.props;
    const { data: classItem } = await classesServices.query_classes_item({cls_id: id});
    classes.forEach(item => {
      if(item.id === classItem.id) {
        classItem.prods = classItem.prods.map(item => ({...item, onClick: () => onDetails(item.id)}))
        item.prods = classItem.prods;
      }
    })
    this.setState({list_all: classes});

    this.state.classes.forEach((item, index) => {
      if(item.id === id) {
        this.setState({page: index});
      }
    })
  }
  render() {
    let { list_all, classes, loading_classes, loading_classesItem} = this.state;
    classes = classes.map(item => ({...item, title: item.name}))
    return (
      <div className={styles.wrap}>
        {/* <Flex justify='between' className={styles.searchBox} justify="center">
          <SearchBar />
        </Flex> */}
        {loading_classes||loading_classesItem?<Flex style={{paddingTop:'45px',height:'100%'}} justify="center"><Loading /></Flex>:
          <Tabs tabs={classes} 
            animated={true}
            tabBarPosition="left"
            tabDirection="vertical"
            swipeable={true}
            initialPage={this.state.page}
            onChange={this.onChange}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={8} />}
            tabBarUnderlineStyle={{top:this.state.page*60}}
          >
            {list_all.map(item => (
              <Flex key={item.id} justify="center" align="start" className={styles.contentWrap}>
                <Group list={item.prods} classes={item.name} />
              </Flex>
            ))
          }
        </Tabs>
        }
      </div>
    )
  }
}

ClassesPage.defaultProps = {
  // classes: [
  //   {id: 1,title: '白酒'},
  //   {id: 2,title: '葡萄酒'},
  //   {id: 3,title: '啤酒'},
  //   {id: 4,title: '黄酒'},
  //   {id: 5,title: '白兰地'},
  //   {id: 6,title: '鸡尾酒'},
  //   {id: 7,title: '鸡尾酒2'},
  // ],
  // class_item: {
  //   id: 1,
  //   prods: [
  //     { 
  //       id: 1,
  //       cover_img: ["http://img07.jiuxian.com/2017/1024/a1d17002462048019f3237afa5b5bdcd2.jpg"],
  //       title: "汾酒特卖 55°汾酒盘古汾酒500ml*4",
  //       curr_price: 2.00,
  //       old_price: 1.00,
  //       pay_counts: 8
  //     },{ 
  //       id: 2,
  //       cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
  //       title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
  //       curr_price: 1.00,
  //       old_price: 1.00,
  //       pay_counts: 3,
  //     },{ 
  //       id: 3,
  //       cover_img: ["http://img07.jiuxian.com/2017/1024/a1d17002462048019f3237afa5b5bdcd2.jpg"],
  //       title: "汾酒特卖 55°汾酒盘古汾酒500ml*4",
  //       curr_price: 2.00,
  //       old_price: 1.00,
  //       pay_counts: 8
  //     },{ 
  //       id: 4,
  //       cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
  //       title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
  //       curr_price: 1.00,
  //       old_price: 1.00,
  //       pay_counts: 3,
  //     },{ 
  //       id: 5,
  //       cover_img: ["http://img07.jiuxian.com/2017/1024/a1d17002462048019f3237afa5b5bdcd2.jpg"],
  //       title: "汾酒特卖 55°汾酒盘古汾酒500ml*4",
  //       curr_price: 2.00,
  //       old_price: 1.00,
  //       pay_counts: 8
  //     },{ 
  //       id: 6,
  //       cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
  //       title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
  //       curr_price: 1.00,
  //       old_price: 1.00,
  //       pay_counts: 3,
  //     },{ 
  //       id: 7,
  //       cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
  //       title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
  //       curr_price: 1.00,
  //       old_price: 1.00,
  //       pay_counts: 3,
  //     },{ 
  //       id: 8,
  //       cover_img: ["http://img07.jiuxian.com/2017/1024/a1d17002462048019f3237afa5b5bdcd2.jpg"],
  //       title: "汾酒特卖 55°汾酒盘古汾酒500ml*4",
  //       curr_price: 2.00,
  //       old_price: 1.00,
  //       pay_counts: 8
  //     },{ 
  //       id: 9,
  //       cover_img: ["//img14.360buyimg.com/mobilecms/s316x316_jfs/t1/21728/19/10531/172727/5c870f11E85df5c78/e0db5bd83cf435b6.jpg!q70.dpg.webp"],
  //       title: "贵州茅台镇张义斋酱香型白酒纯粮食酿造高度高粱酒陈年老酒500ML",
  //       curr_price: 1.00,
  //       old_price: 1.00,
  //       pay_counts: 3,
  //     },
  //   ]
  // }
  
}

const mapDispatch2Props = (dispatch) => ({
  // onBack() {
  //   window.history.back();
  // },
  onDetails(id) {
    dispatch(routerRedux.push(`/details?id=${id}`))
  },
})

export default connect(()=>({}), mapDispatch2Props)(ClassesPage);