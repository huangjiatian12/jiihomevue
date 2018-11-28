<template>
    <div>
        <address-view v-if="isaddAddress" v-on:listenToChildEvent="getAddVal"></address-view>
        <header-view></header-view>
        <div class="top-hidden"></div>
        <div class="tittle">home / Confirm order</div>
        <div class="box">
            <div class="box-tittle">选择收货地址</div>
            <div v-for="(item,index) in addressList">
                <el-radio v-model="radio" :label="index" @change="changeRadio">
                    <span class="address-weight">{{item.sccept_name}}</span>
                    <span class="address-normal">{{item.telphone}}</span>
                    <span class="address-normal">{{item.area_name}}</span>
                    <span class="address-normal">{{item.address}}</span>
                </el-radio>
            </div>

            <el-button class="addAddress" size="mini" @click="openAdd" plain>使用新地址</el-button>
        </div>
        <div class="box">
            <div class="box-tittle">确认订单信息</div>
            <div class="tittle-box">
                <div class="long-tittle">商品名称</div>
                <div class="long-tittle">商品属性</div>
                <div class="short-tittle">单价</div>
                <div class="short-tittle">数量</div>
                <div class="short-tittle">小计</div>
            </div>

            <div class="goods-list" v-for="item in goodsData">
                <div class="goods-tittle">
                    <div class="goods-img"><img :src="item.image_url" alt=""></div>
                    <div class="goods-name">{{item.goods_name}}</div>
                </div>
                <div class="goods-attr">{{item.goods_attr}}</div>
                <div class="goods-price">{{item.goods_price}}</div>
                <div class="goods-num">{{item.goods_num}}</div>
                <div class="goods-total-price">{{item.goods_num * item.goods_price}}</div>
            </div>
        </div>
        <div class="submit-box">
            <div class="submit-info">
                <div class="submit-price">实付款: <span>￥{{totalPrice}}</span></div>
                <div class="submit-area">寄送至: <span>{{scceptArea}}</span></div>
                <div class="submit-name">收货人: <span>{{scceptName}}</span></div>
            </div>
        </div>
        <div class="submit-sure">
            <a href="javascript:void(0)" @click="submit"><div class="submit">提交订单</div></a>
        </div>
        
        <footer-view></footer-view>
    </div>
</template>

