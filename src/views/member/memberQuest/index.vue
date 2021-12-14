<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会员ID" prop="memberId">
        <el-input
          v-model.trim="queryParams.memberId"
          placeholder="请输入会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入任务标题"
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

    <el-table stripe v-loading="loading" :data="memberQuestList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="会员ID" align="center" prop="memberId" />
      <el-table-column label="任务标题" align="center" prop="title" />
      <el-table-column label="当前任务状态" align="center" prop="status" :formatter="formatterType" />
      <el-table-column label="当前任务数量" align="center" prop="curnum" >
      <template v-slot="{row}">
        <span >{{ row.curnum }}</span>
      </template>
      </el-table-column>
      <el-table-column label="目标任务数量" align="center" prop="target" />

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width ">
        <template slot-scope="scope">
<!--          <el-input  v-model="scope.row.score" placeholder="请输入需要增加的积分" style="width:180px" v-if="scope.row.status === 0" class="no-number" type="number" />-->
          <el-button type="primary" icon="el-icon-plus" v-if="scope.row.status === 0" @click="addMemberScore(scope.row.id,scope.row.curnum,scope.row.target)">补分</el-button>
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员ID" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入会员ID" />
        </el-form-item>
        <el-form-item label="任务id" prop="questId">
          <el-input v-model="form.questId" placeholder="请输入任务id" />
        </el-form-item>
        <el-form-item label="0=进行中1=已经完成2 领奖完成">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前任务数量" prop="curnum">
          <el-input v-model="form.curnum" placeholder="请输入当前任务数量" />
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
import { listMemberQuest, addMemberScore, getMemberQuest, delMemberQuest, addMemberQuest, updateMemberQuest, exportMemberQuest } from "@/api/platform-web/member/memberQuest";

export default {
  name: "MemberQuest",
  components: {
  },
  data() {
    return {
      formatterType(row) {
        if (row.status == 0) {
          return '进行中'
        } else if (row.status == 1) {
          return '待领奖'
        } else if (row.status == 2) {
          return '已领奖'
        }else {
          return ''
        }
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
      // 会员任务表格数据
      memberQuestList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        memberId: null,
        title: null
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
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listMemberQuest(this.queryParams).then(response => {
        this.memberQuestList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    //增加会员任务积分
    addMemberScore(id,curnums,target) {

      this.$prompt('请输入需要增加的积分', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]{1,10}$/,
        inputErrorMessage: '增加的积分为正整数'
      }).then(({ value }) => {
        if(!(/(^[1-9]\d*$)/.test(value))){
          this.$notify.warning('请输入正整数')
          return;
        }
        if(value>100000){
          this.$notify.warning('最多补分10w')
          return;
        }
        this.loading = true;
        let status = 0;
        let curnum = curnums+Number(value);
        if (curnum >= target) {
          curnum = target;
          status = 1;
        }
        addMemberScore(id,status,curnum).then(res => {
          if (res.code === 0) {
            this.msgError((res.msg))
          } else {
            this.getList();
            this.msgSuccess((res.msg))
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
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
        memberId: null,
        questId: null,
        status: 0,
        curnum: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.memberId){
        const reg = '^[0-9_]{1,}$'
        let flag = this.queryParams.memberId.match(reg)
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
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMemberQuest(id).then(response => {
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
            updateMemberQuest(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMemberQuest(this.form).then(response => {
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
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delMemberQuest(ids);
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
        return exportMemberQuest(queryParams);
      }).then(response => {
        this.downloadExcel(response, '【请填写功能名称】');
      }).catch(() => {
      })
    }
  }
};
</script>
