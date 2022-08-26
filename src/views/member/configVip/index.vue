<template>
  <div class="app-container">


    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['admin:configVip:add']"
        >新增</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="configVipList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="vip等级" align="center" prop="levelFlag" />
      <el-table-column label="需求打码量" align="center" prop="levelMoney" />
      <el-table-column label="晋级彩金" align="center" prop="jjcj" />
      <el-table-column label="周俸禄" align="center" prop="zfl" />
      <el-table-column label="月俸禄" align="center" prop="yfl" />
      <el-table-column label="创建时间" align="center" prop="createTime" min-width="160"/>
      <el-table-column label="最后更新人" align="center" prop="opName" />
      <el-table-column label="最后更新时间" align="center" prop="updateTime" min-width="160"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:configVip:edit']"
          >修改</el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:configVip:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[15,30,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="vip等级" prop="levelFlag">
          <el-input v-model="form.levelFlag" placeholder="请输入vip等级" type="number"/>
        </el-form-item>
        <el-form-item label="需求打码" prop="levelMoney">
          <el-input v-model="form.levelMoney" placeholder="请输入需求打码量" type="number"/>
        </el-form-item>
        <el-form-item label="晋级彩金" prop="jjcj">
          <el-input v-model="form.jjcj" placeholder="请输入晋级彩金"type="number" />
        </el-form-item>
        <el-form-item label="周俸禄" prop="zfl">
          <el-input v-model="form.zfl" placeholder="请输入周俸禄"type="number" />
        </el-form-item>
        <el-form-item label="月俸禄" prop="yfl">
          <el-input v-model="form.yfl" placeholder="请输入月俸禄" type="number"/>
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
import { listConfigVip, getConfigVip, delConfigVip, addConfigVip, updateConfigVip, exportConfigVip } from "@/api/platform-web/member/configVip";

export default {
  name: "ConfigVip",
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
      configVipList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        levelFlag: null,
        dmMoney: null,
        jjcj: null,
        zfl: null,
        yfl: null,
        tdjs: null,
        zskf: null,
        opName: null,
        levelMoney: null,
        orderByColumn: 'level_flag',
        isAsc: 'asc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        levelFlag: [
          {required: true, message: "vip等级不能为空只能是数字", trigger: "number"},
        ],
        levelMoney: [
          {required: true, message: "需求打码不能为空只能是数字", trigger: "number"},
        ],
        jjcj: [
          {required: true, message: "晋级彩金不能为空只能是数字", trigger: "number"},
        ],
        zfl: [
          {required: true, message: "周俸禄不能为空只能是数字", trigger: "number"},
        ],
        yfl: [
          {required: true, message: "月俸禄不能为空只能是数字", trigger: "number"},
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listConfigVip(this.queryParams).then(response => {
        this.configVipList = response.rows;
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
        levelFlag: null,
        dmMoney: null,
        jjcj: null,
        zfl: null,
        yfl: null,
        tdjs: null,
        zskf: null,
        createTime: null,
        opName: null,
        updateTime: null,
        levelMoney: null
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
      this.title = "添加vip配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getConfigVip(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改vip等级设置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateConfigVip(this.form).then(response => {
              this.msgSuccess(response.msg);
              this.open = false;
              this.getList();
            });
          } else {
            addConfigVip(this.form).then(response => {
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
      const vip=row.levelFlag;
      this.$confirm('是否确认删除vip"' + vip + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delConfigVip(ids);
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
        return exportConfigVip(queryParams);
      }).then(response => {
        this.downloadExcel(response, '【请填写功能名称】');
      }).catch(() => {
      })
    }
  }
};
</script>
