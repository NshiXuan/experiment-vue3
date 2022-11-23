<template>
  <div class="shop">
    <div class="list">
      <template v-for="(item, index) in favor.favorList" :key="item.id">
        <good-item :item-data="item">
          <button class="fav-btn btn" @click="removeHandler(item)">删除</button>
        </good-item>
      </template>
    </div>

    <div class="total-price bs">
      <span>总价格:</span>
      <span class="price">￥{{ totalPrice }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import useFavorStore from '@/stores/modules/favor';
import goodItem from '@/components/good-item/good-item.vue';
import { deleteFavor } from '@/services/modules/favor';

const favor = useFavorStore()
favor.fetchFavorList()

const totalPrice = computed(() => {
  return favor.favorList.reduce((total, item) => total += +item.goodPrice, 0)
})

const removeHandler = (item) => {
  deleteFavor(item.id).then(res => {
    console.log('favor-delete', res);
    res ? favor.fetchFavorList() : ''
  })
}
</script>

<style lang="less" scoped>
.shop {
  margin-top: 20px;

  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .fav-btn {
      background-color: red;
    }
  }

  .total-price {
    position: absolute;
    bottom: 50px;
    padding: 20px;
    border-radius: 5px;
    width: 30%;

    .price {
      margin-left: 10px;
      font-size: 20px;
      color: red;
    }
  }
}
</style>