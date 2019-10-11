<template>
  <div class="account_info_">
    <a-card style="margin-top: 0;" title="账号信息">
      <a-form :form="form" @submit="hanleSubmit">
        <a-form-item v-bind="formItemLayout" label="公司名称">
          <div>{{formInfo.companyName}}</div>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="用户名">
          <a-input v-if="editable" v-decorator="[
            'userName',
            {
              initialValue: formInfo.userName,
              ...inputRequired
            }
          ]" placeholder="请输入用户名"></a-input>
          <div v-else>
            <a-row>
              <a-col :span="4">{{formInfo.userName}} </a-col>
              <!-- <a-col style="text-align: right;" :span="12">
                <a @click="changeToEdit('editable')" href="javascript:;">修改</a>
              </a-col> -->
            </a-row>
          </div>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="修改密码">
          <a-input v-if="pEditable" v-decorator="[
            'userPassword',
            {
              ...inputRequired
            }
          ]" placeholder="请输入密码"></a-input>
          <div v-else>
            <a-row>
              <!-- <a-col :span="4">
                {{formInfo.userPassword}} 
              </a-col> -->
              <a-col style="text-align: right;" :span="2">
                <a @click="changeToEdit('pEditable')" href="javascript:;">修改</a>
              </a-col>
            </a-row>
          </div>
        </a-form-item>
        <a-row v-if="editable || pEditable">
          <a-col offset="2" :span="4">
            <a-button html-type="submit" type="primary">保存</a-button>
            <a-button @click="closeEdit" style="margin-left: 16px;" type="primary" ghost>取消</a-button>
          </a-col>
        </a-row>
      </a-form>
      <!-- <ul class="clearfix">
        <li>
          公司名称：北京王富贵有限责任公司
        </li>
        <li>
          用户名：王富贵
        </li>
        <li>密码：wangfugui <a href="javascript:;">修改</a></li>
        <li>
          开票信息：北京王富贵有限责任公司 <a href="javascript:;">修改</a>
        </li>
      </ul> -->
    </a-card>
    <!-- <a-card title="管理员信息">
      <ul class="clearfix">
        <li>姓名：王富贵<a href="javascript:;">修改</a></li>
        <li>职务：村长<a href="javascript:;">修改</a></li>
        <li>联系电话：18319786655 <a href="javascript:;">修改</a></li>
        <li>
          地址：北京市朝阳区朝阳路朝阳大道666号朝阳大厦
          <a href="javascript:;">修改</a>
        </li>
        <li>邮箱：www.wangfugui@m78.com <a href="javascript:;">修改</a></li>
      </ul>
    </a-card> -->
  </div>
</template>
<style lang="scss" scoped>
@import "@/sass/common.scss";
.account_info_ {
  ul {
    width: 500px;
    a {
      float: right;
    }
  }
}
</style>
<script>
import api from '@/utils/api';
import { getUserInfo, promptMsgAndJump } from '@/utils/authorized'

export default {
  data() {
    return {
      pEditable: false,
      editable: false,
      inputRequired: {
        rules: [{
          required: true,
          message: '请输入'
        }]
      },
      formInfo: {},
      formItemLayout: {
        labelCol: { span: 2},
        wrapperCol: { span: 12}
      },
      form: this.$form.createForm(this)
    };
  },
  mounted () {
    let userInfo = getUserInfo();
    this.formInfo = userInfo
    console.log(userInfo, '1')
  },
  methods: {
    promptMsgAndJump,
    updateUser (options) {
      api.updateUser({
        ...options,
        id: this.formInfo.id
      }).then(res => res.data).then(data => {
        this.promptMsgAndJump('密码已修改，请重新登录！正在跳转...', '/login')
        this.closeEdit()
      })
    },
    hanleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('hanleSubmit -> ', values)
          // this.formInfo.userName = values.userName || this.formInfo.userName
          // this.formInfo.userPassword = values.userPassword || this.formInfo.userPassword

          this.updateUser(values)

        }
      })
    },
    changeToEdit (key) {
      this[key] = true
    },
    closeEdit () {
      this.editable = false;
      this.pEditable = false;
    }
  }
};
</script>
