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
        <div class="tittle">home / register</div>

        <div class="register-box" >
            <el-form  label-width="80px" :model="formData" :rules="rules" ref="formData">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="formData.password" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item label="密码确认" prop="password1">
                    <el-input type="password" v-model="formData.password1" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" style="width: 240px"></el-input>
                </el-form-item>
                <div class="getcode">
                    <el-button type="info" style="width:160px;" v-if="cutDown==0" @click="getCode">获取验证码</el-button>
                    <el-button type="info" style="width:160px;" v-if="cutDown>0" disabled @click="getCode">{{cutDown}}秒后重新获取</el-button>
                </div>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="formData.code" style="width: 240px"></el-input>
                </el-form-item>
            </el-form>
            <div class="buttom">
                <el-button type="info" style="width:290px;" @click="submitForm">注册</el-button>
                <a href="javascript:void(0)" @click="goLogin"><span>登陆-></span></a>
            </div>
        </div>

        <footer-view></footer-view>
    </div>
</template>

<script>
    import footerView from '@/components/footer'
    import {getEmailCode,register} from '@/api/getData'
    export default {
        data(){
            var checkEmail = (rule, value, callback) => {
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if (!reg.test(this.formData.email)) {
                    callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            };
            var checkPassword = (rule, value, callback) => {
                if (this.formData.password !== this.formData.password1) {
                    callback(new Error('两次输入密码不相同'));
                } else {
                    callback();
                }
            };
            return{
                cutDown:0,
                formData:{
                    username: '',
                    password: '',
                    password1: '',
                    email: '',
                    code:'',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, message: '长度在至少 6 个字符', trigger: 'blur' }
                    ],
                    password1: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator: checkPassword, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { validator: checkEmail, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                },
            }
        },

        components: {
            footerView,
        },

        mounted(){

        },

        methods:{
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

            goLogin(){
                this.$router.push('/login');
            },

            async getCode(){
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if(reg.test(this.formData.email)){
                    const res = await getEmailCode({email:this.formData.email});
                    if(res.status == 1){
                        this.cutDown = 90;
                        var _this = this;
                        setInterval(function () {
                            _this.settime();
                        },1000)
                    }else {
                        this.$message.error('获取验证码失败');
                        this.cutDown = 90;
                        var _this = this;
                        setInterval(function () {
                            _this.settime();
                        },2000)
                    }
                }else{
                    this.$message.error('请填写正确的邮箱格式');
                }
            },

            async submitForm(){
                this.$refs['formData'].validate(async (valid) => {
                    if (valid) {
                        const res = await register(this.formData);
                        console.log(res);
                        if(res.status == 1){
                            this.$message({
                                message: '恭喜你，注册成功！',
                                type: 'success'
                            });
                            this.$router.push('/login');
                        }
                    }else{
                        this.$message.error('请检查输入是否正确');
                        return false;
                    }
                });
            },

            settime(){
                if(this.cutDown > 0){
                    this.cutDown--;
                }
            },
        },
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
    .register-box{
        box-sizing: border-box;
        width: 1200px;
        height: 550px;
        margin: 0 auto;
        padding: 50px 430px;
    }
    .buttom{
        margin:30px;
        width: 400px;
    }
    .buttom span{
        margin-left: 20px;
        font-size: 14px;
    }
    .getcode{
        margin-bottom: 20px;
        margin-left: 80px;
    }
</style>