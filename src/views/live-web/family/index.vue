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
          type="number"
          class="no-number"
          v-model="queryParams.userId"
          placeholder="族长ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable>
          <el-option label="未审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核拒绝" value="2"></el-option>
          <el-option label="封停中" value="3"></el-option>
          <el-option label="解散" value="4"></el-option>
        </el-select>
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
          v-hasPermi="['admin:liveFamily:add']"
        >新增家族
        </el-button>
      </el-col>
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
          <span v-if="scope.row.status === 3" style="color: #FF5722">封停中</span>
          <span v-if="scope.row.status === 4" style="color: #C0C0C0">解散</span>
        </template>
      </el-table-column>
      <el-table-column label="家族成员的贡献" min-width="120" align="center" prop="contribution"/>
      <el-table-column label="直播时间" min-width="120" align="center" prop="videoTime"/>
      <el-table-column label="备注" :show-overflow-tooltip="true" min-width="220" align="center" prop="memo"/>
      <el-table-column label="操作" min-width="280" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            v-show="scope.row.status != 4"
            @click="handleUpdateFamily(scope.row)"
            v-hasPermi="['admin:liveFamily:edit']"
          >修改
          </el-button>
          <el-button
            size="small"
            type="info"
            v-show="scope.row.status != 4"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveFamily:remove']"
          >解散
          </el-button>
          <el-button
            size="small"
            type="danger"
            v-show="scope.row.status == 1"
            @click="handleUpdate(scope.row,2)"
            v-hasPermi="['admin:liveFamily:edit']"
          >封停
          </el-button>
          <el-button
            size="small"
            type="success"
            v-show="scope.row.status == 3"
            @click="handleUpdate(scope.row,3)"
            v-hasPermi="['admin:liveFamily:edit']"
          >解封
          </el-button>
          <el-button
            size="small"
            type="success"
            v-show="scope.row.status ==0"
            @click="handleUpdate(scope.row,1)"
          >通过
          </el-button>
          <el-button
            size="small"
            type="danger"
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
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="800px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="家族名称" prop="name" v-if="form.id == null">
          <el-input v-model="form.name" placeholder="请输入家族名称"/>
        </el-form-item>
        <el-form-item label="家族长ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入家族长ID"/>
        </el-form-item>
        <el-form-item label="家族长昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入家族长昵称"/>
        </el-form-item>
        <el-form-item label="家族LOGO" prop="logo">
          <imageUpload v-model="form.logo" path="liveFamily"/>
        </el-form-item>
        <el-form-item label="家族宣言" prop="manifesto">
          <el-input v-model="form.manifesto" placeholder="请输入家族宣言"/>
        </el-form-item>
        <el-form-item label="公告" prop="notice">
          <el-input v-model="form.notice" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" type="textarea" placeholder="请输入内容"/>
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
  listLiveFamily,
  getLiveFamily,
  delLiveFamily,
  addLiveFamily,
  updateLiveFamily,
  exportLiveFamily
} from '@/api/live-web/family/liveFamily'
import ImageUpload from "@/components/ImageUpload";

export default {
  name: 'LiveFamily',
  components: {
    ImageUpload
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      id: null,
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
        logo: [
          {required: true, message: '请上传家族LOGO', trigger: 'change'}
        ],
        name: [
          {required: true, message: "请输入家族名称", trigger: "blur"}
        ],
        userId: [
          {required: true, message: "请输入家族长ID", trigger: "blur"}
        ],
        nickName: [
          {required: true, message: "请输入家族长昵称", trigger: "blur"}
        ],
        manifesto: [
          {required: true, message: "请输入家族宣言", trigger: "blur"}
        ],
        notice: [
          {required: true, message: "请输入公告", trigger: "blur"}
        ],
        memo: [
          {required: true, message: "请输入备注", trigger: "blur"}
        ]
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加家族'
    },
    /** 修改按钮操作 */
    handleUpdateFamily(row) {
      this.reset();
      const id = row.id
      getLiveFamily(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改家族";
      });
    },
    /** 通过按钮操作 */
    handleUpdate(row, flag) {
      var data = {}
      data.id = row.id
      if (flag == 1) {
        data.status = 1
        this.$confirm('是否确认通过审核家族名称"' + row.name + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return updateLiveFamily(data)
        }).then(() => {
          this.getList()
          this.msgSuccess('审核通过')
        })
      } else if (flag == 0) {
        data.status = 2
        this.$confirm('是否确认拒绝家族名称"' + row.name + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return updateLiveFamily(data)
        }).then(() => {
          this.getList()
          this.msgSuccess('审核拒绝成功')
        })
      } else if (flag == 2) {
        data.status = 8
        this.$prompt('请输入封停原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '封停原因不能为空',
          type: 'warning'
        }).then(({value}) => {
            data.memo = value
            updateLiveFamily(data).then(response => {
              this.msgSuccess('封停成功')
              this.getList()
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        })
      } else if (flag == 3) {
        data.status = 9
        this.$prompt('请输入解封原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '解封原因不能为空',
          type: 'warning'
        }).then(({value}) => {
            data.memo = value
          updateLiveFamily(data).then(response => {
            this.msgSuccess('解封成功')
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        })
      }
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveFamily(this.form).then(response => {
              if (response.data.code == 0) {
                this.msgError(response.data.msg)
              } else {
                this.msgSuccess(response.data.msg)
                this.open = false
                this.getList()
              }
            })
          } else {
            addLiveFamily(this.form).then(response => {
              if (response.data.code == 0) {
                this.msgError(response.data.msg)
              } else {
                this.msgSuccess(response.data.msg)
                this.open = false
                this.getList()
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id
      this.$confirm('是否确认解散"' + row.name + '"家族?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delLiveFamily(id)
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
      }).then(function () {
        return exportLiveFamily(queryParams)
      }).then(response => {
        (response.msg)
      })
    }
  }
}
</script>
