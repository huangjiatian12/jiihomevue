<template>
    <div>
        <button class="button" @click="addAddress">
            <span>添加地址</span>
        </button>
        <div class="title">
            <span>我的地址</span>
        </div>
        <div class="table">
            <el-table 
                        :data="tableData"
                        border
                        >
                <el-table-column
		                prop="sccept_name"
		                label="收货人姓名"
		                width="150">
		        </el-table-column>
		        <el-table-column
		                prop="telphone"
		                label="手机号"
		                width="150">
		        </el-table-column>
                <el-table-column
                        prop="area_name"
                        label="地区名称"
                        width="180">
                </el-table-column>
		        <el-table-column
		                prop="address"
		                label="详细地址">
		        </el-table-column>
                <el-table-column 
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                    <button 
                        class="button-edit"
                        size="mini"
                        @click="handleEdit(scope.row)">编辑</button>
                    <button
                        class="button-delete"
                        size="mini"
                        @click="handleDelete(scope.row)">删除</button>
                    </template>
              </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {addressList, deleteAddress} from '@/api/getData'

export default {
    data () {
        
        return {
            tableData: [],
        }
    },
    mounted(){
            this.initData();
        },
    methods: {
        async initData () {
            if(!localStorage.getItem("isLogin")){
                    this.isLogin = false;
                    this.$router.push('/')
                    this.showLogin = true;
                }else{
                    this.isLogin = true;
                    const res = await addressList();
                    this.tableData = res.data;
                    console.log(res)
                }
        },
        handleDelete(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(async() => {
                  const res = await deleteAddress(row.id);
                  console.log('res');
                  if(res.status == 1){
                      this.$message({
                            type: 'success',
                            message: '删除成功'
                      });
                      this.initData();
                  }else if(res.status == 0){
                      this.message({
                          type: 'error',
                          message: '网络或者服务器有波动，请稍后重试'
                      })
                      this.$router.push('/addresslist')
                  }else{
                      this.$message({
                            type: 'error',
                            message: res.message
                      });
                  }
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });        
                });
            },
        handleEdit(row){
            this.$router.push({path: '/editAddress',query:{id:row.id}});
        },
        addAddress () {
            this.$router.push('/addAddress')
        }
    }
}
</script>

<style lang="less" scoped>
.button {
    margin-top: 80px;
    color: white;
    background: #000;
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 3px;
}
.button span {
    font-size: 20px;
}
h1{
    font-size: 14px;
}
.title {
    margin-top: 80px;
    margin-bottom: 20px;
    border-bottom: 0.2px solid #828282;
    padding-bottom: 15px;
    font-size: 14px;
    line-height: 24px;
}
.form {
    margin-top: 20px;
}
.table {
    margin-bottom: 60px;
}
.button-edit {
    background: black;
    width: 50px;
    height: 30px;
    color: white;
    margin-bottom: 5px;
}
.button-edit text {
    padding: 5px 5px 5px 5px;
}
.button-delete {
    background: gray;
    width: 50px;
    height: 30px;
    color: white;
    margin-bottom: 5px;
}
.button-delete text {
    padding: 5px 5px 5px 5px;
}
</style>
