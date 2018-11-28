<template>
    <div>
        <header-view></header-view>
        <div class="top-hidden"></div>
        <div class="tittle">home / design / {{articleData.article_name}}</div>
        <div class="detail">
            <h1 class="article-name" >{{articleData.article_name}}</h1>
            <div class="content" v-html="articleData.content"></div>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import headerView from '@/components/Header'
    import footerView from '@/components/footer'
    import {getArticleDetail} from '@/api/getData'

    export default {
        data(){
            return{
                articleData:[],
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
                try{
                    var id = this.$route.query.id;
                    const res = await getArticleDetail(id);
                    if(res.status == 1){
                        this.articleData = res.data.article;
                    }
                }catch(err){
                    console.log(err);
                }
                window.scrollTo(0, 0);
            },
        },

    }
</script>

<style scoped>
    .top-hidden{
        width: 100%;
        height: 100px;
    }
    .tittle{
        font-size: 12px;
        line-height: 14.4px;
        text-transform: lowercase;
        color: #727272;
        padding-top: 20px;
        width: 1200px;
        margin: 0 auto;
        border-top: 1px solid #ccc;
    }
    .detail{
        margin:0 auto;
        width:1200px;
        padding-top:30px;
    }
    .article-name{
        height:80px;
        line-height:80px;
        text-align:center;
    }
    .content{
        margin:40px 0;
        padding:30px 20px;
        box-sizing:border-box;
        text-align: center;
    }
</style>