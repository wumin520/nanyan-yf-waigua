<template>
  <div class="custom_plain_">
    <div class="nav_wrap_">
      <div class="nav_ w1024 clearfix">
        <div class="logo_">
          <img src="../assets/home/logo1.png" />
        </div>
        <div class="right_">
          <ul>
            <li class=""><router-link to="/">首页</router-link></li>
            <li><router-link to="/#section1_">我们的产品</router-link></li>
            <li><router-link to="/#section2_">理赔服务</router-link></li>
            <li><router-link to="/#section3_">关于我们</router-link></li>
            <li>
              <router-link to="/login">
                <a-button type="primary" ghost>用户登录</a-button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content_ w1024">
      <div class="title_">定制方案：</div>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="企业名称" has-feedback>
          <a-input
            v-decorator="[
              'companyName',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入企业名称'
                  }
                ]
              }
            ]"
            placeholder="请输入企业名称"
          ></a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="联系人" has-feedback>
          <a-input
            v-decorator="[
              'likeMan',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入联系人姓名'
                  }
                ]
              }
            ]"
            placeholder="请输入联系人姓名"
          ></a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="性别">
          <a-radio-group
            v-decorator="[
              'sex',
              {
                initialValue: '1'
              }
            ]"
          >
            <a-radio value="M">
              先生
            </a-radio>
            <a-radio value="F">
              女士
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="联系电话" has-feedback>
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入联系人电话'
                  }
                ]
              }
            ]"
            placeholder="请输入联系人电话"
          ></a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="所属行业" has-feedback>
          <a-input
            v-decorator="[
              'business',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入所属行业'
                  }
                ]
              }
            ]"
            placeholder="企业所属行业   如：保险公司"
          ></a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="公司规模">
          <a-input
            v-decorator="[
              'companyScale',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入规模'
                  }
                ]
              }
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="公司邮箱">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入公司邮箱'
                  }
                ]
              }
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="合作/投保需求">
          <a-textarea class="desc_" v-decorator="['cooperation']"> </a-textarea>
        </a-form-item>
        <a-form-item>
          <div class="btn_wrap_">
            <a-button html-type="submit" class="mrg_l29 w120" type="primary">确定</a-button>
            <a-button @click="handleReset" class="w120" type="primary" ghost
              >重置</a-button
            >
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/sass/common.scss";
.w120 {
  width: 120px;
}
.nav_wrap_ {
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
}
.nav_ {
  height: 74px;
  background: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  .logo_ {
    width: 121px;
    height: 33px;
    display: inline-block;
    margin-top: 22px;
  }
  .right_ {
    float: right;
    padding-top: 16px;
    li {
      display: inline-block;
      text-align: center;
      margin-left: 56px;
      font-size: 13px;
      font-family: Microsoft YaHei UI;
      font-weight: bold;
      color: #333333;
      cursor: pointer;
      &.active {
        &::after {
          display: block;
          content: "";
          margin: 0 auto;
          width: 36px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(0, 240, 255, 1) 0%,
            rgba(0, 132, 255, 1) 100%
          );
          border-radius: 1px;
          margin-top: 28px;
        }
      }
    }
  }
}
.title_ {
  font-size: 18px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  margin-top: 53px;
}
.btn_wrap_ {
  display: flex;
  flex-direction: row-reverse;
}
</style>
<script>
import api from '@/utils/api';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
export default {
  data() {
    return {
      formItemLayout
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.postData(values)
        }
      });
    },
    postData (params) {
      params.type = 1
      api.appointment(params).then(res => res.data).then(data => {
        this.$message.info('添加成功')
        this.handleReset()
      })
    },
    handleReset() {
      this.form.resetFields();
    }
  }
};
</script>
