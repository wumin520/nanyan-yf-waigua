<template>
  <div class="staff_">
    <a-card title="福利人员">
      <!-- <div class="msg_">
        贵公司参保人员450人，绑定激活398人，参保家属239人。
      </div> -->
      <a-form
        class="ant-advanced-search-form"
        :form="form"
        @submit="handleSearch"
      >
        <a-row>
          <a-col :md="8" :span="5">
            <a-form-item label="姓名">
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: []
                  }
                ]"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :span="5">
            <a-form-item label="手机号码">
              <a-input
                v-decorator="[
                  'phone',
                  {
                    rules: []
                  }
                ]"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :span="5">
            <a-form-item label="证件号码">
              <a-input
                v-decorator="[
                  'idNo',
                  {
                    rules: []
                  }
                ]"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :span="5">
            <a-form-item label="工号">
              <a-input
                v-decorator="[
                  'empNo',
                  {
                    rules: []
                  }
                ]"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :span="4">
            <a-button html-type="submit" type="primary"
              ><a-icon type="search" />搜索</a-button
            >
            <!-- <a-button class="marg_l20" type="primary" html-type="submit" ghost><a-icon type="download" />下载</a-button> -->
          </a-col>
        </a-row>
      </a-form>
      <a-divider />
      <div>
        人员类型：
        <a-radio-group @change="handleRYChange" defaultValue="">
          <a-radio-button value="">全部</a-radio-button>
          <a-radio-button value="Y">员工</a-radio-button>
          <a-radio-button value="N">家属</a-radio-button>
        </a-radio-group>
      </div>
      <div style="margin-top: 24px;">
        保障类型：
        <a-radio-group @change="handleBZZChange" defaultValue="">
          <a-radio-button value="">全部</a-radio-button>
          <a-radio-button value="Y">保障中</a-radio-button>
          <a-radio-button value="N">保障失效</a-radio-button>
        </a-radio-group>
      </div>
      <!-- <div class="options_select_">
        人员类型：<label class="active_">全部</label><label>员工</label
        ><label>家属</label>
      </div>
      <div class="options_select_">
        保障类型：<label class="active_">全部</label><label>保障中</label
        ><label>保障失效</label>
      </div> -->
      <a-table class="marg_t20" @change="handleChange" :pagination="pagination" :columns="columns" :dataSource="data" bordered>
        <template slot="name" slot-scope="text">
          <div>{{ text }}</div>
        </template>
        <template slot="isMain" slot-scope="text">
          {{text == 'Y' ? '主被保人' : '附属被保人'}}
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<style lang="scss" scoped>
.table_title_ {
  text-align: right;
}
.marg_l20 {
  margin-left: 20px;
}
.marg_t20 {
  margin-top: 32px;
}
.msg_ {
  font-size: 13px;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
  line-height: 26px;
  margin-bottom: 22px;
}
.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}
.options_select_ {
  line-height: 30px;
  label {
    margin-left: 21px;
    font-size: 13px;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    line-height: 26px;
    &.active_ {
      color: #297fff;
    }
  }
}
</style>
<script>
import api from "@/utils/api";

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "年龄",
    key: "age",
    dataIndex: "age"
  },
  {
    title: "证件号码",
    dataIndex: "idNo",
    key: 'idNo'
  },
  {
    title: "手机号码",
    dataIndex: "phone",
    key: 'phone'
  },
  {
    title: "人员类型",
    dataIndex: "isMain",
    key: 'isMain',
    scopedSlots: { customRender: 'isMain' }
  },
  {
    title: "工号",
    dataIndex: "empNo",
    key: 'empNo'
  },
  {
    title: "有效保单",
    dataIndex: "policyCount",
    key: 'policyCount'
  }
];

const data = [];
// for (var i = 0; i < 6; i++) {
//   data.push({
//     key: i.toString(),
//     name: "王富贵",
//     age: "18",
//     idNo: "432524199203146415",
//     phone: "15214334028",
//     isMain: "员工",
//     empNo: "A001",
//     policyCount: "3"
//   });
// }
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      data,
      columns,
      pagination: {
        total: 1,
        pageSize: 20
      }
    };
  },
  mounted () {
    this.fetchList(1)
  },
  methods: {
    handleBZZChange (e) {
      this.planType = e.target.value
      console.log('e -> handleRYChange', e)
      this.fetchList(1)
    },
    handleRYChange (e) {
      this.insurceType = e.target.value
      this.fetchList(1)
    },
    handleChange (pagination) {
      this.fetchList(pagination.current)
    },
    fetchList (pageNum = 1) {
      let formData = {}
      for (let key in this.formData) {
        if (this.formData[key]) {
            formData[key] = this.formData[key]
        }
      }
      if (this.planType) {
        formData['planType'] = this.planType
      }
      if (this.insurceType) {
        formData['insurceType'] = this.insurceType
      }
      api
      .getInsurceList({
          pageNum,
          pageSize: this.pagination.pageSize,
          ...formData
      })
      .then(res => res.data)
      .then(data => {
          console.log('getInsurceList -> ', data)
          // this.fetchDetail();
          const {list, total} = data.content
          this.data = list
          this.pagination.total = total
      });
    },
    fetchDetail(policyId) {
      api
        .fileAndPlaList({
          policyId
        })
        .then(data => {});
    },
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log("error", error);
        console.log("Received values of form: ", values);
        this.formData = values
        this.fetchList(1)
      });
    }
  }
};
</script>
