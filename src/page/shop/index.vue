<template>
    <div>
        <header-view></header-view>
        <div class="shop-banner">
            <img src="http://static.jiihome.com/banner_loja.png" alt="">
            <div class="content">
                    <span>Are you looking for </span>
                    <span>something unique?</span>
            </div>
        </div>
        <div class="tittle">home / shop</div>
        <div class="shop-box">
            <div class="shop-left">
                <div class="search-tittle">EXCLUSIVE</div>

                <div class="search-box">
                    <el-input placeholder="请输入内容" v-model="keywords" size="small">
                        <template slot="append"><a href="javascript:void(0)" @click="getGoods"><i class="el-icon-search"></i></a></template>
                    </el-input>
                </div>

                <div class="search-attr">分类</div>
                <div :class="cateId == item.id ?'search-attr-val-choose':'search-attr-val'" v-for="item in cateDate"><a href="javascript:void(0)" @click="changeCate(item.id)">{{item.name}}</a></div>

                <div class="search-attr">品牌</div>
                <div :class="brandId == item.id ?'search-attr-val-choose':'search-attr-val'" v-for="item in brandData"><a href="javascript:void(0)" @click="changeBrand(item.id)">{{item.name}}</a></div>
            </div>
            <div class="shop-right">
                <div class="goods-info" v-for="item in goodsData">
                    <div class="goods-img"><a href="javascript:void(0)" :title="item.goods_name" @click="goDetail(item.id)"><img :src="item.goods_pic" alt=""></a></div>
                    <div class="goods-name"><a href="javascript:void(0)" :title="item.goods_name" @click="goDetail(item.id)">{{item.goods_name}}</a></div>
                    <div class="goods-price">￥{{item.goods_min_price}}</div>
                </div>
                <div style="text-align:center;" v-if="pageData.total > 0">
                    <el-pagination
                            layout="prev, pager, next"
                            :page-size=pageData.page_size
                            :total=pageData.total
                            @current-change='currentPage'>
                    </el-pagination>
                </div>
            </div>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import headerView from '@/components/Header'
    import footerView from '@/components/footer'
    import {getGoodsList,getBrand,getCategory} from '@/api/getData'

    export default {
        data(){
            return{
                goodsData:[],
                brandData:[],
                cateDate:[],
                pageData:[],
                page:1,
                keywords:'',
                cateId:'',
                brandId:'',
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
                window.scrollTo(0, 0);
                this.getGoods();

               const brand = await getBrand();

               if(brand.status == 1){
                   this.brandData = brand.data;
               }else{
                   this.$router.push('/');
               }

                const cate = await getCategory();

                if(cate.status == 1){
                    this.cateDate = cate.data;
                    console.log(this.cateDate)
                }else{
                    this.$router.push('/');
                }

            },

            goDetail(id){
                const {href} = this.$router.resolve({
                    path: "\goodsDetail",
                    query: {
                        id: id,
                        nav: 2,
                        isl:sessionStorage.getItem('isLogin'),
                    }
                });
                window.open(href, '_blank');
            },

            async getGoods(){
                const formData = {
                    'category_id':this.cateId,
                    'brand_id':this.brandId,
                    'page':this.page,
                    'keywords':this.keywords,
                    'size':15,
                };
                console.log(formData);
                const res = await getGoodsList(formData);
                console.log(res);
                if(res.status == 1){
                    this.goodsData = res.data.goods;
                    this.pageData = res.data.pageData;
                    console.log(this.pageData)
                }else {
                    this.$message.error(res.message);
                }

            },

            changeBrand(key){
                if(key == this.brandId){
                    this.brandId = '';
                }else{
                    this.brandId = key;
                }
                this.getGoods();
            },

            changeCate(key){
                if(key == this.cateId){
                    this.cateId = '';
                }else{
                    this.cateId = key;
                }
                this.getGoods();
            },

            currentPage(page){
                this.page = page;
                this.getGoods();
            }

        }
    }
</script>

<style lang="less" scoped>
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
  .tittle{
      font-size: 12px;
      line-height: 14.4px;
      text-transform: lowercase;
      color: #727272;
      padding-top: 20px;
      width: 1200px;
      margin: 0 auto;
  }
  .shop-box{
      box-sizing: border-box;
      width:1200px;
      margin:0 auto;
      padding: 40px 0;
      overflow: hidden;
  }
  .shop-left{
      float: left;
      width: 330px;
  }
  .search-tittle{
      box-sizing: border-box;
      padding-top: 10px;
      height: 45px;
      width: 300px;
      font-family: 'NexaBold';
      font-size: 15px;
      font-weight: 700;
      border-bottom: 1px solid black;
  }
  .search-box{
      margin-top: 20px;
      width: 300px;
  }
  .search-attr{
      margin-top: 20px;
      font-family: 'NexaBold';
      font-size: 15px;
      font-weight: 700;
      line-height: 24px;
  }
  .search-attr-val{
      margin-top: 2px;
      font-family: 'NexaBold';
      font-size: 14px;
      line-height: 22px;
      font-weight: 300;
  }
  .search-attr-val-choose{
      margin-top: 2px;
      font-family: 'NexaBold';
      font-size: 14px;
      line-height: 22px;
      font-weight: 700;
  }
  .shop-right{
      float:left;
      width: 870px;
      font-size: 0;
  }
  .goods-info{
      box-sizing: border-box;
      display: inline-block;
      margin-bottom: 20px;
      padding-left: 30px;
      width:290px;
      height: 285px;
      overflow: hidden;
  }
    .goods-img{
        box-sizing: border-box;
        width: 260px;
        height: 180px;
        border: 1px solid #f3f3f3;
        text-align: center;
        background: #f3f3f3;
    }
  .goods-img-on{
      box-sizing: border-box;
      width: 260px;
      height: 180px;
      border: 1px solid #f3f3f3;
      text-align: center;
      background: #f3f3f3;
      opacity: 0.3;
  }
    .goods-img img{
        width: auto;
        height: 178px;
    }
    .goods-name{
        width: 100%;
        line-height: 25px;
        margin-top: 15px;
        font-family: inherit;
        font-weight: 500;
        font-size: 19px;
        overflow: hidden;
        word-wrap:break-word;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    .goods-price{
        width: 100%;
        font-size: 17px;
        line-height: 24px;
        font-family: "NexaLight", sans-serif;
        color: #000;
        font-weight: 300;
        margin-top: 5px;
    }
</style>