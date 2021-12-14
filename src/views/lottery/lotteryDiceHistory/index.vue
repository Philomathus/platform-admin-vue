<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item  prop="cTime">
        <el-date-picker clearable size="small"
                        v-model="queryParams.cTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        style="width: 140px"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item  prop="pUserId">
        <el-input
          v-model="queryParams.pUserId"
          placeholder="请输入会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="diceName">
        <el-input
          v-model="queryParams.diceName"
          placeholder="请输入奖项"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="diceId">
        <el-input
          v-model="queryParams.diceId"
          placeholder="请输入奖项id"
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:wheelHistoryDice:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="wheelHistoryDiceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="会员ID" align="center" prop="puserId" />
      <el-table-column label="昵称" align="center" prop="name" />
      <el-table-column label="奖项" align="center" prop="diceName" />
      <el-table-column label="骰数值" align="center" prop="diceValue" />
      <el-table-column label="奖项id" align="center" prop="diceId" />
      <el-table-column label="时间" align="center" prop="cTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.cTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
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

    <!-- 添加或修改博饼中奖记录对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员ID" prop="pUserId">
          <el-input v-model="form.puserId" placeholder="请输入会员ID" />
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="奖项" prop="diceName">
          <el-input v-model="form.diceName" placeholder="请输入奖项" />
        </el-form-item>
        <el-form-item label="时间" prop="cTime">
          <el-date-picker clearable size="small"
            v-model="form.cTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="骰数值" prop="diceValue">
          <el-input v-model="form.diceValue" placeholder="请输入骰数值" />
        </el-form-item>
        <el-form-item label="奖项id" prop="diceId">
          <el-input v-model="form.diceId" placeholder="请输入奖项id" />
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
import { listWheelHistoryDice, getWheelHistoryDice, delWheelHistoryDice, addWheelHistoryDice, updateWheelHistoryDice, exportWheelHistoryDice } from "@/api/activity/wheelHistoryDice";
import { pickerDateShortcuts, toyesDayshortcuts } from '@/utils/dateUtils'
export default {
  name: "WheelHistoryDice",
  components: {
  },
  data() {
    return {
      pickerOptions: {shortcuts: toyesDayshortcuts},
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
      // 博饼中奖记录表格数据
      wheelHistoryDiceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        puserId: null,
        name: null,
        diceName: null,
        cTime: this.parseTime(new Date(), '{y}-{m}-{d}'),
        diceId: null
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
    /** 查询博饼中奖记录列表 */
    getList() {
      this.loading = true;
      listWheelHistoryDice(this.queryParams).then(response => {
        this.wheelHistoryDiceList = response.rows;
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
        puserId: null,
        name: null,
        diceName: null,
        cTime: null,
        diceValue: null,
        diceId: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.pUserId){
        const reg = '^[0-9_]{1,}$'
        let flag = this.queryParams.pUserId.match(reg)
        if(!flag){
          this.msgError("会员ID只能输入数字及下划线")
          return
        }
      }
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
      this.title = "添加博饼中奖记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWheelHistoryDice(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改博饼中奖记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWheelHistoryDice(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWheelHistoryDice(this.form).then(response => {
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
      this.$confirm('是否确认删除博饼中奖记录编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delWheelHistoryDice(ids);
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
      }).then(function() {
        return exportWheelHistoryDice(queryParams);
      }).then(response => {
        this.downloadExcel(response, '博饼中奖记录');
      }).catch(() => {
      })
    }
  }
};
</script>
