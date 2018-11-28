<template>
    <div>
        <header-view></header-view>
        <div class="top-hidden"></div>
        <div class="tittle">home / design</div>
        <div class="design">
            <div class="design-list" v-for="item in tableData">
                <div class="design-img"><a href="javascript:void(0)" :title="item.article_name" @click="goDetail(item.id)"><img :src="item.image_url"></a></div>
                <div class="design-name"><a href="javascript:void(0)" :title="item.article_name" @click="goDetail(item.id)">{{item.article_name}}</a></div>
                <div class="design-brief">{{item.article_brief}}</div>
            </div>

        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import headerView from '@/components/Header'
    import footerView from '@/components/footer'
    import {getArticleList} from '@/api/getData'

    export default {
        data(){
            return{
                tableData:[],
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
                    const res = await getArticleList();
                    this.tableData = res.data.article
                }catch(err){
                    console.log(err);
                }
                window.scrollTo(0, 0);
            },

            goDetail(id){
                this.$router.push({path:'\designDetail',query:{id:id,nav:4}});
            }
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
    .design{
        width:1200px;
        margin:0 auto;
        padding-top:20px;
    }
    .design-list{
        box-sizing:border-box;
        width:270px;
        height:300px;
        display:inline-block;
        margin:10px 15px;
        overflow: hidden;
    }
    .design-img{
        box-sizing: border-box;
        width:270px;
        height:180px;
        background: #f3f3f3;
        text-align: center;
        border: 1px solid #f3f3f3;
    }
    .design-img img{
        width: auto;
        height:178px;
    }
    .design-name {
        width:255px;
        line-height:30px;
        fonts-size:16px;
        margin-top: 10px;
        padding-left:10px;
        word-wrap:break-word;
        overflow:hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

    }
    .design-brief{
        width: 255px;
        font-size: 17px;
        line-height: 24px;
        padding-left:10px;
        font-family: "NexaLight", sans-serif;
        color: #000;
        font-weight: 300;
        margin-top: 5px;
        word-wrap:break-word;
        overflow:hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
</style>