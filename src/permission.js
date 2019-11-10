import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
// router.beforeEach((to, from, next) => {
//   let flag = false
//   for (var key in to.meta) {
//     flag = true// 返回false，不为空对象
//   }

//   if (flag) {
//     document.title = to.meta.title
//   } else {
//     document.title = '玩家猩球后台管理'
//   }
//   NProgress.start()

//   if (getToken()) {
//     console.info('有token')
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
//     } else {
//       if (store.getters.roles.length === 0) {
//         next()
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//       NProgress.done()
//     }
//   }
// })

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
