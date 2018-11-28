<template>
    <div>
        <header-view></header-view>
        <div class="shop-banner">
            <img src="http://static.jiihome.com/banner_loja.png" alt="">
            <div class="content">
                <span>Waiting For Us ...</span>
            </div>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import headerView from '@/components/Header'
    import footerView from '@/components/footer'
    export default {
        data(){
            return{

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
            initData(){
                window.scrollTo(0, 0);
            }
        }
    }
</script>

<style scoped>
    .shop-banner{
        margin-top: 100px;
        background: #f3f3f3;
    }
    .shop-banner img{
        width: 100%;
        height: 100%;
    }
    .content{
        position: absolute;
        top: 45%;
        right: 19.5%;
        font-size: 40px;
        line-height: 50px;
        margin-bottom: 60px;
    }
    .content span{
        display: block;
        font-weight: 300;
        margin-right: 20px;
        color: #000;
        font-family: "NexaLight", sans-serif;
    }
</style>