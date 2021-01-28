<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="族长ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="queryParams.status" placeholder="请选择状态">
          <el-option label="未审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核拒绝" value="2"></el-option>
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
          v-hasPermi="['admin:liveFamily:add']"
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
          v-hasPermi="['admin:liveFamily:edit']"
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
          v-hasPermi="['admin:liveFamily:remove']"
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
<!--          v-hasPermi="['admin:liveFamily:export']"-->
<!--        >导出-->
<!--        </el-button>-->
<!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="liveFamilyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="ID" align="center" prop="id"/>
<!--      <el-table-column label="家族LOGO" align="center" prop="logo"/>-->
      <el-table-column label="家族名称" align="center" prop="name"/>
      <el-table-column label="公告" align="center" prop="notice"/>
      <el-table-column label="家族宣言" align="center" prop="manifesto"/>
      <el-table-column label="族推荐号" align="center" prop="nickName"/>
      <el-table-column label="家族长ID" align="center" prop="userId"/>
      <el-table-column label="成员数量" align="center" prop="userCount"/>
      <el-table-column label="日期" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="memo"/>
      <el-table-column label="状态" align="center" prop="status"/>
      <el-table-column label="家族成员的贡献" align="center" prop="contribution"/>
      <el-table-column label="家族等级" align="center" prop="familyLevel"/>
      <el-table-column label="直播时间" align="center" prop="videoTime"/>
      <el-table-column label="积分" align="center" prop="score"/>
      <el-table-column label="家族等级" align="center" prop="liveLevel"/>
      <el-table-column label="家族推荐号" align="center" prop="familyRecom"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveFamily:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveFamily:remove']"
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

    <!-- 添加或修改家族对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="家族LOGO" prop="logo">
          <el-input v-model="form.logo" placeholder="请输入家族LOGO"/>
        </el-form-item>
        <el-form-item label="家族名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入家族名称"/>
        </el-form-item>
        <el-form-item label="公告" prop="notice">
          <el-input v-model="form.notice" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="家族宣言" prop="manifesto">
          <el-input v-model="form.manifesto" placeholder="请输入家族宣言"/>
        </el-form-item>
        <el-form-item label="族推荐号" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入族推荐号"/>
        </el-form-item>
        <el-form-item label="家族长ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入家族长ID"/>
        </el-form-item>
        <el-form-item label="成员数量" prop="userCount">
          <el-input v-model="form.userCount" placeholder="请输入成员数量"/>
        </el-form-item>
        <el-form-item label="日期字段,按日期归档" prop="createDate">
          <el-date-picker clearable size="small"
                          v-model="form.createDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期字段,按日期归档">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="状态，0未审核，1审核通过，2拒绝通过 4 解散">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="家族成员的贡献" prop="contribution">
          <el-input v-model="form.contribution" placeholder="请输入家族成员的贡献"/>
        </el-form-item>
        <el-form-item label="家族等级;live_family_level.level" prop="familyLevel">
          <el-input v-model="form.familyLevel" placeholder="请输入家族等级;live_family_level.level"/>
        </el-form-item>
        <el-form-item label="家族总的直播时间，单位为秒" prop="videoTime">
          <el-input v-model="form.videoTime" placeholder="请输入家族总的直播时间，单位为秒"/>
        </el-form-item>
        <el-form-item label="积分" prop="score">
          <el-input v-model="form.score" placeholder="请输入积分"/>
        </el-form-item>
        <el-form-item label="家族等级;live_family_level.level" prop="liveLevel">
          <el-input v-model="form.liveLevel" placeholder="请输入家族等级;live_family_level.level"/>
        </el-form-item>
        <el-form-item label="家族推荐号 创建家族后随机生成，用于主播审核时填写" prop="familyRecom">
          <el-input v-model="form.familyRecom" placeholder="请输入家族推荐号 创建家族后随机生成，用于主播审核时填写"/>
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
  listLiveFamily,
  getLiveFamily,
  delLiveFamily,
  addLiveFamily,
  updateLiveFamily,
  exportLiveFamily
} from "@/api/live-web/family/liveFamily";

export default {
  name: "LiveFamily",
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
      // 家族表格数据
      liveFamilyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        logo: null,
        name: null,
        notice: null,
        manifesto: null,
        nickName: null,
        userId: null,
        userCount: null,
        createDate: null,
        createY: null,
        createM: null,
        createD: null,
        createW: null,
        memo: null,
        status: null,
        contribution: null,
        familyLevel: null,
        videoTime: null,
        score: null,
        liveLevel: null,
        familyRecom: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        logo: [
          {required: true, message: "头像", trigger: "blur"}
        ],
        name: [
          {required: true, message: "名称", trigger: "blur"}
        ],
        notice: [
          {required: true, message: "公告不能为空", trigger: "blur"}
        ],
        manifesto: [
          {required: true, message: "家族宣言不能为空", trigger: "blur"}
        ],
        userId: [
          {required: true, message: "族长ID", trigger: "blur"}
        ],
        userCount: [
          {required: true, message: "成员数量不能为空", trigger: "blur"}
        ],
        createTime: [
          {required: true, message: "创建时间不能为空", trigger: "blur"}
        ],
        createDate: [
          {required: true, message: "日期字段,按日期归档不能为空", trigger: "blur"}
        ],
        memo: [
          {required: true, message: "备注不能为空", trigger: "blur"}
        ],
        status: [
          {required: true, message: "状态，0未审核，1审核通过，2拒绝通过 4 解散不能为空", trigger: "blur"}
        ],
        contribution: [
          {required: true, message: "家族成员的贡献不能为空", trigger: "blur"}
        ],
        familyLevel: [
          {required: true, message: "家族等级;live_family_level.level不能为空", trigger: "blur"}
        ],
        videoTime: [
          {required: true, message: "家族总的直播时间，单位为秒不能为空", trigger: "blur"}
        ],
        score: [
          {required: true, message: "积分不能为空", trigger: "blur"}
        ],
        liveLevel: [
          {required: true, message: "家族等级;live_family_level.level不能为空", trigger: "blur"}
        ],
        familyRecom: [
          {required: true, message: "家族推荐号 创建家族后随机生成，用于主播审核时填写不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询家族列表 */
    getList() {
      this.loading = true;
      listLiveFamily(this.queryParams).then(response => {
        this.liveFamilyList = response.rows;
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
        logo: null,
        name: null,
        notice: null,
        manifesto: null,
        nickName: null,
        userId: null,
        userCount: null,
        createTime: null,
        createDate: null,
        createY: null,
        createM: null,
        createD: null,
        createW: null,
        memo: null,
        status: 0,
        contribution: null,
        familyLevel: null,
        videoTime: null,
        score: null,
        liveLevel: null,
        familyRecom: null
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
      this.title = "添加家族";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveFamily(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改家族";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveFamily(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLiveFamily(this.form).then(response => {
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
      this.$confirm('是否确认删除家族编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delLiveFamily(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有家族数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportLiveFamily(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    }
  }
};
</script>
