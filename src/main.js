import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import http from './js/http.js'

Vue.prototype.$http = http

Vue.use(ElementUI)
new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
