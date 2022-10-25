
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//导入网络请求的包
import { $http } from '@escook/request-miniprogram'
//请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
 
//挂载
uni.axios = $http
 
//请求拦截器   请求之前展示loading效果
$http.beforeRequest = function(options){
    uni.showLoading({
        title: '数据加载中...'
    })
}
//响应拦截器   请求后隐藏loading效果
$http.afterRequest = function(){
    uni.hideLoading()
}
uni.$showMsg=function(title='数据请求失败',duration=1500){
	uni.$showToast({
		title,
		duration
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif