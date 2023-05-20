<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px"
             :rules="queryRule">
      <el-form-item :label=" $t('report.agentCount.ds') " prop="agenttime">
        <el-date-picker type="daterange" v-model="dateRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '250px'}" :start-placeholder=" $t('global.dateTimePickerStartDatePlaceholder') "
                        :end-placeholder=" $t('global.dateTimePickerEndDatePlaceholder') " clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="agentcode">
        <el-input
          v-model="queryParams.agentcode"
          :placeholder=" $t('report.agentCount.cc') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item prop="agentname">
              <el-input
                v-model="queryParams.agentname"
                placeholder="邀请账号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" :disabled="isDisable">{{ $t('global.searchButton') }}
        </el-button>
      </el-form-item>
      <span
        style="position:relative ;color: red ;top:7px;font-size: 15px">{{ $t('report.agentCount.afr') }}</span>
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
        >{{ $t('global.exportButton') }}
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
        >{{ $t('report.agentCount.cc') }}
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
        >{{ $t('report.agentCount.dpc') }}
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
        >{{ $t('report.agentCount.bdp') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <div ref="container" style="position: relative">
      <el-table v-loading="loading" :data="report" :stripe="true">
        <el-table-column :label=" $t('report.agentCount.cc') " align="center" prop="agentcode">
          <template slot-scope="scope">
            <a style="color: #00afff" @click="jump(scope.row.agentcode,scope.row.agenttime)">{{
                scope.row.agentcode
              }}</a>
          </template>
        </el-table-column>
        <!--        <el-table-column label="邀请账号" min-width="150" align="center" prop="agentname"/>-->
        <el-table-column :label=" $t('report.agentCount.st') " align="center" prop="agenttime" min-width="130"/>
        <el-table-column :label=" $t('report.agentCount.sd') " min-width="130" align="center" prop="regisNumber"
                         :formatter="regisNumber"/>
        <el-table-column :label=" $t('report.agentCount.ce') " min-width="130" align="center" prop="gsRukuanjine"/>
        <el-table-column :label=" $t('report.agentCount.od') " min-width="130" align="center" prop="xsRukuanjine"/>
        <el-table-column :label=" $t('report.agentCount.me') " min-width="130" align="center" prop="sgRukuanjine"/>
        <el-table-column :label=" $t('report.agentCount.tad') " min-width="120" align="center" prop="totalfristRukuanjine"/>
        <el-table-column :label=" $t('report.agentCount.psa') " min-width="170" align="center" prop="totalChukuanjine"/>
        <el-table-column :label=" $t('report.agentCount.psad') " min-width="170" align="center" prop="rukuanjine"
                         :formatter="rukuanjine" fixed="right"/>
        <el-table-column :label=" $t('report.agentCount.nug') " min-width="120" align="center" prop="totalGiveprop"/>
        <el-table-column :label=" $t('report.agentCount.nol') " min-width="210" align="center" prop="ios" :formatter="ios"
                         fixed="right"/>
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
      :title=" $t('report.agentCount.npc') "
      :visible.sync="addPromotionCode"
      width="500px"
      append-to-body
    >
      <el-form ref="formaddPromotionCode" :model="formaddPromotionCode" :rules="rules" label-width="70px">
        <el-form-item :label=" $t('report.agentCount.pc') " prop="code">
          <el-input :placeholder=" $t('report.agentCount.pepc') " v-model="formaddPromotionCode.code"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitaddPromotionCode">{{ $t('report.agentCount.snow') }}</el-button>
      </div>
    </el-dialog>

    <!-- 删除推广码弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title=" $t('report.agentCount.dpc') "
      :visible.sync="delPromotionCode"
      width="500px"
      append-to-body
    >
      <el-form ref="formdelPromotionCode" :model="formdelPromotionCode" :rules="rules" label-width="70px">
        <el-form-item :label=" $t('report.agentCount.pc') " prop="code">
          <el-input :placeholder=" $t('report.agentCount.pepc') " v-model="formdelPromotionCode.code"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitdelPromotionCode">{{ $t('report.agentCount.snow') }}</el-button>
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
import {getYesterDate, parseTime} from '@/utils/dateUtils'
import {pickerDateShortcuts} from '@/utils/dateUtils'

export default {
  name: 'Agent',
  components: {},
  data() {
    return {
      dateRange: [parseTime(new Date(), '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      //日期快捷
      pickerOptions: {shortcuts: pickerDateShortcuts},
      interval: {listTime: null},
      // 遮罩层
      listLoading: false,
      isDestroyed: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      isDisable: false,
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
          {required: true, message: this.$t('report.agentCount.pcce') , trigger: 'blur'}
        ]
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        code: [
          {required: true, message: this.$t('report.agentCount.pcce') , trigger: 'blur'}
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
      listReport(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        if (response.code == 200) {
          this.report = response.data
          this.loading = false
        }

        // that.$loading.hide();
        // that.listLoading = false;
        // that.$rjLoading.hide();
      }).catch((err) => {
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
      liststorage(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.getList()
      })
    },
    jump(agentcode, agenttime) {
      this.$router.push({path: '/report/memberAgent', query: {agentcode: agentcode, agenttime: agenttime}})
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
      this.isDisable = true;
      generatedata(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        //this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.msgSuccess(response.msg)
          this.isDisable = false
          this.open = false
          this.getList()
        }
      }).catch((err) => {
        //that.$notify.error("预生成数据失败，请重新生成...")
        this.isDisable = false
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
              this.msgSuccess( this.$t('report.agentCount.as') )
              this.addPromotionCode = false
              this.getList()
            }
          })
        } else {
          this.$message.error( this.$t('report.agentCount.pcpn') )
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
              this.msgSuccess( this.$t('report.agentCount.dels') )
              this.delPromotionCode = false
              this.getList()
            }
          })
        } else {
          this.$message.error( this.$t('report.agentCount.pcpn') )
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
      this.$confirm( this.$t('report.agentCount.cpe') ,  this.$t('global.dialogTitle') , {
        confirmButtonText: this.$t('global.confirmButton') ,
        cancelButtonText: this.$t('global.cancelButton') ,
        type: 'warning'
      }).then(function () {
        return exportReportAgentCount(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('report.agentCount.psr') )
      }).catch(() => {
      })
    }

  }
}
</script>
