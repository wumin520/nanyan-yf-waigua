<template>
  <div class="page_">
    <a-radio-group style="margin-bottom: 32px;" v-model="isMuch" buttonStyle="solid">
      <a-radio-button value="0">{{this.plus}}被保人</a-radio-button>
      <a-radio-button v-if="this.plus == 2" value="1">批量{{this.plus}}被保人</a-radio-button>
    </a-radio-group>
    <a-form :form="form" @submit="handleFormSubmit" v-show="isMuch == 0" class="ant-advanced-search-form" :layout="formLayout">
      <a-row gutter="16">
        <a-col :span="8">
          <a-form-item label="姓名">
            <a-input v-decorator="[
              'name',
              {
                ...inputRequired
              }
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="性别">
            <a-select style="width: 100px;" v-decorator="[
              'sex',
              {
                ...selectRequired
              }
            ]">
              <a-select-option key="0" value="M">男</a-select-option>
              <a-select-option key="1" value="F">女</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="出生日期">
            <a-date-picker v-decorator="[
              'birthDate'
            ]" placeholder="请选择"></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="电话">
            <a-input v-decorator="[
              'phone'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="邮箱">
            <a-input v-decorator="[
              'email'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="证件类型">
            <a-select style="width: 100px;" v-decorator="[
              'idType'
            ]">
              <a-select-option v-for="item in idTypeOptions" :key="item.value" :value="item.value">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="证件号码">
            <a-input v-decorator="[
              'idNo'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="被保险人属性">
            <a-select style="width: 100px;" v-decorator="[
              'isMain'
            ]">
              <a-select-option value="1">主被保人</a-select-option>
              <a-select-option value="0">附属被保人</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="关联主被保人">
            <a-input v-decorator="[
              'mainName'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col v-if="isPlus != 0" :span="8">
          <a-form-item label="入职日期">
            <a-date-picker v-decorator="[
              'join_date'
            ]" placeholder="请选择"></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col v-else :span="8">
          <a-form-item label="离职日期">
            <a-date-picker v-decorator="[
              'join_date'
            ]" placeholder="请选择"></a-date-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col push="20" :span="4">
          <a-button html-type="submit" type="primary">保存</a-button>
        </a-col>
      </a-row>
    </a-form>
    <div v-show="isMuch == 1">
      <a-steps direction="vertical" :current="0">
        <a-step :title="`下载${plus}被保险人模版`">
          <div class="mrg_t60" slot="description"><a target="_blank" :href="fileUrl"><a-icon type="download"></a-icon>下载模版</a></div>
        </a-step>
        <a-step title="选择填写好的文件，点击上传文件">
          <template slot="description">
            <a-upload
              name="file"
              :multiple="true"
              :action="actionUrl"
              @change="handleChange"
            >
              <a-button class="mrg_t60"> <a-icon type="upload" /> 点击上传 </a-button>
            </a-upload>
          </template>
        </a-step>
        <a-step title="输入申请理由（长度限制25个字）">
          <template slot="description">
            <a-input class="mrg_t60" style="width: 350px;" placeholder="请输入"></a-input>
          </template>
        </a-step>
        <a-step title="点击提交申请，申请完成。" description="" />
      </a-steps>
      <a-row>
        <a-col :push="1" :span="6">
          <a-button @click="handleBatchSave" type="primary">保存</a-button>
          <a-button style="margin-left: 16px;" type="primary" ghost>重置</a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page_ {
  padding: 32px 32px 16px;
  background: #fff;
  .mrg_t60 {
    margin-top: 30px;
  }
  .ant-advanced-search-form .ant-form-item {
    display: flex;
  }
  .ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
  }
  .ant-steps-vertical .ant-steps-item {
    height: 120px;
  }
}
</style>
<script>
import api from '@/utils/api';
import dictOptions from '@/utils/dictOptions'
import { promptMsgAndJump } from '@/utils/authorized'

export default {
  data() {
    return {
      formLayout: 'horizontal',
      isMuch: '0',
      isPlus: 1,
      inputRequired: {
        rules: [{
          required: true,
          message: '请输入'
        }]
      },
      selectRequired: {
        rules: [{
          required: true,
          message: '请选择'
        }]
      },
      form: this.$form.createForm(this),
      idTypeOptions: dictOptions.idTypeOptions
    };
  },
  created () {
    if (this.$route.name.indexOf('sub') > -1) {
      this.isPlus = 0
      this._type = 3
    } else if (this.$route.name.indexOf('add') > -1) {
      this._type = 1
      this.isPlus = 1
    } else {
      this._type = 2
      this.isPlus = 2
    }
  },
  computed: {
    actionUrl () {
      return this.isPlus ? '/api/plug/getVolumeIncrease' : '/api/plug/getDeleteBatches';
    },
    fileUrl () {
      return this.isPlus ? '/api/file/volumeIncrease.xlsx' : '/api/file/deleteBatches.xlsx';
    },
    plus () {
      return this.isPlus == 1 ? '增加' : this.isPlus == 0 ? '减少' : '编辑';
    }
  },
  methods: {
    promptMsgAndJump,
    postData (options) {
      let params = {
        policyId: this.$route.params.id,
        insurceList: [],
        type: this._type
      }
      if (options instanceof Array) {
        params.insurceList = [...options]
      } else {
        params.insurceList.push({
          ...options
        })
      }
      api.doBatchupdate(params).then(res => res.data).then(data => {
        this.promptMsgAndJump('添加成功！正在跳转...', '/dashboard/baoquan')
        this._insurceList = []
      })
    },
    handleFormSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err,values) => {
        if (!err) {
          console.log('handleFormSubmit -> ', values)
          this.postData(values)
        }
      })
    },
    handleBatchSave () {
      this.postData(this._insurceList)
    },
    handleChange(info) {
      console.log('handleChange -> ', info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        const {content} = info.file.response;
        this._insurceList = content
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  }
};
</script>
