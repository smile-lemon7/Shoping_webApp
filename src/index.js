import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from "dva-loading";
import './index.less';

// 1. Initialize
const app = dva({
  // history: createHistory(),
  // onError(e, dispatch) {
  //   console.log(e.message);
  // },
});

// 2. Plugins
app.use(createLoading());


// 3. Model
app.model(require('./models/user').default);
app.model(require('./models/products').default);
app.model(require('./models/address').default);
app.model(require('./models/order').default);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
