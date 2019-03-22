import { getLocalLogin } from './utils/user';
import LoginPage from './routes/LoginPage';
import Layout from "./layouts/Layout";
import HomePage from './routes/HomePage';
import ClassesPage from './routes/ClassesPage';
import ShopingCartPage from './routes/ShopingCartPage';
import MinePage from './routes/MinePage';
import ProductDetailsPage from './routes/ProductDetails';
import ConfirmOrder from './routes/ConfirmOrder';
import AddressPage from './routes/Address';
import EditAddress from './routes/EditAddress';
import MyOrders from './routes/MyOrders';
import OrderDetails from './routes/OrderDetails';

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
    path: '/orderDetails',
    canRender: () =>  (getLocalLogin()),
    component: OrderDetails,
  },{
    path: '/orders',
    canRender: () =>  (getLocalLogin()),
    component: MyOrders,
  },{
    path: '/editAddress',
    canRender: () =>  (getLocalLogin()),
    component: EditAddress,
  },{
    path: '/address',
    canRender: () =>  (getLocalLogin()),
    component: AddressPage,
  },{
    path: '/confirmOrder',
    canRender: () =>  (getLocalLogin()),
    component: ConfirmOrder,
  },{
    path: '/details',
    canRender: () =>  (getLocalLogin()),
    component: ProductDetailsPage,
  },{
    path: '/tabs',
    canRender: () =>  (getLocalLogin()),
    component: Layout,
    routes: [
      {
        path: '/tabs/index',
        component: HomePage,
      },
      {
        path: '/tabs/classes',
        component: ClassesPage,
      },
      {
        path: '/tabs/shopingCart',
        component: ShopingCartPage,
      },
      {
        path: '/tabs/mine',
        component: MinePage,
      },
    ]
  },{
    path: '/',
    component: LoginPage,
    canRender: () => true,  // 首页不需要检查准入条件
  },
];

