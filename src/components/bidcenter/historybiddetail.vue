<template>
  <div class="hddetail-root">
     <ul class="hddetail-items">
       <li class="item">
         <img class="img" src="../../assets/images/bidcenter/icon1.png" height="64" width="64" alt="icon1">
         <div class="desc">
           <p>报价数量</p>
           <p>1234台</p>
         </div>
       </li>
       <li class="item">
         <img class="img" src="../../assets/images/bidcenter/icon2.png" height="64" width="76" alt="icon1">
         <div class="desc">
           <p>报价总额</p>
           <p>￥86492</p>
         </div>
       </li> 
       <li class="item">
         <img class="img" src="../../assets/images/bidcenter/icon3.png" height="64" width="41" alt="icon1">
         <div class="desc">
           <p>竞拍类型</p>
           <p>统货竞拍</p>
         </div>
       </li>  
       <li class="item">
         <button class="hddetail-btn">返回列表</button>
       </li>
     </ul>
    <div class="table-wrap">
      <el-table :data="dataList" stripe style="width: 100% ; min-height:300px">
        <el-table-column prop="system_id" label="序号" ></el-table-column>
        <el-table-column prop="name" label="批次号" ></el-table-column>
        <el-table-column prop="system_desc" label="SKU" ></el-table-column>  
        <el-table-column prop="system_desc" label="成色等级" ></el-table-column>  
        <el-table-column prop="system_desc" label="供货量/台" ></el-table-column>  
        <el-table-column prop="system_desc" label="数量/台" ></el-table-column>  
        <el-table-column prop="system_desc" label="基准价" ></el-table-column>  
        <el-table-column prop="system_desc" label="成色比例" ></el-table-column>  
        <el-table-column prop="system_desc" label="单位/元" ></el-table-column> 
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],
      currentPage: 0,
      total: 100,
      pageSize: 10
    }
  },
  methods: {
    handleCurrentChange() {

    }
  }
}

</script>
<style scoped lang="scss">
  .hddetail-root {
    .hddetail-items {
      overflow: hidden;
      margin: 42px 0 20px 0;
      .item {
        width: 330px;
        height: 138px;
        background: #fff;
        float: left;
        margin-right: 20px;
        border-radius: 3px;
        position: relative;
        &:nth-child(4) {
          margin-right: 0;
        }
        &:last-child {
          width: 164px;
          margin: 0;
          background: #F4F5F8;
          .hddetail-btn {
            width: 100px;
            height: 40px;
            background: #2A9FFF;
            color: #fff;
            margin: 49px 0 0 32px;
            border-radius: 3px;
          } 
        }
        .img {
          display: block;
          vertical-align: top;
          position: absolute;
          top: 38px;
          left: 51px;
        }
        .desc {
          position: absolute;
          top: 38px;
          left: 159px;
          p:first-child {
            line-height: 25px;
            font-size: 17px;
            color: #788C9A;
          }
          p:last-child {
            line-height: 27px;
            font-size: 25px;
            color: #504F69;
            margin-bottom: 12px; 
          }
        }
      } 
    }
  }

</style>
