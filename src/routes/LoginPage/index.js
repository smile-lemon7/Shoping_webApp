import React, { Component } from 'react';
import { connect } from 'dva';
import { Flex, InputItem, Icon,  Button, WingBlank } from 'antd-mobile';
import styles from './index.less';

class LoginPage extends Component {
  state = {
    phone: '',
    code: '',
    inpCode: '',
  }
  onPhone = (value) => {
    this.setState({phone: value})
  }
  savePhone = ({code}) => {
    this.setState({code})
  }
  onCode = (value) => {
    this.setState({inpCode: value})
  }
  render() {
    const { getCode, login } = this.props;
    const {inpCode, code, phone} = this.state;
    return (
      <WingBlank size="lg" style={{height: '100%'}}>
        <Flex direction="column" align="center" justify="start" className={styles.wrap}>
          <Flex justify="start" className={styles.loginTitle}>欢迎登录</Flex>
          <InputItem
            type="phone"
            placeholder="请输入手机号"
            onBlur={this.onPhone}
          >
            <Flex>
              <span>+86</span>
              <Icon type="right" />
            </Flex>
          </InputItem>
          <InputItem
            placeholder="请输入验证码"
            onChange={this.onCode}
          ></InputItem>
          {code?
            <Flex style={{width: '100%'}} justify="center">
              {inpCode?<Button type="primary" size="large" className={styles.codeBtn} 
                onClick={() => login({code, inpCode, phone})}>下一步</Button>
                  :<Button type="primary" disabled size="large" className={styles.codeBtn} 
                onClick={() => login({code, inpCode, phone})}>下一步</Button>
              }
            </Flex>:
            <Button type="primary" size="large" className={styles.codeBtn} 
              onClick={() => getCode({phone: this.state.phone, cb: this.savePhone})}>获取短信验证码</Button>
          }
        </Flex>
      </WingBlank>
    );
  }
}

LoginPage.defaultProps = {

};

const mapDispatchToProps = (dispatch) => ({
  getCode({phone, cb}) {
    dispatch({type: 'user/getCode', payload: phone, callback: cb})
  },
  login(params) {
    dispatch({type: 'user/login', payload: params});
  }
})

export default connect(()=>({}), mapDispatchToProps)(LoginPage);
