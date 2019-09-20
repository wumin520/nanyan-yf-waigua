<template>
<div class="contract_">
    <a-card title="保单总览">
        <div class="options_select_ mrg_b22"><label class="active_">全部</label><label>保障中</label><label>已过期</label></div>
        <a-table :columns="columns" :dataSource="data" bordered>
          <template v-for="col in ['name', 'age', 'address']" :slot="col" slot-scope="text, record, index">
            <div :key="col">
              <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>{{text}}</template>
            </div>
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <div class='editable-row-operations'>
              <span>
                <!-- <a-radio></a-radio> -->
                <a @click="() => edit(record.key)">Edit</a>
              </span>
            </div>
          </template>
        </a-table>
        <div class="mrg_b22">
            <a-button class="w160" type="primary">保险方案</a-button>
            <a-button class="w160">影像件</a-button>
        </div>
        <a-table :columns="columns1" :dataSource="data1">
          <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
          <!-- <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
          </span> -->
          <!-- <span slot="action" slot-scope="text, record">
            <a href="javascript:;">Invite 一 {{record.name}}</a>
            <a-divider type="vertical" />
            <a href="javascript:;">Delete</a>
            <a-divider type="vertical" />
            <a href="javascript:;" class="ant-dropdown-link">
              More actions <a-icon type="down" />
            </a>
          </span> -->
        </a-table>
    </a-card>
</div>
</template>
<style lang="scss" scoped>
    @import "@/sass/common.scss";
    .contract_ {
        font-size: inherit;
    }
</style>
<script>
const columns = [{
  title: '',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}, {
  title: '合同编号',
  dataIndex: 'hid',
  scopedSlots: { customRender: 'hid' },
}, {
  title: '合同名称',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '保险公司',
  dataIndex: 'company',
  scopedSlots: { customRender: 'company' },
}, {
  title: '保障生效日',
  dataIndex: 'valid_date',
  scopedSlots: { customRender: 'valid_date' },
}, {
  title: '保障终止日',
  dataIndex: 'valid_expire_date',
  scopedSlots: { customRender: 'valid_expire_date' },
}, {
  title: '主被保险人数',
  dataIndex: 'main',
  scopedSlots: { customRender: 'main' },
}, {
  title: '附属被保险人数',
  dataIndex: 'sub',
  scopedSlots: { customRender: 'sub' },
}, {
  title: '保费金额',
  dataIndex: 'cost',
  scopedSlots: { customRender: 'cost' },
}]
const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    hid: '保障中',
    name: '复星联合星相印',
    company: `复星联合`,
    valid_date: '2019-09-16',
    valid_expire_date: '2020-09-16',
    main: 2,
    sub: 1,
    cost: 500.00,
  })
}
const columns1 = [{
  title: '方案名称',
  dataIndex: 'name',
  key: 'name',
  scopedSlots: {
    customRender: 'name'
  }
}, {
  title: '在保人数',
  dataIndex: 'num',
  key: 'num',
}, {
  title: '',
  dataIndex: 'back_num',
  key: 'back_num',
}];
const data1 = []
for (var i = 0; i < 4; i++) {
    data1.push({
        name: '复星联合星相印重大疾病保险家庭保障方案（查看详情）',
        num: 199 + i,
        back_num: 5 + Math.floor(15 * Math.random())
    })
}
export default {
    data () {
        return {
            data,
            columns,
            data1,
            columns1
        }
    }
}
</script>