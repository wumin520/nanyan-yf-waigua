<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <router-link to="/">
        <div class="logo">
          <img src="../assets/logo@2x.png" />
        </div>
      </router-link>
      <!-- <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu> -->
      <a-menu
        :defaultSelectedKeys="['3']"
        :defaultOpenKeys="['2']"
        mode="inline"
        theme="light"
        :inlineCollapsed="collapsed"
      >
        <template v-for="item in list">
          <a-menu-item v-if="!item.children" :key="item.key">
            <router-link :to="item.url">
              <a-icon type="pie-chart" />
              <span>{{ item.title }}</span>
            </router-link>
          </a-menu-item>
          <sub-menu v-else :menu-info="item" :key="item.key" />
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; position: relative;">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-popover placement="bottom">
          <template slot="content">
            <a href="javascript:;"  @click="exit">退出登录</a>
          </template>
          <template slot="title">
            <div style="text-align: center;">me</div>
          </template>
          <a-avatar style="backgroundColor:#297FFF; margin-left: auto;position: absolute; right: 72px;top: 13px;" icon="user" />
        </a-popover>
      </a-layout-header>
      <a-breadcrumb style="margin: 16px;" :routes="routes">
        <template
          slot="itemRender"
          slot-scope="{ route, params, routes, paths }"
        >
          <span v-if="routes.indexOf(route) === routes.length - 1">
            {{ route.breadcrumbName }}
          </span>
          <router-link v-else :to="paths.join('/')">
            {{ route.breadcrumbName }}
          </router-link>
        </template>
      </a-breadcrumb>
      <a-layout-content
        :style="{
          margin: '0 16px 24px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SubMenu from "./SubMenu";
import api from '@/utils/api';
export default {
  data() {
    return {
      collapsed: false,
      list: [
        // {
        //   key: "1",
        //   title: "概览",
        //   url: '/dashboard/list'
        // },
        {
          key: "3",
          title: "福利人员",
          url: "/dashboard/staff"
        },
        {
          key: "2",
          title: "保单管理",
          children: [
            {
              key: "2.1",
              title: "保单总览",
              url: "/dashboard/contract"
            }
            // {
            //   key: "2.2",
            //   title: "保全管理",
            //   url: '/dashboard/baoquan'
            // },
            // {
            //   key: "2.3",
            //   title: "理赔管理",
            //   url: '/dashboard'
            // }
          ]
        },
        // {
        //   key: "4",
        //   title: "凭证管理",
        //   children: [
        //     {
        //       key: "4.1",
        //       title: "凭证上传",
        //       url: '/dashboard/credentialsUpload'
        //     },
        //     {
        //       key: "4.2",
        //       title: "凭证查询",
        //       url: '/dashboard/credentialsSearch'
        //     }
        //   ]
        //  },
        {
          key: "5",
          title: "账号信息",
          url: "/dashboard/accountInfo"
        }
      ],
      routes: []
    };
  },
  watch: {
    $route: function() {
      console.log("route change -> ", this.$route);
      const arr = this.$route.matched.map((item, index) => {
        return {
          path: item.path,
          breadcrumbName: item.meta.breadcrumbName || "首页"
        };
      });
      this.routes = arr;
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  mounted() {
    console.log(this.$router, this.$route, this);
  },
  methods: {
    exit () {
      api.exitLogin().then(res => res.data).then((data) => {
        this.$router.push({name:"login"});
      })
    }
  }
};
</script>
<style lang="scss">
.ant-popover-placement-bottom {
  .ant-popover-title {
    min-width: 150px;
  }
  .ant-popover-inner-content {
    padding: 8px 0;
    text-align: center;
  }
}
#components-layout-demo-custom-trigger {
  height: 100%;
  .ant-layout-sider {
    background: #fff;
  }
  .ant-layout-content {
    background: #f0f2f5 !important;
    padding: 0 !important;
  }
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 35px;
  // background: #eee;
  margin: 16px;
  overflow: hidden;
  img {
    width: 128px;
    height: auto;
    display: block;
  }
}
</style>
