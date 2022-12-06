import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'

import { BASE_URL, TIMEOUT } from './config'
import router from '@/router'

class SxRequest {
  constructor(baseURL, timeout = 5000) {
    this.instance = axios.create({
      baseURL,
      timeout,
      withCredentials: true
    })

    this.instance.interceptors.request.use(config => {
      const token = window.localStorage.getItem('token')
      if (token) {
        config.headers['Token'] = token
      }

      ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.1)',
      });

      return config
    }, err => {
      return err
    })

    this.instance.interceptors.response.use(res => {
      const loading = ElLoading.service();
      loading.close();

      if (res.data.code === 0 && res.data.msg) {
        ElMessage({
          type: 'success',
          message: res.data.msg
        })
      }

      return res
    }, err => {
      const loading = ElLoading.service();
      loading.close();

      if (!err.response.data.code) return err

      if (err.response.data.code === 60002 || err.response.data.code === 6001) {
        ElMessage({
          type: 'error',
          message: err.response.data.msg
        })
        window.localStorage.clear('token')
        router.push('/login')
      } else if (err.response.data.code !== 0) {
        ElMessage({
          type: 'error',
          message: err.response.data.msg
        })
      }

      return err
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res?.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.request({ ...config, method: 'post' })
  }
}

export default new SxRequest(BASE_URL, TIMEOUT)