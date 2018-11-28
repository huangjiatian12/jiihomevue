<template>
    <div>
        <header-view></header-view>
        <div class="carousel">
            <el-carousel :interval="5000" arrow="hover" :height="winHeight">
                <el-carousel-item v-for="(item,index) in carouselData" :key="index">
                    <img class="carousel-img" :src="item.url" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import headerView from '@/components/Header'
    import footerView from '@/components/footer'
    export default {
        data(){
            return {
                carouselData: [
                    {url: 'http://static.jiihome.com/slider_01.png',index: 1},
                    {url: 'http://static.jiihome.com/slider_02.png',index: 2},
                    {url: 'http://static.jiihome.com/slider_03.png',index: 3},
                    {url: 'http://static.jiihome.com/slider_04.png',index: 4},
                ],
                winHeight:'',
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
                var h = document.documentElement.clientHeight || document.body.clientHeight;
                this.winHeight = (h-100)+'px';
                window.scrollTo(0, 0);
            }
        }
    }
</script>

<style lang="less" scoped>
  .carousel{
      width: 100%;
      background: #f3f3f3;
      margin-top: 100px;
  }
  .carousel-img{
      width: 100%;
      height: auto;
      vertical-align:middle;
  }
</style>