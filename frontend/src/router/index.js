import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/OrderHistory.vue')
  }
//   {
//     path: '/user/login',
//     name: 'login',
//     meta: { guess: true },
//     component: () => import('../views/Login.vue')
//   }
]

const router = new VueRouter({ routes })


// router.beforeEach((to, from, next) => {
//   const isLoggedIn = !!localStorage.getItem('token')

//   if (to.meta.login && !isLoggedIn) {
//     alert('Please login first!')
//     next({ path: '/user/login' })
//   }

//   if (to.meta.guess && isLoggedIn) {
//     alert("You've already logged in")
//     next({ path: '/' })
//   }

//   next()
// })

  export default router
