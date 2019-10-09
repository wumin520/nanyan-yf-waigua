import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import { isLogined } from '@/utils/authorized';

import Antd from "ant-design-vue";
import { notification, message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import moment from "moment";
import "moment/locale/zh-cn";

Vue.config.productionTip = false;

Vue.use(Antd);
moment.locale("zh-cn");
window.notification = notification;
window.message = message;
window.router = router;

const auth = {
  loggedIn: () => {
    return isLogined();
  }
};

router.beforeEach((to, from, next) => {
  console.log("beforeEach -> ", to, from);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
