<template>
  <div
    style="
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      display: flex;
    "
  >
    <div
      style="
        width: 200px;
        padding-left: 30px;
        font-weight: bold;
        color: dodgerblue;
      "
    >
      <img :src="imgUrl" class="icon" />
      图书馆管理系统
    </div>
    <div style="flex: 1"></div>
    <div style="width: 100px;">
      <el-dropdown>
        <span class="el-dropdown-link" style="padding-top:15px">
          {{ User.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="exit">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  name: "AppHeader",
  props: ["user"],
  data() {
    return {
      User: [],
      imgUrl: require("../assets/icon/login.png"),
    };
  },
  created() {
    let userStr = sessionStorage.getItem("user") || "{}";
    this.User = JSON.parse(userStr);
    // console.log(this.User)
  },
  methods: {
    exit() {
      sessionStorage.removeItem("user");
      this.$router.push("/login");
      ElMessage.success("退出系统成功");
    },
  },
};
</script>

<style scoped>
.icon {
  width: 40px;
  height: 40px;
  padding-top: 10px;
  padding-right: 10px;
  
}
</style>