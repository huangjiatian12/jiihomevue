<template>
    <div>
    <div class="head">
        <span>修改地址</span>
    </div>
    <el-row style="margin-top: 100px;">
  			<el-col :span="12" :offset="3" class="form" label-width="100px">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px">
					<el-form-item label="收货人姓名" prop="sccept_name">
						<el-input v-model="formData.sccept_name"></el-input>
					</el-form-item>
					<el-form-item label="手机号码" prop="telphone">
						<el-input v-model="formData.telphone"></el-input>
					</el-form-item>
                    <el-form-item label="区域">
						<el-select  v-model="formData.province_id" 
						            @change="changeProvince" 
								    filterable 
								    placeholder="请选择省份" 
								    size="small" 
								    style="width: 140px">
                            <el-option
                                    v-for="item in regionData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
					    <el-select  v-if="formData.province_id" 
									v-model="formData.city_id" 
									@change="changeCity" 
									filterable 
									placeholder="请选择市" 
									size="small" 
									style="width: 140px">
                            <el-option
                                    v-for="item in cityData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
						<el-select  v-if="formData.city_id" 
									v-model="formData.area_id" 
									filterable 
									placeholder="请选择区\县" 
									size="small" 
									style="width: 140px">
                            <el-option
                                    v-for="item in areaData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
					</el-form-item>
                    <el-form-item label="详细地址" prop="address">
						<el-input v-model="formData.address"></el-input>
					</el-form-item>
					<!-- <el-form-item label="">
                        <el-checkbox v-model="checked">设置为默认收货地址</el-checkbox>
                    </el-form-item> -->
					<el-form-item>
						<button @click="submitForm('formData')"  class="button">
                            <span>确定修改</span>
                        </button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
</div>
</template>

<script>
import {editAddress, regionList, getAddress} from '@/api/getData'

export default {
    data () {
        return {
            regionData: [],
			addressCode: '',
			cityCode: '',
            formData: {
                    province_id:'',
                    city_id:'',
                    area_id:'',
                    telphone:'',
					sccept_name:'',
					address: '',
                },
                rules: {
					sccept_name: [
						{ required: true, message: '请填写用户名', trigger: 'blur' },
					],
					telphone: [
						{ required: true, message: '请填写手机号码', trigger: 'blur' },
					],
					// area_id: [
					// 	{ required: true, message: '请选择区域', trigger: 'blur' }
					// ],
					address: [
						{ required: true, message: '请填写详细地址', trigger: 'blur' },
					],
				},
        }
    },
    activated(){
    	this.initData();
    },
    methods: {
        async initData () {
            try {
                const id = this.$route.query.id;
                    this.id = id;
    			    const address = await getAddress(id)
    			    console.log(address);
                    if(address.status == 1){
                       this.formData.sccept_name = address.data.sccept_name;
                       this.formData.telphone = address.data.telphone;
                       this.formData.address = address.data.address;
                       this.formData.province_id = address.data.province_id;
                    }else if(address.status == -1){
                       this.$router.push('/')
                    }else{
                        this.$message({
					        type: 'error',
					        message: address.message
					    });

					    this.$router.push('/addresslist');
                    }
                const res = await regionList();
                if(res.status == 1){
                       this.regionData = res.data
    				}else if(res.status == -1){
                       this.$router.push('/')
                    }else{
                        this.$message({
                          type: 'error',
                          message: address.message
                        });
                       this.$router.push('/addresslist');
                    }
            }catch(err){
    				console.log(err);
    			}
        },
        changeProvince(index){
                this.formData.city_id = '';
                this.formData.area_id = '';
                this.cityData = this.regionData[index].city
			},
			
		changeCity(index){
            this.formData.area_id = '';
            this.areaData = this.cityData[index].region
        },
        submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
					    console.log(this.formData);
						try{
							const res = await editAddress(this.id,this.formData);
							console.log(res);
							if (res.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '修改成功'
					          	});
					          	this.$router.push('/addresslist')
							}else if(res.status == 0){
                                this.message({
                                    type: 'error',
                                    message: '网络或者服务器有波动，请稍后重试'
                                })
                            }else{
								this.$message({
					            	type: 'error',
					            	message: res.message
					          	});
							}
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
			},
    }
}
</script>

<style lang="less" scoped>
.head {
    margin-top: 100px;
}
.head span {
    margin-left: 90px;
    display: flex;
    justify-items: center;
    font-size: 20px;
}
.button {
    color: white;
    background: #000;
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 3px;
    margin-bottom: 80px;
}
.button span {
    font-size: 20px;
}
.form {
    margin-top: -10px;
}
</style>
