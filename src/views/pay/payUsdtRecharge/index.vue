<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建时间" prop="selectDate" label-width="70px">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '360px'}" start-placeholder="开始时间"
                        end-placeholder="结束时间" range-separator="至" :default-time="['00:00:00', '23:59:59']" clearable
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          placeholder="请输入会员编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入会员账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="channelName">
        <el-select
          filterable
          v-model="queryParams.channelName"
          placeholder="请选择渠道名称"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="channelName in channelNameOptions"
            :key="channelName.channelName"
            :label="channelName.channelName"
            :value="channelName.channelName"
          />
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="充值U数量" prop="rechargeNumber">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.rechargeNumber"-->
      <!--          placeholder="请输入充值U数量"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="充值金额" prop="rechargeMoney">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.rechargeMoney"-->
      <!--          placeholder="请输入充值金额"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择处理状态" size="small" clearable>
          <el-option
            v-for="item in statusQueryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="优惠比例" prop="discountBill">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.discountBill"-->
      <!--          placeholder="请输入优惠比例"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="链名称" prop="chainName">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.chainName"-->
      <!--          placeholder="请输入链名称"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="充值地址" prop="rechargeAddress">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.rechargeAddress"-->
      <!--          placeholder="请输入充值地址"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item prop="transactionId">
        <el-input
          v-model="queryParams.transactionId"
          placeholder="请输入交易id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="操作人" prop="opName">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.opName"-->
      <!--          placeholder="请输入操作人"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="primary"-->
      <!--          plain-->
      <!--          icon="el-icon-plus"-->
      <!--          size="mini"-->
      <!--          @click="handleAdd"-->
      <!--          v-hasPermi="['admin:payUsdtRecharge:add']"-->
      <!--        >新增</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          plain-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--          v-hasPermi="['admin:payUsdtRecharge:edit']"-->
      <!--        >修改</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          plain-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--          v-hasPermi="['admin:payUsdtRecharge:remove']"-->
      <!--        >删除</el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:payUsdtRecharge:export']"
        >导出
        </el-button>
      </el-col>
      <el-col :span="10" style="margin-left: 10px">
        <span style="font-size: 16px;margin-right: 10px">记录刷新</span>
        <el-select v-model="refreshSec" placeholder="时间间隔" style="width: 110px">
          <el-option value="5" label="5秒"></el-option>
          <el-option value="10" label="10秒"></el-option>
          <el-option value="15" label="15秒"></el-option>
          <el-option value="20" label="20秒"></el-option>
          <el-option value="30" label="30秒"></el-option>
        </el-select>
        <div style="width: 120px;display: inline-block;text-align: center">
          <span>{{ refreshDesc }}</span>
        </div>
        <el-button :type="refreshType" :icon="refreshIcon" size="mini" @click="refreshData">{{
            refreshLabel
          }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="payUsdtRechargeList">
      <el-table-column label="复制" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary" size="mini"
            @click="handleCopy(scope.row)"
          >复制
          </el-button>
        </template>
      </el-table-column>
      <!--      <el-table-column label="系统编号" align="center" prop="id" />-->
      <el-table-column label="会员编号" align="center" prop="memberId"/>
<!--      <el-table-column label="会员账号" align="center" prop="userName"/>-->
      <el-table-column label="渠道名称" align="center" min-width="120" prop="channelName"/>
      <el-table-column label="充值U数量" align="center" prop="rechargeNumber"/>
      <el-table-column label="充值金额" align="center" prop="rechargeMoney"/>
      <el-table-column label="优惠比例" align="center" prop="discountBill"/>
      <el-table-column label="交易链名称" align="center" min-width="120" prop="chainName"/>
      <el-table-column label="充值地址" align="center" min-width="260" prop="rechargeAddress"/>
      <el-table-column label="交易id" align="center" min-width="300" prop="transactionId"/>
      <el-table-column label="处理状态" align="center" prop="status" :formatter="formatterStatus"/>
      <el-table-column label="状态" align="center" prop="status" min-width="120">
        <template slot-scope="scope">
          <span :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}">{{
              status.dictLabel
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="150">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" min-width="90" prop="remark"/>
      <el-table-column label="操作人" align="center" prop="opName"/>
      <el-table-column label="审批时间" align="center" prop="updateTime" width="150">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="210">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            plain
            v-show="scope.row.status == 1"
            @click="handleUpdateLock(scope.row)"
            v-hasPermi="['admin:liveComplaint:edit']"
          >锁定
          </el-button>
          <el-button
            size="small"
            type="primary"
            plain
            v-show="scope.row.status == 0"
            @click="handleUpdateUnLock(scope.row)"
            v-hasPermi="['admin:liveComplaint:edit']"
          >解锁
          </el-button>
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.status == 0"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveComplaint:edit']"
          >通过
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.status == 0"
            @click="handleUpdateRefuse(scope.row)"
            v-hasPermi="['admin:liveComplaint:edit']"
          >拒绝
          </el-button>
        </template>
        <!--        <template slot-scope="scope">-->
        <!--          <el-button-->
        <!--            size="mini"-->
        <!--            type="text"-->
        <!--            icon="el-icon-edit"-->
        <!--            @click="handleUpdate(scope.row)"-->
        <!--            v-hasPermi="['admin:payUsdtRecharge:edit']"-->
        <!--          >修改</el-button>-->
        <!--          <el-button-->
        <!--            size="mini"-->
        <!--            type="text"-->
        <!--            icon="el-icon-delete"-->
        <!--            @click="handleDelete(scope.row)"-->
        <!--            v-hasPermi="['admin:payUsdtRecharge:remove']"-->
        <!--          >删除</el-button>-->
        <!--        </template>-->
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 通过USDT充值记录对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="会员编号" prop="memberId">
          <el-input v-model="form.memberId" readonly placeholder="请输入会员编号"/>
        </el-form-item>
        <el-form-item label="会员账号" prop="userName">
          <el-input v-model="form.userName" readonly placeholder="请输入会员账号"/>
        </el-form-item>
        <el-form-item label="渠道名称" prop="channelName">
          <el-input v-model="form.channelName" readonly placeholder="请输入渠道名称"/>
        </el-form-item>
        <el-form-item label="充值U数量" prop="rechargeNumber">
          <el-input v-model="form.rechargeNumber" readonly placeholder="请输入充值U数量"/>
        </el-form-item>
        <el-form-item label="充值金额" prop="rechargeMoney">
          <el-input v-model="form.rechargeMoney" readonly placeholder="请输入充值金额"/>
        </el-form-item>
        <el-form-item label="优惠比例" prop="discountBill">
          <el-input v-model="form.discountBill" readonly placeholder="请输入优惠比例"/>
        </el-form-item>
        <el-form-item label="链名称" prop="chainName">
          <el-input v-model="form.chainName" readonly placeholder="请输入链名称"/>
        </el-form-item>
        <el-form-item label="充值地址" prop="rechargeAddress">
          <el-input v-model="form.rechargeAddress" readonly placeholder="请输入充值地址"/>
        </el-form-item>
        <el-form-item label="交易id" prop="transactionId">
          <el-input type="textarea" v-model="form.transactionId" readonly placeholder="请输入交易id"/>
        </el-form-item>
        <el-form-item label="审核备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入审核备注"/>
        </el-form-item>
        <el-form-item label="谷歌验证码" prop="googleAuthCode">
          <el-input v-model="form.googleAuthCode" type="number" class="no-number" placeholder="请输入谷歌验证码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">通 过</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listPayUsdtRecharge,
  getPayUsdtRecharge,
  delPayUsdtRecharge,
  addPayUsdtRecharge,
  updatePayUsdtRecharge,
  refusePayUsdtRecharge,
  exportPayUsdtRecharge,
  lockPayUsdtRecharge,
  unLockPayUsdtRecharge,
  channelNames
} from "@/api/platform-web/pay/payUsdtRecharge";
import {pickerDateTimeShortcuts} from '@/utils/dateUtils'

