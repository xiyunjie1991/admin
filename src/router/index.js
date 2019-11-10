import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    meta: {
      title: '玩家猩球后台管理'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/goodsList',
    name: 'feature',
    meta: {
      title: '商品管理'
    },
    children: [
      {
        path: 'goodsList',
        name: 'goodsList',
        component: () => import('@/views/goods/goodsList'),
        meta: { title: '商品列表' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userList',
    name: 'feature',
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/user/userList'),
        meta: { title: '用户列表' }
      },
      {
        path: 'userDetail/:id(\\d+)',
        name: 'userDetail',
        component: () => import('@/views/user/userDetail'),
        meta: { title: '用户详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/feature',
    component: Layout,
    redirect: '/feature/featureArticleList',
    name: 'feature',
    meta: {
      title: '资讯管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'featureArticleList',
        name: 'featureArticleList',
        component: () => import('@/views/articles/featureArticleList'),
        meta: { title: '资讯列表' }
      },
      {
        path: 'hotKeyWord',
        name: 'hotKeyWord',
        component: () => import('@/views/articles/hotKeyWord/hotKeyWord'),
        meta: { title: '热门关键词管理' }
      },

      {
        path: 'showArticle/:id(\\d+)',
        name: 'showArticle',
        component: () => import('@/views/articles/showArticle'),
        meta: { title: '文章预览' },
        hidden: true
      }
    ]
  },

  {
    path: '/orb',
    component: Layout,
    redirect: '/orb/orbList',
    name: 'orb',
    meta: {
      title: '猩球管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'orbList',
        name: 'orbList',
        component: () => import('@/views/orb/orbList'),
        meta: { title: '猩球列表' }
      },
      {
        path: 'orbUpdate/:id(\\d+)',
        name: 'orbUpdate',
        component: () => import('@/views/orb/orbUpdate'),
        meta: { title: '猩球更新', noCache: true },
        hidden: true
      },
      {
        path: 'roomList/:id(\\d+)',
        name: 'roomList',
        component: () => import('@/views/orb/room/roomList'),
        meta: { title: '频道列表', noCache: true },
        hidden: true
      },
      {
        path: 'roomArticleList/:id(\\d+)',
        name: 'roomArticleList',
        component: () => import('@/views/orb/components/roomArticleList'),
        meta: { title: '频道文章管理', noCache: true },
        hidden: true
      },
      {
        path: 'featuredOrbList',
        name: 'featuredOrbList',
        component: () => import('@/views/orb/featuredOrbList'),
        meta: { title: '精选猩球管理' }
      },

      {
        path: 'orbUserList/:id(\\d+)',
        name: 'orbUserList',
        component: () => import('@/views/orb/orbUserList'),
        meta: { title: '猩球用户列表' },
        hidden: true
      },
      {
        path: 'recommendedOrb',
        name: 'recommendedOrb',
        component: () => import('@/views/orb/recommendedOrb'),
        meta: { title: '推荐猩球管理' }
      }
    ]
  },
  {
    path: '/game',
    component: Layout,
    redirect: '/game/gameList',
    name: 'game',
    meta: {
      title: '游戏管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'gameList',
        name: 'gameList',
        component: () => import('@/views/game/gameList'),
        meta: { title: '游戏列表' }
      },
      {
        path: 'gameUpdate/:id(\\d+)',
        name: 'gameUpdate',
        component: () => import('@/views/game/gameUpdate'),
        meta: { title: '游戏更新', noCache: true },
        hidden: true
      },
      {
        path: 'pedia/:id(\\d+)',
        component: () => import('@/views/game/pedia/pediaGroup'),
        name: 'pedia',
        meta: {
          title: '百科'
        },
        hidden: true
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/articleList',
    name: 'article',
    meta: {
      title: '文稿管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'articleList',
        name: 'articleList',
        component: () => import('@/views/articles/articleList'),
        meta: { title: '文稿列表' }
      },
      // {
      //   path: 'demo',
      //   name: 'demo',
      //   component: () => import('@/views/articles/demo'),
      //   meta: { title: '文稿样例' }
      // },
      // {
      //   path: 'demo2',
      //   name: 'demo2',
      //   component: () => import('@/views/articles/demo2'),
      //   meta: { title: '文稿样例2' }
      // },
      {
        path: 'articleEditor/:id(\\d+)',
        name: 'articleEditor',
        component: () => import('@/views/articles/articleEditor'),
        meta: { title: '编辑文章' },
        hidden: true
      }
    ]
  }
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
