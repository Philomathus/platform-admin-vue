<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
<!--
      <el-form-item label="送礼平台用户登录名" prop="pUserName">
        <el-input
          v-model="queryParams.pUserName"
          placeholder="请输入送礼平台用户登录名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="礼物id" prop="propId">
        <el-input
          v-model="queryParams.propId"
          placeholder="请输入礼物id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="道具名" prop="propName">
        <el-input
          v-model="queryParams.propName"
          placeholder="请输入道具名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="钻石" prop="totalDiamonds">
        <el-input
          v-model="queryParams.totalDiamonds"
          placeholder="请输入钻石"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="印票(to_user_id增加的印票）合计;is_red_envelope=1时,为主播获得的：钻石 数量" prop="totalTicket">
        <el-input
          v-model="queryParams.totalTicket"
          placeholder="请输入印票(to_user_id增加的印票）合计;is_red_envelope=1时,为主播获得的：钻石 数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台用户当前余额" prop="currentDiamonds">
        <el-input
          v-model="queryParams.currentDiamonds"
          placeholder="请输入平台用户当前余额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收" prop="toUserId">
        <el-input
          v-model="queryParams.toUserId"
          placeholder="请输入收"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="会员ID" prop="pUserId">
        <el-input
          v-model="queryParams.pUserId"
          placeholder="会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" :style="{width: '60%'}" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="至" clearable></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['admin:liveProplog:add']"
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
          v-hasPermi="['admin:liveProplog:edit']"
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
          v-hasPermi="['admin:liveProplog:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveProplog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="liveProplogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column label="用户ID" align="center" prop="pUserId" width="120"/>
      <el-table-column label="登录名" align="center" prop="pUserName" />
      <el-table-column label="礼物id" align="center" prop="propId" />
      <el-table-column label="道具名" align="center" prop="propName" />
      <el-table-column label="钻石" align="center" prop="totalDiamonds" />
      <el-table-column label="印票数量" align="center" prop="totalTicket" />
      <el-table-column label="当前余额" align="center" prop="currentDiamonds" />
      <el-table-column label="送礼金额" align="center" prop="toUserId" />
      <el-table-column label="送礼日期" align="center" prop="createtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['admin:liveProplog:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['admin:liveProplog:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改用户送礼日志对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="收" prop="id">
          <el-input v-model="form.id" placeholder="请输入收" />
        </el-form-item>
        <el-form-item label="送礼平台用户ID" prop="pUserId">
          <el-input v-model="form.pUserId" placeholder="请输入送礼平台用户ID" />
        </el-form-item>
        <el-form-item label="送礼平台用户登录名" prop="pUserName">
          <el-input v-model="form.pUserName" placeholder="请输入送礼平台用户登录名" />
        </el-form-item>
        <el-form-item label="礼物id" prop="propId">
          <el-input v-model="form.propId" placeholder="请输入礼物id" />
        </el-form-item>
        <el-form-item label="道具名" prop="propName">
          <el-input v-model="form.propName" placeholder="请输入道具名" />
        </el-form-item>
        <el-form-item label="钻石" prop="totalDiamonds">
          <el-input v-model="form.totalDiamonds" placeholder="请输入钻石" />
        </el-form-item>
        <el-form-item label="印票(to_user_id增加的印票）合计;is_red_envelope=1时,为主播获得的：钻石 数量" prop="totalTicket">
          <el-input v-model="form.totalTicket" placeholder="请输入印票(to_user_id增加的印票）合计;is_red_envelope=1时,为主播获得的：钻石 数量" />
        </el-form-item>
        <el-form-item label="平台用户当前余额" prop="currentDiamonds">
          <el-input v-model="form.currentDiamonds" placeholder="请输入平台用户当前余额" />
        </el-form-item>
        <el-form-item label="收" prop="toUserId">
          <el-input v-model="form.toUserId" placeholder="请输入收" />
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
import { listLiveProplog, getLiveProplog, delLiveProplog, addLiveProplog, updateLiveProplog, exportLiveProplog } from "@/api/platform-web/member/liveProplog";

export default {
  name: "LiveProplog",
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
      // 总条数
      total: 0,
      // 用户送礼日志表格数据
      liveProplogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        pUserId: null,
        pUserName: null,
        propId: null,
        propName: null,
        totalDiamonds: null,
        totalTicket: null,
        currentDiamonds: null,
        toUserId: null,
        createtime: null,
        selectDate: null,
        orderByColumn: 'createtime',
        isAsc: 'desc',
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [
          { required: true, message: "收不能为空", trigger: "blur" }
        ],
        propId: [
          { required: true, message: "礼物id不能为空", trigger: "blur" }
        ],
        propName: [
          { required: true, message: "道具名不能为空", trigger: "blur" }
        ],
        totalDiamonds: [
          { required: true, message: "钻石不能为空", trigger: "blur" }
        ],
        totalTicket: [
          { required: true, message: "印票(to_user_id增加的印票）合计;is_red_envelope=1时,为主播获得的：钻石 数量不能为空", trigger: "blur" }
        ],
        toUserId: [
          { required: true, message: "收不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户送礼日志列表 */
    getList() {
      this.loading = true;
      listLiveProplog(this.queryParams).then(response => {
        this.liveProplogList = response.rows;
        this.total = response.total;
        this.loading = false;
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
        pUserId: null,
        pUserName: null,
        propId: null,
        propName: null,
        totalDiamonds: null,
        totalTicket: null,
        currentDiamonds: null,
        toUserId: null,
        createtime: null
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
      this.title = "添加用户送礼日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveProplog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户送礼日志";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveProplog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLiveProplog(this.form).then(response => {
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
      this.$confirm('是否确认删除用户送礼日志编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLiveProplog(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有用户送礼日志数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportLiveProplog(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
