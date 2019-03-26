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
      Toast.info('地址添加成功');
    },
    *edit({ payload }, {call, put}) {
      yield call(addressServices.edit, payload);
      yield put(routerRedux.push('/address'));
      Toast.info('地址修改成功');
    },
    *query({ payload }, {call, put}) {
      const { data } = yield call(addressServices.query_all, payload);
      yield put({type: 'save', payload: data});
    },
    *del({ payload }, {call, put}) {
      yield call(addressServices.del, payload);
      Toast.info('删除成功');
      yield put(routerRedux.push('/address'));
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
