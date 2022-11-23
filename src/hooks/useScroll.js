import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore';

export default function useScroll(elRef) {
  let el = elRef.value
  const isReachBottom = ref(false)
  const isReachTop = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
      // console.log(clientHeight.value, scrollTop.value, scrollHeight.value);
    }
    console.log(clientHeight.value, scrollTop.value, scrollHeight.value)
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
      console.log('到底部了');
      isReachBottom.value = true
    }

    if (scrollTop.value <= 1) {
      console.log('到顶部了');
      isReachTop.value = true
    }
  }, 100)

  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}