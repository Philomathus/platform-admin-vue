<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入活动标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="ctime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
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
          v-hasPermi="['admin:activityInfo:add']"
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
          v-hasPermi="['admin:activityInfo:edit']"
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
          v-hasPermi="['admin:activityInfo:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:activityInfo:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="activityInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="标题" align="center" prop="title"/>
      <el-table-column label="图标" align="center" prop="icon">
        <template slot-scope="scope">
          <el-image
            style="height:80px"
            :src="scope.row.icon"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="活动详情" align="center" prop="content">
        <template v-slot="{row}">
          <div v-html="row.content" style="max-height: 80px"></div>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center" prop="ctime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ctime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="跳转类型" align="center" prop="type" :formatter="formatterType"/>
      <el-table-column label="图标跳转链接" align="center" prop="url"/>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="order"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:activityInfo:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:activityInfo:remove']"
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

    <!-- 添加或修改活动信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <imageUpload v-model="form.icon" path="ActivityInfo"/>
        </el-form-item>
        <el-form-item label="活动类型" prop="typeId">
          <el-select
            filterable
            v-model="form.typeId"
            placeholder="请选择活动类型"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in activityTypeOptions"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="跳转类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="0">活动详情</el-radio>
            <el-radio label="1">跳转链接</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动详情" prop="content" v-if="form.type == 0">
          <editor v-model="form.content" path="ActivityInfo"/>
        </el-form-item>
        <el-form-item label="跳转链接" prop="url" v-if="form.type == 1">
          <el-input v-model="form.url" placeholder="请输入图标跳转链接"/>
        </el-form-item>
<!--sort field-->
        <el-form-item label="排序" prop="order">
          <el-input v-model="form.order" placeholder="请输入排序"/>
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
  listActivityInfo,
  getActivityInfo,
  delActivityInfo,
  addActivityInfo,
  updateActivityInfo,
  exportActivityInfo,
  activityTypes,
  changeActivityInfoStatus
} from "@/api/activity/activityInfo";
import ImageUpload from "@/components/ImageUpload";
import Editor from "@/components/WangEditor";
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: "ActivityInfo",
  components: {
    ImageUpload,
    Editor,
  },
  data() {
    return {
      // 1=qq,2=微信
      formatterType(row) {
        if (row.type == 0) {
          return '活动详情'
        } else if (row.type == 1) {
          return '跳转链接'
        } else {
          return ''
        }
      },
      pickerOptions: {shortcuts: pickerDateShortcuts},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 日期范围
      dateRange: [],
      //活动类型
      activityTypeOptions: [],
      statusOptions: [],
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 活动信息表格数据
      activityInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      type: "",
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        ctime: null,
        status: null,
        orderByColumn: '',
        isAsc: ''
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          {required: true, message: "标题不能为空", trigger: "blur"}
        ],
        icon: [
          {required: true, message: "图标不能不上传", trigger: "blur"}
        ],
        typeId: [
          {required: true, message: "活动类型不能为空", trigger: "blur"}
        ],
        type: [
          {required: true, message: "跳转类型不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
    //活动类型
    activityTypes().then(response => {
      this.activityTypeOptions = response.data
    })
    //状态字典
    this.getDicts('activityInfo_status').then(response => {
      this.statusOptions = response.data
    })
  },
  methods: {
    /** 查询活动信息列表 */
    getList() {
      this.loading = true;
      listActivityInfo(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.activityInfoList = response.rows;
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
        ctime: null,
        indexs: null,
        typeId: null,
        content: '',
        url: null,
        order : null
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
      this.dateRange = []
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
      //活动类型
      activityTypes().then(response => {
        this.activityTypeOptions = response.data
      })
      this.title = "添加活动信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      //活动类型
      activityTypes().then(response => {
        this.activityTypeOptions = response.data
      })
      getActivityInfo(id).then(response => {
        response.data.type = response.data.type + ""
        this.form = response.data;
        this.open = true;
        this.title = "修改活动信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivityInfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addActivityInfo(this.form).then(response => {
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
      this.$confirm('是否确认删除"' + row.title + '"?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delActivityInfo(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    //修改状态
    handleStatusChange(row) {
      let text = row.status === '1' ? '启用' : '停用'
      this.$confirm('确认要"' + text + '""' + row.title + '"吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return changeActivityInfoStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportActivityInfo(queryParams);
      }).then(response => {
        this.downloadExcel(response, '活动信息')
      }).catch(() => {
      })
    }
  }
};
</script>
