<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table v-loading="loading"
              :data="list"
              style="width: 100%;"
              :stripe="true"
    >
      <el-table-column label="会员id" align="center" prop="id" :show-overflow-tooltip="true"/>
      <el-table-column label="vip等级" align="center" prop="vip"/>
      <el-table-column label="打码" align="center" prop="codeAccount"/>
      <el-table-column label="余额" align="center" prop="totalAccount"/>
      <el-table-column label="进入直播间次数" align="center" prop="times"/>

    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100,200]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { list } from '@/api/platform-web/report/agentCount'

export default {
  name: 'MemberAgent',
  data() {
    return {
      // 遮罩层
      loading: false,

      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      data: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        agentcode: null,
        agenttime: null
      }
    }
  },
  activated() {
    var agenttime = this.$route.query.agenttime;
    var agentcode = this.$route.query.agentcode;
    this.queryParams.agentcode = agentcode
    this.queryParams.agenttime = agenttime
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      list(this.queryParams).then(response => {
        this.list = response.rows
        this.total = response.total
        this.loading = false
      })
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1
      this.getList()
    }

  }
}
</script>

