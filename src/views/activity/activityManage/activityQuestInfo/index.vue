<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发布时间" prop="ctime">
        <el-date-picker clearable size="small"
          v-model="queryParams.ctime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择发布时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="任务类型id" prop="typeId">
        <el-input
          v-model="queryParams.typeId"
          placeholder="请输入任务类型id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目标任务量" prop="target">
        <el-input
          v-model="queryParams.target"
          placeholder="请输入目标任务量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="完成后增加的资金" prop="reward">
        <el-input
          v-model="queryParams.reward"
          placeholder="请输入完成后增加的资金"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属游戏id" prop="gameId">
        <el-input
          v-model="queryParams.gameId"
          placeholder="请输入所属游戏id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台游戏类型" prop="kindId">
        <el-input
          v-model="queryParams.kindId"
          placeholder="请输入平台游戏类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台类型" prop="platformId">
        <el-input
          v-model="queryParams.platformId"
          placeholder="请输入平台类型"
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['admin:activityQuestInfo:add']"
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
          v-hasPermi="['admin:activityQuestInfo:edit']"
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
          v-hasPermi="['admin:activityQuestInfo:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:activityQuestInfo:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="activityQuestInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="图标" align="center" prop="icon" />
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="发布时间" align="center" prop="ctime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ctime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序号" align="center" prop="indexs" />
      <el-table-column label="任务类型id" align="center" prop="typeId" />
      <el-table-column label="目标任务量" align="center" prop="target" />
      <el-table-column label="完成后增加的资金" align="center" prop="reward" />
      <el-table-column label="任务详情" align="center" prop="detail" />
      <el-table-column label="描述" align="center" prop="content" />
      <el-table-column label="所属游戏id" align="center" prop="gameId" />
      <el-table-column label="平台游戏类型" align="center" prop="kindId" />
      <el-table-column label="平台类型" align="center" prop="platformId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:activityQuestInfo:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:activityQuestInfo:remove']"
          >删除</el-button>
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

    <!-- 添加或修改任务信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="图标" prop="icon">
          <el-input v-model="form.icon" placeholder="请输入图标" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="发布时间" prop="ctime">
          <el-date-picker clearable size="small"
            v-model="form.ctime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择发布时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="排序号" prop="indexs">
          <el-input v-model="form.indexs" placeholder="请输入排序号" />
        </el-form-item>
        <el-form-item label="任务类型id" prop="typeId">
          <el-input v-model="form.typeId" placeholder="请输入任务类型id" />
        </el-form-item>
        <el-form-item label="目标任务量" prop="target">
          <el-input v-model="form.target" placeholder="请输入目标任务量" />
        </el-form-item>
        <el-form-item label="完成后增加的资金" prop="reward">
          <el-input v-model="form.reward" placeholder="请输入完成后增加的资金" />
        </el-form-item>
        <el-form-item label="任务详情" prop="detail">
          <el-input v-model="form.detail" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="描述">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="所属游戏id" prop="gameId">
          <el-input v-model="form.gameId" placeholder="请输入所属游戏id" />
        </el-form-item>
        <el-form-item label="平台游戏类型" prop="kindId">
          <el-input v-model="form.kindId" placeholder="请输入平台游戏类型" />
        </el-form-item>
        <el-form-item label="平台类型" prop="platformId">
          <el-input v-model="form.platformId" placeholder="请输入平台类型" />
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
import { listActivityQuestInfo, getActivityQuestInfo, delActivityQuestInfo, addActivityQuestInfo, updateActivityQuestInfo, exportActivityQuestInfo } from "@/api/activity/activityQuestInfo";
import Editor from '@/components/Editor';

export default {
  name: "ActivityQuestInfo",
  components: {
    Editor,
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
      // 任务信息表格数据
      activityQuestInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        icon: null,
        title: null,
        ctime: null,
        indexs: null,
        typeId: null,
        target: null,
        reward: null,
        detail: null,
        content: null,
        gameId: null,
        kindId: null,
        platformId: null
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
    /** 查询任务信息列表 */
    getList() {
      this.loading = true;
      listActivityQuestInfo(this.queryParams).then(response => {
        this.activityQuestInfoList = response.rows;
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
        icon: null,
        title: null,
        ctime: null,
        indexs: null,
        typeId: null,
        target: null,
        reward: null,
        detail: null,
        content: null,
        gameId: null,
        kindId: null,
        platformId: null
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
      this.title = "添加任务信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getActivityQuestInfo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改任务信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivityQuestInfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addActivityQuestInfo(this.form).then(response => {
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
      this.$confirm('是否确认删除任务信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delActivityQuestInfo(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有任务信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportActivityQuestInfo(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
