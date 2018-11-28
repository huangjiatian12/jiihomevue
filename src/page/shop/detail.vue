<template>
    <div>
        <header-view :parentToChild="isLogin" v-on:listenToChildEvent="changeProp"></header-view>
        <div class="top-hidden"></div>
        <div class="tittle">home / shop /  {{goodsData.goods_name}}</div>
        <div class="goods-box">
            <div class="goods-carousel" v-on:mouseover="changeActive()" v-on:mouseout="removeActive()">
                <a href="javascript:void(0)" @click="addInterval"><div class="arrow-up"><i class="el-icon-arrow-up"></i></div></a>
                <div class="carousel-box">
                    <div class="carousel-list" :style = {transform:transform} :class="{rollScreen_list_unanim:num==0}">
                       <div class="carousel-pic" v-for="(item,index) in imgData" :key=index @click="changeImg(item.image_url)"><img :src="item.image_url" alt=""></div>
                       <div class="carousel-pic" v-if="imgData.length > 3" v-for="(item,index) in imgData" :key=index+imgData.length @click="changeImg(item.image_url)"><img :src="item.image_url" alt=""></div>
                    </div>
                </div>
                <a href="javascript:void(0)" @click="minusInterval"><div class="arrow-down"><i class="el-icon-arrow-down"></i></div></a>
            </div>
            <div class="goods-img"><img :src="goodsImg" alt=""></div>
            <div class="goods-info">
                <div class="goods-name">{{goodsData.goods_name}}</div>
                <div class="goods-price" v-if="goodsPrice != 0 ">￥{{goodsPrice}}</div>
                <div class="goods-price" v-if="goodsPrice == 0 && goodsData.goods_min_price == goodsData.goods_max_price">￥{{goodsData.goods_min_price}}</div>
                <div class="goods-price" v-if="goodsPrice == 0 && goodsData.goods_min_price != goodsData.goods_max_price">￥{{goodsData.goods_min_price}}-{{goodsData.goods_max_price}}</div>
                <div class="spec-box" v-for="item in attrData">
                    <div class="spec-name">{{item.spec_name}}</div>
                    <div class="spec-val-box">
                        <div v-for="val in item.child">
                            <div v-if="item.type_id == 1 && !val.choose && val.status"   class="spec-val-normal" v-on:mouseover="specValActive($event)" v-on:mouseout="removeSpecValActive($event)" @click="chooseSpecVal(item.spec_id,val.spec_value_id)">{{val.spec_value}}</div>

                            <div v-if="item.type_id == 1 && val.choose && val.status"   class="spec-val-on" @click="chooseSpecVal(item.spec_id,val.spec_value_id)">{{val.spec_value}}</div>

                            <div v-if="item.type_id == 1 && !val.status"   class="spec-val-none" >{{val.spec_value}}</div>
                        </div>
                        <div v-for="val in item.child">
                            <div v-if="item.type_id == 2 && !val.choose && val.status"  class="spec-pic-normal" :style="{backgroundImage: 'url(' + val.spec_value + ')', backgroundSize:'contain'}" v-on:mouseover="specPicActive($event)" v-on:mouseout="removeSpecPicActive($event)" @click="chooseSpecVal(item.spec_id,val.spec_value_id)"></div>

                            <div v-if="item.type_id == 2 && val.choose && val.status"  class="spec-pic-on" :style="{backgroundImage: 'url(' + val.spec_value + ')', backgroundSize:'contain'}" @click="chooseSpecVal(item.spec_id,val.spec_value_id)"></div>

                            <div v-if="item.type_id == 2 && !val.status"  class="spec-pic-none" :style="{backgroundImage: 'url(' + val.spec_value + ')', backgroundSize:'contain'}" ></div>
                        </div>
                    </div>
                </div>
                <div class="goods-num-box">
                    <el-input  v-model="goodsNum"  style="width:170px;margin:7px 0"  @keyup.native="number" >
                        <template slot="prepend" style="width:20px;"><a href="javascrip:void(0)" @click="minusNum"><i class="el-icon-minus"></i></a></template>
                        <template slot="append"><a href="javascrip:void(0)" @click="plusNum"><i class="el-icon-plus"></i></a></template>
                    </el-input>
                    <span class="stockNum" v-if="stockNum > 0">(库存:{{stockNum}})</span>
                </div>
                <div class="add-cart-box">
                    <el-button type="" class="add-cart" @click="addCart"><i class="el-icon-goods"></i> 加入购物车</el-button>
                </div>
            </div>
        </div>
        <div class="goods-content" v-html="goodsData.content"></div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import Vue from 'vue'
    import headerView from '@/components/Header'
    import footerView from '@/components/footer'
    import {getGoodsDetail,addCart} from '@/api/getData'
    export default {
        data(){
            return{
                goodsData:[],
                goodsImg:'',
                goodsPrice:0,
                attrData:[],
                attr:true,
                goodsNum:1,
                stockNum:0,
                isLogin:true,
                imgData:[],
                num:0,
            }
        },

        computed: {
            transform: function () {
                return 'translateY(-' + this.num * 140 + 'px)'
            }
        },

        components: {
            headerView,
            footerView,
        },

        mounted(){
            this.initData();
            this.beginInterval();
        },

        methods:{
            async initData(){
                var id = this.$route.query.id;
                const res = await getGoodsDetail(id);
                if(res.status == 1){
                    this.goodsData = res.data.goods;
                    this.imgData = res.data.goodsImg;
                    this.goodsImg = res.data.goodsImg[0].image_url;
                    this.goodsSpecData = res.data.goodsSpecData
                    this.cleanAttr(res.data.goodsSpecRelData)
                }
                window.scrollTo(0, 0);
                this.beginInterval();
            },

            beginInterval(){
                if(this.imgData.length > 3){
                    let _this = this
                    this.interval = setInterval(function () {
                        if (_this.num !== _this.imgData.length) {
                            _this.num++
                        } else {
                            _this.num = 0
                        }
                    }, 2500)
                }
            },

            changeActive(){
                clearInterval(this.interval);
            },

            removeActive(){
                this.beginInterval();
            },

            addInterval(){
                if(this.imgData.length > 3){
                    if(this.num == 0){
                        this.num = 0;
                    }else {
                        this.num = this.num - 1;
                    }
                }
            },

            minusInterval(){
                if(this.imgData.length > 3){
                    if(this.imgData.length == this.num){
                        this.num =0;
                    }else {
                        this.num = this.num + 1;
                    }
                }
            },

            changeImg(url){
                this.goodsImg = url;
            },

            minusNum(){
                if(this.goodsNum > 1){
                    this.goodsNum = this.goodsNum - 1;
                }else{
                    this.goodsNum = 1;
                }
            },

            plusNum(){
                this.goodsNum = this.goodsNum + 1;
                if(this.stockNum > 0 && this.goodsNum > this.stockNum){
                    this.goodsNum = this.stockNum;
                }
            },

            cleanAttr(data){
                data.forEach((item,index) => {
                    this.attr = true;
                    this.attrData.forEach((val,key) => {
                        if(val.spec_id == item.spec_id){
                            this.attrData[key]['child'].push({'spec_value':item.spec_value,'spec_value_id':item.spec_value_id});
                            this.attr = false;
                        }
                    });
                    if(this.attr){
                        this.attrData.push({'spec_id':item.spec_id,'spec_name':item.spec_name,'type_id':item.type_id,'child':[{'spec_value':item.spec_value,'spec_value_id':item.spec_value_id}]});
                    }
                });

                this.makeAttr()
            },

            specValActive($event){
                $event.currentTarget.className = "spec-val-on"
            },

            removeSpecValActive($event){
                $event.currentTarget.className = "spec-val-normal"
            },

            specPicActive($event){
                $event.currentTarget.className = "spec-pic-on"
            },

            removeSpecPicActive($event){
                $event.currentTarget.className = "spec-pic-normal"
            },

            chooseSpecVal(specId,specValId){
                this.attrData.forEach((item,index) => {
                    if(item.spec_id == specId){
                        item.child.forEach((val,key) => {
                            if(val.spec_value_id == specValId){
                                const childData = val;
                                childData.choose = !childData.choose;
                                Vue.set(this.attrData[index].child,key,childData);
                            }else{
                                const childData = val;
                                childData.choose = false;
                                Vue.set(this.attrData[index].child,key,childData);
                            }
                        });
                    }
                });
                this.makeAttr()
            },

            makeAttr(){
                this.chooseAttr = [];
                this.attrData.forEach((item,index) => {
                    item.child.forEach((val,key) => {
                        if(val.choose){
                            this.chooseAttr.push({spec_id:item.spec_id,id:val.spec_value_id})
                        }
                    });
                });
                this.isChooseAll();
                this.changeStatus();
            },

            isChooseAll(){
                this.chooseData=[];
                this.stockNum = 0;
                this.chooseAttr.forEach(item => {
                    this.chooseData.push(item.id);
                });
                this.chooseData.sort(function(a,b){return a-b});
                this.chooseData = this.chooseData.join('_');
                this.goodsSpecData.forEach(item => {
                    if(item.spec_sku_id == this.chooseData && item.stock_num > 0){
                        this.stockNum = item.stock_num;
                        this.goodsPrice = item.goods_price;
                        if(this.goodsNum > this.stockNum){
                            this.goodsNum = this.stockNum
                        }
                        console.log(item);
                        if(item.image_url){
                            this.goodsImg = item.image_url;
                        }
                    }
                })
            },

            changeStatus(){
                this.attrData.forEach((item,index) => {
                    item.child.forEach((val,key) => {
                        this.addSpec = true;
                        this.checkAttr = [];
                        this.chooseAttr.forEach((choose,chid) => {
                            if(item.spec_id == choose.spec_id){
                                this.checkAttr.push(val.spec_value_id)
                                this.addSpec = false;
                            }else{
                                this.checkAttr.push(choose.id)
                            }
                        });
                        if(this.addSpec){
                            this.checkAttr.push(val.spec_value_id)
                        }
                        if(this.makeSureStatus()){
                            this.status = this.attrData[index].child[key];
                            this.status.status = true;
                            Vue.set(this.attrData[index].child,key,this.status);
                        }else{
                            this.status = this.attrData[index].child[key];
                            this.status.status = false;
                            Vue.set(this.attrData[index].child,key,this.status);
                        }
                    });
                });
            },

            makeSureStatus(){
                this.specNum = false;
                this.goodsSpecData.forEach(item => {
                    this.specSku = item.spec_sku_id.split("_");
                    if(this.inArray(this.checkAttr,this.specSku) && item.stock_num > 0){
                        this.specNum = true;
                    }
                });
                if(this.specNum){
                    return true;
                }else{
                    return false;
                }
            },

            inArray(arr1,arr2){
                this.returnIn = true;
                arr1.forEach(item => {
                    this.inArr = false;
                    arr2.forEach(val => {
                        if(val == item){
                            this.inArr = true;
                        }
                    });

                    if(!this.inArr){
                        this.returnIn = false;
                    }
                });
                if(this.returnIn){
                    return true;
                }else{
                    return false;
                }

            },

            number(){
                this.goodsNum = this.goodsNum.replace(/[^\d.]/g,"");
                this.goodsNum = this.goodsNum.replace(/^\./g,"");
                this.goodsNum = this.goodsNum.replace(/\.{2,}/g,".");
                this.goodsNum = this.goodsNum.replace(".","$#$").replace(/\./g,"").replace("$#$",".");

                if(this.stockNum > 0 && this.goodsNum > this.stockNum){
                    this.goodsNum = this.stockNum;
                }

                if(this.goodsNum < 1){
                    this.goodsNum = 1;
                }
            },

            async addCart(){
                if(this.stockNum > 0){
                    const res = await addCart({product_type:'1',product_id:this.goodsData.id,spec_sku_id:this.chooseData,goods_num:this.goodsNum})
                    if(res.status == 1){
                        this.$message({
                            type: 'success',
                            message: '加入购物车成功'
                        });
                    }else if(res.status == -1){
                        this.$message({
                            type: 'error',
                            message: '暂未登陆'
                        });
                        this.isLogin = false;
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择合适属性'
                    });
                }
            },

            changeProp(){
                this.isLogin = true;
            },
        }
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
        padding-top: 15px;
        width: 1200px;
        margin: 0 auto;
        border-top: 1px solid #ccc;
    }
    .goods-box{
        width: 1200px;
        margin: 0 auto;
        padding-top: 40px;
        overflow: hidden;
    }
    .goods-carousel{
        float: left;
        width: 190px;
        height: 480px;
        margin-right: 30px;
        overflow: hidden;
    }
    .goods-img{
        box-sizing: border-box;
        float: left;
        width: 650px;
        height: 480px;
        margin:0 10px;
        background: #f3f3f3;
        border: 1px solid #f3f3f3;
        text-align: center;
        overflow: hidden;
    }
    .goods-img img {
        height: 478px;
        width: auto;
    }
    .goods-info{
        box-sizing: border-box;
        float: left;
        width: 310px;
        height: 400px;
        padding-left: 30px;
    }
    .goods-name{
        font-family: 'NexaBold';
        font-size: 20px;
        line-height: 30px;
        font-weight:700;
        overflow: hidden;
        word-wrap:break-word;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    .goods-price{
        margin-top: 8px;
        font-family: "NexaLight", sans-serif;
        font-size: 18px;
        font-weight: 300;
        color: #000;
    }
    .spec-box{
        margin-top: 15px;
    }
    .spec-name{
        font-family: 'NexaBold';
        font-size: 18px;
        line-height: 25px;
        font-weight:500;
    }
    .spec-val-box{
        width:290px;
        display:inline-block;
        float:left;
        overflow:hidden;
    }

    .spec-val-normal{
        box-sizing:border-box;
        float:left;
        display:block;
        height:35px;
        line-height:29px;
        padding:3px 8px;
        margin:7px 15px 7px 0;
        border:1px solid #f3f3f3;
    }

    .spec-val-on{
        box-sizing:border-box;
        float:left;
        display:block;
        height:35px;
        line-height:29px;
        padding:3px 8px;
        margin:7px 15px 7px 0;
        border:1px solid black;
    }

    .spec-val-none{
        box-sizing:border-box;
        float:left;
        display:block;
        height:35px;
        line-height:29px;
        padding:3px 8px;
        margin:7px 15px 7px 0;
        border:1px dashed #f3f3f3;
    }

    .spec-pic-normal{
        box-sizing:border-box;
        float:left;
        display:block;
        height:40px;
        width:40px;
        margin:7px 15px 7px 0;
        border:1px solid #f3f3f3;
    }
    .spec-pic-on{
        box-sizing:border-box;
        float:left;
        height:40px;
        width:40px;
        margin:7px 15px 7px 0;
        border:1px solid black;
    }

    .spec-pic-none{
        box-sizing:border-box;
        float:left;
        display:block;
        height:40px;
        width:40px;
        margin:7px 15px 7px 0;
        border:1px dashed #f3f3f3;
    }
    .goods-num-box{
        margin-top: 60px;
    }
    .stockNum{
        font-family: "NexaLight", sans-serif;
        font-size: 17px;
        font-weight: 400;
        color: #000;
    }
    .goods-content{
        width: 1200px;
        margin: 0 auto;
        padding: 80px 0 40px 0;
    }
    .add-cart-box{
        width: 100%;
        margin-top: 20px;
    }
    .add-cart{
        background: black;
        color: white;
        width: 200px;
        height: 50px;
        font-size: 15px;
    }
    .arrow-up{
        box-sizing: border-box;
        height: 40px;
        width: 100%;
        text-align: center;
    }
    .arrow-down{
        box-sizing: border-box;
        padding-top: 22px;
        height: 40px;
        width: 100%;
        text-align: center;
    }
    .carousel-box{
        overflow: hidden;
    }
    .carousel-list{
        width: 100%;
        height: 400px;
        transition: 700ms linear;
    }
    .carousel-pic{
        box-sizing: border-box;
        width: 100%;
        height: 120px;
        background: #f3f3f3;
        margin-bottom: 20px;
        text-align: center;
        border: 1px solid #f3f3f3;
    }
    .carousel-pic img{
        width: auto;
        height: 118px;
    }
    .rollScreen_list_unanim{
        transition: none
    }
</style>