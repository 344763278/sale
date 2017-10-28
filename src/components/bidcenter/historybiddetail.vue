<template>
  <div class="hddetail-root">
    <ul class="hddetail-items">
      <li class="item">
        <div class="item-cont">
          <img class="img" src="../../assets/images/bidcenter/icon1.png" height="64" width="64" alt="icon1">
          <div class="desc">
            <p>报价数量</p>
            <p>1234台</p>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="item-cont">
          <img class="img" src="../../assets/images/user/icon5.png" height="64" alt="icon5">
          <div class="desc">
            <p>报价总额</p>
            <p>￥88888888</p>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="item-cont">
          <img class="img" src="../../assets/images/bidcenter/icon2.png" height="64" width="76" alt="icon1">
          <div class="desc">
            <p>竞拍类型</p>
            <p>统货竞拍</p>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="item-cont">
          <img class="img" src="../../assets/images/bidcenter/icon3.png" height="64" width="41" alt="icon1">
          <div class="desc">
            <p>竞拍结果</p>
            <p class="liupai">流拍</p>
          </div>
        </div>
      </li>
      <li class="item">
        <button class="hddetail-btn">返回列表</button>
      </li>
    </ul>
    <div class="table-wrap">
      <el-table :data="dataList" stripe style="width: 100% ; min-height:300px">
        <el-table-column prop="a" label="序号"></el-table-column>
        <el-table-column prop="b" label="批次号"></el-table-column>
        <el-table-column prop="c" label="SKU"></el-table-column>
        <el-table-column prop="d" label="成色等级"></el-table-column>
        <el-table-column prop="e" label="供货量/台"></el-table-column>
        <el-table-column prop="f" label="数量/台"></el-table-column>
        <el-table-column prop="g" label="基准价"></el-table-column>
        <el-table-column prop="h" label="成色比例"></el-table-column>
        <el-table-column prop="i" label="单位/元"></el-table-column>
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
      dataList: [{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},{a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10},],
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
  // min-width: 1080px;
  .hddetail-items {
    display: flex; // overflow: hidden;
    margin: 42px 0 20px 0;
    .item {
      flex: 1; // width: 330px;
      height: 138px;
      background: #fff; // float: left;
      margin-right: 16px;
      border-radius: 3px;
      position: relative; 
      .item-cont {
        text-align: center;
        margin-top: 37px;
        img{
          height:64px;
          display:inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
        .desc {
          display:inline-block; 
          vertical-align: middle;
          height: 64px;
          p:first-child {
            line-height: 25px;
            font-size: 16px;
          }
          p:last-child {
            line-height: 30px;
            font-size: 20px;
            color: #504F69;
            margin-top: 9px;
          }
          p:last-child.liupai { 
            color: #FF4444; 
          }
        }
      }
      &:last-child {
        margin-right: 0;
        // flex: 0 0 164px;
        flex: 0 0 140px;
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
      // .img {
      //   display: block;
      //   vertical-align: top;
      //   position: absolute;
      //   top: 38px;
      //   left: 51px;
      // }
      // .desc {
      //   position: absolute;
      //   top: 38px;
      //   left: 159px;
      //   p:first-child {
      //     line-height: 25px;
      //     font-size: 17px; // color: #788C9A;
      //   }
      //   p:last-child {
      //     line-height: 27px;
      //     font-size: 25px;
      //     color: #504F69;
      //     margin-bottom: 12px;
      //   }
      //   p:last-child.liupai {
      //     line-height: 27px;
      //     font-size: 25px;
      //     color: #FF4444;
      //     margin-bottom: 12px;
      //   }
      // }
    }
  }
}

</style>
