import { TabBar } from 'antd-mobile';
import { PureComponent } from "react";
import { connect } from 'dva';
import { RouteWithSubRoutes } from "../routes/Identity";
import { routerRedux } from 'dva/router';

class Layout extends PureComponent {

  tabs = [
    {
      title: '首页',
      icon: '/home.png',
      curIcon: '/home_selected.png',
      url: '/tabs/index',
    }, 
    {
      title: '分类',
      icon: '/classes.png',
      curIcon: '/classes_selected.png',
      url: '/tabs/classes',
    }, 
    {
      title: '购物车',
      icon: '/shoping_cart.png',
      curIcon: '/shoping_cart_selected.png',
      url: '/tabs/shopingCart',
    }, 
    {
      title: '个人中心',
      icon: '/mine.png',
      curIcon: '/mine_selected.png',
      url: '/tabs/mine',
    },
  ];
  render() {
    const pathname = this.props.location.pathname
    let { routes, identProps } = this.props;
    const { goTab } = this.props;
    return (
      <TabBar
      unselectedTintColor='#949494'
      tintColor='rgb(241, 138, 138)'
      barTintColor='white'
    >
      {this.tabs.map( (tab, inx) => (
          <TabBar.Item
            key={tab.title}
            icon={<img src={tab.icon} alt={tab.icon} height="24px" />} 
            selectedIcon={<img src={tab.curIcon} alt={tab.curIcon} height="24px" />}
            selected={pathname === tab.url}
            title={tab.title}
            onPress={() => {
              goTab(tab.url)
            }}
          >
            <RouteWithSubRoutes route={routes[inx]} identProps={identProps} />
          </TabBar.Item>
        ))
      }
    </TabBar>
    )
  }
}


function mapDispatch2Props(dispatch) {
  return {
    goTab(url) {
      return dispatch(routerRedux.push(url));
    }
  }
}
export default connect(()=>({}), mapDispatch2Props)(Layout);