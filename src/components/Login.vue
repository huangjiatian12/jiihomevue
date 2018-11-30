<template>
    <div id="login-box" v-drag :style="{top: top + 'px',left:left + 'px'}">
        <div class="info-box">
            <div class="login-top">JiiHome 几和家具 <a href="javascript:void(0)" @click="closeLogin" class="close"><i class="el-icon-circle-close"></i></a> </div>
            <div class="pass">
                <a href="javascript:void(0)" @click="goRegister"><div class="go-register">去注册-></div></a>
                <div class="login-theme">密码登陆</div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <div class="text">
                        <el-form-item prop="username">
                            <el-input  v-model="loginForm.username">
                                <template slot="prepend" style="width:40px;">用户名</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="text">
                        <el-form-item prop="password">
                            <el-input p v-model="loginForm.password" type="password">
                                <template slot="prepend" style="width:40px;">密&nbsp;&nbsp;&nbsp;码</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="text">
                        <el-form-item prop="code">
                            <el-input  v-model="loginForm.code" >
                                <template slot="prepend" style="width:40px;">验证码</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="text">
                    <img :src="captcha" @click="changeCode()" style="margin-bottom:10px;" />
                </div>
                <div class="buttom">
                    <el-button type="danger" style="width:290px;" @click="submitForm">登陆</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {login} from '@/api/getData'
    export default {
        data(){
            return{
                top:'',
                left:'',
                captcha:'http://jiihome.shimentown.com/captcha',
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
        created(){
            this.initData();
            this.changeCode();
        },

        directives:{
            drag(el) {
                el.onmousedown = function(e) {
                var divx = e.clientX - document.getElementById('login-box').offsetLeft;
                var divy = e.clientY - document.getElementById('login-box').offsetTop;
                document.onmousemove = function(e){
                    var l = e.clientX - divx;
                    var t = e.clientY - divy;
                    document.getElementById('login-box').style.left=l+'px';
                    document.getElementById('login-box').style.top=t+'px';
                }
                document.onmouseup = function(e){
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
            }
        },

        methods:{
            initData(){
                var h = document.documentElement.clientHeight || document.body.clientHeight;
                var w = document.documentElement.clientWidth || document.body.clientWidth;
                this.top = (h-436)/3;
                this.left = (w-350)/2;
            },

            closeLogin(){
                this.$emit("listenToChildEvent",false)
            },

            changeCode(){
                this.captcha = 'http://jiihome.shimentown.com/captcha?id='+Math.random();
                this.loginForm.code = '';
            },

            async submitForm(){
                this.$refs['loginForm'].validate(async (valid) => {
                    if (valid) {
                        const res = await login(this.loginForm)
                        console.log(res)
                        if(res.status == 1){
                            sessionStorage.setItem("isLogin",true);
                            localStorage.setItem("isLogin",true);
                            localStorage.setItem("userImg",res.data.image_url);
                            this.closeLogin();
                            this.$message({
                                type: 'success',
                                message: '登陆成功',
                            });
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

            goRegister(){
                this.$router.push('/register');
            },
          
        }
    }
</script>

<style lang="less" scoped>
    a{
        text-decoration:none;
        color:#fff;
    }
    #login-box{
        position:absolute;
        width: 350px;
        height: 436px;
        z-index: 999999;
        padding:10px;
        // background-color: #f3f3f3;
    }
    .info-box{
        width:100%;
        height:100%;
        box-sizing:border-box;
        background:#fff;
    }
    .login-top{
        height:35px;
        line-height:35px;
        background:red;
        color:#fff;
        padding-left:15px;
        font-size:14px;
        font-weight:700;
    }
    .close{
        float:right;
        padding-right:10px;
    }
    .go-register{
        margin-top: 10px;
        text-align: right;
        padding-right: 30px;
        font-size: 14px;
        color: black;
    }
    .login-theme{
        margin-left:30px;
        height: 18px;
        line-height: 18px;
        font-size: 16px;
        font-weight:700;
        color: #3c3c3c;
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
        width:290px;
    }
</style>