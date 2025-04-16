
<template>
  <div>
    <el-card style="width: 40%; margin-left: 120px; margin-top: 40px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="password2">
          <el-input
            type="password"
            v-model="form.password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input
            type="password"
            v-model="form2.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input v-model="form.checkpassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" style="text-align: center">提交</el-button>
          <el-button @click="resetForm('form')" style="text-align: center">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
    name: "PasswordPage",
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value=='') {
        return callback(new Error("请输入旧密码 "));
      }else{
        if (this.form.password2 !== this.form.truepassword) {
          callback(new Error("密码错误"));
        } else {
          callback();
        }
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        // if (this.checkpassword.checkPass !== "") {
        //   this.$refs.form.validateField("checkPass");
        // }
        callback();
      }
    };
    const validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        // if (this.checkpassword.checkPass !== "") {
        //   this.$refs.form.validateField("checkPass");
        // }
        callback();
      }
    };
    return {
      form: {
        password2: '',
        checkpassword: '',
        truepassword:'',
      },
      form2:{
        password:'',
        id:0
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkpassword: [{ validator: validatePass3, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>