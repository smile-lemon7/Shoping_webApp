import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './index.less';

// 1. Initialize
const app = dva({
  // history: createHistory(),
  // onError(e, dispatch) {
  //   console.log(e.message);
  // },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user').default);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
