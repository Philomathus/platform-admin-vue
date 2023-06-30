<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label=" $t('members.memberQuest.mid') " prop="memberId" label-width="80">
        <el-input
          v-model.trim="queryParams.memberId"
          :placeholder=" $t('members.memberQuest.pemid') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label=" $t('members.memberQuest.task') " prop="title" label-width="80">
        <el-input
          v-model="queryParams.title"
          :placeholder=" $t('members.memberQuest.pet') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('global.resetButton') }}</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="memberQuestList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label=" $t('members.memberQuest.mid') " align="center" prop="memberId" />
      <el-table-column :label=" $t('members.memberQuest.task') " align="center" prop="title" />
      <el-table-column :label=" $t('members.memberQuest.cts') " align="center" prop="status" :formatter="formatterType" />
      <el-table-column :label=" $t('members.memberQuest.nct') " align="center" prop="curnum" >
      <template v-slot="{row}">
        <span >{{ row.curnum }}</span>
      </template>
      </el-table-column>
      <el-table-column :label=" $t('members.memberQuest.ntt') " align="center" prop="target" />

      <el-table-column :label=" $t('global.operationColumn') " align="center" class-name="small-padding fixed-width ">
        <template slot-scope="scope">
<!--          <el-input  v-model="scope.row.score" placeholder="请输入需要增加的积分" style="width:180px" v-if="scope.row.status === 0" class="no-number" type="number" />-->
          <el-button type="primary" icon="el-icon-plus" v-if="scope.row.status === 0" @click="addMemberScore(scope.row.id,scope.row.curnum,scope.row.target)">
            {{ $t('members.memberQuest.ap') }}</el-button>
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
        <el-form-item :label=" $t('members.memberQuest.mid') " prop="memberId">
          <el-input v-model="form.memberId" :placeholder=" $t('members.memberQuest.pemid') " />
        </el-form-item>
        <el-form-item :label=" $t('members.memberQuest.ti') " prop="questId">
          <el-input v-model="form.questId" :placeholder=" $t('members.memberQuest.peti') " />
        </el-form-item>
        <el-form-item :label=" $t('members.memberQuest.pcc') ">
          <el-radio-group v-model="form.status">
            <el-radio label="1">{{ $t('members.memberQuest.psdg') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label=" $t('members.memberQuest.nct') " prop="curnum">
          <el-input v-model="form.curnum" :placeholder=" $t('members.memberQuest.petct') " />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.confirmButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
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

      this.$prompt( this.$t('members.memberQuest.penpa') , this.$t('global.promptTitle') , {
        confirmButtonText: this.$t('global.confirmButton') ,
        cancelButtonText: this.$t('global.cancelButton') ,
        inputPattern: /^[0-9]{1,10}$/,
        inputErrorMessage: this.$t('members.memberQuest.tip')
      }).then(({ value }) => {
        if(!(/(^[1-9]\d*$)/.test(value))){
          this.$notify.warning( this.$t('members.memberQuest.pepi') )
          return;
        }
        if(value>100000){
          this.$notify.warning( this.$t('members.memberQuest.uap') )
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
          message: this.$t('members.memberQuest.ci')
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
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.memberId.match(reg)
        if(!flag){
          this.msgError( this.$t('members.memberQuest.menu') )
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
      this.title = this.$t('members.memberQuest.afn') ;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMemberQuest(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('members.memberQuest.mfn') ;
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMemberQuest(this.form).then(response => {
              this.msgSuccess( this.$t('members.memberQuest.ms') );
              this.open = false;
              this.getList();
            });
          } else {
            addMemberQuest(this.form).then(response => {
              this.msgSuccess( this.$t('members.memberQuest.as') );
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
      this.$confirm( this.$t('members.memberQuest.wcd', {id:ids} ) , this.$t('global.dialogTitle') , {
        confirmButtonText: this.$t('global.confirmButton') ,
        cancelButtonText: this.$t('global.cancelButton') ,
        type: "warning"
      }).then(function() {
        return delMemberQuest(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess( this.$t('members.memberQuest.ds') );
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm( this.$t('members.memberQuest.cpe') , this.$t('global.dialogTitle') , {
        confirmButtonText: this.$t('global.confirmButton') ,
        cancelButtonText: this.$t('global.cancelButton') ,
        type: "warning"
      }).then(function() {
        return exportMemberQuest(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('members.memberQuest.pffe') );
      }).catch(() => {
      })
    }
  }
};
</script>
