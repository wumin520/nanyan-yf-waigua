<template>
  <div class="page_">
    <a-radio-group v-if="this.isPlus != 2" style="margin-bottom: 32px;" v-model="isMuch" buttonStyle="solid">
      <a-radio-button value="0">{{this.plus}}被保人</a-radio-button>
      <a-radio-button value="1">批量{{this.plus}}被保人</a-radio-button>
    </a-radio-group>
    <a-form :form="form" @submit="handleFormSubmit" v-show="isMuch == 0" class="ant-advanced-search-form" :layout="formLayout">
      <a-row gutter="16">
        <a-col :span="8">
          <a-form-item label="姓名">
            <a-input v-decorator="[
              'name',
              {
                initialValue: formInfo.name,
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
                initialValue: formInfo.sex,
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
              'birthDate',
              {
                initialValue: formInfo.birthDate,
                ...selectRequired
              }
            ]" placeholder="请选择"></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="电话">
            <a-input v-decorator="[
              'phone',
              {
                initialValue: formInfo.phone,
                ...inputRequired
              }
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="邮箱">
            <a-input v-decorator="[
              'email',
              {
                initialValue: formInfo.email,
              }
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="证件类型">
            <a-select style="width: 100px;" v-decorator="[
              'idType',
              {
                initialValue: formInfo.idType,
                ...selectRequired
              }
            ]">
              <a-select-option v-for="item in idTypeOptions" :key="item.value" :value="item.value">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="证件号码">
            <a-input v-decorator="[
              'idNo',
              {
                initialValue: formInfo.idNo,
                ...inputRequired
              }
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="被保险人属性">
            <a-select @change="e => (isMain = e)" style="width: 100px;" v-decorator="[
              'isMain',
              {
                initialValue: formInfo.isMain,
                ...selectRequired
              }
            ]">
              <a-select-option value="Y">主被保人</a-select-option>
              <a-select-option value="N">附属被保人</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-if="isMain=='N'" :span="8">
          <a-form-item label="关联主被保人">
            <a-input v-decorator="[
              'mainName',
              {
                initialValue: formInfo.mainName,
                ...inputRequired
              }
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col v-if="isPlus != 0" :span="8">
          <a-form-item label="入职日期">
            <a-date-picker v-decorator="[
              'startDate',
              {
                initialValue: formInfo.startDate,
                ...selectRequired
              }
            ]" placeholder="请选择"></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col v-else :span="8">
          <a-form-item label="离职日期">
            <a-date-picker v-decorator="[
              'endDate',
              {
                initialValue: formInfo.endDate,
                ...selectRequired
              }
            ]" placeholder="请选择"></a-date-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <div style="margin-bottom: 16px;">
            <div class="title_">上传影像件：</div>
            <div class="clearfix">
              <a-upload
                action="/api/common/upload"
                listType="picture-card"
                :fileList="fileList1"
                @preview="handlePreview"
                @change="handleFileChange"
                :remove="handleFileRemove"
              >
                <div v-if="fileList1.length < 3">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col push="20" :xs="24" :span="4">
          <a-button html-type="submit" type="primary">保存</a-button>
          <a-button @click="back" style="margin-left: 8px;" type="primary" ghost>取消</a-button>
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
        <!-- <a-step title="输入申请理由（长度限制25个字）">
          <template slot="description">
            <a-input class="mrg_t60" style="width: 350px;" placeholder="请输入"></a-input>
          </template>
        </a-step> -->
        <a-step title="点击提交申请，申请完成。" description="" />
      </a-steps>
      <div style="margin-bottom: 16px;">
        <div class="title_">上传影像件：</div>
        <div class="clearfix">
          <a-upload
            action="/api/common/upload"
            listType="picture-card"
            :fileList="fileList1"
            @preview="handlePreview"
            @change="handleFileChange"
            :remove="handleFileRemove"
          >
            <div v-if="fileList1.length < 3">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </div>
      </div>
      <a-row>
        <a-col :push="20" :xs="24" :span="4">
          <a-button @click="handleBatchSave" type="primary">保存</a-button>
          <a-button @click="back" style="margin-left: 16px;" type="primary" ghost>取消</a-button>
        </a-col>
      </a-row>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<style lang="scss" scoped>
