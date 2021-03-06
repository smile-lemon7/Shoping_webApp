import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AddressPanel from '../../components/AddressPanel';
import styles from './index.less';
import { Flex, NavBar, Icon } from 'antd-mobile';
import Loading from '../../components/Loading';
import { saveLocalStorage } from '../../utils/utils';

class AddressPage extends Component {

  componentDidMount() {
    const { user_id, getAddress  } = this.props;
    getAddress({user_id});
  }
  render() {
    let { list } = this.props;
    const { onBack, onEdit, onAdd, onSelect, loading } = this.props;
    list = list.map(item => ({...item, onClick: ()=>onEdit(item), onSelect: ()=>onSelect(item)}));
    return (
      <div className={styles.wrap} direction="column">
        <NavBar
          mode="light"
          icon={<Icon type="left" style={{color:'#000'}}/>}
          onLeftClick={onBack}
          rightContent={<span style={{fontSize: 12,color:'#000'}} onClick={onAdd}>添加新地址</span>}
        >我的收货地址</NavBar>
        {loading?<Loading />:
          <Flex className={styles.container} direction="column">
            {list.map(item => (
              <AddressPanel addressInfo={item} key={item.id} />
            ))
            }
          </Flex>
        }
        
      </div>
    )
  }
}


AddressPage.defaultProps = {
  // list: [
  //   {
  //     id: 1,
  //     area: '上海 上海市 浦东新区 蒲兴路街道',
  //     details: '上海市浦东新区 xxx小区 博兴路 xx弄 xx号xxx',
  //     isDefault: true,
  //     phone: 16383722211,
  //     receiver: '李文',
  //   },
  //   {
  //     id: 2,
  //     area: '上海 上海市 浦东新区 蒲兴路街道2',
  //     details: '上海市浦东新区 xxx小区 博兴路 xx弄 xx号xxx2',
  //     isDefault: false,
  //     phone: 13872363311,
  //     receiver: '张三',
  //   }
  // ]
}

function mapState2Props({ user, address, loading: { effects } }) {
  return {
    user_id: user.id,
    list: address.list,
    loading: effects['products/query'],
  }
}

function mapDispatch2Props(dispatch) {
  return {
    getAddress(user_id) {
      dispatch({type: 'address/query', payload: user_id})
    },
    onBack() {
      window.history.back();
    },
    onEdit(item) {
      // console.log(`编辑地址${id}`)
      saveLocalStorage({type:'editAddress', value:JSON.stringify(item)})
      dispatch(routerRedux.push(`/editAddress?type=edit`))
    },
    onAdd() {
      // console.log('添加地址')
      dispatch(routerRedux.push(`/editAddress?type=add`))
    },
    onSelect(item) {
      saveLocalStorage({type: 'deliveryAddress', value:JSON.stringify(item)});
      window.history.back();
    },
  }
}

export default connect(mapState2Props, mapDispatch2Props)(AddressPage);