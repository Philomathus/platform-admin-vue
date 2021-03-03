<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="菜单id" prop="methodId">
        <el-input
          v-model="queryParams.methodId"
          placeholder="请输入菜单id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input
          v-model="queryParams.type"
          placeholder="请输入类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="简介" prop="info">
        <el-input
          v-model="queryParams.info"
          placeholder="请输入简介"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="赔率" prop="odds">
        <el-input
          v-model="queryParams.odds"
          placeholder="请输入赔率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="获奖规则" prop="victoryRule">
        <el-input
          v-model="queryParams.victoryRule"
          placeholder="请输入获奖规则"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table stripe v-loading="loading" :data="lotteryGameList">
      <!--      <el-table-column label="主键" align="center" prop="id" />-->
      <el-table-column label="菜单id" align="center" prop="methodId"/>
      <el-table-column label="类型" align="center" prop="type"/>
      <el-table-column label="简介" align="center" prop="info"/>
      <el-table-column label="赔率" align="center" prop="odds"/>
      <el-table-column label="获奖规则" align="center" prop="victoryRule"/>
      <el-table-column label="唯一编号" align="center" prop="ind"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:lotteryGame:edit']"
          >修改赔率
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

    <!-- 修改赔率对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="300px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="40px">
        <el-form-item label="赔率" prop="odds">
          <el-input v-model="form.odds" placeholder="请输入赔率"/>
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
import {listLotteryGame, getLotteryGame, updateLotteryGame} from "@/api/platform-web/lottery/lotteryGame";

export default {
  name: "LotteryGame",
  components: {},
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
      // 下注表格数据
      lotteryGameList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        methodId: null,
        type: null,
        info: null,
        odds: null,
        victoryRule: null,
        ind: null,
        orderByColumn: 'ind',
        isAsc: 'asc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询下注列表 */
    getList() {
      this.loading = true;
      listLotteryGame(this.queryParams).then(response => {
        this.lotteryGameList = response.rows;
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
        methodId: null,
        type: null,
        index: null,
        info: null,
        odds: null,
        victoryRule: null,
        ind: null
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
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLotteryGame(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改赔率";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLotteryGame(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    }
  }
};
</script>
