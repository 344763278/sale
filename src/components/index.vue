<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <section class="chart-container">
        <el-row>
          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../assets/images/forest.png" class="image">
              <div style="padding: 14px;">
                <span>阳光从树叶细缝露出了笑容  </span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../assets/images/sunrise.png" class="image">
              <div style="padding: 14px;">
                <span>温暖了我的美梦</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../assets/images/sunshine.png" class="image">
              <div style="padding: 14px;">
                <span>只有笼里的画眉羡慕着天空，却从来没有人懂</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                </div>
              </div>
            </el-card>
          </el-col>
          
        </el-row>
      </section>

    </el-col>
  </el-row>
</template>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .welcome{margin-top: 16px}

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .chart-container {
    width: 100%;
  }
  .chart-container .el-col {
    padding: 30px 20px;
  }
</style>

<script>
  import api from '../api/api'

  export default {
   // children: [
   //     {path: '/index', component: index, name: '首页', menuShow: true}
   // ],
    name: 'index',
    data() {
      return {
        // isActive: true,
        currentDate: new Date(),
        chartColumn: null,
        chartBar: null,
        chartLine: null,
        chartPie: null
      };
    },
    component:{
       // props: ['sysUserName']
    },
    mounted: function () {

      
    }
  }
</script>
