<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="玩家ID" prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          placeholder="请输入玩家ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="本地平台id" prop="platformId">-->
<!--        <el-input-->
<!--          v-model="queryParams.platformId"-->
<!--          placeholder="请输入本地平台id"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择类型" clearable size="small">
          <el-option v-for="item in typeList" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option v-for="item in statusList" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="金额" prop="money">-->
<!--        <el-input-->
<!--          v-model="queryParams.money"-->
<!--          placeholder="请输入金额"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="开始时间" prop="bTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.bTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" :style="{width: '60%'}" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="至" clearable></el-date-picker>
      </el-form-item>
<!--      <el-form-item label="结束时间" prop="eTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.eTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
   <!--   <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['member:logGameOrder:add']"
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
          v-hasPermi="['member:logGameOrder:edit']"
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
          v-hasPermi="['member:logGameOrder:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['member:logGameOrder:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="logGameOrderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="本地ID" align="center" prop="id" />
      <el-table-column label="类型" align="center" prop="type" width="60" :formatter="formatterType"/>
      <el-table-column label="玩家ID" align="center" prop="memberId" />
      <el-table-column label="账号" align="center" prop="userName" />
<!--      <el-table-column label="本地平台id" align="center" prop="platformId" />-->
      <el-table-column label="状态" align="center" prop="status" :formatter="formatterStatus"/>
      <el-table-column label="金额" align="center" prop="money" />
      <el-table-column label="开始时间" align="center" prop="bTime" width="120">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.bTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="eTime" width="120">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.eTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['member:logGameOrder:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['member:logGameOrder:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改会员上下分对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="1上分2下分" prop="type">
          <el-select v-model="form.type" placeholder="请选择1上分2下分">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="玩家ID" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入玩家ID" />
        </el-form-item>
        <el-form-item label="账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="本地平台id" prop="platformId">
          <el-input v-model="form.platformId" placeholder="请输入本地平台id" />
        </el-form-item>
        <el-form-item label="0开始1失败2成功3异常">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="开始时间" prop="bTime">
          <el-date-picker clearable size="small"
            v-model="form.bTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="eTime">
          <el-date-picker clearable size="small"
            v-model="form.eTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束时间">
          </el-date-picker>
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
import { listLogGameOrder, getLogGameOrder, delLogGameOrder, addLogGameOrder, updateLogGameOrder, exportLogGameOrder } from "@/api/platform-web/member/logGameOrder";

export default {
  name: "LogGameOrder",
  components: {
  },
  data() {
    return {
      //类型列表
      typeList: [{label: '上分',value: '1'},{label: '下分',value: '2'}],
      //状态列表
      statusList: [{label: '开始',value: '0'},{label: '失败',value: '1'},{label: '成功',value: '2'},{label: '异常',value: '3'},],
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
      // 会员上下分表格数据
      logGameOrderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: null,
        memberId: null,
        userName: null,
        platformId: null,
        status: null,
        money: null,
        bTime: null,
        eTime: null,
        selectDate: null,
        orderByColumn: 'e_time',
        isAsc: 'desc',
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    formatterType(row){
      if (row.type == 1 ){
        return '上分';
      }else if (row.type == 2){
        return '下分';
      }else {
        return '未知';
      }
    },
    formatterStatus(row){
      if (row.status == 1 ){
        return '失败';
      }else if (row.status == 2){
        return '成功';
      }else if (row.status == 3){
        return '异常';
      }else if (row.status == 0){
        return '开始';
      }else {
        return '未知';
      }
    },
    /** 查询会员上下分列表 */
    getList() {
      this.loading = true;
      listLogGameOrder(this.queryParams).then(response => {
        this.logGameOrderList = response.rows;
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
        type: null,
        memberId: null,
        userName: null,
        platformId: null,
        status: 0,
        money: null,
        bTime: null,
        eTime: null
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
      this.title = "添加会员上下分";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLogGameOrder(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改会员上下分";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLogGameOrder(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLogGameOrder(this.form).then(response => {
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
      this.$confirm('是否确认删除会员上下分编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLogGameOrder(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有会员上下分数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportLogGameOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
