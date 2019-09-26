import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./layout/admin.vue";
import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";
import Staff from "./views/Staff.vue";
import InsuranceContract from "./views/insurance/contract";
import planInformation from "./views/insurance/planInformation";
import Baoquan from "./views/insurance/baoquan/index";
import credentialsUpload from './views/credentials/upload';
import credentialsSearch from './views/credentials/search';
import accountInfo from './views/accountInfo';
import baoquanAdd from './views/insurance/baoquan/add';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      // name: "dashboard",
      component: Admin,
      meta: { requiresAuth: true },
      redirect: { name: "staff" },
      children: [
        {
          path: "/index",
          name: "dashboard",
          component: Dashboard,
          meta: {
            breadcrumbName: "权限管理"
          }
        },
        {
          path: "list",
          name: "list",
          component: Dashboard,
          meta: {
            breadcrumbName: "理赔查询"
          }
        },
        {
          path: "staff",
          name: "staff",
          component: Staff,
          meta: {
            breadcrumbName: "福利人员"
          }
        },
        {
          path: "contract",
          name: "contract",
          component: InsuranceContract,
          meta: {
            breadcrumbName: "保单总览"
          }
        },
        {
          path: "planInfo",
          name: "plan-info",
          component: planInformation,
          meta: {
            breadcrumbName: "方案信息"
          }
        },
        {
          path: "baoquan",
          name: "baoquan",
          component: Baoquan,
          meta: {
            breadcrumbName: "保全管理"
          }
        },
        {
          path: "credentialsUpload",
          name: "credentials-upload",
          component: credentialsUpload,
          meta: {
            breadcrumbName: "凭证上传"
          }
        },
        {
          path: "credentialsSearch",
          name: "credentials-search",
          component: credentialsSearch,
          meta: {
            breadcrumbName: "凭证查询"
          }
        },
        {
          path: "accountInfo",
          name: "account-info",
          component: accountInfo,
          meta: {
            breadcrumbName: "账号信息"
          }
        },
        {
          path: "baoquanAdd",
          name: "baoquan-add",
          component: baoquanAdd,
          meta: {
            breadcrumbName: "增加被保险人"
          }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/submitCustomPlan",
      name: "submit-custom-plan",
      component: () =>
        import(/* webpackChunkName: "submit-custom-plan" */ "./views/submitCustomPlan.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
