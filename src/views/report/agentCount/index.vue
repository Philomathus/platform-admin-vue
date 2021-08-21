<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" :rules="queryRule">
      <el-form-item label="日期选择" prop="agenttime">
        <el-date-picker v-model="queryParams.agenttime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '100%'}" placeholder="请选择日期选择" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="agentcode">
        <el-input
          v-model="queryParams.agentcode"
          placeholder="渠道编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="agentname">
        <el-input
          v-model="queryParams.agentname"
          placeholder="邀请账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" :disabled="isDisable">搜索</el-button>
      </el-form-item>
      <span style="position:relative ;color: red ;top:7px;font-size: 15px">友情提示(每日推广数据查询前，请进行一次基础数据的预生成操作)</span>
    </el-form>


    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:reportAgentcount:export']"
        >导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['admin:reportAgentcount:add']"
        >新增推广码
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
          v-hasPermi="['admin:reportAgentcount:remove']"
        >删除推广码
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button :disabled="isDisable"
                   type="primary"
                   plain
                   icon="el-icon-plus"
                   size="mini"
                   @click="generatedata"
                   v-hasPermi="['admin:reportAgentcount:generatedata']"
        >基础数据预生成
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <div ref="container" style="position: relative">
      <el-table v-loading="loading" :data="report" :stripe="true">
        <el-table-column label="渠道编码" align="center" prop="agentcode">
          <template slot-scope="scope">
            <a style="color: #00afff" @click="jump(scope.row.agentcode,scope.row.agenttime)">{{ scope.row.agentcode }}</a>
          </template>
        </el-table-column>

        <el-table-column label="邀请账号" min-width="150" align="center" prop="agentname"/>
        <el-table-column label="统计时间" align="center" prop="agenttime" min-width="120"/>
        <el-table-column label="当日/总(注册人数)" min-width="130" align="center" prop="regisNumber" :formatter="regisNumber"/>
        <el-table-column label="公司入款（首充）" min-width="130" align="center" prop="gsRukuanjine"/>
        <el-table-column label="线上入款（首充）" min-width="130" align="center" prop="xsRukuanjine"/>
        <el-table-column label="手工入款（首充）" min-width="130" align="center" prop="sgRukuanjine"/>
        <el-table-column label="入款总（首充）" min-width="120" align="center" prop="totalfristRukuanjine"/>
        <el-table-column label="人/笔/金额（出款日总）" min-width="170" align="center" prop="totalChukuanjine"/>
        <el-table-column label="人/笔/金额（入款日总）" min-width="170" align="center" prop="rukuanjine" :formatter="rukuanjine" fixed="right"/>
        <el-table-column label="送礼次数/金额" min-width="120" align="center" prop="totalGiveprop"/>
        <el-table-column label="直播间次数/活跃安卓/活跃苹果" min-width="210" align="center" prop="ios" :formatter="ios" fixed="right"/>
        <!--          <template slot-scope="scope">-->
        <!--            <a style="color: #00afff" @click="jump(scope.row.agentcode,scope.row.agenttime)">{{ scope.row.ios }}</a>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </div>

    <!-- 新增推广码弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="新增推广码"
      :visible.sync="addPromotionCode"
      width="500px"
      append-to-body
    >
      <el-form ref="formaddPromotionCode" :model="formaddPromotionCode" :rules="rules" label-width="70px">
        <el-form-item label="推广码" prop="code">
          <el-input placeholder="请输入推广码" v-model="formaddPromotionCode.code"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitaddPromotionCode">立即提交</el-button>
      </div>
    </el-dialog>

    <!-- 删除推广码弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="删除推广码"
      :visible.sync="delPromotionCode"
      width="500px"
      append-to-body
    >
      <el-form ref="formdelPromotionCode" :model="formdelPromotionCode" :rules="rules" label-width="70px">
        <el-form-item label="推广码" prop="code">
          <el-input placeholder="请输入推广码" v-model="formdelPromotionCode.code"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitdelPromotionCode">立即提交</el-button>
      </div>
    </el-dialog>

    <!--    <pagination
          v-show="total>0"
          :total="total"
          :page-sizes="[20,50,100]"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />-->
  </div>
</template>

<script>
import {
  listReport,
  liststorage,
  exportReportAgentCount,
  addPromotionCode,
  delPromotionCode,
  generatedata
} from '@/api/platform-web/report/agentCount'
import { getYesterDate } from '@/utils/dateUtils'
import { toyesDayshortcuts } from '@/utils/dateUtils'

