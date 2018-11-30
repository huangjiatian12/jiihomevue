<template>
    <div>
        <div class="header-box">
        <login-view v-if="showLogin" v-on:listenToChildEvent="getLoginVal"></login-view>
        <div class="header">
            <div class="nav-box">
               <ul>
                   <li>
                       <i class="el-icon-search"></i>
                   </li>
                    <li><a href="javascript:void(0)" 
                           @click="goToCart" 
                           title="Shopping cart" 
                           class="nav-normal">
                        <i class="el-icon-goods"></i>
                        </a>
                    </li>
                    <li class="user-img" @mouseleave="hideLogout">
                        <img :src="userImg" @mouseover="showLogout" @click="login"/>
                        <div :class="showOut?'logout-show':'logout'" >
                            <div class="user-nav"><a href="javascripe:void(0)" @click="userInfo">个人中心</a></div>
                            <div class="user-nav"><a href="javascripe:void(0)" @click="logout">退出</a></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
        <div id="top">
            <div id="theme">
                <img src="../assets/top.png" />
            </div>
        <div id="menu">
          <!-- <el-button type="text" class="menu-theme" @click="goTo(1)" style="color:#3a8ee6;">Home</el-button> -->
            <el-button type="text" class="menu-theme" @click="goTo(2)">Design</el-button>
            <el-button type="text" class="menu-theme" @click="goTo(3)">Product</el-button>
            <el-button type="text" class="menu-theme" @click="goTo(4)">customize</el-button>
            <el-button type="text" class="menu-theme" @click="goTo(5)">About Us</el-button>
        </div>
    </div>

    <div class="carousel">
      <el-carousel :interval="4000" height="500px">
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
    import loginView from '@/components/login'
    import {logout} from '@/api/getData'

    export default {
        data(){
            return {
                nav:0,
                showLogin:false,
                isLogin:false,
                showOut:false,
                userImg:'http://static.jiihome.com/user.png',
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
            loginView,
        },

        mounted(){
            this.initData();
        },

        methods:{
            initData() {
                var h = document.documentElement.clientHeight || document.body.clientHeight;
                this.winHeight = (h-100)+'px';
                window.scrollTo(0, 0);
                var routerParams = this.$route.query;
                if(routerParams.nav){
                    this.nav = routerParams.nav;
                }
                if(routerParams.isl){
                    sessionStorage.setItem('isLogin',true);
                }

                if(sessionStorage.getItem('isLogin') && localStorage.getItem('isLogin')){
                    this.userImg = localStorage.getItem('userImg');
                }else{
                    this.userImg = 'http://static.jiihome.com/user.png';
                }
            },
            getLoginVal(data) {
                this.showLogin = data;
                this.$emit("listenToChildEvent",true);
                if(sessionStorage.getItem('isLogin') && localStorage.getItem('isLogin')){
                    this.userImg = localStorage.getItem('userImg');
                }
            },

            showLogout() {
                if(sessionStorage.getItem("isLogin") && localStorage.getItem('isLogin')){
                    this.isLogin = true;
                    this.showOut = true;
                }else{
                    this.isLogin = false;
                }
            },

            login() {
                if(!sessionStorage.getItem("isLogin") || !localStorage.getItem("isLogin")){
                    this.isLogin = false;
                    this.showLogin = true;
                }else{
                    this.isLogin = true;
                }
            },

            async logout() {
                const res = await logout()
                if(res.status == 1){
                    sessionStorage.removeItem("isLogin");
                    localStorage.removeItem("isLogin");
                    this.isLogin = false;
                    this.showOut = false;
                    this.$message({
                        type: 'success',
                        message: '退出成功',
                    });
                    this.userImg = 'http://static.jiihome.com/user.png';
                    this.$router.push('/');
                }else{
                    this.$message({
                        type: 'error',
                        message: '退出失败',
                    });
                }
            },

            hideLogout() {
                this.showOut = false;
            },

            changeStatus() {
                if(!this.parentToChild){
                    sessionStorage.removeItem("isLogin");
                    localStorage.removeItem("isLogin");
                    this.isLogin = false;
                    this.showLogin = true;
                }
            },

            goToDesign() {
                this.$router.push({path:'\designList',query:{nav:4}});
            },

            goTo(key) {
                if(key == 2){
                    this.$router.push({path:'\designList',query:{theme:2}});
                }else if(key == 3){
                    this.$router.push({path:'\goodsList',query:{theme:3}});
                }else if(key == 4) {
                    this.$router.push({path:'\customizeList',query:{nav:3}});
                }
            },

            userInfo() {
                this.$router.push({path:'\info'});
            },

            goToCart(){
                console.log(localStorage.getItem("isLogin"));
                if(!sessionStorage.getItem("isLogin") || !localStorage.getItem("isLogin")){
                    this.isLogin = false;
                    this.showLogin = true;
                }else{
                    this.isLogin = true;
                    const {href} = this.$router.resolve({
                        path: "\cart",
                        query: {
                            nav: 0,
                            isl:sessionStorage.getItem('isLogin'),
                        }
                    });
                    window.open(href, '_blank');
                }

            },
        }
    }
</script>

<style lang="less" scoped>
    .carousel{
      width: 40%;
      background: #f3f3f3;
      margin-bottom: 50px;
      margin-left: 30%;
    }
    .carousel-img{
      margin-top: 100px;
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
	#top{
      height: 300px;
	}
	#icon{
	  box-sizing:border-box;
	  padding-right:40px;
	  height: 60px;
	  line-height:70px;
      text-align:right;
	}
    .top-icon {
      font-size: 26px;
      margin-left: 35px;
    }
	#theme{
	   text-align:center;
	   height:230px;
	   line-height:200px;
	}
	#theme img{
	    margin-top:25px;
	    height:150px;
	}
	#menu{
	  text-align:center;
	  height:80px;
	  line-height:80px;
	  font-size:26px;
	}
	.menu-theme{
	  color:black;
	  font-size:28px;
	}
	.el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 100px;
      margin: 0;
    }
  
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
  
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
   .header-box{
       top: 0;
       box-sizing: border-box;
       width: 100%;
       height: 100px;
       padding: 20px 0;
       background: white;
    }
    .header{
       box-sizing: border-box;
       width: 1200px;
       height: 60px;
       margin:0 auto;
    }
    .header img{
        height: 60px;
    }
    .nav-box{
        height: 60px;
        display: inline-block;
        float: right;
    }
    .nav-box ul{
        list-style: none;
        margin-top:15px ;
    }
    .nav-box ul li{
        display: inline-block;
        font-family: "NexaLight",sans-serif;
        font-size: 16px;
        line-height: 19.2px;
        text-transform: lowercase;
        vertical-align: middle;
        margin: 0 20px;
    }
    .nav-normal{
        color: #000;
        font-weight: 300;
    }
    .nav-choose{
        color: black;
        font-weight: 700;
    }
    .user-img{
        width: 24px;
        height: 24px;
        border-radius: 12px;
    }
    .user-img img{
        width: 24px;
        height: 24px;
        border-radius: 12px;
    }
   .logout{
       display:none;
   }
   .logout-show{
       position:relative;
       width:100px;
       background:white;
       border:1px solide #f3f3f3;
       z-index: 999999;
       top:0px;
       right:30px;
       border:1px solid #f3f3f3;
       font-size:16px;
       line-height:30px;
       text-align:center;
       border: 1px solid #ccc;
   }
   .user-nav{
       font-size:14px;
       padding-top: 5px;
   }
</style>