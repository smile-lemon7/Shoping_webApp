import productsServices from '../services/products';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'products',

  state: {
    recommend_list: [],
    product: {},
  },


  effects: {
    *query_recommend(_, {call, put}) {
      const { data } = yield call(productsServices.query_recommend);
      yield put({type: 'saveRecommend', payload: data});
    },
    *query_product({ payload }, {call, put}) {
      const { data } = yield call(productsServices.query_product, payload);
      yield put({type: 'saveProduct', payload: data});
    },

  },

  reducers: {
    saveRecommend(state, { payload }) {
      return {...state, recommend_list: payload}
    },
    saveProduct(state, { payload }) {
      return {...state, product: payload}
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, search}) => {
        if(pathname === '/tabs/index') {
          dispatch({type: 'query_recommend'});
        }
      })
    }
  }

};
