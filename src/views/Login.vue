<template>
  <div class="login_bg_">
    <div class="top_header_ c">
      <div class="w1024 b_line_ navbar_ clearfix">
        <img class="logo_" src="../assets/home/logo2.png" />
        <router-link to="/">
          <button class="btn_ btn_plain_ btn_home_ fr_">
            返回首页
          </button>
        </router-link>
      </div>
    </div>
    <div class="content_ w1024">
      <a-row>
        <a-col :span="12">
          <div class="home_header_">
            <div class="center_">
              <div class="title_">你身边的安全管家</div>
              <div class="desc_">
                5000家企业，数十万名员工的信赖<br />
                用心做企业信任、员工满意的企业员工保险平台
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="login_container_">
            <a-row class="">
              <a-col :span="24">
                <div class="login_title_">
                  企业登录
                </div>
              </a-col>
              <!-- <a-col :span="12">
              <div class="login_title_">
                个人登录
              </div>
            </a-col> -->
            </a-row>
            <a-form
              id="components-form-demo-normal-login"
              :form="form"
              class="login-form"
              @submit="handleSubmit"
            >
              <a-form-item>
                <a-input
                  v-decorator="[
                    'userName',
                    {
                      rules: [{ required: true, message: '请输入企业账号' }]
                    }
                  ]"
                  placeholder="请输入企业账号"
                  size="large"
                >
                  <a-icon
                    slot="suffix"
                    type="user"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-decorator="[
                    'passWord',
                    {
                      rules: [{ required: true, message: '请输入密码' }]
                    }
                  ]"
                  type="password"
                  placeholder="请输入密码"
                  size="large"
                >
                  <a-icon
                    slot="suffix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-decorator="[
                    'verificationCode',
                    {
                      rules: [{ required: true, message: '请输入验证码' }]
                    }
                  ]"
                  placeholder="请输入验证码"
                  size="large"
                >
                  <!-- <a-icon slot="suffix" type="lock" style="color: rgba(0,0,0,.25)" /> -->
                </a-input>
                <img class="veri_code_" :src="url" @click="changeImgCode" />
              </a-form-item>
              <a-form-item>
                <a-button
                  size="large"
                  type="primary"
                  html-type="submit"
                  class="login-form-button"
                >
                  立即登录
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="footer_">
      <div>
        <a-divider type="vertical" />我们的产品
        <a-divider type="vertical" />理赔服务
        <a-divider type="vertical" />关于我们
        <a-divider type="vertical" />
      </div>
      <div class="company_info_">
        上海南燕信息技术有限公司 © 2014-2018 Insgeek.com All Rights Reserved
        京ICP备 拷贝
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api';
import { setLogined, cacheUserInfo, promptMsgAndJump } from '@/utils/authorized';

export default {
  data () {
    return {
      url: "/api/backstage/user/getVerificationCode/authority"
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted () {
    this.url = "/api/backstage/user/getVerificationCode/authority?" + this.$route.params.num;
  },
  methods: {
    changeImgCode () {
      var num=Math.ceil(Math.random()*10);
      this.url = "/api/backstage/user/getVerificationCode/authority?" + num;
    },
    promptMsgAndJump,
    login (params) {
      api.userLogin(params).then(res => res.data).then(data => {
        cacheUserInfo(data.content);
        setLogined(1);
        const { query } = this.$route;
        this.promptMsgAndJump('登录成功，准备跳转...', query.redirect || '/dashboard');
      }).catch((err) => {
        if(err.data.returnCode  === '1004'){
            this.changeImgCode()
        }
      })
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.login(values)
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/sass/common.scss";
.login_bg_ {
  height: 100%;
  overflow: hidden;
  background: url("../assets/login/bg.jpg") no-repeat;
  background-size: 100% 100%;
  background-position: left top;
  .top_header_ {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: transparent;
    padding: 12px 0 0 43px;
    height: 60px;
    // margin-bottom: 60px;

    .logo_ {
      width: 121px;
      height: auto;
      display: inline-block;
    }
  }
  .btn_home_ {
    width: 117px;
    height: 36px;
  }
  .b_line_ {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  .navbar_ {
    padding-bottom: 12px;
  }
  .content_ {
    margin-top: 16%;
    .home_header_ .center_ {
      margin-top: 61px;
    }
    .login_container_ {
      margin-left: 86px;
      width: 322px;
      // height: 295px;
      padding-bottom: 24px;
      background: rgba(255, 255, 255, 0.3);
      .login-form {
        margin: 23px;
      }
      .login_title_ {
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        font-size: 15px;
        font-family: SourceHanSansCN-Light;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        border-bottom: 1px solid #fff;
        &.active_ {
          border-bottom: 1px solid #297fff;
          color: #297fff;
        }
      }
      .veri_code_ {
        width: 70px;
        height: 31px;
        background: rgba(239, 242, 255, 1);
        position: absolute;
        top: 50%;
        z-index: 2;
        transform: translateY(-50%);
        line-height: 0;
        right: 12px;
      }
    }
  }
}
.footer_ {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 13px;
  font-family: Microsoft YaHei UI;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  .company_info_ {
    font-size: 12px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    margin-top: 36px;
  }
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
  background: #297fff;
  border: 1px solid #297fff;
  margin: 0 auto;
}
</style>
