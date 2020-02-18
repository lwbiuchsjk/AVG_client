// ajax请求插件的基础配置
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_API,  // 读取.nev文件中的配置
  timeout: 5000 // 请求超时时间
})

export default service