<template>
<div>
    <div class="head">
                <div class="head-name">宝贝</div>
                <div class="head-price">单价</div>
                <div class="head-num">数量</div>
                <div class="head-total">总价</div>
                <div class="head-do">交易操作</div>
            </div>
            <div class="list" v-for="(item,index) in deliveryData" :key="index">
                <div class="goods-list">
                    <div class="check-box">
                        <div class="check-head" >
                            <el-checkbox v-model="item.choose" @change="isChooseAll"></el-checkbox> 
                            <div class="list-number">订单号：{{item.order.order_no}}</div>
                            <div class="list-pay">和客服联系</div>
                        </div>
                    </div>
                    <div class="goods-box" v-for="(good,childindex) in item.goods" :key="childindex">
                        <div class="img-box">
                            <img :src="good.image_url" />
                        </div>
                        <div class="good-box">
                            <div class="name-box">{{good.goods_name}}</div>
                            <div class="para-box">{{good.goods_attr}}</div>
                        </div>
                        <div class="price-box">{{good.goods_price}}</div>
                        <div class="num-box">{{good.goods_num}}</div>
                        </div>
                    <div class="order-box">
                        <div class="total-box">{{item.order.pay_price}}</div>
                    </div>
                    <div class="confirm-box">
                        <button class="confirm" @click="confirmgoods">确认收货</button>
                        <button class="cancle" @click="canclegoods">取消收货</button>
                    </div>
                </div>
            </div>
            </div>
</template>

<script>
import {deliveryList} from '@/api/getData'

export default {
    data () {
        return {
            deliveryData: [],
            checked: false,
        }
    },
    created(){
            this.initData();
    },
    methods: {
        async initData(){
            const delivery = await deliveryList()
            this.deliveryData = delivery.data
            console.log(delivery)
        },
        isChooseAll(){
            if(this.deliveryData.length > 0){
                this.checked = true;
            }else{
                this.checked = false;
            }
        },
        confirmgoods () {
                console.log('确认收货')
        },
            canclegoods () {
                console.log('取消')
        }
    }
}
</script>

<style lang="less" scoped>
    .head {
        background: #eeeeee;
        width: 1000px;
    }
    .head-name {
        display: inline-block;
        padding-left: 20px;
        width: 400px;
        text-align: center;
    }
    .head-price {
        display: inline-block;
        width: 135px;
        text-align: center; 
    }
    .head-num {
        display: inline-block;
        width: 135px;
        text-align: center;
    }
    .head-total {
        display: inline-block;
        width: 150px;
        text-align: center;
    }
    .head-do {
        display: inline-block;
        width: 140px;
        text-align: center;
    }
    .list {
        width: 1200px;
        margin: 0 auto;
    
    }
    .goods-list {
        box-sizing: border-box;
        width: 1000px;
        background: #f7f7f7;
        border:1px solid #ccc;
        margin-top: 20px;
        overflow: hidden;
        margin-bottom: 50px;
    }
    .list-number {
        margin-left: 5px;
        display: inline-block;
        font-size: 13px;
    }
    .list-pay {
        display: inline-block;
        margin-left: 100px;
        font-size: 13px;
    }
    .check-head {
        display: inline-block;
    }
    .total-box {
        overflow:hidden;
        text-align: center;
        word-wrap: break-word;
        text-overflow: ellipsis;
        box-sizing:border-box;
        display:inline-block;
        width:130px;
        height:100px;
 
    }
    .order-box {
        overflow:hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        box-sizing:border-box;
        display:inline-block;
        width:150px;
        padding-top:25px;
        text-align:center;
    }
    .check-box{
        padding-left: 5px;
        width: 1000px;
        height: 28px;
        background: #c8c8c8;
    }
    .goods-box {
        float: left;
        font-family: Verdana,Tahoma,arial;
        box-sizing: border-box;
        display: inline-block;
        width: 710px;
        padding-top: 25px;
    }
    .img-box{
        float:left;
        box-sizing: border-box;
        display:inline-block;
        width:100px;
        height:100px;
        margin-left: 20px;
    }
    .img-box img{
        width:100px;
        height:100px;
    }
    .good-box {
        overflow:hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        box-sizing:border-box;
        display:inline-block;
        width:280px;
        height:100px;
        margin-left: 15px;
    }
    .para-box {
        overflow:hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        box-sizing:border-box;
        display:inline-block;
        width:280px;
        height:30px;
        margin-top: 10px;
    }
    .price-box {
        word-wrap: break-word;
        text-overflow: ellipsis;
        overflow:hidden;
        box-sizing:border-box;
        display:inline-block;
        width:130px;
        height:100px;
        text-align: center;
        margin-left: 10px;
    }
    .num-box {
        word-wrap: break-word;
        text-overflow: ellipsis;
        overflow:hidden;
        box-sizing:border-box;
        display:inline-block;
        width:120px;
        height:100px;
        text-align: center;
        margin-left: 10px;
     
    }
    .confirm-box {
        float: right;
        box-sizing:border-box;
        display:inline-block;
        width:130px;
        height:170px;
        padding-top:30px;
        text-align:center;
    }
    .confirm {
        margin-top: 5px;
        color: white;
        background: black;
        word-wrap: break-word;
        text-overflow: ellipsis;
        font-size: 13px;
        width: 70px;
        height: 25px;
    }
    .cancle {
        margin-top: 5px;
        color: white;
        background: gray;
        word-wrap: break-word;
        text-overflow: ellipsis;
        font-size: 13px;
        width: 70px;
        height: 25px;
    }
</style>