export default {
  name: "PayUsdtRecharge",
  components: {},
  data() {
    return {
      refreshSec: '5',
      refreshType: 'primary',
      refreshIcon: 'el-icon-refresh',
      refreshLabel: '开始刷新',
      refreshDesc: '',
      statusQueryOptions: [{
        value: '0',
        label: '锁定'
      }, {
        value: '1',
        label: '已提交'
      }, {
        value: '2',
        label: '拒绝'
      }, {
        value: '3',
        label: '通过'
      }],
      // 状态字典
      statusOptions: [],
      // 日期范围
      selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      //渠道名称
      channelNameOptions: [],
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
      // USDT充值记录表格数据
      payUsdtRechargeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        pageNum: 1,
        pageSize: 10,
        memberId: null,
        userName: null,
        channelName: null,
        rechargeNumber: null,
        rechargeMoney: null,
        status: null,
        discountBill: null,
        chainName: null,
        rechargeAddress: null,
        transactionId: null,
        opName: null,
        orderByColumn: 'createTime',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        remark: [
          {required: true, message: '审核备注不能为空', trigger: 'blur'}
        ],
        googleAuthCode: [
          {required: true, message: '谷歌验证码不能为空', trigger: 'blur'}
        ]
      }
    };
  },
  created() {
    this.getList();
    //渠道名称
    channelNames().then(response => {
      this.channelNameOptions = response.data
    })
    this.getDicts('pay_usdt_status').then(response => {
      this.statusOptions = response.data
    })
  },
  activated() {
    this.refreshType = 'primary'
    this.refreshIcon = 'el-icon-refresh'
    this.refreshLabel = '开始刷新'
    this.refreshDesc = ''
    this.stopRefresh()
  },
  methods: {
    refreshData() {
      if (this.refreshType === 'primary') {
        this.refreshType = 'danger'
        this.refreshIcon = 'el-icon-circle-close'
        this.refreshLabel = '停止刷新'
        this.refreshDesc = ''
        this.stopRefresh()
        this.refreshQuery()
        this.startRefresh()
      } else {
        this.refreshType = 'primary'
        this.refreshIcon = 'el-icon-refresh'
        this.refreshLabel = '开始刷新'
        this.refreshDesc = ''
        this.stopRefresh()
      }
    },
    startRefresh() {
      const thet = this
      let secs = thet.refreshSec
      window.refreshInterval = setInterval(function () {
        if (secs === 0) {
          thet.refreshQuery()
          secs = thet.refreshSec
        }
        thet.refreshDesc = secs + '秒后开始刷新'
        secs--
      }, 1000)
    },
    stopRefresh() {
      clearInterval(window.refreshInterval)
    },
    /** 刷新搜索操作 */
    refreshQuery() {
      this.queryParams.priceMax=""
      this.queryParams.priceMin=""
      this.handleQuery()
    },
    /** 复制按钮 */
    handleCopy(row) {
      var status = this.statusOptions[parseInt(row.status)];
      var textarea = document.createElement("textarea");
      let html = '<table><tr>'
      html += '<td>' + row.memberId + '</td>'
      html += '<td>' + row.channelName + '</td>'
      html += '<td>' + row.rechargeNumber + '</td>'
      html += '<td>' + row.rechargeMoney + '</td>'
      html += '<td>' + row.discountBill + '</td>'
      html += '<td>' + row.chainName + '</td>'
      html += '<td>' + row.rechargeAddress + '</td>'
      html += '<td>' + row.transactionId + '</td>'
      html += '<td>' + status.dictLabel + '</td>'
      html += '<td>' + row.createTime + '</td>'
      html += '<td>' + row.remark + '</td>'
      html += '<td>' + row.opName + '</td>'
      html += '<td>' + row.updateTime + '</td>'
      html += '</tr></table>'
      textarea.value = html;
      this.copyData = html
      this.copy(this.copyData)
    },
    copy(data) {
      let url = data;
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      });
      oInput.remove()
    },
    /** 查询USDT充值记录列表 */
    getList() {
      this.loading = true;
      listPayUsdtRecharge(this.queryParams).then(response => {
        this.payUsdtRechargeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 处理状态
    formatterStatus(row) {
      if (row.status == 1) {
        return '未处理'
      } else if (row.status == 2) {
        return '拒绝'
      } else if (row.status == 3) {
        return '通过'
      } else if (row.status == 0) {
        return '锁定'
      }
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        memberId: null,
        userName: null,
        channelName: null,
        rechargeNumber: null,
        rechargeMoney: null,
        status: null,
        remark: null,
        discountBill: null,
        chainName: null,
        rechargeAddress: null,
        transactionId: null,
        opName: null,
        createTime: null,
        updateTime: null
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
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加USDT充值记录";
    },
    /** 锁定按钮操作 */
    handleUpdateLock(row) {
      const id = row.id
      lockPayUsdtRecharge(id).then(response => {
        this.$message.success("锁定成功")
        this.getList()
      });
    },
    /** 解锁按钮操作 */
    handleUpdateUnLock(row) {
      const id = row.id
      unLockPayUsdtRecharge(id).then(response => {
        if (response.data.code == 200) {
          this.$message.success("解锁成功")
          this.getList();
        } else {
          this.$message.error(response.data.msg)
        }
      });
    },
    /** 通过按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id
      getPayUsdtRecharge(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "审批USDT充值记录申请";
      });
    },
    /** 拒绝按钮操作 */
    handleUpdateRefuse(row) {
      this.$prompt('请输入审核拒绝备注', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '审核拒绝备注不能为空',
      }).then(({value}) => {
        const id = row.id
        refusePayUsdtRecharge(id, value).then(response => {
          this.msgSuccess("审核拒绝成功");
          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    /** 通过提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const id = this.form.id
          const remark = this.form.remark
          const googleAuthCode = this.form.googleAuthCode
          updatePayUsdtRecharge(id,remark,googleAuthCode).then(response => {
            console.info(response)
            if (response.code == 200) {
              this.$message.success(response.msg)
              this.open = false;
              this.getList();
            } else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error("订单审核通过有误")
          })
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除USDT充值记录编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delPayUsdtRecharge(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportPayUsdtRecharge(queryParams);
      }).then(response => {
        this.downloadExcel(response, 'USDT充值记录');
      }).catch(() => {
      })
    }
  }
};
</script>
