<template>
    <div class="header-box">
        <login-view v-if="showLogin" v-on:listenToChildEvent="getLoginVal"></login-view>

        <div class="header">
            <a href="javascript:void(0)" @click="goHome" title="JiiHome"><img src="../assets/top.png" alt="JiiHome" /></a>
            <div class="nav-box">
               <ul>
                 <li><a href="javascript:void(0)" @click="goToAbout" title="About" :class="nav==1?'nav-choose':'nav-normal'">about</a></li>
                 <li><a href="javascript:void(0)" @click="goToShop" title="Shop" :class="nav==2?'nav-choose':'nav-normal'">shop</a></li>
                 <li><a href="javascript:void(0)" @click="goToCustomize" title="Customize" :class="nav==3?'nav-choose':'nav-normal'">customize</a></li>
                 <li><a href="javascript:void(0)" @click="goToDesign" title="Design" :class="nav==4?'nav-choose':'nav-normal'">design</a></li>
                 <li><a href="javascript:void(0)" @click="goToCart" title="Shopping cart" class="nav-normal"><i class="el-icon-goods"></i></a></li>
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
</template>

<script>
    import loginView from '@/components/login'
    import {logout} from '@/api/getData'
    export default {
        data(){
            return{
                nav:0,
                showLogin:false,
                isLogin:false,
                showOut:false,
                userImg:'http://static.jiihome.com/user.png',
            }
        },

        props: ['parentToChild'],

        components: {
            loginView,
        },

        watch:{
            parentToChild:function(curVal,oldVal){
                this.changeStatus()
            }
        },

        mounted(){
           this.initData();
        },

        methods:{
            initData(){
                // 取到路由带过来的参数
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

            getLoginVal(data){
                this.showLogin = data;
                this.$emit("listenToChildEvent",true);
                if(sessionStorage.getItem('isLogin') && localStorage.getItem('isLogin')){
                    this.userImg = localStorage.getItem('userImg');
                }
            },

            showLogout(){
                if(sessionStorage.getItem("isLogin") && localStorage.getItem('isLogin')){
                    this.isLogin = true;
                    this.showOut = true;
                }else{
                    this.isLogin = false;
                }
            },

            login(){
                if(!sessionStorage.getItem("isLogin") || !localStorage.getItem("isLogin")){
                    this.isLogin = false;
                    this.showLogin = true;
                }else{
                    this.isLogin = true;
                }
            },

            async logout(){
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

            changeStatus(){
                if(!this.parentToChild){
                    sessionStorage.removeItem("isLogin");
                    localStorage.removeItem("isLogin");
                    this.isLogin = false;
                    this.showLogin = true;
                }
            },

            hideLogout(){
                this.showOut = false;
            },

            goHome(){
                this.$router.push('/');
            },

            goToAbout(){

            },

            goToShop(){
                this.$router.push({path:'\goodsList',query:{nav:2}});
            },

            goToCustomize(){
                this.$router.push({path:'\customizeList',query:{nav:3}});
            },

            goToDesign(){
                this.$router.push({path:'\designList',query:{nav:4}});
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

            userInfo(){
                this.$router.push({path:'\info'});
            }
        }
    }
</script>

<style scoped>
   .header-box{
       position: fixed;
       top: 0;
       box-sizing: border-box;
       width: 100%;
       height: 100px;
       padding: 20px 0;
       background: white;
       z-index: 999;
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