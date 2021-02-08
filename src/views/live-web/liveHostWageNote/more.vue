<template>
  <!-- 导入表 -->
  <el-dialog
    v-dialogDrag
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="visible"
    width="800px"
    top="5vh"
    append-to-body
  >
    <el-table id="out-table" stripe v-loading="loading" :data="dbTableList" style="max-height:600px; overflow-y: scroll;"
              border
    >
      <el-table-column label="家族ID/主播ID" align="center" prop="familyId"/>
      <el-table-column label="家族名称" align="center" prop="familyName"/>
      <el-table-column label="组长昵称/主播昵称" align="center" prop="familyNickName"/>
      <el-table-column label="直播总时长(小时)" align="center" prop="alltimeDes"/>
      <el-table-column label="直播礼物总结算" align="center" prop="allticket"/>
      <el-table-column label="直播礼物折扣结算" align="center" prop="allticketRes"/>
      <el-table-column label="结算率" align="center" prop="settlementRate"/>
      <el-table-column label="统计日期" align="center" prop="timedata"/>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </el-dialog>
</template>

<script>
  import {getPage} from "@/api/live-web/liveHostWageNote";

  export default {
    name: "more",
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
        visible: false,
        title: "",
        loading: false,
        // 总条数
        total: 0,
        // 表数据
        dbTableList: [],
        // 查询参数
        queryParams: {
          familyId: null,
          pageNum: 1,
          pageSize: 10,
/*          orderByColumn: 'lhwn.family_id',
          isAsc: 'asc',*/
        }
      }
    },
    /*监听器,监听单个变量,param就是data的变量*/
    watch: {},
    /*监听器2号,监听多个变量*/
    computed: {
      getValue: function () {
        return ''
      }
    },
    /*组件方法*/
    methods: {
      getList() {
        this.loading = true
        getPage(this.queryParams).then((res) => {
          this.dbTableList = res.rows
          this.total = res.total
        }).finally(()=>{
          this.loading = false
        })
      },
      // 显示弹框
      show(memberId, memberCode) {
        this.queryParams.familyId = memberId
        this.getList()
        this.visible = true
      },
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

</style>
