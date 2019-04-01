import { connect } from 'dva';
import { Route } from 'dva/router';
import { getLocalStorage } from '../../utils/utils';

// deafault alternative com.
import LoginPage from '../LoginPage';
import { log } from '../../utils/log';
import routes from "../../routeConfig";

const defaultRouteCfg = {
  canRender: ({ logined }) => {
    return logined
  },
  alternative: (props) => <LoginPage {...props} />,
}

/**
 * Route Config的单个路由生成函数。
 * 内部检查是否满足准入条件，不满足则渲染替代组件。
 */
export const RouteWithSubRoutes = ({ route, identProps, key }) => {
  return <Route
    key={key}
    path={route.path}
    exact={route.routes ? false : true}
    render={(props) => {
      // const cfg = {
      //   canPass: (defaultRouteCfg.canRender)(identProps),
      //   alternative: (defaultRouteCfg.alternative)
      //   // canPass: (route.canRender || defaultRouteCfg.canRender)(identProps),
      //   // alternative: (route.alternative || defaultRouteCfg.alternative)
      // }
      // log(`Route[${route.path}]:`, cfg);
      // return cfg.canPass ? <route.component {...props} routes={route.routes} identProps={identProps} /> : <cfg.alternative {...props} />
      return <route.component {...props} routes={route.routes} identProps={identProps} />
    }}
  />
}

function Identity(identProps) {
  return (
    <div style={{height: '100%'}}>
      {routes.map((route, i) => RouteWithSubRoutes({ route, identProps, key: i }))}
    </div>
  )
}

export default connect(
  ({ user }) => {
    return {
      logined: user.logined
    }
  }
)(Identity);
