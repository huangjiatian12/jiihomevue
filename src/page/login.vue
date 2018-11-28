<template>
    <div>
        <div class="header-box">
            <div class="header">
                <a href="javascript:void(0)" @click="goHome" title="JiiHome"><img src="../assets/top.png" alt="JiiHome" /></a>
                <div class="nav-box">
                    <ul>
                        <li><a href="javascript:void(0)" @click="goToAbout" title="About" class="nav-normal">about</a></li>
                        <li><a href="javascript:void(0)" @click="goToShop" title="Shop" class="nav-normal">shop</a></li>
                        <li><a href="javascript:void(0)" @click="goToCustomize" title="Customize" class="nav-normal">customize</a></li>
                        <li><a href="javascript:void(0)" @click="goToDesign" title="Design" class="nav-normal">design</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="top-hidden"></div>
        <div class="tittle">home / login</div>

        <div class="login-box" :style="{height:height + 'px',paddingTop:top + 'px'}">
            <el-form  label-width="80px" :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="loginForm.code" style="width: 240px"></el-input>
                </el-form-item>
            </el-form>
            <div class="text">
                <img :src="captcha" @click="changeCode()" style="margin-bottom:10px;" />
            </div>
            <div class="buttom">
                <el-button type="info" style="width:290px;" @click="submitForm">登陆</el-button>
                <a href="javascript:void(0)" @click="goRegister"><span>去注册-></span></a>
            </div>
        </div>
        <footer-view></footer-view>
    </div>
</template>

<script>
    import footerView from '@/components/footer'
    import {login} from '@/api/getData'
    export default {
        data(){
            return{
                captcha:'',
                height:450,
                top:50,
                loginForm:{
                    username: '',
                    password: '',
                    code:'',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                },
            }
        },

        components: {
            footerView,
        },

        mounted(){
            this.initData();
            this.changeCode();
        },

        methods:{
            initData(){
                if(localStorage.getItem('isLogin')){
                    this.$router.push('/');
                }

                var h = document.documentElement.clientHeight || document.body.clientHeight;
                if(h > 790){
                    this.height = h-360;
                    this.top = (h-790)/2;
                }
            },

            changeCode(){
                this.captcha = 'http://jiihome.shimentown.com/captcha?id='+Math.random();
                this.loginForm.code = '';
            },

            async submitForm(){
                this.$refs['loginForm'].validate(async (valid) => {
                    console.log(valid)
                    if (valid) {
                        const res = await login(this.loginForm)
                        if(res.status == 1){
                            sessionStorage.setItem("isLogin",true);
                            localStorage.setItem("isLogin",true);
                            this.$message({
                                type: 'success',
                                message: '登陆成功',
                            });
                            this.$router.push('/');
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                            this.changeCode();
                        }
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: '请输入用户名密码',
                            offset: 100
                        });
                        return false;
                    }
                });
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

            goRegister(){
                this.$router.push('/register');
            },
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
        height: 40px;
        border-top: 1px solid #ccc;
    }
    .login-box{
        box-sizing: border-box;
        width: 1200px;
        margin: 0 auto;
        padding: 0 430px;
    }
    .text{
        margin-top:15px;
        margin-left:30px;
        width:290px;
    }
    .text img{
        width:290px;
        height:50px;
    }
    .buttom{
        margin:20px 0 0 30px;
        width: 400px;
    }
    .buttom span{
        margin-left: 20px;
        font-size: 14px;
    }
</style>