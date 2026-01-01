// 封裝axios
import axios from 'axios'
import { getToken, clearToken } from './token'

// 1.根域名配置
// 2.超時時間
// 3.請求攔截器 / 響應攔截器

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
  // 1. 从 localStorage 中获取 token
  const token = getToken()
  // 2. 如果 token 存在，則添加到請求頭中
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 寫入 500 和網路錯誤的處理
  // 添加401錯誤攔截
  if (error.response.status === 401) {
    // 1. 清除 token
    clearToken()
    // 方法1 : 跳转到登录页 3 強制刷新頁面
    // router.navigate('/login')
    // window.location.reload()

    // 方法2 : 用 href 跳轉，它自帶 reload 效果，能徹底清除內存中的錯誤狀態
    window.location.href = '/login'
  }
  return Promise.reject(error)
})


export { request }