<template>
  <div class="page_">
    <a-form :form="form" class="search-form">
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
            ]" placeholder="请选择"></a-select>
          </a-form-item>
        </a-col>

        <a-col :span="6">
          <a-form-item label="证件号码">
            <a-input v-decorator="[
              'idNo'
            ]" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>

        <a-col :span="6">
          <div style="text-align: center;">
            <a-button type="primary"><a-icon type="search"></a-icon>查询</a-button>
            <a-button style="margin-left: 8px;" type="primary" ghost><a-icon type="sync"></a-icon>重置</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>

    <a-table style="margin-top: 50px;" :rowKey="record => record.id" :columns="columns" :dataSource="data">
      <template slot="operation">
        <router-link to="/dashboard/baoquan/pd/edit/1001">
          <a-button type="primary"><a-icon type="edit"></a-icon>编辑</a-button>
        </router-link>
        <router-link to="/dashboard/baoquan/pd/sub/1001">
          <a-button style="margin-left: 8px;" type="primary" ghost><a-icon type="delete"></a-icon>删除</a-button>
        </router-link>
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

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex'
}, {
  title: '生日',
  dataIndex: 'birthday',
  key: 'birthday'
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
  key: 'idType'
}, {
  title: '证件号码',
  dataIndex: 'idNo',
  key: 'idNo'
}, {
  title: '被保人属性',
  dataIndex: 'insureType',
  key: 'insureType'
}, {
  title: '方案层级',
  dataIndex: 'level',
  key: 'level'
}, {
  title: '责任起期',
  dataIndex: 'start_date',
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
      }]
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      api.getBatchDetailById({
        id: this.$route.params.id
      }).then(res => res.data).then(data => {

      })
    }
  }
}
</script>
