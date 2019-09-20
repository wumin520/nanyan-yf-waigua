<template>
    <div>
        <a-card style="margin-top: 0;">
            <div class="options_select_">合同状态： <label class="active_">全部</label><label>保障中</label><label>已过期</label></div>
            <a-divider />
            <a-table :columns="columns" :dataSource="data">
                <template slot="do">
                    <a-button type="primary" ghost><a-icon type="plus" />增加</a-button>
                    <a-button class="mrg_l10" type="primary" ghost><a-icon type="minus" />减少</a-button>
                    <a-button class="mrg_l10" type="primary" ghost><a-icon type="edit" />编辑</a-button>
                </template>
            </a-table>
        </a-card>
        <a-card title="保全记录">
            <div class="options_select_ clearfix">
                登记时间：<label class="active_">本月</label><label>近三个月</label><label>近六个月</label>
                <a-range-picker class="mrg_l29" @change="onChange" />
                <div class="btn_wrap_">
                    <a-button type="primary"><a-icon type="search"></a-icon>搜索</a-button>
                    <a-button class="mrg_l10" type="primary" ghost><a-icon type="reset"></a-icon>重置</a-button>
                    <a-button class="mrg_l10" type="primary" ghost><a-icon type="download"></a-icon>下载</a-button>
                </div>
            </div>
            <a-divider />
            <div class="options_select_">
                保全类型：<label class="active_">全部</label><label>增加</label><label>减少</label><label>编辑</label>
            </div>
            <a-divider />
            <div class="options_select_">
                办理状态：<label class="active_">办理结束</label><label>办理中</label>
            </div>
            <a-divider />
            <a-table :columns="columns1" :dataSource="data1">

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
const columns = [{
    title: '合同编号',
    dataIndex: 'hid',
    key: 'hid'
}, {
    title: '合同名称',
    dataIndex: 'hname',
    key: 'hname'
}, {
    title: '保险公司',
    dataIndex: 'company',
    key: 'company'
}, {
    title: '保障生效日',
    dataIndex: 'valid_date',
    key: 'valid_date'
}, {
    title: '保障终止日',
    dataIndex: 'invalid_date',
    key: 'invalid_date'
}, {
    title: '操作被保险人',
    dataIndex: 'do',
    key: 'tab',
    scopedSlots: {customRender: 'do'}
},]

const data = []
const data1 = []
const columns1 = [{
    title: '保全登记号',
    dataIndex: 'bqid',
    key: 'bqid'
},{
    title: '保全类型',
    dataIndex: 'type',
    key: 'type',
},{
    title: '保全申请日期',
    dataIndex: 'submit_date',
    key: 'submit_date',
},{
    title: '保全生效日期',
    dataIndex: 'valid_date',
    key: 'valid_date',
},{
    title: '办理状态',
    dataIndex: 'state',
    key: 'state',
},{
    title: '保费',
    dataIndex: 'amount',
    key: 'amount',
},{
    title: '保全批单',
    dataIndex: 'bq_state',
    key: 'bq_state',
}]
for (var i = 0; i < 3; i++) {
    data.push({
        hid: 1001 + i,
        hname: '复星联合星相印',
        company: '复星联合',
        valid_date: '2019-09-16',
        invalid_date: '2020-09-16',
    })
    data1.push({
        bqid: 'YT0000' + i,
        type: '增加',
        submit_date: '2019-06-14',
        valid_date: '2019-06-14',
        state: '办理中',
        amout: 2000,
        bq_state: '批单'
    })
}
export default {
    data () {
        return {
            columns,
            data,
            columns1,
            data1,
        }
    }
}
</script>