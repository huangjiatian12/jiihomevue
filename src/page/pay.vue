<template>
    <div>
        <header-view></header-view>
        <div class="top-hidden"></div>
        <div class="tittle">home / Wxpay</div>
        <div class="pay-box" :style="{height:height+'px'}">
            <div class="pay-tittle">请进行扫码支付</div>
            <div class="pay-img">
                <img
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :src="payUrl"
                    style="width: 100%;height: 100%;">

            </div>
            <el-button type="info" class="change" @click="changeCode">刷新支付码</el-button>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import headerView from '@/components/Header'
    import footerView from '@/components/footer'
    import {getPayCode,updateOrder} from '@/api/getData'
    import md5 from 'js-md5'
    export default {
        data(){
            return{
                payUrl:'',
                loading:true,
                height:500,
            }
        },

        components: {
            headerView,
            footerView,
        },

        mounted(){
            this.initData();
        },

        methods:{
            async initData(){
                var orderId = this.$route.query.orderId;

                var h = document.documentElement.clientHeight || document.body.clientHeight;
                if(h > 850){
                    this.height = h - 370;
                }

                const res = await getPayCode({id:orderId});
                console.log(res);
                this.payUrl = '';
                if(res.status == 1){
                    this.payUrl = 'http://qr.liantu.com/api.php?text='+res.data.code_url;
                    this.loading = false;
                    this.testPay(orderId);
                }

            },

            changeCode(){
                this.payUrl = '';
                this.loading = true;
                this.initData()
            },

            testPay(id){
                var _this = this;
                console.log(id)
                 setInterval(function () {
                   _this.getPayStatus(id);
                },8000)
            },
            async getPayStatus(id){
                const res =await updateOrder(id);
                console.log(res);
                if(res.status == 1){

                }
            }
        }
    }
</script>

<style scoped>
    .top-hidden{
        width: 100%;
        height: 100px;
    }
    .tittle{
        box-sizing: border-box;
        font-size: 12px;
        line-height: 14.4px;
        height: 40px;
        text-transform: lowercase;
        color: #727272;
        padding-top: 15px;
        width: 1200px;
        margin: 0 auto;
        border-top: 1px solid #ccc;
    }
    .pay-box{
        box-sizing: border-box;
        width: 1200px;
        margin: 0 auto;
        text-align: center;
    }
    .pay-tittle{
        margin-top: 40px;
        font-size: 18px;
        font-weight: 600;
        padding-bottom: 20px;
    }
    .pay-img{
        box-sizing: border-box;
        width: 300px;
        height: 300px;
        margin: 0 auto;
        background: #f3f3f3;
    }
    .pay-img img{
        width: 300px;
        height: 300px;
    }
    .change{
        margin-top: 10px;
    }
</style>