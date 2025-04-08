<template>
  <div>
    <el-menu
      style="width: 200px; min-height: calc(100vh - 50px)"
      :default-active="path"
      class="el-menu-vertical-demo"
      background-color="#30333c"
      text-color="#fff"
      router
    >
      <el-menu-item index="/dashboard">
        <!-- 展示矢量图形 -->
        <svg class="icon" aria-hidden="true">
          <!-- USE引用图标 -->
          <use xlink:href="#icondashboard "></use>
        </svg>
        <span>展示板</span>
      </el-menu-item>
      <el-sub-menu text-color="#fff">
        <template #title>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mingpian "></use>
          </svg>
          <span>个人信息</span>
        </template>
        <el-menu-item style="font-color: white">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-a-bianji1 "></use>
          </svg>
          <span>修改个人信息</span>
        </el-menu-item>
        <el-menu-item>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mima "></use>
          </svg>
          <span>修改密码</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-if="user.role == 1">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconreader "></use>
        </svg>
        <span>读者管理</span>
      </el-menu-item>
      <el-menu-item v-if="user.role == 1">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconbook "></use>
        </svg>
        <span>书籍管理</span>
      </el-menu-item>
      <el-menu-item v-if="user.role == 2">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconbook "></use>
        </svg>
        <span>图书查询</span>
      </el-menu-item>
      <el-menu-item v-if="user.role == 1">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconlend-record "></use>
        </svg>
        <span>借阅管理</span>
      </el-menu-item>
      <el-menu-item v-if="user.role == 2">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconlend-record"></use>
        </svg>
        <span>借阅信息</span>
      </el-menu-item>
      <el-menu-item>
        <el-icon><grid /></el-icon>
        <span>借阅状态</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>




<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AppAside",
  components: {},
  created() {
    let userStr = sessionStorage.getItem("user") || "{}";
    this.user = JSON.parse(userStr);
  },
  data() {
    return {
      user: {},
      path: this.$route.path,
    };
  },
};
</script>
<style>
.icon {
  width: 30px;
  height: 30px;
  padding-top: 5px;
  padding-right: 10px;
}
</style>