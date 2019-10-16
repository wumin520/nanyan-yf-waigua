import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./layout/admin.vue";
import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";
import Staff from "./views/Staff.vue";
import InsuranceContract from "./views/insurance/contract";
import planInformation from "./views/insurance/planInformation";
import BaoquanIndex from "./views/insurance/baoquan/index";
import Baoquan from "./views/insurance/baoquan/list";
import credentialsUpload from "./views/credentials/upload";
import credentialsSearch from "./views/credentials/search";
import accountInfo from "./views/accountInfo";
import baoquanAdd from "./views/insurance/baoquan/add";
import baoquanEdit from "./views/insurance/baoquan/edit";

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
            breadcrumbName: "待办事项"
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
          component: BaoquanIndex,
          meta: {
            breadcrumbName: "保全管理"
          },
          children: [{
            path: "",
            name: "baoquan-list",
            component: Baoquan,
            meta: {
              breadcrumbName: "保全管理"
            },
          }, { // 保单加减人
            path: "add/:id",
            name: "baoquan-add",
            component: baoquanAdd,
            meta: {
              breadcrumbName: "增加被保险人"
            }
          }, {
            path: "sub/:id",
            name: "baoquan-sub",
            component: baoquanAdd,
            meta: {
              breadcrumbName: "减少被保险人"
            }
          }, {
            path: "edit/:id",
            name: "baoquan-edit",
            component: baoquanEdit,
            meta: {
              breadcrumbName: "编辑被保险人"
            }
          }, { // 批单进行加减人
            path: "pd/add/:id",
            name: "baoquan-pd-add",
            component: baoquanAdd,
            meta: {
              breadcrumbName: "增加被保险人"
            }
          }, {
            path: "pd/sub/:id",
            name: "baoquan-pd-sub",
            component: baoquanAdd,
            meta: {
              breadcrumbName: "减少被保险人"
            }
          }, {
            path: "pd/edit/:id",
            name: "baoquan-pd-edit",
            component: baoquanAdd,
            meta: {
              breadcrumbName: "编辑被保险人"
            }
          }, ]
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
        import(
          /* webpackChunkName: "submit-custom-plan" */ "./views/submitCustomPlan.vue"
        )
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