<script>
    import headerView from '@/components/Header'
    import AddressView from '@/components/Address'
    import footerView from '@/components/footer'
    import {getAddressList,addOrder} from '@/api/getData'
    export default {
        data(){
            return{
                isaddAddress:false,
                addressList:[],
                goodsData:[],
                formData:{},
                radio:'',
                scceptArea:'',
                scceptName:'',
                totalPrice:0,
            }
        },

        components: {
            headerView,
            footerView,
            AddressView,
        },

        mounted(){
            this.initData();
        },

        methods:{
            initData(){
                this.getAddress();
                this.goodsData = localStorage.getItem('chooseGoods');
                this.goodsData = JSON.parse(this.goodsData);
                this.totalPrice = 0;
                this.goodsData.forEach(item => {
                    this.totalPrice = this.totalPrice + item.goods_num * item.goods_price;
                })
            },

            async getAddress(){
                const res = await getAddressList();
                console.log(res)
                if(res.status == 1){
                    this.addressList = res.data;
                }
            },

            async submit(){
                if(this.radio !== ''){
                    this.formData.address_id = this.addressList[this.radio].id;
                    this.formData.goods = [];

                    this.goodsData.forEach(item => {
                       this.formData.goods.push({"product_type":item.product_type,"product_id":item.product_id,"goods_name":item.goods_name,"spec_sku_id":item.spec_sku_id,"goods_num":item.goods_num});
                    });
                    console.log(this.formData)
                    const res = await addOrder(this.formData);
                    console.log(res);
                    if(res.status == 1){
                        this.$router.push({path:'\pay',query:{nav:0,orderId:res.data}});
                    }
                }else{
                    this.$message({
                        message: '请选择收货地址！',
                        type: 'warning'
                    });
                }
            },

            openAdd(){
                this.isaddAddress = true;
            },

            getAddVal(data){
                this.isaddAddress = data;
                this.getAddress();
            },

            changeRadio(index){
                console.log(this.addressList[index])
                this.scceptArea = this.addressList[index].area_name +' '+ this.addressList[index].address;
                this.scceptName = this.addressList[index].sccept_name +' '+ this.addressList[index].telphone;
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
        font-size: 12px;
        line-height: 14.4px;
        text-transform: lowercase;
        color: #727272;
        padding-top: 15px;
        width: 1200px;
        margin: 0 auto;
        border-top: 1px solid #ccc;
    }
    .box{
        width: 1200px;
        margin: 0 auto;
    }
    .box-tittle{
        margin: 20px 0;
        line-height: 25px;
        color: #333;
        font-weight: 700;
        font-size: 15px;
    }
    .address-weight{
        line-height: 30px;
        color: #333;
        font-weight: 600;
        font-size: 15px;
    }
    .address-normal{
        line-height: 30px;
        color: #333;
        font-weight: 400;
        font-size: 15px;
        margin: 0 5px;
    }
    .addAddress{
        margin-top: 16px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    .tittle-box{
        overflow: hidden;
        margin-top: 30px;
    }
    .long-tittle{
        box-sizing: border-box;
        float: left;
        width: 335px;
        text-align: center;
        padding:5px;
        margin:0 5px;
        border-bottom: 3px solid #ccc;
        font-size: 15px;
        font-weight: 400;
    }
    .short-tittle{
        box-sizing: border-box;
        float: left;
        width: 160px;
        padding:5px;
        margin:0 5px;
        text-align: center;
        border-bottom: 3px solid #ccc;
        font-size: 15px;
        font-weight: 400;
    }
    .goods-list{
        box-sizing: border-box;
        width: 1200px;
        height: 100px;
        overflow: hidden;
        margin-top: 20px;
        border: 1px solid #ccc;
    }
    .goods-tittle{
        box-sizing: border-box;
        float: left;
        width: 345px;
    }
    .goods-img{
        box-sizing: border-box;
        float: left;
        width: 80px;
        height: 80px;
        background: #f3f3f3;
        border: 1px solid #f3f3f3;
        margin: 10px;
        overflow: hidden;
    }
    .goods-img img{
        width: auto;
        height: 78px;
    }
    .goods-name{
        box-sizing: border-box;
        float: left;
        width: 240px;
        padding:10px 20px;
        word-wrap:break-word;
        font-size:14px;
        text-overflow: ellipsis;
    }
    .goods-attr{
        box-sizing: border-box;
        float: left;
        width: 345px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 14px;
    }
    .goods-price{
        box-sizing: border-box;
        float: left;
        width: 168px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
    }
    .goods-num{
        box-sizing: border-box;
        float: left;
        width: 168px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 14px;
    }
    .goods-total-price{
        box-sizing: border-box;
        float: left;
        width: 168px;
        height: 100px;
        line-height: 100px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
    }
    .submit-box{
        width: 1200px;
        text-align: right;
        margin: 0 auto;
        padding-top: 40px;
        overflow: hidden;
    }
    .submit-info{
        padding: 15px;
        width: 450px;
        float: right;
        border: 1px solid black;
        overflow: hidden;
    }
    .submit-price{
        font-size: 14px;
        font-weight: 700;
    }
    .submit-price span{
        font-size: 22px;
    }
    .submit-area{
        font-size: 14px;
        font-weight: 700;
        margin: 8px 0;
    }
    .submit-area span{
        font-size: 14px;
        font-weight: 400;
    }
    .submit-name{
        font-size: 14px;
        font-weight: 700;
    }
    .submit-name span{
        font-size: 14px;
        font-weight: 400;
    }
    .submit-sure{
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
    }
    .submit{
        float: right;
        width: 140px;
        height: 50px;
        line-height: 50px;
        background: black;
        color: white;
        text-align: center;
        font-size: 16px;
        overflow: hidden;
        margin-bottom: 60px;
    }
</style>