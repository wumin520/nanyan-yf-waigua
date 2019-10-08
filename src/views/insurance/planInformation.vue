<template>
  <div class="plan_">
    <a-card title="方案信息">
      <a-table :pagination="pagination" :columns="columns1" :dataSource="data1">
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
      </a-table>
      <div class="mrg_b22 mrg_t28">
        <a-button class="w160" type="primary">保险方案</a-button>
        <a-button class="w160">影像件</a-button>
      </div>
      <div class="desc_">
        险种名称：复星联合星相印重大疾病保险家庭保障方案<span class="mrg_l73"
          >责任数量：6</span
        >
      </div>
      <a-table :pagination="pagination" :columns="columns" :dataSource="data">
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
      </a-table>
    </a-card>
  </div>
</template>
<style lang="scss" scoped>
@import "@/sass/common.scss";
.mrg_l73 {
  margin-left: 73px;
}
.mrg_t28 {
  margin-top: 28px;
}
.desc_ {
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 26px;
  margin-bottom: 15px;
}
</style>
<script>
const columns1 = [
  {
    title: "方案名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "在保人数",
    dataIndex: "num",
    key: "num"
  },
  {
    title: "",
    dataIndex: "back_num",
    key: "back_num"
  }
];
const data1 = [];
for (var i = 0; i < 1; i++) {
  data1.push({
    name: "复星联合星相印重大疾病保险家庭保障方案",
    num: 199 + i,
    back_num: 5 + Math.floor(15 * Math.random())
  });
}
const columns = [
  {
    title: "保险责任",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "责任说明",
    dataIndex: "instruction",
    key: "instruction"
  },
  {
    title: "等待期（天）",
    dataIndex: "wait_day",
    key: "wait_day"
  },
  {
    title: "保额（元）",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "免赔额",
    dataIndex: "franchise",
    key: "franchise"
  },
  {
    title: "报销比例",
    dataIndex: "submit_rate",
    key: "submit_rate"
  }
];
const data = [];
for (var i = 0; i < 5; i++) {
  data.push({
    name: "保障中",
    instruction: "复星联合星相印",
    wait_day: 30,
    amount: 1000,
    franchise: 100,
    submit_rate: 2
  });
}
export default {
  data() {
    return {
      data1,
      columns1,
      data,
      columns,
      pagination: false
    };
  }
};
</script>
