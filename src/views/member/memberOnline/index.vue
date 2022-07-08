<template>
  <div class="app-container">
    <el-button type="primary" @click="copy">在线会员数量 {{ this.totalData.total || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" class="mt20">
      <el-form-item prop="searchValue">
        <el-input
          v-model.trim="queryParams.searchValue"
          placeholder="会员ID/账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入会员昵称"
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:memberOnline:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="memberOnlineList" >
      <el-table-column width="55" align="center" />
      <el-table-column label="会员ID" align="center" prop="id" />
      <el-table-column label="会员账号" align="center" prop="userName" />
      <el-table-column label="会员vip" align="center" prop="vip" />
      <el-table-column label="最后活跃时间" align="center" prop="online" >
      <template slot-scope="scope">
        <span>{{ parseTime(scope.row.online, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
      </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" prop="nickName" />
      <el-table-column label="登入IP" align="center" prop="loginIp" />
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
          this.msgError("会员ID/账号只能输入数字及下划线")
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
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportMemberOnline(queryParams);
      }).then(response => {
        this.downloadExcel(response, '在线会员列表');
      }).catch(() => {
      })
    }
  }
};
</script>
