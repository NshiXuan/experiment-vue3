<template>
  <div class="nav-bar">
    <div class="content wrap">
      <div v-for="(item, index) in navBar" :key="index">
        <router-link class="title" :class="{ active: currentIndex == index ? 'active' : '' }" @click="itemClick(index)"
          :to="item.path">{{ item.name }}
        </router-link>
      </div>

      <div class="logout" @click="logoutHandler">退出登录</div>
    </div>
  </div>
</template>

<script setup>
import { logoutApi } from '@/services/modules/login';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const navBar = [
  {
    name: '商品',
    path: '/home'
  },
  {
    name: '购物车',
    path: '/shop'
  },
  {
    name: '聊天记录',
    path: '/chat'
  }
]

let currentIndex = ref(0)

const itemClick = (index) => {
  currentIndex.value = index
}

// 监听路由
const route = useRoute()
watch(route, (newValue) => {
  const index = navBar.findIndex(item => item.path == newValue.path)
  if (index === -1) return
  currentIndex.value = index
})

const router = useRouter()
const logoutHandler = () => {
  logoutApi().then(res => {
    console.log('res', res)
    window.localStorage.clear('token')
    window.localStorage.clear('user_id')
    router.push('/login')
  })
}
</script>

<style lang="less" scoped>
.nav-bar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #eee;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

  .content {
    display: flex;
    position: relative;

    .title {
      display: block;
      height: 50px;
      width: 100px;
      line-height: 50px;
      text-align: center;

      &.active {
        background-color: #eee;
        color: #1D82FE;
      }
    }

    .logout {
      position: absolute;
      right: 0;
      top: 5px;
      height: 40px;
      line-height: 40px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>