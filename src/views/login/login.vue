<template>
  <div class="login">
    <div class="wrapper bs">
      <div class="username">
        <span>用户名：</span>
        <input type="text" name="username" v-model="username">
      </div>
      <div class="password">
        <span>密码：</span>
        <input type="password" name="password" v-model="password">
      </div>
      <!-- <div class="captcha">
        <span>验证码：</span>
        <input type="text" name="captcha" v-model="captcha">
        <img @click="changeCaptcha" ref="imgRef">
      </div> -->
      <div class="button">
        <button class="btn" @click="loginHandler">登录</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { loginApi } from '@/services/modules/login'
import { useRouter } from 'vue-router';

const username = ref('')
const password = ref('')
const captcha = ref('')

const imgRef = ref()
const changeCaptcha = () => {
  imgRef.value.src = 'http://localhost:8080/users/captcha?v=' + (new Date).getTime()
}
// nextTick(() => {
//   changeCaptcha()
// })


const router = useRouter()
const loginHandler = () => {
  loginApi(username.value, password.value, captcha.value).then(res => {
    console.log(res)
    if (res && res.code == 0) {
      window.localStorage.setItem('token', res.data.token)
      router.push('/home')
    }
  })
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #666;

  .wrapper {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 18px;
    border-radius: 5px;
    transform: translateY(-20%);
    background: #fff;

    span {
      width: 80px;
    }

    input {
      padding: 5px;
      border: 2px solid #efefef;
      outline-color: #1D82FE;
      border-radius: 5px;
    }

    .username,
    .password,
    .captcha,
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .captcha {

      input {
        width: 100px;
      }

      img {
        margin-left: 10px;
        height: 34px;
        width: 100px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>