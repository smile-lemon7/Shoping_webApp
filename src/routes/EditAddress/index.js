import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex, WingBlank, Toast, Switch } from 'antd-mobile';
import styles from './index.less';
import {NavBar, Icon} from 'antd-mobile';
import ListCom from '../../components/ListCom';
import { isPhoneNum } from '../../utils/utils';
import { routerRedux } from 'dva/router';
import { getQueryString } from '../../utils/utils';
import { getLocalStorage, saveLocalStorage } from '../../utils/utils';

class EditAddress extends Component {
  state = {
    receiver: '',
    phone: '',
    details: '',
    isDefault: false,
    type: '',
  }
  componentDidMount() {
    if(getQueryString('type') === 'edit') {
      this.setState({type: 'edit'})
    }
    if(getLocalStorage('editAddress')) {
      this.setState({...JSON.parse(getLocalStorage('editAddress'))})
    }
  }
  onChange = ({value, type}) => {
    if(value) {
      this.setState({[type]: value})
    }
  }
  render() {
    const {onSave, onBack, onRemove} = this.props;
    const {receiver, phone, details} = this.state;
    return (
      <div className={styles.wrap} direction="column">
        <NavBar
          mode="light"
          icon={<Icon type="left" style={{color:'#000'}}/>}
          onLeftClick={onBack}
          rightContent={<span style={{fontSize: 12,color:'#fc8407'}} onClick={()=>onSave({receiver, phone, details})}>保存</span>}
        >{this.state.type==='edit'?'添加收货地址':'编辑收货地址'}</NavBar>
          <Flex className={styles.container}>
            <Flex direction="column" style={{width:'100%'}}>
              <ListCom title={'收货人'} value={receiver} type={'receiver'} icon={'iconfont icon-lianxiren'} onChange={this.onChange}/>
              <ListCom title={'手机号码'} value={phone} type={'phone'} onChange={this.onChange}/>
              <ListCom title={'详细地址'} value={details} type={'details'} onChange={this.onChange}/>
            </Flex>
          </Flex>
          <Flex className={styles.btnWrap} justify="start" align="start" direction="column">
            <Flex style={{width:'100%'}} justify="between">
              <Flex>设为默认地址</Flex>
              <Switch
                checked={this.state.isDefault}
                onChange={() => {
                  this.setState({
                    isDefault: !this.state.isDefault,
                  });
                }}
              />
            </Flex>
            {this.state.type==='edit'?<Flex className={styles.removeBtn} onClick={()=>onRemove(this.state.id)}>删除收货地址</Flex>:null}
          </Flex>
      </div>
    )
  }
}

function mapDispatch2Props(dispatch) {
  return {
    onBack() {
      window.history.back();
      saveLocalStorage({type: 'editAddress', value:''})
    },
    onSave(params) {
      const {phone} = params;
      if( isPhoneNum(phone.split(' ').join('')) ) {
        dispatch(routerRedux.push('/address'))
        Toast.info('添加成功')
      }else {
        Toast.info('该联系方式不存在')
      }
    },
    onRemove(id) {
      console.log(`删除收货地址${id}`)
    }
  }
}
export default connect(()=>({}), mapDispatch2Props)(EditAddress);