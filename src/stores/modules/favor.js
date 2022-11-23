import { defineStore } from "pinia";
import { getFavorList } from "@/services/modules/favor";


const useFavorStore = defineStore('favor', {
  state: () => {
    return {
      favorList: []
    }
  },
  actions: {
    async fetchFavorList() {
      const res = await getFavorList()
      res ? this.favorList = res.data : ''
    }
  }
})

export default useFavorStore