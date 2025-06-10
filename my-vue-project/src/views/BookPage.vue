<template>
  <div class="home" style="padding: 10px">
    <!-- 搜索 -->
    <div style="margin: 10px 0">
      <el-form inline="true" size="medium">
        <el-form-item label="图书编号">
          <el-input v-model="search_num" placeholder="请输入图书编号" clearable>
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="图书名称">
          <el-input v-model="search_name" placeholder="请输入图书名称" clearable>
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="search_author" placeholder="请输入作者" clearable>
            <template #prefix><el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 1%" size="mini" @click="load">
            <svg-icon iconClass="search" />查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="danger" @click="clear">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-popconfirm
            confirm-button-text="查看"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="red"
            title="您有图书已逾期，请及时归还"
            @confirm="toLook">
            <template #reference>
              <el-button type="warning">逾期通知</el-button>
            </template>
          </el-popconfirm>
        </el-form-item>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div style="margin: 10px 0">
      <el-button type="primary" @click = "add" v-if="user.role == 1"> 上架 </el-button>
      <el-popconfirm title="确定下架吗？">
        <template #reference>
          <el-button type="danger" size="mini"> 批量删除 </el-button>
        </template>
      </el-popconfirm>
    </div>
    <el-table
      stripe
      border="true"
      :data="tableData"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
        v-show="user.role == 1">
      </el-table-column>
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
      <el-table-column label="操作" fixed="right" width="200">
        <template v-slot="scope">
          <el-button  size="mini" @click ="handleEdit(scope.row)" v-show="user.role == 1">修改</el-button>
          <el-popconfirm title="确认删除?" @confirm="handleDelete(scope.row.id)" v-show="user.role == 1">
            <template #reference>
              <el-button type="danger" size="mini" >删除</el-button>
            </template>
          </el-popconfirm>
          <el-button size="mini" v-show="user.role == 2">借阅</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 上架通知对话框 -->
    <el-dialog
    v-model="OnputDialogVisible"
    title="上架书籍"
    width="30%"
  >
    <el-form :model="form" label-width="120px">
      <el-form-item label="图书编号">
            <el-input style="width: 80%" v-model="form.isbn"></el-input>
      </el-form-item>
      <el-form-item label="图书名称">
            <el-input style="width: 80%" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="价格">
            <el-input style="width: 80%" v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="作者">
            <el-input style="width: 80%" v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="出版社">
            <el-input style="width: 80%" v-model="form.publisher"></el-input>
      </el-form-item>
      <el-form-item label="出版时间">
        <div>
          <el-date-picker value-format="YYYY-MM-DD" type="date" style="width: 80%" clearable v-model="form.createTime" ></el-date-picker>
        </div>
      </el-form-item>
    </el-form>
     <template #footer>
          <span class="dialog-footer">
          <el-button @click="OnputDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
          </span>
      </template>
  </el-dialog>
  </div>
</template>

<script>
import request from "../utils/request";
import {ElMessage} from "element-plus";

export default {
  name: "BookPage",
  data() {
    return {
      search_num:"",
      search_name:"",
      search_author:"",
      tableData: [],
      user: {},
      numOfOutDataBook: 0,
      outDateBook: [],
      currentPage: 1,
      pageSize: 10,
      total:10,
      form: {},
      OnputDialogVisible:false//上架对话框
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
          search1: this.search_num,
          search2: this.search_name,
          search3: this.search_author,
        }
       }).then(res=>{
        this.tableData=res.data.records
        this.total=res.data.total
       })
    },
    clear(){
      this.search_num = ""
      this.search_name = ""
      this.search_author = ""
      this.load()
    },

    handleEdit(row){
      this.form = JSON.parse(JSON.stringify(row))
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
    },
    toLook(){

    },
    add(){
      this.OnputDialogVisible = true
    },
    save(){

    }
  },
};
</script>



