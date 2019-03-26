import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import orderServices from '../services/order'

export default {

  namespace: 'order',

  state: {

  },


  effects: {
    *submitOrder({ payload }, {call, put}) {
      const { data } = yield call(orderServices.submit, payload);
      console.log(data)
      const { re_url } = data;
      window.open(re_url, "_self");

    }
  },

  reducers: {
    
  },

  subscriptions: {
    
  }

};
