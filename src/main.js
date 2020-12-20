import Vue from 'vue';
import App from './App.vue';
import router from "./router";

Vue.config.productionTip = false;

// 引入element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//需要使用的项目文件中引入
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

// 配置消息提示的环境配置
Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({  
  router,
  render: h => h(App),

}).$mount('#app')
