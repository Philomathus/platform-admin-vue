<template>
  <el-dialog :visible.sync="open" title="DETAILS" append-to-body>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column property="gameplamid" label="有效下注" header-align="center" align="center"/>
      <el-table-column property="gameagent" label="盈利" header-align="center" align="center"/>
      <el-table-column property="agentchild" label="会员ID" header-align="center" align="center"/>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="list"
    />
  </el-dialog>
</template>


<script>
import {listByGamePepole} from "@/api/platform-web/report/gameBetJump";

export default {
  name: "TableShow",
  data(){
    return {
      tableData: [],
      open: false,
      total:0,
      queryParams: {
        pageNum:1,
        pageSize:10,
      }
    }
  },
  methods: {
    setParam(params){
      this.queryParam = params;
      this.list()
    },
    list(){
      listByGamePepole(this.queryParam).then((res) =>{
        this.total = res.total
        this.tableData = res.rows;
      })
      this.open = true;
    }
  }
}


</script>

<style scoped>

</style>



