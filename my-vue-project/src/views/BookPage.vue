<template>
  <div class="home" style="padding: 10px">
    <!-- 搜索 -->
    <div style="margin: 10px 0">
      <el-form inline="true" size="medium">
        <el-form-item label="图书编号">
          <el-input placeholder="请输入图书编号" clearable>
            <template #prefix
              ><el-icon><Search /></el-icon
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item label="图书名称">
          <el-input placeholder="请输入图书名称" clearable>
            <template #prefix
              ><el-icon><Search /></el-icon
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input placeholder="请输入作者" clearable
            ><template #prefix
              ><el-icon><Search /></el-icon
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 1%" size="mini">
            <svg-icon iconClass="search" />查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="danger">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-popconfirm
            confirm-button-text="查看"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="red"
            title="您有图书已逾期，请及时归还"
          >
            <template #reference>
              <el-button type="warning">逾期通知</el-button>
            </template>
          </el-popconfirm>
        </el-form-item>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div style="margin: 10px 0">
      <el-button type="primary"> 上架 </el-button>
      <el-popconfirm title="确定下架？">
        <template #reference>
          <el-button type="danger" size="mini"> 批量删除 </el-button>
        </template>
      </el-popconfirm>
    </div>
    <el-table
      stripe
      border="true"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        v-if="user.role == 1"
      ></el-table-column>
      <el-table-column label="图书编号" prop="isbn" sortable />
      <el-table-column label="图书名称"  prop="name"/>
      <el-table-column label="价格" prop="price" sortable />
      <el-table-column label="作者" prop="author" />
      <el-table-column label="出版社" prop="publisher"/>
      <el-table-column label="出版日期" prop="createTime" />
      <el-table-column label="状态">
        <template v-slot="scope">
          <el-tag v-if="scope.row.status == 0" type="warning">已借阅</el-tag>
          <el-tag v-else type="success">未借阅</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template v-slot="scope">
          <el-button  size="mini" @click ="handleEdit(scope.row)" v-if="user.role == 1">修改</el-button>
          <el-popconfirm title="确认删除?" @confirm="handleDelete(scope.row.id)" v-if="user.role == 1">
            <template #reference>
              <el-button type="danger" size="mini" >删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "../utils/request";
import {ElMessage} from "element-plus";

export default {
  name: "BookPage",
  data() {
    return {
      tableData: [],
      user: {},
      numOfOutDataBook: 0,
      outDateBook: [],
      search1:'',
      search2:'',
      search3:'',
      currentPage: 1,
      pageSize: 10,
      total:10,
      form: {},
      dialogVisible2: false,
    };
  },
  created() {
    let userStr = sessionStorage.getItem("user") || "{}";
    this.user = JSON.parse(userStr);
    this.load();
  },
  methods: {
    handleSelectionChange(val) {
      this.ids = val.map((v) => v.id);
      console.log(this.ids);
    },
    load() {
      this.numOfOutDataBook =0;
      this.outDateBook =[];
       request.get("book",{
        params:{//请求参数
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search1: this.search1,
          search2: this.search2,
          search3: this.search3,
        }
       }).then(res=>{
        console.log(res)
        this.tableData=res.data.records
        this.total=res.data.total
       })
    },
    handleEdit(row){
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible2 = true
    },
    handleDelete(id){
      request.delete("book/" + id ).then(res =>{
        console.log(res)
        if(res.code == 0 ){
          ElMessage.success("删除成功")
        }
        else
          ElMessage.error(res.msg)
        this.load()
      })
    }
  },
};
</script>
