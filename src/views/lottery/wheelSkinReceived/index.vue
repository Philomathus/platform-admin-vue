<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="抽奖历史id" prop="wheelHistoryId">
        <el-input
          v-model="queryParams.wheelHistoryId"
          placeholder="请输入抽奖历史id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
<!--      <el-form-item label="用户id" prop="pUserId">
        <el-input
          v-model="queryParams.pUserId"
          placeholder="请输入用户id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />-->
        <el-form-item label="用户昵称" prop="pUserName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入用户昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="游戏大区" prop="daQu">
        <el-input
          v-model="queryParams.daQu"
          placeholder="请输入游戏大区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="游戏昵称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入游戏昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="皮肤名称" prop="skin">
        <el-input
          v-model="queryParams.skin"
          placeholder="请输入皮肤名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="领取状态" prop="receiveType">
        <el-select v-model="queryParams.receiveType" placeholder="请选择领取状态" clearable size="small">
          <el-option
            v-for="dict in typeList "
            :key="dict.dictValue"
            :value="parseInt(dict.dictValue)"
            :label="dict.dictLabel"
          />

        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

   <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['lottery:wheelSkinReceived:add']"
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
          v-hasPermi="['lottery:wheelSkinReceived:edit']"
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
          v-hasPermi="['lottery:wheelSkinReceived:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['lottery:wheelSkinReceived:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>-->

    <el-table stripe v-loading="loading" :data="wheelSkinReceivedList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="抽奖历史id" align="center" prop="wheelHistoryId" />
      <el-table-column label="用户id" align="center" prop="puserId" />
      <el-table-column label="用户昵称" align="center" prop="nickName" />
      <el-table-column label="中奖金额" align="center" prop="prize" :formatter="formatterPrize"/>
      <el-table-column label="游戏大区" align="center" prop="daQu" />
      <el-table-column label="游戏昵称" align="center" prop="name" />
      <el-table-column label="皮肤名称" align="center" prop="skin" />
      <el-table-column label="领取状态" align="center" prop="receiveType" :formatter="formatterType" >
        <template v-slot="{row}">
          <el-select v-model="row.receiveType" placeholder="请选择领取状态" clearable size="small" @change="changeReceivedType(row)">
            <el-option
              v-for="dict in typeList "
              :key="dict.dictValue"
              :value="parseInt(dict.dictValue)"
              :label="dict.dictLabel"
            />
          </el-select>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['lottery:wheelSkinReceived:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['lottery:wheelSkinReceived:remove']"
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

    <!-- 添加或修改转盘皮肤领取对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="抽奖历史id" prop="wheelHistoryId">
          <el-input v-model="form.wheelHistoryId" placeholder="请输入抽奖历史id" />
        </el-form-item>
        <el-form-item label="用户id" prop="pUserId">
          <el-input v-model="form.pUserId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="游戏大区" prop="daQu">
          <el-input v-model="form.daQu" placeholder="请输入游戏大区" />
        </el-form-item>
        <el-form-item label="游戏昵称" prop="name">
          <el-input v-model="form.name" placeholder="请输入游戏昵称" />
        </el-form-item>
        <el-form-item label="皮肤名称" prop="skin">
          <el-input v-model="form.skin" placeholder="请输入皮肤名称" />
        </el-form-item>
        <el-form-item label="领取状态 0未领取1领取中2已领取" prop="receiveType">
          <el-select v-model="form.receiveType" placeholder="请选择领取状态 0未领取1领取中2已领取">
            <el-option label="请选择字典生成" value="" />
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
import { listWheelSkinReceived, getWheelSkinReceived, delWheelSkinReceived, addWheelSkinReceived, updateWheelSkinReceived, exportWheelSkinReceived } from "@/api/platform-web/lottery/wheelSkinReceived";

export default {
  name: "WheelSkinReceived",
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
      // 类型列表
      typeList: [],
      // 转盘皮肤领取表格数据
      wheelSkinReceivedList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        wheelHistoryId: null,
        pUserId: null,
        daQu: null,
        name: null,
        nickName: null,
        skin: null,
        receiveType: null,
        orderByColumn: 'id',
        isAsc: 'desc'
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
    this.getDicts('sys_receive_type').then(response => {
      this.typeList = response.data;
    })
  },
  methods: {
    changeReceivedType(row){
      updateWheelSkinReceived(row).then(response => {
        this.msgSuccess("修改成功");
        this.open = false;
        this.getList();
      });
    },
    formatterType(row){
      var msg ;
      this.typeList.forEach((value, index, array) => {
        if (value.dictValue == row.receiveType) {
          msg = value.dictLabel
        }
      });
      return msg;
    },
    formatterPrize(row){
      return row.prize + '元';
    },
    /** 查询转盘皮肤领取列表 */
    getList() {
      this.loading = true;
      listWheelSkinReceived(this.queryParams).then(response => {
        this.wheelSkinReceivedList = response.rows;
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
        wheelHistoryId: null,
        pUserId: null,
        daQu: null,
        name: null,
        skin: null,
        receiveType: null,
        createTime: null,
        updateTime: null
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加转盘皮肤领取";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWheelSkinReceived(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改转盘皮肤领取";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWheelSkinReceived(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWheelSkinReceived(this.form).then(response => {
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
      this.$confirm('是否确认删除转盘皮肤领取编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delWheelSkinReceived(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有转盘皮肤领取数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportWheelSkinReceived(queryParams);
      }).then(response => {
        this.download(response.msg);
      }).catch(() => {
      })
    }
  }
};
</script>
