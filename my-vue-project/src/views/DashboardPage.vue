<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in cards" :key="item.title">
        <el-card class="box-card">
          <template #header>
            <div class="clearfix">
              <span class="date">{{ item.date }}</span>
            </div>
          </template>
          <div class="text item">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon" style="width: 100px"></use>
            </svg>
            <span class="text">{{ item.data }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div ref="myTimer" style="margin-left: 15px; font-weight: 550"></div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="margin-left: 5px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { ElMessage } from "element-plus";
import request from "../utils/request";
export default {
  data() {
    return {
      cards: [
        { title: "已借阅", data: 100, icon: "#iconlend-record-pro" },
        { title: "总访问", data: 100, icon: "#iconvisit" },
        { title: "图书数", data: 100, icon: "#iconbook-pro" },
        { title: "用户数", data: 1000, icon: "#iconpopulation" },
      ],
      data: {},
    };
  },
  mounted() {
    this.circleTimer();

    request.get("/dashboard").then((res) => {
      if (res.code == 0) {
        this.cards[0].data = res.data.lendRecordCount;
        this.cards[1].data = res.data.visitCount;
        this.cards[2].data = res.data.bookCount;
        this.cards[3].data = res.data.userCount;

        this.$nextTick(() => {
          const dom = document.getElementById("main");
          if (!dom) {
            console.error("#main 元素未找到！");
            return;
          }

          // 销毁旧实例（防止重复初始化）
          if (dom._echarts_instance) {
            echarts.dispose(dom);
          }

          const myChart = echarts.init(dom);
          myChart.setOption({
            title: { text: "统计" },
            tooltip: { trigger: "axis" },
            grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
            xAxis: {
              type: "category",
              data: this.cards.map((item) => item.title),
              axisTick: { alignWithLabel: true },
            },
            yAxis: { type: "value" },
            series: [
              {
                type: "bar",
                label: { show: true },
                barWidth: "25%",
                data: [
                  {
                    value: this.cards[0].data,
                    itemStyle: { color: "#5470c6" },
                  },
                  {
                    value: this.cards[1].data,
                    itemStyle: { color: "#91cc75" },
                  },
                  {
                    value: this.cards[2].data,
                    itemStyle: { color: "#fac858" },
                  },
                  {
                    value: this.cards[3].data,
                    itemStyle: { color: "#ee6666" },
                  },
                ],
              },
            ],
          });

          window.addEventListener("resize", () => {
            myChart.resize();
          });
        });
      } else {
        ElMessage.error(res.msg);
      }
    });
  },
  methods: {
    //方法
    circleTimer() {
      // 方法：启动定时器
      this.getTimer();
      this.timer = setInterval(this.getTimer, 1000);
    },
    getTimer() {
      // 方法：更新当前时间
      if (this.$refs.myTimer) {
        this.$refs.myTimer.innerHTML = new Date().toLocaleString();
      }
    },
  },
};
</script>

<style>
.box-card {
  width: 80%;
  margin-bottom: 25px;
  margin-left: 10px;
}

.clearfix {
  text-align: center;
  font-size: 15px;
}

.text {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  vertical-align: super;
}

#main {
  width: 100%;
  height: 450px;
  margin-top: 20px;
}

.icon {
  width: 40px;
  height: 40px;
  padding-top: 5px;
  padding-right: 10px;
}
</style>