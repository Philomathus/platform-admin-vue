<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="全部平台" prop="platformId">
        <el-select v-model="queryParams.platformId" placeholder="请选择">
          <el-option
            v-for="dict in platformNameList"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入游戏名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
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
          v-hasPermi="['game:info:add']"
        >新增
        </el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table :stripe="true" v-loading="loading" :data="report" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="游戏名称" align="center" prop="name"/>
      <el-table-column label="图标" align="center" prop="icon">
        <template slot-scope="scope">
          <el-image
            style="width: 50px;"
            :src="scope.row.icon"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="新版图标" align="center" prop="editionIcon">
        <template slot-scope="scope">
          <el-image
            style="width: 50px;"
            :src="scope.row.editionIcon"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="排序号" align="center" prop="indexs"/>
      <el-table-column label="游戏平台" align="center" prop="platformName"/>
      <el-table-column label="高宽比" align="center" prop="highWide"/>
      <el-table-column label="是否填充" align="center" prop="isFull" :formatter="statusFormat"/>
      <el-table-column label="是否维护" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isWh"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChangeisWH(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="启用状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            style="color: #FF5722"
            v-hasPermi="['game:info:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            style="color: #FF5722"
            v-hasPermi="['game:info:remove']"
          >删除
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


    <!-- 添加或修改游戏信息对话框 -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="游戏名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入游戏名称"/>
        </el-form-item>
        <el-form-item label="排序号" prop="indexs">
          <el-input v-model="form.indexs" placeholder="请输入排序号"/>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <imageUpload v-model="form.icon" path="gameInfo"/>
        </el-form-item>
        <el-form-item label="新版图标" prop="editionIcon">
          <imageUpload v-model="form.editionIcon" path="gameInfo"/>
        </el-form-item>
        <el-form-item label="游戏码" prop="kindId">
          <el-input v-model="form.kindId" placeholder="请输入游戏码" style="width: 240px"/>
        </el-form-item>
        <el-form-item label="高宽比" prop="highWide">
          <el-input v-model="form.highWide" placeholder="请输入高宽比" style="width: 240px"/>
        </el-form-item>
        <el-form-item label="是否填充" prop="isFull">
          <el-select v-model="form.isFull" placeholder="请选择">
            <el-option
              v-for="dict in isFullList"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="横竖屏" prop="screen">
          <el-select v-model="form.screen" placeholder="请选择">
            <el-option
              v-for="dict in screenList"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
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
        <el-form-item label="简介" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入简介" style="width: 240px"/>
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
  listUser,
  changeUserStatus,
  changeIsWh,
  getInfo,
  getGameInfo,
  addGameInfoOne,
  updateGameInfo,
  delGameInfo
} from '@/api/platform-web/game/gameInfo'
import ImageUpload from '@/components/ImageUpload'
import { getToken } from '@/utils/auth'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'User',
  components: { ImageUpload },
  data() {
    return {
      //谷歌验证码点击关闭
      dialogVisible: false,
      //谷歌二维码
      pic: '',
      secretKey: '',
      googleAuthCode: '',
      userName: '',
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
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: '',
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      report: [],
      screenList: [],
      isFullList: [],
      // 游戏名称
      platformNameList: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/system/user/importData'
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        platformId: null,
        platformName: null,
        name: null,
        orderByColumn: 'indexs',
        isAsc: 'desc'
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('game_info_screen').then(response => {
      this.screenList = response.data
    })
    this.getDicts('game_isFull').then(response => {
      this.isFullList = response.data
    })
    getGameInfo().then(response => {
      this.platformNameList = response.data
    })
  },

  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.report = response.rows
          this.total = response.total
          this.loading = false
        }
      )
    },
    // 横竖屏
    myScreen(row, column) {
      if (row.screen == 0) {
        return '横屏'
      }
      if (row.screen == 1) {
        return '竖屏'
      }
    },
    //是否填充
    statusFormat(row, column) {
      if (row.isFull == 0) {
        return '不填充'
      }
      if (row.isFull == 1) {
        return '填充'
      }
    },
    // 状态修改
    handleStatusChange(row) {
      let text = row.status === '1' ? '启用' : '停用'
      this.$confirm('确认要"' + text + '""' + row.name + '"吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return changeUserStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function() {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    // 维护状态修改
    handleStatusChangeisWH(row) {
      let text = row.isWh === '1' ? '维护' : '取消维护'
      this.$confirm('确认要"' + text + '""' + row.name + '"吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return changeIsWh(row.id, row.isWh)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function() {
        row.isWh = row.isWh === '0' ? '1' : '0'
      })
    },

    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    reset() {
      this.form = {
        id: null,
        name: null,
        remark: null,
        indexs: null,
        isWh: null,
        isRecommend: null,
        status: 0,
        icon: null,
        isHot: null,
        editionIcon: null,
        createTime: null,
        kindId: null,
        platformId: null,
        screen: null,
        highWide: null,
        isFull: null,
        iconType: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },

    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getInfo(id).then(response => {
        this.form = response.data
        this.form.screen = this.form.screen + ''
        this.open = true
        this.title = '修改游戏信息'
      })
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '新增游戏信息'
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateGameInfo(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addGameInfoOne(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除游戏名为"' + row.name + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delGameInfo(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    }

  }
}
</script>
