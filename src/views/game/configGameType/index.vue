<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="平台id" prop="platformId">
        <el-input
          v-model="queryParams.platformId"
          placeholder="请输入平台id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台名称" prop="platformName">
        <el-input
          v-model="queryParams.platformName"
          placeholder="请输入平台名称"
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
          v-hasPermi="['game:config-gametype:add']"
        >新增</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="configGametypeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="平台id" align="center" prop="platformId" />
      <el-table-column label="平台名称" align="center" prop="platformName" />
      <el-table-column label="子平台id" align="center" prop="sonPlatformId" />
      <el-table-column label="子平台名称" align="center" prop="sonPlatformName" />
      <el-table-column label="操作"   align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            style="color: #FF5722"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['game:config-gametype:edit']"
          >修改</el-button>
          <el-button
            fixed = "right"
            size="mini"
            type="text"
            icon="el-icon-delete"
            style="color: #FF5722"
            @click="handleDelete(scope.row)"
            v-hasPermi="['game:config-gametype:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[15,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="平台名称" prop="platformName">
          <el-select v-model="form.platformName" placeholder="请选择">
            <el-option
              v-for="dict in platformNameList"
              :key="dict.id"
              :label="dict.name"
              :value="dict.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="子平台id" prop="sonPlatformId">
          <el-input v-model="form.sonPlatformId" placeholder="请输入子平台id" />
        </el-form-item>
        <el-form-item label="子平台名称" prop="sonPlatformName">
          <el-input v-model="form.sonPlatformName" placeholder="请输入子平台名称" />
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
import { listConfigGametype, getConfigGametype, delConfigGametype, addConfigGametype, updateConfigGametype,getGameTypeInfo } from '@/api/platform-web/game/configGameType';
export default {
  name: "Confi-gametype",
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
      // 【请填写功能名称】表格数据
      configGametypeList: [],
      // 游戏名称
      platformNameList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        platformId: null,
        platformName: null,
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
    getGameTypeInfo().then(response => {
      this.platformNameList = response.data;
    });
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listConfigGametype(this.queryParams).then(response => {
        this.configGametypeList = response.rows;
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
        platformId: null,
        platformName: null,
        sonPlatformId: null,
        sonPlatformName: null
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
      this.title = "添加";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getConfigGametype(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateConfigGametype(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addConfigGametype(this.form).then(response => {
              this.msgSuccess(response.msg);
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
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delConfigGametype(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },

  }
};
</script>
