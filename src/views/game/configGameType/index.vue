<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="88px">
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
        <el-select v-model="queryParams.platformName" placeholder="请选择平台名称" size="small" clearable>
          <el-option
            v-for="dict in platformNameList"
            :key="dict.id"
            :label="dict.name"
            :value="dict.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子平台id" prop="sonPlatformId">
        <el-input
          v-model="queryParams.sonPlatformId"
          placeholder="请输入子平台id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="子平台名称" prop="sonPlatformName">
        <el-input
          v-model="queryParams.sonPlatformName"
          placeholder="请输入子平台名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
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
      <el-upload
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        class="upload-demo"
        ref="upload"
        :action="uploadFileUrl"
        :headers="headers"
        name="excelFile"
        style="margin-right: 85%"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-error="uploadFalse"
        :on-success="uploadSuccess"
        :auto-upload="true"
        :before-upload="beforeAvatarUpload">
        <el-button slot="trigger" size="mini" type="primary" @click="submitUpload">上传excel</el-button>
      </el-upload>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="configGametypeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="平台id-子平台id" align="center" prop="id" />
      <el-table-column label="平台id" align="center" prop="platformId" />
      <el-table-column label="平台名称" align="center" prop="platformName" />
      <el-table-column label="子平台id" align="center" prop="sonPlatformId" />
      <el-table-column label="子平台名称" align="center" prop="sonPlatformName" />
      <el-table-column label="操作"   align="center" class-name="small-padding fixed-width" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
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
      <el-form ref="form" :model="form" :rules="rules" label-width="88px">
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
import {
  listConfigGametype,
  getConfigGametype,
  delConfigGametype,
  addConfigGametype,
  updateConfigGametype,
  uploadFileUrl,
  getGameTypeInfo } from '@/api/platform-web/game/configGameType';

import {getToken} from "@/utils/auth";
export default {
  name: "Confi-gametype",
  components: {
  },
  data() {
    return {
      uploadFileUrl : uploadFileUrl(),
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
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
        this.title = "修改游戏配置类型";
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
    /** 导入Excel */
    uploadSuccess() {
      this.$message.success('excel上传成功')
      this.queryParams.memberId = null
      this.queryParams.pageNum = 1
      this.getList()
    },
    uploadFalse() {
      this.$message.error('excel上传失败！')
    },
    handleExceed() {
      this.$message.error('只能选取一个excel,如需更换请x掉再选取')
    },
    handleRemove() {
      this.$message.success('移除成功')
    },
    handlePreview(file) {
      console.info(file.response.status)
      if (file.response.status) {

        this.$message.success('此文件导入成功')
      } else {
        this.$message.error('此文件导入失败')
      }
    },
    beforeAvatarUpload(file) {
      const extension = file.name.split('.')[1] === 'xlsx'
      const extensionXls = file.name.split('.')[1] === 'xls' //added this new extensionsXsl
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extensionXls) {
        this.$message.error('上传模板只能是xlsx or xls 格式的excel文件!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传模板大小不能超过10MB!')
        return
      }
    },
    submitUpload() {
      //触发组件的action
      this.$refs.upload.submit()
    },
  }
};
</script>
