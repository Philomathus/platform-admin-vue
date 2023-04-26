<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label=" $t('members.memberCard.index.name') " prop="realName">
        <el-input
          v-model="queryParams.realName"
          :placeholder=" $t('members.memberCard.index.pName') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label=" $t('members.memberCard.index.bName') " prop="bankName">
        <el-input
          v-model="queryParams.bankName"
          :placeholder=" $t('members.memberCard.index.pbName') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label=" $t('members.memberCard.index.bCode') " prop="bankCode">
        <el-input
          v-model="queryParams.bankCode"
          :placeholder=" $t('members.memberCard.index.pbCode') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label=" $t('members.memberCard.index.bAccnum') " prop="bankAccount">
        <el-input
          v-model="queryParams.bankAccount"
          :placeholder=" $t('members.memberCard.index.pbAccnum') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label=" $t('members.memberCard.index.bAdd') " prop="bankAddress">
        <el-input
          v-model="queryParams.bankAddress"
          :placeholder=" $t('members.memberCard.index.pbAdd') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label=" $t('members.memberCard.index.memId') " prop="memberId">
        <el-input
          v-model.trim="queryParams.memberId"
          :placeholder=" $t('members.memberCard.index.pmemId') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label=" $t('members.memberCard.index.cType') " prop="type">
        <el-select v-model="queryParams.type" :placeholder=" $t('members.memberCard.index.scType') " clearable size="small">
          <el-option :label=" $t('members.memberCard.index.pDict') " value=""/>
        </el-select>
      </el-form-item>
      <el-form-item :label=" $t('members.memberCard.index.default') " prop="dv">
        <el-input
          v-model="queryParams.dv"
          :placeholder=" $t('members.memberCard.index.pdef') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('members.memberCard.index.search') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('members.memberCard.index.reset') }}</el-button>
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
          v-hasPermi="['admin:memberCard:add']"
        >{{ $t('members.memberCard.index.new') }}
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
          v-hasPermi="['admin:memberCard:edit']"
        >{{ $t('members.memberCard.index.mod') }}
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
          v-hasPermi="['admin:memberCard:remove']"
        >{{ $t('members.memberCard.index.del') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:memberCard:export']"
        >{{ $t('members.memberCard.index.exp') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="memberCardList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label=" $t('members.memberCard.index.sysNum') " align="center" prop="id"/>
      <el-table-column :label=" $t('members.memberCard.index.name') " align="center" prop="realName"/>
      <el-table-column :label=" $t('members.memberCard.index.bName') " align="center" prop="bankName"/>
      <el-table-column :label=" $t('members.memberCard.index.bCode') " align="center" prop="bankCode"/>
      <el-table-column :label=" $t('members.memberCard.index.bAccnum') " align="center" prop="bankAccount"/>
      <el-table-column :label=" $t('members.memberCard.index.bAdd') " align="center" prop="bankAddress"/>
      <el-table-column :label=" $t('members.memberCard.index.memId') " align="center" prop="memberId"/>
      <el-table-column :label=" $t('members.memberCard.index.cType') " align="center" prop="type"/>
      <el-table-column :label=" $t('members.memberCard.index.default') " align="center" prop="dv"/>
      <el-table-column :label=" $t('members.memberCard.index.opt') " align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:memberCard:edit']"
          >{{ $t('members.memberCard.index.mod') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:memberCard:remove']"
          >{{ $t('members.memberCard.index.del') }}
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label=" $t('members.memberCard.index.name') " prop="realName">
          <el-input v-model="form.realName" :placeholder=" $t('members.memberCard.index.pName') "/>
        </el-form-item>
        <el-form-item :label=" $t('members.memberCard.index.bName') " prop="bankName">
          <el-input v-model="form.bankName" :placeholder=" $t('members.memberCard.index.pbName') "/>
        </el-form-item>
        <el-form-item :label=" $t('members.memberCard.index.bCode') " prop="bankCode">
          <el-input v-model="form.bankCode" :placeholder=" $t('members.memberCard.index.pbCode') "/>
        </el-form-item>
        <el-form-item :label=" $t('members.memberCard.index.bAccnum') " prop="bankAccount">
          <el-input v-model="form.bankAccount" :placeholder=" $t('members.memberCard.index.pbAccnum') "/>
        </el-form-item>
        <el-form-item :label=" $t('members.memberCard.index.bAdd') " prop="bankAddress">
          <el-input v-model="form.bankAddress" :placeholder=" $t('members.memberCard.index.pbAdd') "/>
        </el-form-item>
        <el-form-item :label=" $t('members.memberCard.index.memId') " prop="memberId">
          <el-input v-model="form.memberId" :placeholder=" $t('members.memberCard.index.pmemId') "/>
        </el-form-item>
        <el-form-item label="卡片类型1=银行卡2=支付宝" prop="type">
          <el-select v-model="form.type" placeholder="请选择卡片类型1=银行卡2=支付宝">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否默认" prop="dv">
          <el-input v-model="form.dv" placeholder="请输入是否默认"/>
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
  listMemberCard,
  getMemberCard,
  delMemberCard,
  addMemberCard,
  updateMemberCard,
  exportMemberCard
} from "@/api/platform-web/member/memberCard";

export default {
  name: "MemberCard",
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
      // 【请填写功能名称】表格数据
      memberCardList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        realName: null,
        bankName: null,
        bankCode: null,
        bankAccount: null,
        bankAddress: null,
        memberId: null,
        type: null,
        dv: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listMemberCard(this.queryParams).then(response => {
        this.memberCardList = response.rows;
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
        realName: null,
        bankName: null,
        bankCode: null,
        bankAccount: null,
        bankAddress: null,
        memberId: null,
        createTime: null,
        type: null,
        dv: null
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
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMemberCard(id).then(response => {
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
            updateMemberCard(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMemberCard(this.form).then(response => {
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
      }).then(function () {
        return delMemberCard(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
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
        return exportMemberCard(queryParams);
      }).then(response => {
        this.downloadExcel(response, '会员银行卡')
      })
    }
  }
};
</script>
