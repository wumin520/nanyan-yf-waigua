<template>
  <div class="page_">
    <a-form :form="form" @submit="handleFormSubmit" class="search-form">
      <a-row gutter="16">
        <a-col :span="5">
          <a-form-item label="姓名">
            <a-input v-decorator="[
              'name'
            ]" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>

        <a-col :span="5">
          <a-form-item label="证件类型">
            <a-select v-decorator="[
              'idType'
            ]" placeholder="请选择">
              <a-select-option v-for="item in idTypeOptions" :key="item.value" :value="item.value">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="6">
          <a-form-item label="证件号码">
            <a-input v-decorator="[
              'idNo'
            ]" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <div style="text-align: center;">
            <a-button html-type="submit" type="primary"><a-icon type="search"></a-icon>搜索</a-button>
            <a-button @click="forwardTo('add')" style="margin-left: 8px;" type="primary"><a-icon type="plus"></a-icon>加人</a-button>
            <a-button @click="() => {form.resetFields()}" style="margin-left: 8px;" type="primary" ghost><a-icon type="sync"></a-icon>重置</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>

    <a-table :pagination="pagination" style="margin-top: 50px;" :rowKey="record => record.id" :columns="columns" :dataSource="data">
      <template slot="sex" slot-scope="text">
        {{text | filterSex}}
      </template>
      <template slot="isMain" slot-scope="text">
        {{text | filterIsMain}}
      </template>
      <template slot="idType" slot-scope="text">
        {{text | filterIdType(idTypeOptions)}}
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-row gutter="8">
          <a-col :xxl="12" :xl="24">
            <a-button style="margin-bottom: 8px;" @click="forwardTo('edit', record)" type="primary"><a-icon type="edit"></a-icon>编辑</a-button>
          </a-col>
          <a-col :xxl="12" :xl="24">
            <a-button @click="forwardTo('sub', record)" type="primary" ghost><a-icon type="delete"></a-icon>减人</a-button>
          </a-col>
        </a-row>
      </template>
    </a-table>
  </div>
</template>
<style lang="scss" scoped>
  .page_ {
    padding: 32px 32px;
    background: #fff;
  }
</style>
<script>
import api from '@/utils/api';
import dictOptions from '@/utils/dictOptions'

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
  scopedSlots: { customRender: 'sex' }
}, {
  title: '生日',
  dataIndex: 'birthDate',
  key: 'birthDate'
}, {
  title: '电话',
  dataIndex: 'phone',
  key: 'phone'
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email'
}, {
  title: '证件类型',
  dataIndex: 'idType',
  key: 'idType',
  scopedSlots: { customRender: 'idType' }
}, {
  title: '证件号码',
  dataIndex: 'idNo',
  key: 'idNo'
}, {
  title: '被保人属性',
  dataIndex: 'isMain',
  key: 'isMain',
  scopedSlots: { customRender: 'isMain' }
}, {
  title: '责任起期',
  dataIndex: 'startDate',
  key: 'start_date'
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  scopedSlots: {customRender: 'operation'}
}]
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      columns,
      data: [{
        id: 1
      }],
      pagination: {
        pageSize: 20,
        total: 1
      },
      idTypeOptions: dictOptions.idTypeOptions
    }
  },
  filters: {
    filterSex (val) {
      return val == 'F' ? '女' : '男'
    },
    filterIsMain (val) {
      return val == 'Y' ? '主被保人' : '附属被保人'
    },
    filterIdType: (val, idTypeOptions) => {
      if (!val) {
        return ''
      }
      return idTypeOptions[val].name;
    },
  },
  mounted () {
    const { name, params} = this.$route
    this._id = params.id
    if (name.indexOf('pd') > -1) {
      this.update_type = 1
      this.fetchData()
    } else {
      this.getInsurceListBypolicyId()
    }
  },
  methods: {
    handleFormSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.update_type) {
            this.fetchData()
          } else {
            this.getInsurceListBypolicyId(1, values)
          }
        }
      })
    },
    getInsurceListBypolicyId (pageNum = 1, options) {
      let params = {
        pageNum,
        pageSize: this.pagination.pageSize,
        policyId: this._id
      }
      for (let key in options) {
        let val = options[key]
        if (val) {
          params[key] = val
        }
      }
      api.getInsurceListBypolicyId(params).then(res => res.data).then(data => {
        const {list, total} = data.content
        this.data = list
        this.pagination.total = total
      })
    },
    fetchData () {
      api.getBatchDetailById({
        id: this.$route.params.id,
        pageSize: this.pagination.pageSize
      }).then(res => res.data).then(data => {
        const {insurceList, total, fileList} = data.content
        this.data = insurceList
        this.total = total
        this._fileList = fileList
      })
    },
    forwardTo (key, record) {
      let name = `baoquan-${key}`
      if (this.update_type) {
        name = `baoquan-pd-${key}`
      }
      this.$router.push({
        name,
        params: {record: {
          ...record,
          fileList: this._fileList
        }, id: this._id}
      })
    },
  }
}
</script>
