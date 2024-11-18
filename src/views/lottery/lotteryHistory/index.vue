<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="70px">
      <el-form-item prop="name">
        <el-select
          filterable
          v-model="queryParams.lotteryId"
          :placeholder="$t('lottery.lotteryHistory.form.namePlaceholder')"
          clearable
          size="small"
          style="width: 240px">
          <el-option
            v-for="dict in lotteryInfoNameOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" :placeholder="$t('lottery.lotteryHistory.form.statusPlaceholder')"
                   clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="issue">
        <el-input
          v-model="queryParams.issue"
          :placeholder="$t('lottery.lotteryHistory.form.issuePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item prop="ktime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('global.datePickerStartDatePlaceholder')"
          :end-placeholder="$t('global.datePickerEndDatePlaceholder')"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">
          {{ $t('global.searchButton') }}
        </el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('global.resetButton') }}</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="addIssue"
          v-hasPermi="['admin:lotteryHistory:add']">{{ $t('lottery.lotteryHistory.form.addIssueButton') }}
        </el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="addIssue2"
          v-hasPermi="['admin:lotteryHistory:add']">{{ $t('lottery.lotteryHistory.form.addIssueButton2') }}
        </el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="lotteryHistoryList">
      <!--      <el-table-column label="ID" align="center" prop="id"/>-->
      <el-table-column :label="$t('lottery.lotteryHistory.tableColumns.name')" align="center" prop="name"/>
      <el-table-column :label="$t('lottery.lotteryHistory.tableColumns.issue')" align="center" prop="issue"/>
      <el-table-column :label="$t('lottery.lotteryHistory.tableColumns.code')" align="center" min-width="150px"
                       prop="code"/>
      <el-table-column :label="$t('lottery.lotteryHistory.tableColumns.ktime')" min-width="90px" align="center"
                       prop="ktime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ktime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('lottery.lotteryHistory.tableColumns.totalBet')" align="center" prop="totalBet"/>
      <el-table-column :label="$t('lottery.lotteryHistory.tableColumns.killRate')" align="center" prop="killRate"/>
      <el-table-column :label="$t('lottery.lotteryHistory.tableColumns.totalPrize')" align="center" prop="totalPrize"/>

      <el-table-column :label="$t('global.status')" align="center" prop="status">
        <template slot-scope="scope">
          <span :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}">
            {{ status.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('lottery.lotteryHistory.tableColumns.updateTime')" align="center" prop="updateTime"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" min-width="100px"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-refresh-right"
            plain
            v-if="scope.row.status >= 2 && scope.row.lotteryId < 2002"
            @click="handleAward(scope.row)"
          >{{ $t('lottery.lotteryHistory.tableColumns.repaymentButton') }}
          </el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            plain
            v-if="scope.row.status === 1 && scope.row.lotteryId >= 2002"
            @click="handle6heAward(scope.row)"
          >派奖
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            plain
            v-if="scope.row.status === 0 && scope.row.lotteryId >= 2002"
            @click="handle6heAwardUpdate(scope.row)"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            plain
            v-if="scope.row.status === 0 && scope.row.lotteryId >= 2002"
            v-hasPermi="['admin:lotteryHistory:remove']"
            @click="handle6heAwardDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加补奖配置对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="opene" width="450px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item :label="$t('lottery.lotteryHistory.dialogForm.gameStartTimeLabel')" prop="gameStartTime"
                      class="is-required" style="width: 350px">
          <el-input v-model="form.startIssue"
                    :placeholder="$t('lottery.lotteryHistory.dialogForm.startIssuePlaceholder')" prop="startIssue"/>
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryHistory.dialogForm.gameEndTimeLabel')" prop="gameEndTime"
                      class="is-required" style="width: 350px">
          <el-input v-model="form.endIssue" :placeholder="$t('lottery.lotteryHistory.dialogForm.endIssuePlaceholder')"
                    prop="endIssue"/>
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryHistory.dialogForm.nameLabel')" prop="name" class="is-required">
          <el-select
            filterable
            v-model="form.name"
            :placeholder="$t('lottery.lotteryHistory.dialogForm.namePlaceholder')"
            clearable
            size="small"
            style="width: 250px"
          >
            <el-option
              v-for="dict in lotteryInfoNameOptions"
              :key="dict.name"
              :label="dict.name"
              :value="dict.name"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.confirmButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>


    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="openAm6" width="450px"
               append-to-body>
      <el-form ref="formaNew6hecai" :model="form2" :rules="rules" label-width="100px">
        <el-form-item label="六合彩" prop="name" class="is-required">
          <el-select
            filterable
            v-model="form2.lotteryId"
            placeholder="六合彩"
            clearable
            size="small"
            style="width: 250px" :disabled="form2.id !== undefined"
          >
            <el-col>

            </el-col>
            <el-option
              v-for="dict in lotteryInfoNameOptions"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
              :disabled="dict.id < 2002"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="期数" prop="issue" class="is-required" style="width: 350px">
          <el-input v-model="form2.issue" placeholder="请输入期数" prop="issue" type="number"
                    :disabled="form2.id !== undefined"/>
        </el-form-item>
        <el-form-item label="开奖时间" prop="regTime">
          <el-date-picker clearable size="small"
                          v-model="form2.ktime"
                          type="date"
                          format="yyyy-MM-dd"
                          :value-format="lottery6heFormat(form2.lotteryId)"
                          :placeholder=" $t('global.selectDate') "
                          style="width: 140px"
                          :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAdd">{{ $t('global.confirmButton') }}</el-button>
        <el-button @click="openAm6 = false">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listLotteryHistory,
  lotteryInfoName,
  changeStatus,
  addLotteryHistoryIssue, addNew6hecaiIssue, handle6heAward, handle6heAwardDelete, get6hecaiLottery, handle6hecaiEdit
} from "@/api/platform-web/lottery/lotteryHistory";
import {pickerDateShortcuts} from "@/utils/dateUtils";
import {getLotteryInfo} from "@/api/platform-web/lottery/lotteryInfo";

export default {
  name: "LotteryHistory",
  components: {},
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateShortcuts},
      //全部彩种
      lotteryInfoNameOptions: [],
      // 日期范围
      dateRange: [],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 开奖历史表格数据
      lotteryHistoryList: [],
      statusOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示补开局弹出层
      opene: false,
      openAm6: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 30,
        issue: null,
        lotteryId: null,
        code: null,
        ktime: null,
        status: null,
        name: null,
        killRate: null,
        totalBet: null,
        totalPrize: null,
        analyse: null,
        orderByColumn: 'ktime',
        isAsc: 'desc',
        startIssue: null,
        endIssue: null
      },
      // 表单参数
      form: {
        name: null,
        startIssue: null,
        endIssue: null
      },

      form2: {
        lotteryId: null,
        issue: null,
        ktime: this.parseTime(new Date(), '{y}-{m}-{d}'),
      },
      // 表单校验
      rules: {
        ktime: [
          {required: true, message: this.$t('lottery.lotteryHistory.rulesMessage.ktime'), trigger: "blur"}
        ],
        // name: [
        //   {required: true, message: this.$t('lottery.lotteryHistory.rulesMessage.name'), trigger: "blur"}
        // ],
        startIssue: [
          {required: true, message: this.$t('lottery.lotteryHistory.rulesMessage.startIssue'), trigger: "blur"}
        ],
        endIssue: [
          {required: true, message: this.$t('lottery.lotteryHistory.rulesMessage.endIssue'), trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
    //全部彩种
    lotteryInfoName().then(response => {
      this.lotteryInfoNameOptions = response.data
    })
    this.getDicts('lottery_history_status').then(response => {
      this.statusOptions = response.data
    })
  },
  methods: {
    /** 查询开奖历史列表 */
    getList() {
      this.loading = true;
      listLotteryHistory(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.lotteryHistoryList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 0=投注中1=已开奖2=已派奖3=开奖失败
    formatterStatus(row) {
      if (row.status == 0) {
        return this.$t('lottery.lotteryHistory.status.bettingIn')
      } else if (row.status == 1) {
        return this.$t('lottery.lotteryHistory.status.prizeDrawn')
      } else if (row.status == 2) {
        return this.$t('lottery.lotteryHistory.status.prizePaid')
      } else if (row.status == 3) {
        return this.$t('lottery.lotteryHistory.status.lotteryFailure')
      } else {
        return ''
      }
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.opene = false;
    },
    /** 重新派奖按钮操作 */
    handleAward(row) {
      const id = row.id
      changeStatus(id).then(response => {
        if (response.code == 0) {
          this.$message.error(response.msg)
        } else {
          this.msgSuccess(this.$t('lottery.lotteryHistory.rePayoutSuccessMessage'))
          this.getList()
        }
      });
    },


    handle6heAward(row) {
      handle6heAward(row.id).then(res => {
        this.msgSuccess(this.$t('lottery.lotteryHistory.rePayoutSuccessMessage'))
        this.getList()
      })
    },

    handle6heAwardDelete(row) {
      handle6heAwardDelete(row.id).then(res => {
        this.msgSuccess('删除成功')
        this.getList()
      })
    },

    handle6heAwardUpdate(row) {
      this.resetNew6hecai();
      get6hecaiLottery(row.id).then(response => {
        this.form2 = response.data;
        this.openAm6 = true;
      });
    },

    lottery6heFormat(lotteryId) {
      if (!lotteryId) {
        return null;
      }
      let format;
      switch (Number(lotteryId)) {
        case 2003:
          format = 'yyyy-MM-dd 22:30:00';
          break;
        case 2005:
          format = 'yyyy-MM-dd 20:30:00';
          break;
        default:
          format = 'yyyy-MM-dd 21:30:00';
          break;
      }
      console.log(lotteryId, format)
      return format;
    },

    // 表单重置
    reset() {
      this.form = {
        id: null,
        issue: null,
        lotteryId: null,
        code: null,
        ktime: null,
        status: 0,
        name: null,
        killRate: null,
        totalBet: null,
        totalPrize: null,
        analyse: null
      };
      this.resetForm("form");
    },

    resetNew6hecai() {
      this.form2 = {
        issue: null,
        lotteryId: null,
        ktime: null,
      }
      this.resetForm("formaNew6hecai");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 补开奖期数 */
    addIssue() {
      this.reset();
      this.opene = true;
      this.title = this.$t('lottery.lotteryHistory.issueTitle');
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        console.log(this.form.startIssue)
        if (valid) {
          addLotteryHistoryIssue(this.form).then(response => {
            this.msgSuccess(this.$t('lottery.lotteryHistory.addIssueSuccessMessage'));
            this.opene = false;
            this.getList();
          });
        }
      });
    },

    /** 补开奖期数 */
    addIssue2() {
      this.resetNew6hecai();
      this.openAm6 = true;
      this.title = "新增六合彩新期";
    },

    submitAdd() {
      this.$refs['formaNew6hecai'].validate(valid => {
        if (valid) {
          if (this.form2.id) {
            handle6hecaiEdit(this.form2.id, this.form2.ktime).then(res => {
              this.msgSuccess('修改成功')
              this.openAm6 = false;
              this.getList()
            })
          } else {
            addNew6hecaiIssue(this.form2).then(response => {
              this.msgSuccess(this.$t('lottery.lotteryHistory.addIssueSuccessMessage'));
              this.openAm6 = false;
              this.getList();
            })
          }
        }
      })
    }
  }
};
</script>
