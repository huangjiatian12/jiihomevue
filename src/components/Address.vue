<template>
    <div class="address-box" :style="{top: top + 'px',left:left + 'px'}">
        <div class="top">
            <span>创建地址</span>
            <a href="javascript:void(0)" class="close" @click="close"><i class="el-icon-close"></i></a>
        </div>
        <div class="form-box">
            <el-form :model="formData" :rules="rules"  ref="formData" label-width="100px" class="demo-ruleForm">
                <el-form-item label="地址信息:" prop="town_id">
                    <el-select v-model="formData.province_id" @change="changeProvince" filterable placeholder="请选择省份" size="small" style="width: 140px">
                        <el-option
                                v-for="item in region"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-if="formData.province_id" v-model="formData.city_id" @change="changeCity" filterable placeholder="请选择市" size="small" style="width: 140px">
                        <el-option
                                v-for="item in cityData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-if="formData.city_id" v-model="formData.town_id" filterable placeholder="请选择区\县" size="small" style="width: 140px">
                        <el-option
                                v-for="item in townData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id+'/'+item.merger_name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细地址:" prop="address">
                    <el-input type="textarea" v-model="formData.address" style="width: 430px"></el-input>
                </el-form-item>
                <el-form-item label="收货人姓名:" prop="sccept_name">
                    <el-input v-model="formData.sccept_name" style="width: 430px"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" prop="telphone">
                    <el-input v-model="formData.telphone" style="width: 430px"></el-input>
                </el-form-item>

                <div class="submit">
                   <el-button type="primary" @click="submitForm('formData')" >保存</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {region} from '@/api/getData'
    import {addAddress} from '@/api/getData'
    export default {
        data(){
            var checkPhone = (rule, value, callback) => {
                var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            return{
                top:'',
                left:'',
                region:[],
                cityData:[],
                formData: {
                    province_id:'',
                    city_id:'',
                    town_id:'',
                    area_id:'',
                    area_name:'',
                    address:'',
                    sccept_name:'',
                    telphone:'',
                },
                rules: {
                    sccept_name: [
                        { required: true, message: '请输入收件人姓名', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    town_id: [
                        { required: true, message: '请选择收货地址', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' },
                    ],
                    telphone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: checkPhone, trigger: 'blur' }
                    ],
                },
            }

        },

        mounted(){
            this.initData();
        },

        methods:{
            async initData(){
                var h = document.documentElement.clientHeight || document.body.clientHeight;
                var w = document.documentElement.clientWidth || document.body.clientWidth;
                this.top = (h-498)*2/5;
                this.left = (w-798)/2;
                const res = await region();
                console.log(res)
                if(res.status == 1){
                    this.region = res.data
                }
                console.log(this.region)
            },

            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.formData.area_name = this.formData.town_id.split('/');
                        this.formData.area_id = this.formData.area_name[0];
                        this.formData.area_name = this.formData.area_name[1];
                        console.log(this.formData)
                        const res = await addAddress(this.formData);
                        if(res.status == 1){
                            this.close()
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            changeProvince(index){
                this.formData.city_id = '';
                this.formData.town_id = '';
                this.cityData = this.region[index].city
            },

            changeCity(index){
                this.formData.town_id = '';
                this.townData = this.cityData[index].region
            },

            close(){
                this.$emit("listenToChildEvent",false)
            },
        }
    }
</script>

<style scoped>
  .address-box{
      position:absolute;
      z-index: 1000;
      box-sizing: border-box;
      width: 800px;
      height: 500px;
      background: white;
      border: 2px solid #f3f3f3;
  }
  .top{
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      background: #f3f3f3;
      line-height: 40px;
      padding: 0 20px;
      font-size: 15px;
      font-weight: 700;
  }
    .form-box{
        padding: 30px 100px;
    }
    .submit{
        width: 100%;
        text-align: center;
        margin-top: 60px;
    }
    .close{
        float: right;
    }
</style>