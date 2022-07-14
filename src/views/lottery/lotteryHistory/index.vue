<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="70px">
      <el-form-item prop="name">
        <el-select
          filterable
          v-model="queryParams.name"
          placeholder="请选择彩种"
          clearable
          size="small"
          style="width: 240px">
          <el-option
            v-for="dict in lotteryInfoNameOptions"
            :key="dict.name"
            :label="dict.name"
            :value="dict.name"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable size="small">
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
          placeholder="请输入期数"
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
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="addIssue"
          v-hasPermi="['admin:lotteryHistory:add']">补期
        </el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="lotteryHistoryList">
      <!--      <el-table-column label="ID" align="center" prop="id"/>-->
      <el-table-column label="彩票名称" align="center" prop="name"/>
      <el-table-column label="期数" align="center" prop="issue"/>
      <el-table-column label="开奖号码" align="center" min-width="150px" prop="code"/>
      <el-table-column label="开奖时间" min-width="90px" align="center" prop="ktime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ktime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总投注" align="center" prop="totalBet"/>
      <el-table-column label="杀率" align="center" prop="killRate"/>
      <el-table-column label="派奖" align="center" prop="totalPrize"/>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <span :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}">
            {{ status.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100px" class-name="small-padding fixed-width">
        <template slot-scope="scope" v-if="scope.row.status >= 2">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-refresh-right"
            plain
            @click="handleAward(scope.row)"
          >重新派奖</el-button>
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
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="opene" width="450px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="开始期数" prop="gameStartTime" class="is-required" style="width: 350px">
          <el-input v-model="form.startIssue" placeholder="请输入开始期数" prop="startIssue" />
        </el-form-item>
        <el-form-item label="结束期数" prop="gameEndTime" class="is-required" style="width: 350px">
          <el-input v-model="form.endIssue" placeholder="请输入结束期数" prop="endIssue"/>
        </el-form-item>
        <el-form-item label="彩票名称" prop="name" class="is-required">
          <el-select
            filterable
            v-model="form.name"
            placeholder="请选择彩种"
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
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listLotteryHistory, lotteryInfoName, changeStatus,addLotteryHistoryIssue} from "@/api/platform-web/lottery/lotteryHistory";
import {pickerDateShortcuts} from "@/utils/dateUtils";

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
      // 表单校验
      rules: {
        ktime: [
          {required: true, message: "开奖时间不能为空", trigger: "blur"}
        ],
        name: [
          { required: true, message: "彩种不能为空",trigger: "blur" }
        ],
        startIssue: [
          { required: true, message: "开始期数不能为空",trigger: "blur" }
        ],
        endIssue: [
          { required: true, message: "结束期数不能为空",trigger: "blur" }
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
        return '投注中'
      } else if (row.status == 1) {
        return '已开奖'
      } else if (row.status == 2) {
        return '已派奖'
      } else if (row.status == 3) {
        return '开奖失败'
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
          this.msgSuccess("重新派奖成功")
          this.getList()
        }
      });
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
      this.title = "补开奖";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          addLotteryHistoryIssue(this.form).then(response => {
            this.msgSuccess("新增成功");
            this.opene = false;
            this.getList();
          });
        }
      });
    }
  }
};
</script>
