<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会员ID" prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          placeholder="请输入会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="uploadFileUrl"
          :headers="headers"
          name="excelFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-error="uploadFalse"
          :on-success="uploadSuccess"
          :auto-upload="false"
          :before-upload="beforeAvatarUpload">
          <el-button slot="trigger" size="small" type="primary">选取excel文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload">上传excel文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleCheck">预览</el-button>
      </el-form-item>
      <el-form-item prop="moneydes">
        <el-input
          v-model="queryParams.moneydes"
          placeholder="请输入派送备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="mini" @click="starSend">开始派送</el-button>
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
          v-hasPermi="['admin:memberMoney:add']"
        >新增
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
          v-hasPermi="['admin:memberMoney:edit']"
        >修改
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
          v-hasPermi="['admin:memberMoney:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:memberMoney:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="memberMoneyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="会员id" align="center" prop="memberId"/>
      <el-table-column label="派送金额" align="center" prop="money"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:memberMoney:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:memberMoney:remove']"
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

    <!-- 添加或修改派送彩金暂存表对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="派送金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入派送金额"/>
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
  listMemberMoney,
  getMemberMoney,
  delMemberMoney,
  addMemberMoney,
  updateMemberMoney,
  exportMemberMoney,
  starSend
} from '@/api/platform-web/member/memberMoney'
import { url } from '@/utils/url'
import { getToken } from '@/utils/auth'

export default {
  name: 'MemberMoney',
  components: {},
  data() {
    return {
      uploadFileUrl: url.platformWeb + '/member/memberInfo/batchInsertShops',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      fileList: null,
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
      // 派送彩金暂存表表格数据
      memberMoneyList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        money: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        money: [
          { required: true, message: '派送金额不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      this.$message.success('excel文件上传成功')
    },
    uploadFalse(response, file, fileList) {
      alert('文件上传失败！')
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const extension3 = file.name.split('.')[1] === 'doc'
      const extension4 = file.name.split('.')[1] === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2 && !extension3 && !extension4) {
        alert('上传模板只能是 xls、xlsx、doc、docx 格式!')
      }
      if (!isLt2M) {
        console.log('上传模板大小不能超过 10MB!')
      }
      return extension || extension2 || extension3 || (extension4 && isLt2M)
    },
    submitUpload() {
      if (this.businessType === '2') {
        this.$message.warning('此文件已上传成功,x掉再选取文件')
      }
      if (this.businessType === undefined) {
        this.$message.warning('选取后先等等再点击上传,还没导入成功')
      }
      if (this.businessType != null) {
        //触发组件的action
        this.$refs.upload.submit()
        this.businessType = '2'
      }
      if (this.businessType == null) {
        this.businessType = '1'
      }
    },
    handleRemove(file, fileList) {
      this.businessType = undefined
      this.$message.success('操作成功')
    },
    handlePreview(file) {
      if (file.response.status) {
        this.$message.success('此文件导入成功')
      } else {
        this.$message.error('此文件导入失败')
      }
    },
    /** 查询派送彩金暂存表列表 */
    getList() {
      this.loading = true
      listMemberMoney(this.queryParams).then(response => {
        this.memberMoneyList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    handleCheck() {
      this.queryParams.memberId = null
      this.queryParams.pageNum = 1
      this.getList()
    },
    starSend() {
      if (this.queryParams.moneydes === null) {
        this.$message.error('必须选择入款类型')
      } else {
        starSend(this.queryParams.moneydes).then(response => {
          if (response.code === 0) {
            this.$message.success('操作成功')
          } else {
            this.$message.error('操作失败,请重新派送')
          }
        })
      }
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        memberId: null,
        money: null
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
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.memberId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加派送彩金暂存表'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const memberId = row.memberId || this.ids
      getMemberMoney(memberId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改派送彩金暂存表'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.memberId != null) {
            updateMemberMoney(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addMemberMoney(this.form).then(response => {
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
      const memberIds = row.memberId || this.ids
      this.$confirm('是否确认删除派送彩金暂存表编号为"' + memberIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delMemberMoney(memberIds)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMemberMoney(queryParams)
      }).then(response => {
        this.downloadExcel(response, '派送彩金暂存表')
      }).catch(() => {
      })
    }
  }
}
</script>
