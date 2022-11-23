import { defineStore } from "pinia";
import { getGoodsList } from '../../services/index'


const useGoodsStore = defineStore('goods', {
  state: () => {
    return {
      name: 'goods',
      goodlist: []
    }
  },
  actions: {
    async fetchGoodsList(page, size) {
      const res = await getGoodsList(page, size)
      res ? this.goodlist = res.data : ''
    }
  }
})

export default useGoodsStore