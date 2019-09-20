<template>
    <div class="credentials_">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item v-bind="formItemLayout" label="保单号">
              <a-textarea v-decorator="[
                'bid',
                {
                    rules: [{
                        required: true,
                        message: '请输入保单号'
                    }]
                }
              ]" placeholder="多个保单号请用半角“,”隔开，或每行都填写一个保单号"></a-textarea>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="凭证金额">
            <a-input v-decorator="[
                'amount',
                {
                    rules: [{
                        required: true,
                        message: '请输入凭证金额'
                    }]
                }
            ]" placeholder="请输入凭证金额">
            </a-input>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="付款人姓名">
              <a-input v-decorator="[
                'username',
                {
                    rules: [{
                        required: true,
                        message: '请输入凭证金额'
                    }]
                }
              ]" placeholder="请输入凭证金额">

              </a-input>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="付款日期">
              <a-input placeholder="请输入付款日期" v-decorator="[
                'pay_date',
                {
                    rules: [{
                        required: true,
                        message: '请输入付款日期'
                    }]
                }
              ]">

              </a-input>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="联系人">
              <a-input v-decorator="[
                'username',
                {
                    rules: [{
                        required: true,
                        message: '请输入联系人'
                    }]
                }
              ]" placeholder="请输入联系人">

              </a-input>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="联系电话">
              <a-input v-decorator="[
                'username',
                {
                    rules: [{
                        required: true,
                        message: '请输入联系电话'
                    }]
                }
              ]" placeholder="请输入联系电话">

              </a-input>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="邮箱">
              <a-input v-decorator="[
                'username',
                {
                    rules: [{
                        required: true,
                        message: '请输入邮箱'
                    }]
                }
              ]" placeholder="请输入邮箱">

              </a-input>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="上传付款凭证">
            <a-upload
                v-decorator="['upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                }]"
                name="file"
                action="/upload.do"
            >
                <a-button>
                    <a-icon type="upload" /> 立即上传
                </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item>
              <div class="btn_wrap_">
                <a-button class="btn_save_" html-type="submit" type="primary">保存</a-button>
              </div>
          </a-form-item>
        </a-form>
    </div>
</template>
<style lang="scss" scoped>
    .credentials_ {
        background: #fff;
        padding: 23px 23px 38px;
    }
    .btn_wrap_ {
        display: flex;
        flex-direction: row-reverse;
    }
    .btn_save_ {
        width: 160px;
        height: 44px;
    }
</style>
<script>
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
export default {
    data () {
        return {
            formItemLayout
        }
    },
    beforeCreate () {
        this.form = this.$form.createForm(this)
    },
    methods: {
        handleSubmit  (e) {
          e.preventDefault();
          this.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
          });
        },
        normFile  (e) {
          console.log('Upload event:', e);
          if (Array.isArray(e)) {
            return e;
          }
          return e && e.fileList;
        },
    }
}
</script>