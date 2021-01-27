<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="分类名称" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入分类名称"
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
          v-hasPermi="['admin:liveVideoClassified:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['admin:liveVideoClassified:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['admin:liveVideoClassified:remove']"
        >删除
        </el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          plain-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['admin:liveVideoClassified:export']"-->
<!--        >导出-->
<!--        </el-button>-->
<!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="liveVideoClassifiedList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="分类名称" align="center" prop="title"/>
      <el-table-column label="状态" align="center" key="isEffect" v-if="columns[0].visible">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isEffect"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="排序(客服端倒序)" align="center" prop="sort"/>
<!--      <el-table-column label="分类图标" align="center" prop="img"/>-->
      <el-table-column label="分类代号" align="center" prop="classfy"/>
      <el-table-column label="主播端显示" align="center" key="isHostShow" v-if="columns[0].visible">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isHostShow"
            active-value="1"
            inactive-value="0"
            @change="handleShowStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
<!--      <el-table-column label="查询主播列表分页逻辑" align="center" prop="sortDesc"/>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveVideoClassified:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveVideoClassified:remove']"
          >删除
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

    <!-- 添加或修改分类对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="分类名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入分类名称"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.isEffect">
            <el-radio label="0">未启用</el-radio>
            <el-radio label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主播端显示">
          <el-radio-group v-model="form.isHostShow">
            <el-radio label="0">未启用</el-radio>
            <el-radio label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序"/>
        </el-form-item>
        <el-form-item label="分类图标" prop="img">
          <el-input v-model="form.img" placeholder="请输入分类图标"/>
        </el-form-item>
        <el-form-item label="分类id" prop="classfy">
          <el-input v-model="form.classfy" placeholder="请输入分类id"/>
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
  listLiveVideoClassified,
  getLiveVideoClassified,
  delLiveVideoClassified,
  addLiveVideoClassified,
  updateLiveVideoClassified,
  exportLiveVideoClassified
} from "@/api/live-web/liveVideoClassified/liveVideoClassified";

export default {
  name: "LiveVideoClassified",
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
      // 分类表格数据
      liveVideoClassifiedList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        isEffect: null,
        sort: null,
        img: null,
        classfy: null,
        isHostShow: null,
        sortDesc: null
      },
      // 列信息
      columns: [
        {key: 0, label: `状态`, visible: true},
        {key: 1, label: `主播端显示`, visible: true}
      ],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          {required: true, message: "分类名称不能为空", trigger: "blur"}
        ],
        isEffect: [
          {required: true, message: "是否有效 1-有效 0-无效不能为空", trigger: "blur"}
        ],
        sort: [
          {required: true, message: "从大到小排不能为空", trigger: "blur"}
        ],
        img: [
          {required: true, message: "分类图标不能为空", trigger: "blur"}
        ],
        isHostShow: [
          {required: true, message: "是否主播端显示不能为空", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询分类列表 */
    getList() {
      this.loading = true;
      listLiveVideoClassified(this.queryParams).then(response => {
        this.liveVideoClassifiedList = response.rows;
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
        title: null,
        isEffect: null,
        sort: null,
        img: null,
        classfy: null,
        isHostShow: null,
        sortDesc: null
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
      this.title = "添加分类";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveVideoClassified(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改分类";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveVideoClassified(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLiveVideoClassified(this.form).then(response => {
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
      this.$confirm('是否确认删除分类编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delLiveVideoClassified(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    // 状态修改
    handleStatusChange(row) {
      let text = row.isEffect === '0' ? '停用' : '启用'
      this.$confirm('确认要' + text + '"' + row.title + '"吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var data={};
        data.id=row.id;
        data.isEffect=row.isEffect;
        return updateLiveVideoClassified(data)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function () {
        row.isEffect = row.isEffect === '0' ? '1' : '0'
      })
    },
    handleShowStatusChange(row) {
      let text = row.isEffect === '0' ? '停用' : '启用'
      this.$confirm('确认要' + text + '"' + row.title + '"吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var data={};
        data.id=row.id;
        data.isHostShow=row.isHostShow;
        return updateLiveVideoClassified(data)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function () {
        row.isHostShow = row.isHostShow === '0' ? '1' : '0'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有分类数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportLiveVideoClassified(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    }
  }
};
</script>
