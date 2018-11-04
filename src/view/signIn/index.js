import Vue from 'vue'
import App from './App'
import appSNC from './import'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 引入css
// import '~/css/iconfont.css'
import '~/assets/style/reset.css'
import '~/assets/font/iconfont.css'

import 'lib-flexible'

Vue.prototype.$snc = appSNC
/* eslint-disable no-new */
// let vm = new Vue({
//   el: '#app',
//   data: {firstAjax: false, zhaopeng: {}},
//   template: '<App :firstAjax="firstAjax" :zhaopeng="zhaopeng"/>',
//   components: {App}
// })

appSNC.ready(data => {
  data.ext || (data.ext = {});
  new Vue({
    el: '#app',
    data: {firstAjax: false},
    template: '<App :firstAjax="firstAjax"/>',
    components: {App},
    provide: data
  })
  appSNC.hideLoading();
})
