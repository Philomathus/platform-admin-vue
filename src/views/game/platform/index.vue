<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="代理号" prop="agent">
        <el-input
          v-model="queryParams.agent"
          placeholder="请输入代理号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="平台名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入平台名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
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
          v-hasPermi="['game:platform:add']">新增
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="gamePlatformList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="代理" min-width="100" align="center" prop="agent"/>
      <el-table-column label="平台名称" min-width="100" align="center" prop="name"/>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="洗码比例" min-width="100" align="center" prop="rateClean">
        <template v-slot="{row}">
          {{numberUtil.toPercent(row.rateClean)}}
        </template>
      </el-table-column>
      <el-table-column label="打码比例" min-width="100" align="center" prop="rateBeat">
        <template v-slot="{row}">
          {{numberUtil.toPercent(row.rateBeat)}}
        </template>
      </el-table-column>
      <el-table-column label="创建人" min-width="90" align="center" prop="createBy"/>
      <el-table-column label="创建时间" min-width="160" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后更新人" min-width="90" align="center" prop="updateBy"/>
      <el-table-column label="最后更新时间" min-width="160" align="center" prop="updateTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['game:platform:edit']">修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            style="color: #FF5722"
            @click="handleDelete(scope.row)"
            v-hasPermi="['game:platform:remove']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[15,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"/>

    <!-- 添加或修改游戏平台对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <div class="el-row">
          <div class="el-col-lg-12">
            <el-form-item label="平台id" prop="id">
              <el-input v-model="form.id" placeholder="请输入代理id"/>
            </el-form-item>
          </div>
          <div class="el-col-lg-12">
            <el-form-item label="代理" prop="agent">
              <el-input v-model="form.agent" placeholder="请输入代理"/>
            </el-form-item>
          </div>
        </div>

        <el-form-item label="平台名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入平台名称"/>
        </el-form-item>
        <el-form-item label="DES密钥" prop="des">
          <el-input v-model="form.des" placeholder="请输入DES密钥"/>
        </el-form-item>
        <el-form-item label="MD5密钥" prop="md5">
          <el-input v-model="form.md5" placeholder="请输入MD5密钥"/>
        </el-form-item>
        <el-form-item label="洗码比例" prop="rateClean">
          <el-input v-model="form.rateClean" placeholder="请输入洗码比例"/>
        </el-form-item>
        <el-form-item label="打码比例" prop="rateBeat">
          <el-input v-model="form.rateBeat" placeholder="请输入打码比例"/>
        </el-form-item>
        <el-form-item label="API接口" prop="apiUrl">
          <el-input v-model="form.apiUrl" placeholder="请输入API接口"/>
        </el-form-item>

        <div class="el-row">
          <div class="el-col-lg-12">
            <el-form-item label="站点标识" prop="linecode">
              <el-input v-model="form.linecode" placeholder="请输入站点标识"/>
            </el-form-item>
          </div>
          <div class="el-col-lg-12">
            <el-form-item label="游戏类型" prop="gameTypeid">
              <el-select v-model="form.gameTypeid" placeholder="请选择">
                <el-option
                  v-for="dict in gameTypeList"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

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
    listGamePlatform, getGamePlatform, delGamePlatform, addGamePlatform,
    updateGamePlatform, exportGamePlatform, changeUserStatus, getGameTpyeList
  } from "@/api/platform-web/game/platform";


  export default {
    name: "Game-platform",
    components: {},
    data() {
      return {
        // pageType 新增修改判断
        pageType: 0,
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
        // 游戏平台表格数据
        gamePlatformList: [],
        gameTypeList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 15,
          agent: null,
          name: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          id: [
            {required: true, message: "id不能为空", trigger: "blur"}
          ],
          agent: [
            {required: true, message: "代理账号不能为空", trigger: "blur"}
          ],
          name: [
            {required: true, message: "平台名称不能为空", trigger: "blur"}
          ],
          des: [
            {required: true, message: "des密钥不能为空", trigger: "blur"}
          ],
          md5: [
            {required: true, message: "md5密钥不能为空", trigger: "blur"}
          ],
          rateClean: [
            {required: true, message: "洗码比例不能为空", trigger: "blur"}
          ],
          rateBeat: [
            {required: true, message: "打码比例不能为空", trigger: "blur"}
          ],
          apiUrl: [
            {required: true, message: "API接口不能为空", trigger: "blur"}
          ],
          linecode: [
            {required: true, message: "站点标识不能为空", trigger: "blur"}
          ],
          gameTypeid: [
            {required: true, message: "游戏类型不能为空", trigger: "blur"}
          ]
        }
      };
    },
    created() {
      this.getList();
      getGameTpyeList().then(response => {
        this.gameTypeList = response.rows;
      });

    },
    methods: {
      /** 查询游戏平台列表 */
      getList() {
        this.loading = true;
        listGamePlatform(this.queryParams).then(response => {
          this.gamePlatformList = response.rows;
          this.gamePlatformList.forEach(value => value.status= value.status + '')
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
          agent: null,
          name: null,
          apiUrl: null,
          recordUrl: null,
          des: null,
          md5: null,
          linecode: null,
          rateClean: null,
          gameTypeid: null,
          status: 0,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          rateBeat: null
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
        this.pageType = 0
        this.reset();
        this.open = true;
        this.title = "添加游戏平台";
      },

      // 状态修改
      handleStatusChange(row) {
        let text = row.status === "1" ? '启用' : '停用'
        this.$confirm('确认要"' + text + '""' + row.name + '"吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return changeUserStatus(row.id, row.status).then(() => {
            this.msgSuccess(text + '成功').catch(() => {
              row.status = row.status === '0' ? '1' : '0'
            })
          })
        }).catch(function () {
          this.msgSuccess("已取消")
        })
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        this.pageType = 1
        const id = row.id || this.ids
        getGamePlatform(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改游戏平台";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.pageType === 1) {
              updateGamePlatform(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else if (this.pageType === 0) {
              addGamePlatform(this.form).then(response => {
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
        this.$confirm('是否确认删除"' + row.name + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delGamePlatform(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有游戏平台数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return exportGamePlatform(queryParams);
        }).then(response => {
          (response.msg);
        })
      }
    }
  };
</script>
