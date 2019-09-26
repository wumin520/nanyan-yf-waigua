<template>
<div class="login_bg_">
  <div class="top_header_ c">
    <div class="w1024 b_line_ navbar_ clearfix">
      <img class="logo_" src="../assets/logo.png"/>
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
              5000家企业，数十万名员工的信赖<br/>
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
                    rules: [
                      { required: true, message: '请输入企业账号' }
                    ]
                  }
                ]"
                placeholder="请输入企业账号"
                size="large"
              >
                <a-icon slot="suffix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  {
                    rules: [
                      { required: true, message: '请输入密码' }
                    ]
                  }
                ]"
                type="password"
                placeholder="请输入密码"
                size="large"
              >
                <a-icon slot="suffix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button size="large" type="primary" html-type="submit" class="login-form-button">
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
    <div class="company_info_">上海南燕信息技术有限公司 © 2014-2018 Insgeek.com All Rights Reserved 京ICP备  拷贝</div>
  </div>
</div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$router.push("/dashboard");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/sass/common.scss';
.login_bg_ {
  height: 100%;
  overflow: hidden;
  background: url('../assets/login/bg.jpg') no-repeat;
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
      width: 102px;
      height: auto;
      display: inline-block;
    }
  }
  .btn_home_ {
    width:117px;
    height:36px;
  }
  .b_line_ {
    border-bottom:1px solid rgba(255,255,255,0.2);
  }
  .navbar_ {
    padding-bottom: 18px;
  }
  .content_ {
    margin-top: 16%;
    .home_header_ .center_ {
      margin-top: 61px;
    }
    .login_container_ {
      margin-left: 86px;
      width:322px;
      height:295px;
      background:rgba(255,255,255,0.3);
      .login-form {
        margin: 23px;
      }
      .login_title_ {
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        font-size:15px;
        font-family:SourceHanSansCN-Light;
        font-weight:bold;
        color:rgba(255,255,255,1);
        border-bottom: 1px solid #fff;
        &.active_ {
          border-bottom: 1px solid #297FFF;
          color: #297FFF;
        }
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
  font-size:13px;
  font-family:Microsoft YaHei UI;
  font-weight:bold;
  color:rgba(255,255,255,1);
  .company_info_ {
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(255,255,255,1);
    margin-top: 36px;
  }
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
  background:#297FFF;
  border: 1px solid #297FFF;
  margin: 0 auto;
}
</style>
