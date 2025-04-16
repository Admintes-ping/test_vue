<template>
  <div>
    <el-card style="width: 40%;margin-left:120px;margin-top:40px;">
      <h2 style="padding:30px">个人信息</h2>
      <el-form  :model="form" ref="form" label-width="80px" >
        <el-form-item label="用户名" >
          <el-input style="width: 80%" v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input style="width: 80%" v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <span style="margin:5px" v-if="form.role==1">管理员</span>
          <span style="margin:5px" v-if="form.role==2">读者</span>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input style="width: 80%" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <div>
            <el-radio label="男"  v-model="form.sex">男</el-radio>
            <el-radio label="女"  v-model="form.sex">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" style="width: 80%" v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="update">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>

import request from '@/utils/request';
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      form: {},
    };
  },
created() {
    let str = sessionStorage.getItem("user") || "{}"
    this.form = JSON.parse(str)
    // console.log(this.form)
  },
  methods: {//方法
    update(){
      request.put("/user",this.form).then(res=>{
        console.log(res);
        if(res.code == 0)
        {
          ElMessage.success("更新成功")
          sessionStorage.setItem("user",JSON.stringify(res.data))//缓存用户信息
          // 触发Layout更新用户信息
          // this.$emit("userInfo")  
        }
        else {ElMessage.error(res.msg)}
      })
    }
  }
};
</script>


