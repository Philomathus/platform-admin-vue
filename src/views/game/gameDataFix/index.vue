<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item  prop="userId">
        <el-input
          v-model.trim="queryParams.userId"
          placeholder="请输入会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="platformId">
        <el-select v-model="queryParams.platformId" clearable placeholder="游戏平台">
          <el-option
            v-for="dict in platformNameList"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="status">
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable size="small">
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
          v-hasPermi="['game:memberGameDatafix:add']"
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
          v-hasPermi="['game:memberGameDatafix:edit']"
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
          v-hasPermi="['game:memberGameDatafix:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['game:memberGameDatafix:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="memberGameDatafixList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="会员ID" align="center" prop="userId" />
      <el-table-column label="游戏开始时间" align="center" prop="gameStartTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gameStartTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="游戏结束时间" align="center" prop="gameEndTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.gameEndTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
<!--      <el-form-item label="游戏时间" prop="time">
        <div class="block">
          <el-date-picker
            v-model="form.params"
            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>-->
<!--      <el-table-column label="本地平台id" align="center" prop="platformId" />-->
      <el-table-column label="游戏平台" align="center" prop="platformName"/>
      <el-table-column label="状态" align="center" prop="status"  >
        <template slot-scope="scope">
          <span :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}">{{ status.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['game:memberGameDatafix:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['game:memberGameDatafix:remove']"
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

    <!-- 添加或修改游戏注单修复对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="会员ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入会员ID"  width="220px"/>
        </el-form-item>
        <el-form-item label="游戏开始时间" prop="gameStartTime">
          <el-date-picker clearable size="small"
                          v-model="form.gameStartTime"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择游戏开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="游戏结束时间" prop="gameEndTime">
          <el-date-picker clearable size="small"
                          v-model="form.gameEndTime"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择游戏结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="游戏平台" prop="platformName">
          <el-select v-model="form.platformId"
                     filterable
                     clearable
                     placeholder="请选择">
            <el-option
              v-for="dict in platformNameList"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            ></el-option>
          </el-select>
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
import { listMemberGameDatafix, getMemberGameDatafix, delMemberGameDatafix, addMemberGameDatafix, updateMemberGameDatafix, exportMemberGameDatafix } from "@/api/platform-web/game/memberGameFix";
import {getGameInfo} from "@/api/platform-web/game/gameInfo";

export default {
  name: "MemberGameDatafix",
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
      // 游戏注单修复表格数据
      memberGameDatafixList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 0:未处理1已处理字典
      statusOptions: [],
      // 游戏名称
      platformNameList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        gameStartTime: null,
        gameEndTime: null,
        platformId: null,
        status: null,
        orderByColumn: 'status',
        isAsc: 'asc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        gameStartTime: [
          { required: true, message: "游戏开始时间不能为空", trigger: "blur" }
        ],
        gameEndTime: [
          { required: true, message: "游戏结束时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("fixdata_status").then(response => {
      this.statusOptions = response.data;
    });
    getGameInfo().then(response => {
      this.platformNameList = response.data
    })
  },
  methods: {
    /** 查询游戏注单修复列表 */
    getList() {
      this.loading = true;
      listMemberGameDatafix(this.queryParams).then(response => {
        this.memberGameDatafixList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 0:未处理1已处理字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
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
        userId: null,
        gameStartTime: null,
        gameEndTime: null,
        platformId: null,
        status: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.userId){
        const reg = '^[0-9_]{1,}$'
        let flag = this.queryParams.userId.match(reg)
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
      this.title = "添加游戏注单修复";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMemberGameDatafix(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改游戏注单修复";
      });
    },
    /** 提交按钮 */
    submitForm() {

      var startTime=this.form.gameStartTime;
      var endTime=this.form.gameEndTime;
      var startT=startTime.substring(0,10)
      var endT=endTime.substring(0,10)
      console.info(endT)
      if (startT!=endT){
        this.msgError("开始和结束时间要同一天")
      }else {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateMemberGameDatafix(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addMemberGameDatafix(this.form).then(response => {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      }

    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除游戏注单修复编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delMemberGameDatafix(ids);
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
        return exportMemberGameDatafix(queryParams);
      }).then(response => {
        this.downloadExcel(response, '游戏注单修复');
      }).catch(() => {
      })
    }
  }
};
</script>
