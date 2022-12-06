<template>
  <div class="chat">
    <div class="content bs" ref="chatRef">
      <template v-for="(item, index) in chats.chatList" :key="item.id">
        <div class="info-wrap">
          <div class="name">{{ item.userName }}</div>
          <div class="info">{{ item.content }}</div>
        </div>
      </template>
    </div>

    <div class="input bs">
      <input type="text" v-model="content">
      <button class="btn" @click="sendHandler">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated, watch } from 'vue';
import useChatsStore from '@/stores/modules/chats';
import { saveChats } from "@/services/modules/chats";
import useScroll from '@/hooks/useScroll';


// 请求数据
let size = 10
const chats = useChatsStore()
chats.fetchChatsList(1, size)

// 获取输入内容
const content = ref()
const sendHandler = () => {
  console.log(content.value)
  const user_id = window.localStorage.getItem('user_id')
  if (user_id) {
    saveChats(content.value, user_id).then(res => {
      size = size + 1
      console.log(size);
      chats.fetchChatsList(1, size)
      content.value = ''
      setTimeout(() => {
        chatRef.value?.scrollTo({
          top: chatRef.value.scrollHeight
        })
      }, 1000)
    })
  }
}

const chatRef = ref()
const { scrollTop, scrollHeight, clientHeight, isReachTop, isReachBottom } = useScroll(chatRef)

onMounted(() => {
  setTimeout(() => {
    chatRef.value?.scrollTo({
      top: chatRef.value.scrollHeight
    })
    console.log('chatRef.value.scrollHeight', chatRef)
    // chatRef.value.style.opacity = 1
  }, 1000)
})

// 监听到达底部
watch(isReachBottom, (newValue) => {
  if (newValue) {
    console.log('newvalue')
    chatRef.value.style.opacity = 1
  }
})

// 保留原来的位置
onActivated(() => {
  chatRef.value?.scrollTo({
    top: scrollTop.value
  })
})
</script>

<style lang="less" scoped>
.chat {
  margin-top: 20px;

  .content {
    height: 70vh;
    border-radius: 5px;
    padding: 20px;
    overflow: hidden;
    opacity: 0;

    &:hover {
      overflow-y: auto;
    }

    .info-wrap {
      margin-top: 10px;

      .name {
        font-size: 12px;
        color: #666;
      }

      .info {
        margin-top: 5px;
        margin-left: 10px;
        padding: 10px;
        width: fit-content;
        background-color: #1D82FE;
        color: #fff;
        border-radius: 10px;
      }
    }
  }

  .content::-webkit-scrollbar {
    // 滚动条的宽度
    width: 10px;
    height: 1px;
  }

  .content::-webkit-scrollbar-thumb {
    // 滚动条里的小方块
    border-radius: 10px;
    background: #E5E5E5;
  }

  .content::-webkit-scrollbar-track {
    // 滚动条轨道(背景颜色) 原本为白色可以不要
    border-radius: 10px;
    background: #fff;
  }

  .input {
    margin-top: 20px;
    border-radius: 5px;

    input {
      margin: 10px;
      padding: 10px;
      border: 2px solid #efefef;
      outline-color: #1D82FE;
      border-radius: 5px;
      width: 50%;
    }
  }
}
</style>