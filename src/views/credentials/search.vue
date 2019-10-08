<template>
  <div class="search_ bgf_">
    <a-row>
      <a-col :span="24">
        <div class="options_select_">
          登记时间：<label class="active_">本月</label><label>近三个月</label
          ><label>近六个月</label>
        </div>
      </a-col>
    </a-row>
    <div class="options_select_">
      保全类型：<label class="active_">状态1</label
      ><label class="active_">状态2</label><label class="active_">状态3</label>
    </div>
    <a-divider></a-divider>
    <a-row>
      <a-col :span="24">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
          <a-form-item label="">
            <a-range-picker
              v-decorator="['dateRange']"
              :placeholder="['开始时间', '结束时间']"
            >
            </a-range-picker>
          </a-form-item>
          <a-form-item label="投保人">
            <a-input v-decorator="['holder']"></a-input>
          </a-form-item>
          <a-form-item label="付款人">
            <a-input v-decorator="['holder']"></a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary"
              ><a-icon type="search"></a-icon>搜索</a-button
            >
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <a-table :columns="columns" :data="data"> </a-table>
  </div>
</template>
<style lang="scss" scoped>
@import "@/sass/common.scss";
.search_ {
  padding: 22px;
}
</style>
<script>
const columns = [
  {
    title: "编号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "提交日期",
    dataIndex: "submit_date",
    key: "submit_date"
  },
  {
    title: "付款日期",
    dataIndex: "pay_date",
    key: "pay_date"
  },
  {
    title: "收款人",
    dataIndex: "payee",
    key: "payee"
  },
  {
    title: "投保人",
    dataIndex: "holder",
    key: "holder"
  },
  {
    title: "凭证金额",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "凭证状态",
    dataIndex: "state",
    key: "state"
  },
  {
    title: "操作",
    dataIndex: "do",
    key: "do"
  }
];
for (var i = 0; i < 3; i++) {}
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      data,
      columns
    };
  }
};
</script>
