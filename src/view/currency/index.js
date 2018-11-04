import Vue from 'vue'
import App from './App'
import appSNC from './import'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 引入css
import '~/assets/style/reset.css'
import '~/assets/font/iconfont.css'

import 'lib-flexible'

Vue.prototype.$snc = appSNC
/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  data: {firstAjax: false, user: {}},
  template: '<App :firstAjax="firstAjax" :user="user"/>',
  components: {App},
  // provide: {user}
})

appSNC.ready(data => {
  vm.user = data.user || {};
  appSNC.hideLoading();
})
