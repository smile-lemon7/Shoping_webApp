import Core  from '@alicloud/pop-core';
import { Toast } from 'antd-mobile';
import { isPhoneNum } from '../utils/utils';
import loginServices from '../services/user';
import { routerRedux } from 'dva/router';
import { saveLocalLogin } from '../utils/user';

export default {

  namespace: 'user',

  state: {
    logined: false,
    code: '',
    message: '',
    phone: '',
    id: 1,
  },


  effects: {
    *getCode({ payload, callback }, {call, put}) {
      if( payload && isPhoneNum(payload.split(' ').join(''))) {
        callback({'code': '1234'})
        // const accessKeyId = "LTAItcQwAaf9Lgou"
        // const secretAccessKey = "JYNuR0JEYzK9FRB4W0dGeXlZwWY206"
        // var client = new Core({
        //   accessKeyId: accessKeyId,
        //   accessKeySecret: secretAccessKey,
        //   endpoint: 'https://dysmsapi.aliyuncs.com',
        //   apiVersion: '2017-05-25'
        // });
        // let paramCode = '';
        // paramCode = ""
			  // for(var i=0;i<4;i++){
        //   paramCode+=Math.floor(Math.random()*10)
        // }
        // const params = {
        //   "PhoneNumbers": payload.split(' ').join(''),
        //   "SignName": "上海蒹信网络科技",
        //   "TemplateCode": "SMS_121910923",
        //   "TemplateParam": `{'code': ${paramCode}}`
        // }
        // const requestOption = {
        //   method: 'POST'
        // };
        // client.request('SendSms', params, requestOption).then((result) => {
        //   // console.log(result);
        //   const {Code, Message} = result;
        //   if(Message === 'OK') {
        //     // window.localStorage.setItem('code', Code)
        //     callback({'code': Code})
        //   }
        // }, (err) => {
        //   console.log(err)
        //   Toast.info('验证码发送失败，请重试！');
        // })
      }else {
        Toast.info('手机号不存在');
      }
    },
    *login({ payload }, {call, put}) {

      const {code, inpCode, phone} = payload;
      if(code === inpCode) {
        yield put(routerRedux.push('/tabs/index'));
        yield put({type: 'saveLogined', payload: {logined: true}})
        saveLocalLogin({logined: true})
        // const {data} = yield call(loginServices.login, {phone: phone.split(' ').join('')})
        // if(data.msg) {
        //   yield put(routerRedux.push('/tabs/index'));
        //   yield put({type: 'saveLogined', payload: {logined: true}})
        // }
        yield put({type: 'saveUserInfo', payload:{id: 1,phone: '16239129991',avatar: ''} })
      }else {
        Toast.info('验证码输入错误')
      }
    }
  },

  reducers: {
    saveLogined(state, { payload }) {
      return {...state, logined: payload.logined}
    },
    saveUserInfo(state, { payload }) {
      return {...state, ...payload}
    }
  },

  subscriptions: {
    setup({ dispatch }) {
    }
  }

};
