<template>
  <div class="dashboard_">
    <!-- <a-card class="top_" title="数据总览/仪表盘">
      <div class="header_ clearfix">
        <div class="left_">
          投保年度：
          <label class="active_">2018</label>
          <label>2018</label>
          <label>2018</label>
          <i></i>
        </div>
        <div class="right_">
          <div class="input_wrap_">
            <a-input
              v-model="searchText"
              placeholder="请输入查找内容"
              ref="searchTextInput"
            >
              <a-icon slot="prefix" type="search" />
              <a-icon
                v-if="searchText"
                slot="suffix"
                type="close-circle"
                @click="emitEmpty"
              />
            </a-input>
          </div>
          <div class="btn_wrap_">
            <a-button type="primary" ghost>重置</a-button>
          </div>
        </div>
      </div>
      <ul class="data_list_">
        <li>投保年度：</li>
        <li>员工数量：</li>
        <li>理赔数量：</li>
        <li>保险金额：</li>
        <li>理赔金额：</li>
      </ul>
    </a-card> -->
    <a-card class="middle_" title="待办事项">
      <div v-if="list.length === 0" >暂无待办事项</div>
      <div v-else>
        <a-checkbox-group v-model="checkedList" @change="handleGroupChange">
          <a-row>
            <a-col v-for="item in list" :span="24">
              <a-checkbox :value="item.id">{{item.electronicBatch}}{{item.batchupdateNo}}待发送邮件</a-checkbox> <router-link :to="`/dashboard/baoquan/edit/${item.id}`">修改</router-link>
            </a-col>
          </a-row>
        </a-checkbox-group>
        <!-- <div><a-checkbox value="a">3月26日，去见代理人</a-checkbox></div>
        <div><a-checkbox value="b">3月28日，去见保险公司</a-checkbox></div> -->
        <div class="footer_">
          <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @click="onCheckAllChange" >全选</a-checkbox>
          <a-button @click="submit" type="primary">确认并发送保司审核</a-button>
        </div>
      </div>
    </a-card>
    <!-- <a-card title="快捷操作">
      <a-button class="marg-r22" type="primary">增加被保险人</a-button>
      <a-button class="marg-r22" type="primary">减少被保险人</a-button>
      <a-button class="marg-r22" type="primary">编辑被保人</a-button>
      <a-button type="primary">理赔查询</a-button>
    </a-card> -->
  </div>
</template>
<style lang="scss" scoped>
.dashboard_ {
  .marg-r22 {
    margin-right: 22px;
  }
  .ant-card {
    margin-top: 20px;
  }
  ul,
  li {
    list-style: none;
    padding: 0;
  }
  .mrg_t20 {
    margin-top: 20px;
  }
  .top_ {
    margin-top: 0;
    .header_ {
      line-height: 55px;
      border-bottom: 1px solid rgba(28, 40, 61, 0.1);
      margin-top: -24px;
      .left_ {
        float: left;
        label {
          margin-right: 18px;
          &.active_ {
            border-bottom: 2px solid #297fff;
          }
        }
      }
      .right_ {
        float: right;
        .input_wrap_ {
          display: inline-block;
          width: 217px;
          margin-right: 22px;
        }
        .btn_wrap_ {
          display: inline-block;
        }
      }
    }
    .data_list_ {
      padding-top: 20px;
      line-height: 30px;
    }
  }
  .middle_ {
    .footer_ {
      margin-top: 30px;
      padding-top: 13px;
      border-top: 1px solid rgba(28, 40, 61, 0.1);
    }
  }
}
</style>
<script>
import api from '@/utils/api';

export default {
  data() {
    return {
      current: ["2018"],
      searchText: "",
      list: [{
        "id": 1001,
        "type": "批改类型1,加人,2,修改,3减人",
        "changePremium": "保费变化",
        "batchupdateNo": "批单号",
        "payment": "支付方式",
        "electronicBatch": "电子批单",
        "status": "0失效,1待处理,2审批中,3已完成"
      }],
      checkedList: [],
      indeterminate: false,
      checkAll: false,
    };
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    submit () {
      console.log(this.checkedList, 'submit -> ')
      api.sendmail({
        id: this.checkedList.join('')
      }).then(res => res.data).then(data => {
        
      })
    },
    handleGroupChange (checkedValues) {
      console.log('handleGroupChange -> ', checkedValues)
    },
    fetchData () {
      api.getBatchListByStatus().then(res => res.data).then(data => {

      })
    },
    emitEmpty() {
      this.$refs.searchTextInput.focus();
      this.searchText = "";
    },
    onCheckAllChange(e) {
      let checkedList = this.list.map(val => {
        return val.id
      })
      Object.assign(this, {
        checkedList: e.target.checked ? checkedList : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
  }
};
</script>
