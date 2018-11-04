import Vue from 'vue'
import App from './App'
import appSNC from './import'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

import { Button, Cell, Field } from 'mint-ui';
Vue.component(Cell.name, Cell);
Vue.component(Button.name, Button);
Vue.component(Field.name, Field);

// 引入css
import '~/css/reset.css'
import '~/css/iconfont.css'

Vue.prototype.$snc = appSNC
/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  data: {firstAjax: false},
  template: '<App :firstAjax="firstAjax"/>',
  components: {App}
})

appSNC.ready(data => {
  appSNC.hideLoading()
  // appSNC.enablePullDownRefresh({
  //   theme: 'worldcup',
  //   success (response) {
	// 		console.log('下拉刷新启用成功！')
	// 	}
  // })
})
