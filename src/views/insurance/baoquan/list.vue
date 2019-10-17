<template>
  <div>
    <a-card style="margin-top: 0;">
      <div class="options_select_">
        合同状态： <label @click="handleSelectChange(item, 'bdState')" v-for="item in policyStatusLabels" :class="bdState == item.value ? 'active_' : ''">{{item.name}}</label>
      </div>
      <a-divider />
      <a-table :pagination="paginationB" :columns="columns" :dataSource="data">
        <template slot="select" slot-scope="text, record">
          <a-radio @change="handleChange(record)" :checked="policyId == record.id"></a-radio>
        </template>
        <template slot="do" slot-scope="text, record">
          <router-link :to="`/dashboard/baoquan/list/${record.id}`">
            <a-button type="primary" ghost><a-icon type="plus" />操作被保人</a-button>
          </router-link>
        </template>
      </a-table>
    </a-card>
    <a-card style="margin-top: 32px;" title="保全记录">
      <div class="options_select_ clearfix">
        登记时间：<label @click="handleSelectChange(item, 'selectTime')" v-for="item in timesLabels" :class="selectTime == item.value ? 'active_' : ''">{{item.name}}</label>
        <a-range-picker v-model="selectRangeTime" :placeholder="['开始时间', '结束时间']" class="mrg_l29" @change="onChange" />
        <div class="btn_wrap_">
          <a-button @click="handleSelectChange" type="primary"
            ><a-icon type="search"></a-icon>搜索</a-button
          >
          <a-button @click="resetForm" class="mrg_l10" type="primary" ghost
            ><a-icon type="reset"></a-icon>重置</a-button
          >
          <a-button disabled class="mrg_l10" type="primary" ghost
            ><a-icon type="download"></a-icon>下载</a-button
          >
        </div>
      </div>
      <a-divider />
      <div class="options_select_">
        保全类型：<label @click="handleSelectChange(item, 'selectType')" v-for="item in typeLabels" :class="selectType == item.value ? 'active_' : ''">{{item.name}}</label>
      </div>
      <a-divider />
      <div class="options_select_">
        办理状态：<label @click="handleSelectChange(item, 'selectStatus')" v-for="item in statusLabels" :class="selectStatus === item.value ? 'active_' : ''">{{item.name}}</label>
      </div>
      <a-divider />
      <a-table :columns="columns1" :dataSource="data1">
        <template slot="type" slot-scope="text">
          {{text | filterType}}
        </template>
        <template slot="status" slot-scope="text">
          {{text | filterStatus}}
        </template>
        <template slot="operation" slot-scope="text, record">
          <router-link v-if="record.status == 1" :to="`/dashboard/baoquan/pd/list/${record.id}`">
            <a-button type="primary" ghost
              ><a-icon type="edit" />编辑</a-button>
          </router-link>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<style lang="scss" scoped>
@import "@/sass/common.scss";
.btn_wrap_ {
  float: right;
}
</style>
<script>
import api from '@/utils/api';
import moment from 'moment';

const columns = [
  {
    title: '',
    key: 'select',
    scopedSlots: { customRender: 'select' }
  },
  {
    title: "合同编号",
    dataIndex: "policyNo",
    key: "policyNo"
  },
  {
    title: "合同名称",
    dataIndex: "productName",
    key: "productName"
  },
  {
    title: "保险公司",
    dataIndex: "companyName",
    key: "companyName"
  },
  {
    title: "保障生效日",
    dataIndex: "startDate",
    key: "startDate"
  },
  {
    title: "保障终止日",
    dataIndex: "endDate",
    key: "endDate"
  },
  {
    title: "操作",
    dataIndex: "do",
    key: "tab",
    scopedSlots: { customRender: "do" }
  }
];