.page_ {
  padding: 32px 32px 16px;
  background: #fff;
  .title_ {
    line-height: 60px;
    // border-bottom:1px solid rgba(28,40,61,0.1);
    border-top:1px solid rgba(28,40,61,0.1);
    // margin-bottom: 24px;
  }
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
import moment from 'moment';

export default {
  data() {
    return {
      isMain: '',
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
      idTypeOptions: dictOptions.idTypeOptions,
      formInfo: {},
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fileList1: []
    };
  },
  created () {
    const { name, params } = this.$route
    if (this.$route.name.indexOf('sub') > -1) {
      this.isPlus = 0
      this._type = 3
    } else if (this.$route.name.indexOf('add') > -1) {
      this._type = 1
      this.isPlus = 1
    } else {
      this._type = 2
      this.isPlus = 2
      window.onbeforeunload = function(event) { return confirm("确定退出吗"); }
    }
    console.log(this.$route, 'test -> ')
    let record = params.record
    if (record) {
      for (let key in record) {
        const val = record[key]
        if (typeof val == 'string' && val.split('-').length > 2) {
          record[key] = moment(val)
        }
      }
      if (record.fileList) {
        this.fileList1 = record.fileList.map((item, index) => {
          return {
            id: item.id,
            uid: index,
            name: item.name,
            url: item.url
          };
        });
      }
      this.formInfo = record
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
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleFileRemove (file) {
      console.log(file, 'handleFileRemove -> ')
      if (file.id) {
        this.removedFiles = this.removedFiles || []
        this.removedFiles.push({
          ...file,
          status: '0'
        })
      }
    },
    handleFileChange({ fileList }) {
      this.fileList1 = fileList;
      console.log(this.fileList1, 'handleFileChange -> ')
    },
    back () {
      this.$router.back()
    },
    postData (options) {
      let params = {
        insurceList: [],
        type: this._type
      }
      const id = this.$route.params.id
      let update_type = 0
      if (this.$route.name.indexOf('pd') > -1) {
        params.id = id
        update_type = 1 // 代表对批单id进行操作
      } else {
        params.policyId = id
      }
      if (options instanceof Array) {
        params.insurceList = [...options]
      } else {
        let obj = {
          ...options
        }
        for (var key in obj) {
          if (obj[key] instanceof moment) {
            obj[key] = obj[key].format('YYYY-MM-DD')
          }
        }
        params.insurceList.push(obj)
      }
      if (this.isPlus == 2) {
        // 修改，单个修改
        params.insurceList[0] = {
          ...params.insurceList[0],
          oldName: this.formInfo.name,
          oldIdNo: this.formInfo.idNo,
        }
      }
      if (this.fileList1.length > 0) {
        params.fileList = this.fileList1.map(val => {
          return {
            name: val.name,
            type: val.type,
            url: val.response.url
          }
        })
      }
      // 删除的文件
      if (this.removedFiles && this.removedFiles.length > 0) {
        params.fileList.push(...this.removedFiles)
      }
      if (update_type) {
        // 批单操作
        api.updateBatchupdate(params).then(res => res.data).then(data => {
          let url = `/dashboard/list`
          this.promptMsgAndJump('添加成功！正在跳转...', url)
          this._insurceList = []
        })
        return
      }
      // 生成保单
      api.doBatchupdate(params).then(res => res.data).then(data => {
        let url = `/dashboard/list`
        this.promptMsgAndJump('添加成功！正在跳转...', url)
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
  },
  beforeDestroy() {
    window.onbeforeunload = null
  }
};
</script>
