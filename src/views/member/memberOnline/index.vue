<template>
  <div class="app-container">
    <el-button type="primary" @click="copy">{{ $t('members.memberOnline.nom') }} {{ this.totalData.total || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" class="mt20">
      <el-form-item prop="searchValue">
        <el-input
          v-model.trim="queryParams.searchValue"
          :placeholder=" $t('members.memberOnline.man') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          :placeholder=" $t('members.memberOnline.pemn') "
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:memberOnline:export']"
        >{{ $t('global.exportButton') }}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="memberOnlineList" >
      <el-table-column width="55" align="center" />
      <el-table-column :label=" $t('members.memberOnline.mid') " align="center" prop="id" />
      <el-table-column :label=" $t('members.memberOnline.ma') " align="center" prop="userName" />
      <el-table-column :label=" $t('members.memberOnline.mv') " align="center" prop="vip" />
      <el-table-column :label=" $t('members.memberOnline.mv') " align="center" prop="online" >
      <template slot-scope="scope">
        <span>{{ parseTime(scope.row.online, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
      </template>
      </el-table-column>
      <el-table-column :label=" $t('global.nickname') " align="center" prop="nickName" />
      <el-table-column :label=" $t('members.memberOnline.lip') " align="center" prop="loginIp" />
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
import { listMemberOnline, exportMemberOnline, getCountTotal } from "@/api/platform-web/member/memberOnline";

export default {
  name: "MemberOnline",
  components: {
  },
  data() {
    return {
      // 头部数据
      totalData: {},
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
      // 在线会员列表表格数据
      memberOnlineList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        onlineTime: null,
        online_time: null
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
    this.getCountTotal()
  },
  methods: {
    /** 查询在线会员列表列表 */
    getList() {
      this.loading = true;
      listMemberOnline(this.queryParams).then(response => {
        this.memberOnlineList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    //复制
    copy() {
      this.copyCommand(this.totalData.total)
    },
    //统计在线会员
    getCountTotal() {
      getCountTotal().then((res) => {
        this.totalData = res.data
      })
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        onlineTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.searchValue){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.searchValue.match(reg)
        if(!flag){
          this.msgError( this.$t('members.memberOnline.lip') )
          return
        }
      }
      this.queryParams.pageNum = 1;
      this.getCountTotal();
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm( this.$t('members.memberOnline.cpe') , this.$t('global.dialogTitle') , {
        confirmButtonText: this.$t('global.confirmButton') ,
        cancelButtonText: this.$t('global.cancelButton') ,
        type: "warning"
      }).then(function() {
        return exportMemberOnline(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('members.memberOnline.oml') );
      }).catch(() => {
      })
    }
  }
};
</script>
