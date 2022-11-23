<template>
  <div class="home">
    <div class="list">
      <template v-for="(item, index) in goods.goodlist" :key="item.id">
        <good-item :item-data="item">
          <button class="btn" @click="addHandler(item)">加入购物车</button>
        </good-item>
      </template>
    </div>
  </div>
</template>

<script setup>
import goodItem from '@/components/good-item/good-item.vue';
import useGoodsStore from '@/stores/modules/goods'
import { addFavor } from '@/services/modules/favor'

const goods = useGoodsStore()
goods.fetchGoodsList()

// 加入购物车
const addHandler = (item) => {
  addFavor(item.id, 1).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  })

}
</script>

<style lang="less" scoped>
.home {
  .list {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>