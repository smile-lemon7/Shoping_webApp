import { Toast } from 'antd-mobile';
import cartServices from '../services/shopingCart';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'cart',

  state: {
    list: []
  },


  effects: {
    // *query({ payload }, {call, put}) {
    //   const { data } = yield call(cartServices.query, payload);
    //   yield put({type: 'save', payload: data});
    // },
    *addCart({ payload }, {call, put}) {
      yield call(cartServices.addCart, payload);
      Toast.info('添加购物车成功!')
    },
    *reduceCounts({ payload }, {call, put}) {
      yield call(cartServices.reduceCounts, payload)
    },
    *addCounts({ payload }, {call, put}) {
      yield call(cartServices.addCounts, payload);
    }
   
  },

  reducers: {
    save(state, { payload }) {
      return {...state, list: payload};
    },
  },

  subscriptions: {
    
  }

};