export default {
  name: 'Agent',
  components: {},
  data() {
    return {
      //日期快捷
      pickerOptions: { shortcuts: toyesDayshortcuts },
      interval: { listTime: null },
      // 遮罩层
      listLoading: false,
      isDestroyed: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      isDisable:false,
      // 非多个禁用
      multiple: true,
      //新增推广码弹框
      addPromotionCode: false,
      //删除推广码弹框
      delPromotionCode: false,
      //新增推广码参数
      formaddPromotionCode: {},
      //删除推广码参数
      formdelPromotionCode: {},
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 平台资金报，记录平台每日收入及支出总额，预估当前会员的积分余额表格数据
      report: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        agenttime: this.parseTime(getYesterDate(), '{y}-{m}-{d}'),
        agentcode: null
      },
      queryRule: {
        agentcode: [
          { required: true, message: '推广码不能为空', trigger: 'blur' }
        ]
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        code: [
          { required: true, message: '推广码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  destroyed() {
    this.isDestroyed = true
    this.listLoading = false
  },
  methods: {
    /** 查询平台资金报，记录平台每日收入及支出总额，预估当前会员的积分余额列表 */
    getList() {
      var that = this
      this.loading = true
      listReport(this.addDateRange(this.queryParams, this.queryParams.dateRange)).then(response => {
        if (response.code == 200) {
          this.report = response.rows
          this.loading = false
        }

        // that.$loading.hide();
        // that.listLoading = false;
        // that.$rjLoading.hide();
      }).catch((err)=>{
        //that.$notify.error("预生成数据失败，请重新生成...")
        this.loading = false
      })
      //   .catch((err) => {
      //   if (err=='Error: 报表正在生成，请稍后...'){
      //     if (!that.listLoading) {
      //       that.listLoading=true;
      //       that.$rjLoading.show('报表正在生成',that);
      //     }
      //     if (!this.isDestroyed){
      //       setTimeout(() => {
      //         that.getList();
      //       }, 10000);
      //     }
      //   }
      // }).finally(() => {
      //     this.loading = false
      //   }
      // );
    },
    getListstorage() {
      this.loading = true
      liststorage(this.addDateRange(this.queryParams, this.queryParams.dateRange)).then(response => {
        this.getList()
      })
    },
    jump(agentcode, agenttime) {
      this.$router.push({ path: '/report/memberAgent', query: { agentcode: agentcode, agenttime: agenttime } })
    },
    //新增推广码
    handleAdd() {
      this.resetformaddPromotionCode()
      this.addPromotionCode = true
    },
    //删除推广码
    handleDelete() {
      this.resetformdelPromotionCode()
      this.delPromotionCode = true
    },
    //预生成数据
    generatedata() {
      this.isDisable=true;
      const agenttime = this.queryParams.agenttime
      console.info(agenttime)
      if (agenttime == null || agenttime == '') {
        this.msgError('请选择日期')
        return
      }
      generatedata({
        agenttime: agenttime
      }).then(response => {
        //this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.msgSuccess(response.msg)
          this.isDisable=false
          this.open = false
          this.getList()
        }
      }).catch((err)=>{
        //that.$notify.error("预生成数据失败，请重新生成...")
        this.isDisable=false
        this.open = false
        this.loading = false
      })
    },
    // 新增推广码表单重置
    resetformaddPromotionCode() {
      this.formaddPromotionCode = {
        code: null
      }
      this.resetForm('formaddPromotionCode')
    },
    // 删除推广码表单重置
    resetformdelPromotionCode() {
      this.formdelPromotionCode = {
        code: null
      }
      this.resetForm('formdelPromotionCode')
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.$refs['queryForm'].validate(valid => {
        if (valid) {
          this.getList()
        }
      })
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.repId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增推广码提交按钮 */
    submitaddPromotionCode() {
      this.$refs['formaddPromotionCode'].validate(valid => {
        if ((/^[0-9]+$/).test(this.formaddPromotionCode.code)) {
          addPromotionCode(this.formaddPromotionCode).then(response => {
            if (response.code == 0) {
              this.$message.error(response.msg)
            } else {
              this.msgSuccess('新增成功')
              this.addPromotionCode = false
              this.getList()
            }
          })
        } else {
          this.$message.error('推广码只能为纯数字')
        }
      })
    },
    /** 删除推广码提交按钮 */
    submitdelPromotionCode() {
      this.$refs['formdelPromotionCode'].validate(valid => {
        if ((/^[0-9]+$/).test(this.formdelPromotionCode.code)) {
          delPromotionCode(this.formdelPromotionCode).then(response => {
            if (response.code == 0) {
              this.$message.error(response.msg)
            } else {
              this.msgSuccess('删除成功')
              this.delPromotionCode = false
              this.getList()
            }
          })
        } else {
          this.$message.error('推广码只能为纯数字')
        }
      })
    },
    regisNumber(rows, column) {
      return rows.newmember + '/' + rows.totalmember
    },
    ios(rows, column) {
      return rows.totalEnterlivetimes + '/' + rows.totalActiveandroid + '/' + rows.totalActiveios
    },
    rukuanjine(rows, column) {
      return rows.totalRukuanrenshu + '/' + rows.totalRukuanbishu + '/' + rows.totalRukuanjine
    },
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportReportAgentCount(queryParams)
      }).then(response => {
        this.downloadExcel(response, '推广统计报表')
      }).catch(() => {
      })
    }

  }
}
</script>
