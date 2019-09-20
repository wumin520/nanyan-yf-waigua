<template>
  <div class="dashboard_">
    <a-card class="top_" title="数据总览/仪表盘">
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
              <a-input v-model="searchText" placeholder="请输入查找内容" ref="searchTextInput">
                <a-icon slot="prefix" type="search" />
                <a-icon v-if="searchText" slot="suffix" type="close-circle" @click="emitEmpty" />
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
    </a-card>
    <a-card class="middle_" title="代办事项">
      <div>暂无代办事项</div>
      <div><a-checkbox value="a">3月26日，去见代理人</a-checkbox></div>
      <div><a-checkbox value="b">3月28日，去见保险公司</a-checkbox></div>
      <div class="footer_">
        <a-checkbox value="c">全选</a-checkbox>
        <a-button type="primary">确认并发送保司审核</a-button>
      </div>
    </a-card>
    <a-card title="快捷操作">
      <a-button class="marg-r22" type="primary">增加被保险人</a-button>
      <a-button class="marg-r22" type="primary">减少被保险人</a-button>
      <a-button class="marg-r22" type="primary">编辑被保人</a-button>
      <a-button type="primary">理赔查询</a-button>
    </a-card>

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
  ul, li {
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
      border-bottom:1px solid rgba(28,40,61,0.1);
      margin-top: -24px;
      .left_ {
        float: left;
        label {
          margin-right: 18px;
          &.active_ {
            border-bottom: 2px solid #297FFF;
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
      border-top: 1px solid rgba(28,40,61,0.1);
    }
  }
}
</style>
<script>
export default {
  data () {
    return {
      current: ['2018'],
      searchText: ''
    }
  },
  methods: {
    emitEmpty () {
      this.$refs.searchTextInput.focus()
      this.searchText = ''
    },
  }
}
</script>
