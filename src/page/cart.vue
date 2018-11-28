<template>
    <div>
        <header-view></header-view>
        <div class="top-hidden"></div>
        <div class="tittle">home / Shopping cart</div>
        <div class="cart">
            <div class="cart-list" v-for="(item,index) in cartData">
                <div class="check-box">
                    <el-checkbox v-model="item.choose" @change="isChooseAll"></el-checkbox>
                </div>
                <div class="img-box">
                    <img :src="item.image_url" />
                </div>
                <div class="big-box">
                    <a href="javascript:void(0)" class="goods-name">{{item.goods_name}}</a>
                </div>
                <div class="big-box goods-attr">
                    {{item.goods_attr}}
                </div>
                <div class="min-box goods-price">
                    ￥{{item.goods_price}}
                </div>
                <div class="min-box">
                    {{item.goods_num}}
                </div>
                <div class="min-box goods-total-price">
                    ￥{{item.goods_price * item.goods_num}}
                </div>
                <div class="min-box">
                    <a href="javascript:void(0)" @click="deleteCart(item.id)" class="goods-name">移除</a>
                </div>
            </div>

            <div class="bottom"> </div>
            <div class="total">
                <div class="check-all">
                    <el-checkbox v-model="checked" @change="chooseAll">全选</el-checkbox>
                </div>
                <div class="delete-all"></div>
                <div class="num-price">
                    <div class="total-num">已选商品 <span>{{chooseNum}}</span> 件</div>
                    <div class="total-price">合计：<span>￥{{totalPrice}}</span></div>
                </div>
                <a href="javascript:void(0)" @click="goOrder"><div :class="chooseNum>0?'go-order':'order'">结  算</div></a>
            </div>
        </div>
    </div>
</template>
<script>
    import headerView from '@/components/Header'
    import {cartList,deleteCart} from '@/api/getData'
    export default {
        data(){
            return{
                cartData:[],
                checked:false,
                chooseNum:0,
                totalPrice:0,
            }
        },

        components: {
            headerView,
        },

        created(){
            this.initData();
        },
        methods:{
            async initData(){
                const res = await cartList();
                this.cartData = res.data;
                window.scrollTo(0, 0);
            },

            isChooseAll(){
                this.chooseNum = 0;
                this.totalPrice = 0;
                this.cartData.forEach((item,index) => {
                    if(item.choose){
                        this.chooseNum = this.chooseNum +1;
                        this.totalPrice = this.totalPrice + item.goods_price*item.goods_num;
                    }
                });
                if(this.chooseNum == this.cartData.length){
                    this.checked = true;
                }else{
                    this.checked = false;
                }
            },

            chooseAll(){
                this.chooseNum = 0;
                this.totalPrice = 0;
                this.cartData.forEach((item,index) => {
                    this.cartData[index].choose = this.checked;
                    if(this.checked){
                        this.chooseNum = this.chooseNum +1;
                        this.totalPrice = this.totalPrice + item.goods_price*item.goods_num;
                    }
                });
            },

            goOrder(){
                this.chooseGoods = [];
                if(this.chooseNum > 0){
                    this.cartData.forEach((item,index) => {
                        if(item.choose){
                            this.chooseGoods.push(item);
                        }
                    });
                    localStorage.setItem("chooseGoods",JSON.stringify(this.chooseGoods));
                    this.$router.push({path:'\confirmOrder',query:{nav:0}});
                }

            },

            async deleteCart(id){
                const res = await deleteCart(id);
                console.log(res);
                if(res.status == 1){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.initData();
                }else {
                    this.$message.error(res.message);
                }
            }
        },
    }
</script>
<style lang="less" scoped>
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
    .cart{
        padding-top:30px;
        width:1200px;
        margin:0 auto;
    }
    .icon{
        box-sizing:border-box;
        height:100px;
        padding:20px 0;
    }
    .cart-list{
        box-sizing:border-box;
        width:1200px;
        height:130px;
        background:#fcfcfc;
        border:1px solid #ccc;
        margin-top:20px;
        overflow:hidden;
    }

    .check-box{
        box-sizing:border-box;
        width:60px;
        padding:10px 20px;
        display:inline-block;
        float:left;
    }
    .img-box{
        float:left;
        box-sizing:border-box;
        display:inline-block;
        width:100px;
        height:100px;
        margin:15px 0;
    }
    .img-box img{
        width:100px;
        height:100px;
    }
    .big-box{
        float:left;
        box-sizing:border-box;
        display:inline-block;
        width:238px;
        height:130px;
        padding:20px;
    }
    .min-box{
        float:left;
        box-sizing:border-box;
        display:inline-block;
        width:140px;
        height:130px;
        padding-top:50px;
        text-align:center;
    }
    .goods-name{
        color:black;
        word-wrap:break-word;
        font-size:13px;
        text-overflow: ellipsis;
    }
    .total{
        box-sizing:border-box;
        position:fixed;
        width:1200px;
        height:60px;
        background:#f3f3f3;
        bottom:0;
    }
    .goods-attr{
        color:#9c9c9c;
        font-size:15px;
    }
    .goods-price{
        color:#3c3c3c;
        font-weight: 700;
        font-family: Verdana,Tahoma,arial;
        font-size:14px;
    }
    .goods-total-price{
        color:#f40;
        font-weight: 700;
        font-family: Verdana,Tahoma,arial;
        font-size:14px;
    }
    .bottom{
        height:100px;
        width:1200px;
        overflow: hidden;
    }
    .check-all{
        float: left;
        box-sizing: border-box;
        width: 100px;
        padding: 20px;
        display: inline-block;
        font-size: 16px;
        overflow: hidden;
    }
    .delete-all{
        float: left;
        display: inline-block;
        width: 60px;
        height: 60px;
        line-height: 62px;
        font-size: 14px;
        text-align: center;
        overflow: hidden;
    }
    .num-price{
        float: left;
        display: inline-block;
        text-align: right;
        width: 890px;
        overflow: hidden;
        line-height: 62px;
    }
    .total-num{
        padding-right: 20px;
        display: inline-block;
        overflow: hidden;
        font-size: 16px;
    }
    .total-num span{
        font-size: 20px;
        font-weight: 700;
    }
    .total-price{
        padding:0 40px;
        display: inline-block;
        overflow: hidden;
    }
    .total-price span{
        font-size: 20px;
        font-weight: 700;
    }
    .go-order{
        float: left;
        display: inline-block;
        width: 150px;
        height: 100px;
        background: black;
        color: white;
        overflow: hidden;
        line-height: 62px;
        text-align: center;
        font-size: 20px;
    }
    .order{
        float: left;
        display: inline-block;
        width: 150px;
        height: 100px;
        background: #888;
        color: white;
        overflow: hidden;
        line-height: 62px;
        text-align: center;
        font-size: 20px;
    }
    a:hover{
        text-decoration:underline;
    }
</style>