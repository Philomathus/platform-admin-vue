<template>
  <div>
    <el-dialog :visible.sync="open" title="投注详情" style="margin-bottom: 150px" append-to-body>

      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
          >{{ $t('global.exportButton') }}
          </el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="list"></right-toolbar>
      </el-row>

      <el-table :data="tableData" style="width: 100%;">
        <el-table-column property="agentchild" label="会员ID"   header-align="center" align="center"/>
        <el-table-column property="gamecell"   label="有效下注"  header-align="center" align="center"/>
        <el-table-column property="gameprofit" label="盈利"     header-align="center" align="center"/>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="list"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {exportReportChildPlamGames, listByGamePepole} from "@/api/platform-web/report/gameBetJump";

export default {
  name: "TableShow",
  data(){
    return {
      showPages: false,
      showSearch: true,
      queryParams: {},
      tableData: [],
      open: false,
      total:0,
    }
  },
  methods: {
    setParam(params){
      this.queryParams = params;
      this.list()
    },

    list(){
      listByGamePepole(this.queryParams).then((res) =>{
        this.tableData = res.rows;
        this.total = res.total
        this.open = true;
      })
    },
    close(){
      this.open = false;
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm( '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', "警告" , {
        confirmButtonText: this.$t('global.confirmButton') ,
        cancelButtonText: this.$t('global.cancelButton') ,
        type: 'warning'
      }).then(function () {
        return exportReportChildPlamGames(queryParams)
      }).then(response => {
        this.downloadExcel(response,'出款银行列表')
      }).catch(() => {
      })
    },
  }
}


</script>

<style scoped>

</style>



