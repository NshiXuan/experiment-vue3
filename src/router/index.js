import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        hideNavBar: true
      }
    },
    {
      path: "/home",
      component: () => import("@/views/home/home.vue")
    },
    {
      path: "/shop",
      component: () => import("@/views/shop/shop.vue")
    },
    {
      path: "/chat",
      component: () => import("@/views/chat/chat.vue")
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.path == '/login') {
    const token = window.localStorage.getItem('token')
    if (token) {
      return '/home'
    }
  }

  if (to.path !== '/login') {
    const token = window.localStorage.getItem('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router