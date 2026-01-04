import { createBrowserRouter } from 'react-router-dom';
import AuthRoute from '@/components/AuthRoute';

// 導入組件
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
// import Home from '@/pages/Home';
// import Article from '@/pages/Article';
// import Publish from '@/pages/Publish';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Article = lazy(() => import('@/pages/Article'));
const Publish = lazy(() => import('@/pages/Publish'));

// 配置路由
const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/article',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: '/publish',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Publish />
          </Suspense>
        ),
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  }
], {
  basename: "/react-jike" // 這裡一定要填寫你的 Repository 名稱
})

export default router;
