import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import addressServices from '../services/address';

export default {

  namespace: 'address',

  state: {
    list: [],
  },


  effects: {
    *add({ payload }, {call, put}) {
      yield call(addressServices.add, payload);
      yield put(routerRedux.push('/address'));
      Toast.info('添加成功');
    },
    *query({ payload }, {call, put}) {
      const { data } = yield call(addressServices.query_all, payload);
      console.log(data)
      yield put({type: 'save', payload: data});
    }
  },

  reducers: {
    save(state, { payload }) {
      return {...state, list: payload};
    }
  },

  subscriptions: {
    
  }

};
