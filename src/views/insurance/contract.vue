<template>
  <div class="contract_">
    <a-card title="保单总览">
      <div class="mrg_b22">
        <!-- <label class="active_">全部</label><label>保障中</label><label>已过期</label> -->
        <a-radio-group v-model="bdState" buttonStyle="solid">
          <a-radio-button value="">全部</a-radio-button>
          <a-radio-button value="Y">保障中</a-radio-button>
          <a-radio-button value="N">已过期</a-radio-button>
        </a-radio-group>
      </div>
      <a-table @change="handleTableChange" :pagination="pagination" :columns="columns" :dataSource="data" bordered>
        <!-- <template v-for="col in ['name', 'age', 'address']" :slot="col" slot-scope="text, record, index">
            <div :key="col">
              <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>{{text}}</template>
            </div>
          </template> -->
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <a-radio
                @change="changePolicy(record)"
                :checked="currentId == record.id"
                value="1"
              ></a-radio>
              <!-- <a @click="() => edit(record.key)">Edit</a> -->
            </span>
          </div>
        </template>
      </a-table>
      <div style="margin-top: 32px;" class="mrg_b22 tabs_style_">
        <a-radio-group v-model="byValue" buttonStyle="solid">
          <a-radio-button value="a">保险方案</a-radio-button>
          <a-radio-button value="b">影像件</a-radio-button>
        </a-radio-group>
        <!-- <a-button class="w160" type="primary">保险方案</a-button>
            <a-button class="w160">影像件</a-button> -->
      </div>
      <a-table v-if="byValue == 'a'" :columns="columns1" :dataSource="data1">
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
        <template slot="insurceType" slot-scope="text">
          {{text == 1 ? '员工' : '子女及家属'}}
        </template>
      </a-table>
      <div v-else class="clearfix">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          :fileList="fileList"
          @preview="handlePreview"
          @change="handleChange"
          :showUploadList="{showPreviewIcon: true, showRemoveIcon: false}"
        >
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-card>
  </div>
</template>
<style lang="scss" scoped>
@import "@/sass/common.scss";
.contract_ {
  font-size: inherit;
}
.tabs_style_ {
  .ant-radio-button-wrapper {
    width: 160px;
    text-align: center;
  }
}
</style>
<script>
import api from "@/utils/api";

const columns = [
  {
    title: "",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
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
    title: "主被保险人数",
    dataIndex: "mainCount",
    key: "mainCount"
  },
  {
    title: "附属被保险人数",
    dataIndex: "noMainCount",
    key: "noMainCount"
  },
  {
    title: "保费金额",
    dataIndex: "premium",
    key: "premium"
  }
];
const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     id: i.toString(),
//     policyNo: "保障中",
//     productName: "复星联合星相印",
//     companyName: `复星联合`,
//     startDate: "2019-09-16",
//     endDate: "2020-09-16",
//     mainCount: 2,
//     noMainCount: 1,
//     premium: 500.0
//   });
// }
const columns1 = [
  {
    title: "方案名称",
    dataIndex: "planName",
    key: "planName",
    scopedSlots: {
      customRender: "name"
    }
  },
  {
    title: "保障金额",
    dataIndex: "coverage",
    key: "coverage"
  },
  {
    title: "免赔额",
    dataIndex: "deductibleExcess",
    key: "deductibleExcess"
  },
  {
    title: "赔付比率",
    dataIndex: "lossRation",
    key: "lossRation"
  },
  {
    title: "保障人员类型",
    dataIndex: "insurceType",
    key: "insurceType",
    scopedSlots: { customRender: 'insurceType' }
  }
];
const data1 = [];
// for (var i = 0; i < 4; i++) {
//   data1.push({
//     planName: "复星联合星相印重大疾病保险家庭保障方案（查看详情）",
//     planValue: 199 + i,
//     lossRation: 5 + Math.floor(15 * Math.random())
//   });
// }
export default {
  data() {
    return {
      bdState: "",
      byValue: "a",
      data,
      columns,
      data1,
      columns1,
      currentId: 0,
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ],
      pagination: {
        pageSize: 20,
        total: 1
      }
    };
  },
  watch: {
    'bdState': function (val) {
      console.log(val)
      this.fetchList(1)
    }
  },
  mounted() {
    this.fetchList(1)
  },
  methods: {
    handleTableChange (pagination) {
      this.fetchList(pagination.current)
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
          if(list.length > 0) {
            this.fetchDetail(list[0].id);
            this.currentId = list[0].id;
          }
        });
    },
    fetchDetail(policyId) {
      api
        .fileAndPlaList({
          policyId
        })
        .then(res => res.data).then(data => {
          const {fileList, planList} = data.content;
          this.fileList = fileList.map(val => {
            return {
              uid: val.id,
              id: val.id,
              name: val.name,
              url: val.url
            }
          })
          this.data1 = planList
        });
    },
    changePolicy(record) {
      console.log(record, "changePolicy -> ");
      this.currentId = record.id;
      this.fetchDetail(this.currentId);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    }
  }
};
</script>
