import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex, WingBlank, Toast } from 'antd-mobile';
import styles from './index.less';
import {NavBar, Icon} from 'antd-mobile';
import ListCom from '../../components/ListCom';
import { isPhoneNum } from '../../utils/utils';
import { router } from 'sw-toolbox';
import { routerRedux } from 'dva/router';

class EditAddress extends Component {
  state = {
    receiver: '',
    phone: '',
    details: ''
  }
  onChange = ({value, type}) => {
    if(value) {
      this.setState({[type]: value})
    }
  }
  render() {
    const {onSave, onBack} = this.props;
    const {receiver, phone, details} = this.state;
    return (
      <div className={styles.wrap} direction="column">
        <NavBar
          mode="light"
          icon={<Icon type="left" style={{color:'#000'}}/>}
          onLeftClick={onBack}
          rightContent={<span style={{fontSize: 12,color:'#fc8407'}} onClick={()=>onSave({receiver, phone, details})}>保存</span>}
        >添加收货地址</NavBar>
          <WingBlank>
            <Flex direction="column">
              <ListCom title={'收货人'} type={'receiver'} icon={'iconfont icon-lianxiren'} onChange={this.onChange}/>
              <ListCom title={'联系方式'}type={'phone'} onChange={this.onChange}/>
              <ListCom title={'详细地址'} type={'details'} onChange={this.onChange}/>
            </Flex>
          </WingBlank>
      </div>
    )
  }
}

function mapDispatch2Props(dispatch) {
  return {
    onBack() {
      window.history.back();
    },
    onSave(params) {
      const {phone} = params;
      if( isPhoneNum(phone.split(' ').join('')) ) {
        dispatch(routerRedux.push('/address'))
        Toast.info('添加成功')
      }else {
        Toast.info('该联系方式不存在')
      }
    }
  }
}
export default connect(()=>({}), mapDispatch2Props)(EditAddress);