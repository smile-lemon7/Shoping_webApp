import LoginPage from './routes/LoginPage';

/**
 * 路由配置
 * {
 *    path,         // URL
 *    component,    // 路由组件
 *    canRender?,   // 路由能否渲染? 默认需要token存在。
 *    alternative?, // 路由不允许渲染的替代组件，默认为<LoginPage />
 * }
 * 
 * @TODO: 为每个路由配置state数据获取函数，在Identity的connect中添加 reducer(allRouteState2Props)
 */
export default [
  {
    path: '/',
    component: LoginPage,
    canRender: () => true,  // 首页不需要检查准入条件
  },
];

