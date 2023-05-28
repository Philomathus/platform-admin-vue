<template>
  <el-dialog :visible.sync="open" title="DETAILS" append-to-body>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column property="gameplamid" label="游戏编号id" header-align="center" align="center"/>
      <el-table-column property="gameagent" label="平台编号" header-align="center" align="center"/>
      <el-table-column property="agentchild" label="子平台编号" header-align="center" align="center"/>
    </el-table>
    <pagination
      v-show="queryParam.total > 0"
      :total="queryParam.total"
      :page-sizes="[10,20,50,100]"
      :page.sync="queryParam.pageNum"
      :limit.sync="queryParam.pageSize"
      layout="prev, pager, next"
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
      queryParam: {}
    }
  },
  methods: {
    setParam(params){
      this.queryParam = params;
      this.list()
    },
    list(){
      listByGamePepole(this.queryParam).then((res) =>{
        this.queryParam.total = res.total
        this.tableData = res.rows;
      })
      this.open = true;
    }
  }
}


</script>

<style scoped>

</style>



