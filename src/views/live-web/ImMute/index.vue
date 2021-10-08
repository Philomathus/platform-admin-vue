<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会员ID" prop="userId">
        <el-input
          v-model.trim="queryParams.userId"
          placeholder="请输入会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="会员昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入会员昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="主播昵称" prop="hostNickName">
        <el-input
          v-model="queryParams.hostNickName"
          placeholder="请输入会员昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

<!--    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['live-web:ImMute:add']"
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
          v-hasPermi="['live-web:ImMute:edit']"
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
          v-hasPermi="['live-web:ImMute:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['live-web:ImMute:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>-->

    <el-table stripe v-loading="loading" :data="ImMuteList">
      <el-table-column label="用户Id" align="center" prop="Member_Account" />
      <el-table-column label="用户昵称" align="center" prop="nickName" />
      <el-table-column label="截止时间" align="center" prop="ShuttedUntil" >
        <template slot-scope="scope" >
          <span v-if="scope.row.ShuttedUntil == -1">永久</span>
          <span v-else-if="scope.row.ShuttedUntil == 0">未封停</span>
          <span v-else>{{ parseTime(scope.row.ShuttedUntil, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="真实姓名" align="center" prop="realName" />
      <el-table-column label="银行类型id" align="center" prop="bankTypeId" />
      <el-table-column label="银行账号" align="center" prop="bankAccount" />
      <el-table-column label="开户行" align="center" prop="bankAddress" />
      <el-table-column label="卡片类型1=银行卡2=支付宝" align="center" prop="type" />
      <el-table-column label="是否默认 1是，0否" align="center" prop="dv" />
      <el-table-column label="是否默认 1是，0否" align="center" prop="realBankAddress" />-->
  <!--    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['live-web:ImMute:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['live-web:ImMute:remove']"
          >删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改腾讯IM禁言查询对话框 -->
   <!-- <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员编号" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入会员编号" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="银行类型id" prop="bankTypeId">
          <el-input v-model="form.bankTypeId" placeholder="请输入银行类型id" />
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input v-model="form.bankAccount" placeholder="请输入银行账号" />
        </el-form-item>
        <el-form-item label="开户行" prop="bankAddress">
          <el-input v-model="form.bankAddress" placeholder="请输入开户行" />
        </el-form-item>
        <el-form-item label="卡片类型1=银行卡2=支付宝" prop="type">
          <el-select v-model="form.type" placeholder="请选择卡片类型1=银行卡2=支付宝">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否默认 1是，0否" prop="dv">
          <el-input v-model="form.dv" placeholder="请输入是否默认 1是，0否" />
        </el-form-item>
        <el-form-item label="是否默认 1是，0否" prop="realBankAddress">
          <el-input v-model="form.realBankAddress" placeholder="请输入是否默认 1是，0否" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>-->
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
        this.$notify.warning("当主播Id和主播昵称不能同时为空");
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
