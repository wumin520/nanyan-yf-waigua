<template>
    <div class="account_info_">
        <a-card style="margin-top: 0;" title="账号信息">
            <ul class="clearfix">
                <li>
                    公司名称：北京王富贵有限责任公司 
                </li>
                <li>
                    用户名：王富贵
                </li>
                <li>
                    密码：wangfugui <a href="javascript:;">修改</a>
                </li>
                <li>开票信息：北京王富贵有限责任公司 <a href="javascript:;">修改</a></li>
            </ul>
        </a-card>
        <a-card title="管理员信息">
            <ul class="clearfix">
                <li>
                    姓名：王富贵<a href="javascript:;">修改</a>
                </li>
                <li>
                    职务：村长<a href="javascript:;">修改</a>
                </li>
                <li>
                    联系电话：18319786655 <a href="javascript:;">修改</a>
                </li>
                <li>地址：北京市朝阳区朝阳路朝阳大道666号朝阳大厦 <a href="javascript:;">修改</a></li>
                <li>邮箱：www.wangfugui@m78.com <a href="javascript:;">修改</a></li>
            </ul>
        </a-card>
    </div>
</template>
<style lang="scss" scoped>
@import "@/sass/common.scss";
.account_info_ {
    ul {
        width: 500px;
        a {
            float: right;
        }
    }
}
</style>
<script>
export default {
    data () {
        return {}
    }
}
</script>