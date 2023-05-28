<template>
  <el-dialog :visible.sync="open" title="DETAILS" append-to-body>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column property="gameplamid" label="gameplamid" header-align="center" align="center"/>
      <el-table-column property="gameagent" label="gameagent" header-align="center" align="center"/>
      <el-table-column property="agentchild" label="agentchild" header-align="center" align="center"/>
    </el-table>
    <pagination
      v-show="queryParam.total > 0"
      :total="queryParam.total"
      :page-sizes="[20,50,100,200]"
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
      queryParam: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        gamepepole: null,
      }
    }
  },
  methods: {
    setParam(gamepepole){
      this.queryParam.gamepepole = gamepepole;
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



