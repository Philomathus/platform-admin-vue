<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('liveWeb.imMute.queryForm.userIdLabel')" prop="userId">
        <el-input
          v-model.trim="queryParams.userId"
          :placeholder="$t('liveWeb.imMute.queryForm.userPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('liveWeb.imMute.queryForm.nickNameLabel')" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          :placeholder="$t('liveWeb.imMute.queryForm.nickNamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.imMute.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.imMute.queryForm.resetButton')}}</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="ImMuteList">
      <el-table-column :label="$t('liveWeb.imMute.table.memberAccount')" align="center" prop="Member_Account" />
      <el-table-column :label="$t('liveWeb.imMute.table.nickName')" align="center" prop="nickName" />
      <el-table-column :label="$t('liveWeb.imMute.table.shuttedUntil')" align="center" prop="ShuttedUntil" >
        <template slot-scope="scope" >
          <span v-if="scope.row.ShuttedUntil == -1">{{$t('liveWeb.imMute.table.shuttedUntilNegative1')}}</span>
          <span v-else-if="scope.row.ShuttedUntil == 0">{{$t('liveWeb.imMute.table.shuttedUntil0')}}</span>
          <span v-else>{{ parseTime(scope.row.ShuttedUntil, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
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
  </div>
</template>

<script>
import { listImMute, getImMute, delImMute, addImMute, updateImMute, exportImMute } from "@/api/platform-web/live-web/ImMute";

export default {
  name: "ImMute",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: false,
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
      // 腾讯IM禁言查询表格数据
      ImMuteList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        userId: null,
        nickName: null,
        hostNickName:null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "会员编号不能为空", trigger: "blur" }
        ],
        dv: [
          { required: true, message: "是否默认 1是，0否不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    //当主播不为空时,其他必须为空
    checkParam(){
      if (this.queryParams.userId || this.queryParams.nickName) {
        return true
      }else {
        this.$notify.warning(this.$t('liveWeb.imMute.messageBox.userIdAndNickNameEmptyWarning'));
        return false
      }
    },
    /** 查询腾讯IM禁言查询列表 */
    getList() {
      if (!this.checkParam()) {
        return
      }
      this.loading = true;
      listImMute(this.queryParams).then(response => {
        this.ImMuteList = response.data;
      }).finally(()=>{this.loading =false})
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
        realName: null,
        bankTypeId: null,
        bankAccount: null,
        bankAddress: null,
        createTime: null,
        type: null,
        dv: null,
        realBankAddress: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.userId){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.userId.match(reg)
        if(!flag){
          this.msgError(this.$t('liveWeb.imMute.messageBox.userIdFormatError'))
          return
        }
      }
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      // this.resetForm("queryForm");
      this.queryParams= {
        userId: null,
          nickName: null,
          hostNickName:null,
      }
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
      this.title = "添加腾讯IM禁言查询";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getImMute(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改腾讯IM禁言查询";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateImMute(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addImMute(this.form).then(response => {
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
      this.$confirm('是否确认删除腾讯IM禁言查询编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delImMute(ids);
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
        return exportImMute(queryParams);
      }).then(response => {
        this.downloadExcel(response, '腾讯IM禁言查询');
      }).catch(() => {
      })
    }
  }
};
</script>
