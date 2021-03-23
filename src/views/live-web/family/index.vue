<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="族长ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item >
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable>
          <el-option label="未审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核拒绝" value="2"></el-option>
          <el-option label="解散" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveFamilyList">
      <el-table-column label="ID" min-width="120" align="center" prop="id">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="familyShow(row.id)">{{ row.id }}</a>
        </template>
      </el-table-column>
      <!--      <el-table-column label="家族LOGO" align="center" prop="logo"/>
            <el-table-column label="图标" align="center" prop="logo">
              <template slot-scope="scope">
                <el-image
                  style="width: 50px; height: 50px"
                  :src="scope.row.logo"
                >
                </el-image>
              </template>
            </el-table-column>-->
      <el-table-column label="家族名称" :show-overflow-tooltip="true" min-width="120" align="center" prop="name"/>
      <el-table-column label="公告" :show-overflow-tooltip="true" min-width="120" align="center" prop="notice"/>
      <el-table-column label="家族宣言" :show-overflow-tooltip="true" min-width="150" align="center" prop="manifesto"/>
      <el-table-column label="族推荐号" min-width="120" align="center" prop="nickName"/>
      <el-table-column label="家族长ID" min-width="120" align="center" prop="userId"/>
      <el-table-column label="成员数量" min-width="120" align="center" prop="userCount"/>
      <el-table-column label="创建时间" width="160" align="center" prop="createTimes">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTimes, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="120" align="center" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" style="color: #0000FF">未审核</span>
          <span v-if="scope.row.status === 1" style="color: #5FB878">审核通过</span>
          <span v-if="scope.row.status === 2" style="color: #FF5722">拒绝通过</span>
          <span v-if="scope.row.status === 4" style="color: #C0C0C0">解散</span>
        </template>
      </el-table-column>
      <el-table-column label="家族成员的贡献" min-width="120" align="center" prop="contribution"/>
      <el-table-column label="直播时间" min-width="120" align="center" prop="videoTime"/>
      <el-table-column label="备注" :show-overflow-tooltip="true" min-width="220" align="center" prop="memo"/>
      <el-table-column label="操作" min-width="120" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-check"
            v-show="scope.row.status ==0"
            @click="handleUpdate(scope.row,1)"
          >通过
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-close"
            v-show="scope.row.status ==0"
            @click="handleUpdate(scope.row,0)"
          >不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import {
  listLiveFamily,
  getLiveFamily,
  delLiveFamily,
  addLiveFamily,
  updateLiveFamily,
  exportLiveFamily
} from '@/api/live-web/family/liveFamily'

export default {
  name: 'LiveFamily',
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
      // 家族表格数据
      liveFamilyList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        logo: null,
        name: null,
        notice: null,
        manifesto: null,
        nickName: null,
        userId: null,
        userCount: null,
        createDate: null,
        createY: null,
        createM: null,
        createD: null,
        createW: null,
        memo: null,
        status: null,
        contribution: null,
        familyLevel: null,
        videoTime: null,
        score: null,
        liveLevel: null,
        familyRecom: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    familyShow(familyId) {
      this.$router.push({
        path: '/live/live/liveUser',
        query: {
          familyId: familyId
        }
      })
    },
    /** 查询家族列表 */
    getList() {
      this.loading = true
      listLiveFamily(this.queryParams).then(response => {
        this.liveFamilyList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        logo: null,
        name: null,
        notice: null,
        manifesto: null,
        nickName: null,
        userId: null,
        userCount: null,
        createTime: null,
        createDate: null,
        createY: null,
        createM: null,
        createD: null,
        createW: null,
        memo: null,
        status: 0,
        contribution: null,
        familyLevel: null,
        videoTime: null,
        score: null,
        liveLevel: null,
        familyRecom: null
      }
      this.queryParams = {
        status: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.reset()
      this.resetForm('queryForm')
      this.handleQuery()
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
      this.title = '添加家族'
    },
    /** 修改按钮操作 */
    handleUpdate(row, flag) {
      var data = {}
      data.id = row.id
      if (flag == 1) {
        data.status = 1
        this.$confirm('是否确认通过审核家族名称"' + row.name + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return updateLiveFamily(data)
        }).then(() => {
          this.getList()
          this.msgSuccess('审核通过')
        })
      } else {
        data.status = 2
        this.$confirm('是否确认拒绝家族名称"' + row.name + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return updateLiveFamily(data)
        }).then(() => {
          this.getList()
          this.msgSuccess('审核拒绝成功')
        })
      }
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveFamily(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addLiveFamily(this.form).then(response => {
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
      this.$confirm('是否确认删除家族编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delLiveFamily(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有家族数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportLiveFamily(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>
