<template>
<!-- Personal Record popup page -->
  <el-dialog :close-on-click-modal="false" title="个人报表" :visible.sync="open" width="1000px" append-to-body>

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px">
      <el-form-item label="日期范围" prop="regTime">
        <el-date-picker type="datetimerange" v-model="date.dateRange" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至" clearable :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="initData()">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <table style="width:100%;margin-bottom: 40px">

      <tr>
        <th class="bold">会员ID</th>
        <td>{{ data.会员编号 }}</td>
        <th class="bold">提款</th>
        <td>{{ data.会员注册时间 }}</td>
      </tr>
      <tr>
        <th class="bold">线上充值</th>
        <td>{{ data.登陆IP }}</td>
        <th class="bold">线下充值</th>
        <td>****</td>
      </tr>
      <tr>
        <th>合计充值</th>
        <td>****</td>
        <th class="bold">打码量</th>
        <td>****</td>
      </tr>
      <tr>
        <td class="bold">送礼</td>
        <td>****</td>
        <td class="bold">盈亏</td>
        <td>****</td>
      </tr>
      <tr>
        <td colspan="8"></td>
      </tr>
      <tr>
        <td></td>
        <th class="bold">投注游戏</th>
        <th class="bold">有效投注</th>
        <th class="bold">盈亏</th>
      </tr>
      <tr>
        <td></td>
        <td class="bold">彩票</td>
        <td>****</td>
        <td>****</td>
      </tr>
      <tr>
        <td></td>
        <td class="bold">开元</td>
        <td>****</td>
        <td>****</td>
      </tr>

    </table>

    <el-button type="primary" plain @click="open=false"  style="float: right;margin-top: -20px">
      关闭
    </el-button>



  </el-dialog>
</template>
member
<script>
import {getPersonalReport} from "@/api/platform-web/member/memberInfo";

export default {
  name: "PersonalRecordTable",
  props: {
    propC: {
      type: String,
      required: false,
      default: '100',
    },
  },
  /*组件值*/
  data() {
    return {
      open: false,
      address: '******',
      historyRecharge: "",
      totalRecharge: "",
      data: {},
      playData: [],
      email: '',
      showSearch: true,
      personRecordList : [],
      date:{
        dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())]
      },
    }
  },
  /*method*/
  methods: {
    show(data) {
      console.info(data)
      console.info(data.memberId)
      this.open = true

    },

    initData(){
       let userId = "7700_73768"
       var date = this.date

       getPersonalReport(userId,date).then((res) => {
         this.personRecordList = res.data
         console.info(res.data)
         // this.$refs.tableShow.show(res.data);
       })
    }

  },
  /*组件的初始化方法*/
  created() {
   this.initData()
  },
  /*组件的销毁方法*/
  destroyed() {
  },
}

function initData(){

}

</script>

<style scoped>

table, th, td {
  border: 2px solid rgba(0, 0, 0, 0.10);
  border-collapse: collapse;
}

td{
  height: 40px;
  text-align: center;
}

.bold{
  font-weight: bold;
}

</style>
