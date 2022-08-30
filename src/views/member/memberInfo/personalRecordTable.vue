<template>
<!-- Personal Record popup page -->
  <el-dialog :close-on-click-modal="false" title="个人报表" :visible.sync="open" width="1000px" append-to-body>

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px">
      <el-form-item label="日期范围" prop="regTime">
        <el-date-picker type="datetimerange" v-model="dateRange" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至" clearable :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <table style="width:100%;margin-bottom: 40px">

      <tr>
        <th class="bold">会员ID</th>
        <td class="bold">12343</td>
        <th class="bold">提款</th>
        <td class="bold">****</td>
      </tr>
      <tr>
        <th class="bold">线上充值</th>
        <td class="bold">****</td>
        <th class="bold">线下充值</th>
        <td class="bold">****</td>
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
import {checkTwoLogin} from "@/utils/permission";
import {
  getMemberInfo, updateEmail, getMemberLoginAddress, getHistoryRecharge
} from '@/api/platform-web/member/memberInfo'

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
      dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
    }
  },
  /*method*/
  methods: {
    show(data) {
      this.address = '******'
      this.data['会员名称'] = null;
      this.playData = []
      data.forEach((value, index, array) => {
        var classTwoname = value.class_twoname;
        var tValue = value.t_value;
        if (tValue && tValue.indexOf('投注:') >= 0) {
          this.playData.push(classTwoname + tValue)
        } else {
          this.data[classTwoname] = tValue
        }
      });
      this.open = true
      this.historyRecharge = ''
      // this.data = data;
      this.email = this.data.会员备注;
      this.totalRechargeOriginal = this.data.充值总的金额;
      this.totalRecharge = this.data.充值总的金额;
    }
  },
  /*组件的初始化方法*/
  created() {

  },
  /*组件的销毁方法*/
  destroyed() {
  },
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
