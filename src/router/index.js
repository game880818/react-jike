import { createBrowserRouter } from 'react-router-dom';

// 導入組件
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';

// 配置路由
const store = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/login',
    element: <Login />,
  }
])

export default store;