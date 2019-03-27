import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import orderServices from '../services/order'

export default {

  namespace: 'order',

  state: {
    list: [],
    stayPay: [],
    delivery: [],
    collectGoods: [],
    info: {},
  },


  effects: {
    *submitOrder({ payload }, {call, put}) {
      const { data } = yield call(orderServices.submit, payload);
      const { data:pay_url } = yield call(orderServices.pay, data);
      const { re_url } = pay_url;
      re_url&&window.open(re_url, "_self");
    },
    *query({ payload }, {call, put}) {
      const { data } = yield call(orderServices.query, payload);
      yield put({type: 'save', payload: data});
    },
    *cancelOrder({payload}, {call, put}) {
      const { user_id, id } = payload;
      yield call(orderServices.calcel, {id});
      Toast.info('取消成功', 1);
      yield put({type: 'query', payload: user_id});
    },
    *pay({ payload }, {call, put}) {
      const { data } = yield call(orderServices.pay, payload);
      const { re_url } = data;
      re_url&&window.open(re_url, "_self");
    },
    *queryOne({ payload }, {call, put}) {
      const { data } = yield call(orderServices.queryOne, payload);
      yield put({type: 'saveOne', payload: data});
    },
    *remove({payload}, {call, put}) {
       yield call(orderServices.remove, payload);
    },
    *confirmReceive({payload}, {call, put}) {
      console.log( payload )
      yield call(orderServices.confirmReceive, payload);
      yield put({type: 'queryOne'})
    }

  },

  reducers: {
    save(state, { payload }) {
      let stayPay = payload.filter(item => {return item.status === 0});
      let delivery = payload.filter(item => {return item.status === 1});
      let collectGoods = payload.filter(item => {return item.status === 2});
      return {...state, list: payload, stayPay, delivery, collectGoods};
    },
    saveOne(state, { payload }) {
      return {...state, info: payload};
    }
  },

  subscriptions: {
    
  }

};