const data = [];
const data1 = [];
const columns1 = [
  {
    title: "保全登记号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "保全类型",
    dataIndex: "type",
    key: "type",
    scopedSlots: { customRender: 'type' }
  },
  {
    title: "保全申请日期",
    dataIndex: "appDate",
    key: "appDate"
  },
  {
    title: "办理状态",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '保费',
    dataIndex: 'changePremium',
    key: 'changePremium'
  },
  {
    title: '保全批单',
    dataIndex: 'electronicBatch',
    key: 'electronicBatch'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
];
// for (var i = 0; i < 3; i++) {
//   data.push({
//     hid: 1001 + i,
//     hname: "复星联合星相印",
//     company: "复星联合",
//     valid_date: "2019-09-16",
//     invalid_date: "2020-09-16"
//   });
//   data1.push({
//     bqid: "YT0000" + i,
//     type: "增加",
//     submit_date: "2019-06-14",
//     valid_date: "2019-06-14",
//     state: "办理中",
//     amout: 2000,
//     bq_state: "批单"
//   });
// }
export default {
  data() {
    return {
      columns,
      data,
      columns1,
      data1,
      pagination: {
        pageSize: 20,
        total: 1
      },
      paginationB: {
        pageSize: 20,
        total: 1
      },
      policyStatusLabels: [{
        name: '全部',
        value: ''
      }, {
        name: '保障中',
        value: 'Y'
      }, {
        name: '已过期',
        value: 'N'
      }, ],
      bdState: '',
      typeLabels: [{
        name: '增加',
        value: '1'
      }, {
        name: '修改',
        value: '2'
      }, {
        name: '减人',
        value: '3'
      },],
      timesLabels: [{
        name: '本月',
        value: [moment().startOf('months'), moment()]
      }, {
        name: '近三个月',
        value: [moment().subtract(3, 'months'), moment()]
      }, {
        name: '近六个月',
        value: [moment().subtract(6, 'months'), moment()]
      }, ],
      statusLabels: [{
        name: '失效',
        value: 0
      }, {
        name: '待处理',
        value: 1
      }, {
        name: '审批中',
        value: 2
      }, {
        name: '已完成',
        value: 3
      }, ],
      selectTime: '',
      selectType: '',
      selectStatus: null,
      policyId: '',
      selectRangeTime: []
    };
  },
  filters: {
    filterType (val) {
      return val == 1 ? '加人' : val == 2 ? '修改' : '减人'
    },
    filterStatus (val) {
      return val == 0 ? '失效' : val == 1 ? '待处理' :  val == 2 ? '审批中' : '已完成'
    }
  },
  mounted () {
    this.fetchList(1)
  },
  methods: {
    onChange (val) {
      this.selectRangeTime = val;
      this.selectTime = null
    },
    resetForm () {
      this.selectTime = []
      this.selectType = ''
      this.selectStatus = ''
      this.selectRangeTime = []
      this.handleSelectChange()
    },
    handleChange (record) {
      this.policyId = record.id
    },
    handleSelectChange (item = {}, key) {
      if (item.value || item.value == 0) {
        this[key] = item.value;
      }
      if (key == 'bdState') {
        this.fetchList(1)
        return
      }
      const ifValue = function (obj, key, val) {
        if (val && key) {
          obj[key] = val
        }
        if (val === 0) {
          obj[key] = val
        }
      }
      let params = {};
      ifValue(params, 'type', this.selectType)
      ifValue(params, 'status', this.selectStatus)
      this.selectTime = this.selectTime || this.selectRangeTime
      if (this.selectTime && this.selectTime.length > 0) {
        params = {
          ...params,
          createDateStart: this.selectTime[0].format('YYYY-MM-DD'),
          createDateEnd: this.selectTime[1].format('YYYY-MM-DD'),
        }
      }
      console.log('params -> ', item, key, this.selectTime);
      this.getBatchListByPolicyId(1, params);
    },
    handleTableChange (pagination) {
      this.fetchList(pagination.current)
    },
    getBatchListByPolicyId (pageNum = 1, options) {
      api.getBatchListByPolicyId({
        pageNum,
        pageSize: this.paginationB.pageSize,
        policyId: this.policyId,
        ...options
      }).then(res => res.data).then(data => {
          const {total, list} = data.content
          this.data1 = list
          this.paginationB.total = total
      })
    },
    fetchList (pageNum = 1) {
      api
        .policyList({
          pageNum,
          pageSize: this.pagination.pageSize,
          underwrideStatus: this.bdState
        })
        .then(res => res.data)
        .then(data => {
          const {total, list} = data.content
          this.data = list
          this.pagination.total = total
          if (list.length > 0) {
            this.policyId = list[0].id
            this.getBatchListByPolicyId(1)
          } else {
            // 清空子选择
            this.data1 = []
            this.resetForm()
          }
        });
    },
  }
};
</script>
