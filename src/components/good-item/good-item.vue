<template>
  <div class="good-item">
    <div class="img">
      <img :src="itemData.goodImg" :alt="itemData.name">
    </div>
    <div class="name">{{ itemData.goodName }}</div>
    <div class="price">￥{{ itemData.goodPrice }}</div>
    <slot> </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="less" scoped>
.good-item {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;

  .img {
    img {
      width: 150px;
      height: 150px;
    }
  }
}
</style>