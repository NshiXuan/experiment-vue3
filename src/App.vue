<template>
  <div class="app">
    <navBar v-show="!route.meta.hideNavBar" />
    <router-view class="wrap" v-slot="props">
      <keep-alive include="chat">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import { KeepAlive } from 'vue';
import { useRoute } from 'vue-router';
import navBar from './components/nav-bar/nav-bar.vue';

const route = useRoute()
// console.log(route.meta)
</script>

<style lang="less" scoped>
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>