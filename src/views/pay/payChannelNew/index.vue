<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="通道名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入通道名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="支付平台" prop="payPlatformId">
        <el-select
          filterable
          v-model="queryParams.payPlatformId"
          placeholder="支付平台"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="Platform in payPlatformOptions"
            :key="Platform.id"
            :label="Platform.name"
            :value="Platform.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="支付类型" prop="payTypeId">
        <el-select
          filterable
          v-model="queryParams.payTypeId"
          placeholder="支付类型"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="payTp in payTypes"
            :key="payTp.id"
            :label="payTp.name"
            :value="payTp.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['pay:payChannelNew:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['pay:payChannelNew:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['pay:payChannelNew:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:payChannelNew:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="payChannelNewList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="通道名称" align="center" prop="name" />
      <el-table-column label="支付方式编码" align="center" prop="payMethod" />
      <el-table-column label="状态" align="center" prop="status" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="开启回调" align="center" prop="isCanCallback">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isCanCallback"
            active-value="1"
            inactive-value="0"
            @change="callbackStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="支付平台名称" align="center" prop="payPlatformName" />
      <el-table-column label="支付类型名称" align="center" prop="payTypeName" />
      <el-table-column label="通道费率" align="center" prop="payRateStr" />
      <el-table-column label="排序" align="center" prop="indexes" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:payChannelNew:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:payChannelNew:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【支付通道】对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="770px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="通道名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入通道名称(前缀请加上支付平台)" />
        </el-form-item>
        <el-form-item label="支付方式编码" prop="payMethod">
          <el-input v-model="form.payMethod" placeholder="请输入支付方式编码" />
        </el-form-item>
        <el-form-item label="排序号" prop="indexes">
          <el-input type="number" v-model="form.indexes" placeholder="请输入排序号" :min="0" />
        </el-form-item>
        <el-form-item label="支付平台" prop="payPlatformId">
          <el-select
            filterable
            v-model="form.payPlatformId"
            placeholder="请选择存入类型"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="Platform in payPlatformOptions"
              :key="Platform.id"
              :label="Platform.name"
              :value="Platform.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="支付类型" prop="payTypeId">
          <el-select
            filterable
            v-model="form.payTypeId"
            placeholder="请选择存入类型"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in payTypes"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="充值最低" prop="rechargeMin">
          <el-input type="number" v-model="form.rechargeMin" placeholder="请输入充值最低" :min="0"/>
        </el-form-item>
        <el-form-item label="充值最高" prop="rechargeMax">
          <el-input type="number" v-model="form.rechargeMax" placeholder="请输入充值最高" :min="0" />
        </el-form-item>
        <el-form-item label="通道费率" prop="payRate">
          <el-input v-model="form.payRate" placeholder="请输入通道费率" />
        </el-form-item>
        <el-form-item label="开放层级" prop="openLevel">
          <el-input type="number" v-model="form.openLevel" placeholder="请输入开放层级"  />
        </el-form-item>
        <el-form-item label="支付属性" prop="payAttr">
          <el-radio-group v-model="form.payAttr">
            <el-radio label="0">http</el-radio>
            <el-radio label="1">支付宝sdk</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="输入类型 " prop="inputType">
          <el-radio-group v-model="form.inputType">
            <el-radio label="1">自定义金额+快捷金额</el-radio>
            <el-radio label="0">仅快捷金额</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="快捷金额" prop="quickAmount">
          <el-input v-model="form.quickAmount"  type="textarea" placeholder="请输入快捷金额,用','分割(英文逗号)" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注提示" />
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
import { listPayChannelNew, getPayChannelNew, delPayChannelNew, addPayChannelNew, updatePayChannelNew, exportPayChannelNew,platforms,payTypes,changePayTypeStatus,callbackStatusChange} from "@/api/platform-web/pay/payChannelNew";


export default {
  name: "PayChannelNew",
  components: {
  },
  data() {
    return {
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
      // 状态数据字典
      statusOptions: [],
      //支付平台
      payPlatformOptions: [],
      //支付类型
      payTypes: [],
      // 总条数
      total: 0,
      // 【支付通道】表格数据
      payChannelNewList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        name: null,
        payMethod: null,
        payAttr: null,
        failNum: null,
        successNum: null,
        totalSuccessMoney: null,
        rechargeMin: null,
        rechargeMax: null,
        status: null,
        isCanCallback: null,
        indexes: null,
        openLevel: null,
        payPlatformId: null,
        payTypeId: null,
        discountBill: null,
        quickAmount: null,
        inputType: null,
        creator: null,
        updator: null,
        payRate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "通道名称不能为空", trigger: "blur" }
        ],
        payAttr: [
          { required: true, message: "支付属性  0http 1支付宝sdk 2第三方app不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态(1启用0停用)不能为空", trigger: "blur" }
        ],
        payPlatformId: [
          { required: true, message: "支付平台编号不能为空", trigger: "blur" }
        ],
        payTypeId: [
          { required: true, message: "支付类型编号不能为空", trigger: "blur" }
        ],
        quickAmount: [
          { required: true, message: "快捷金额不能为空", trigger: "blur" }
        ],
        inputType: [
          { required: true, message: "输入类型 (自定义金额+快捷金额1 仅快捷金额0)不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getDicts('pay_channel_status').then(response => {
      this.statusOptions = response.data
    })
    //支付平台
    platforms().then(response => {
      this.payPlatformOptions = response.data
    })
    //支付类型
    payTypes().then(response => {
      this.payTypes = response.data
    })

    this.getList();
  },
  methods: {
    /** 查询【支付通道】列表 */
    getList() {
      this.loading = true;
      listPayChannelNew(this.queryParams).then(response => {
        this.payChannelNewList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    //支付通道状态修改
    handleStatusChange(row) {
      let text = row.status === "1" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.name + '"吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return changePayTypeStatus(row.id, row.status);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function() {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
    //支付回调修改
    callbackStatusChange(row) {
      let text = row.isCanCallback === "1" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.name + '"吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return callbackStatusChange(row.id, row.isCanCallback);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function() {
        row.isCanCallback = row.isCanCallback === "0" ? "1" : "0";
      });
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
        name: null,
        payMethod: null,
        payAttr: null,
        failNum: null,
        successNum: null,
        totalSuccessMoney: null,
        rechargeMin: null,
        rechargeMax: null,
        status: '0',
        isCanCallback: null,
        indexes: null,
        openLevel: null,
        payPlatformId: null,
        payTypeId: null,
        discountBill: null,
        quickAmount: null,
        inputType: '1',
        remark: null,
        creator: null,
        createTime: null,
        updator: null,
        updateTime: null,
        payRate: null
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加【支付通道】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPayChannelNew(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【支付通道】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePayChannelNew(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayChannelNew(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除【支付通道】编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPayChannelNew(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有【支付通道】数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPayChannelNew(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
