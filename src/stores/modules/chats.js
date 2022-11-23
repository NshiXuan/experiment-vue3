import { getChatsList } from "@/services/modules/chats";
import { defineStore } from "pinia";


const useChatsStore = defineStore('chats', {
  state: () => {
    return {
      chatList: [],

    }
  },
  actions: {
    async fetchChatsList(page, size) {
      const res = await getChatsList(page, size)
      // res ? this.chatList.push(...res.data.reverse()) : ''
      res ? this.chatList = res.data.reverse() : ''
    }
  }
})

export default useChatsStore