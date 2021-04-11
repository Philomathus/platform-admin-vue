<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="注册日期" prop="selectDate">
        <el-date-picker type="daterange" v-model="selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" :style="{width: '240px'}" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="至" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="id" style="width: 150px">
        <el-input
          v-model="queryParams.id"
          placeholder="主播ID"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="nickName" style="width: 150px">
        <el-input
          v-model="queryParams.nickName"
          placeholder="主播昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="mobile" style="width: 150px">
        <el-input
          v-model="queryParams.mobile"
          placeholder="手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="isAuthentication" style="width: 150px">
        <el-select v-model="queryParams.isAuthentication" placeholder="全部状态" clearable>
          <el-option label="未认证" value="0"></el-option>
          <el-option label="待审核" value="1"></el-option>
          <el-option label="已认证" value="2"></el-option>
          <el-option label="审核不通过" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="mobile" style="width: 150px">
        <el-input
          v-model="queryParams.familyId"
          placeholder="家族ID"
          clearable
          size="small"
          type="number"
          class="no-number"
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
          v-hasPermi="['admin:liveUser:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveUserList">
      <el-table-column label="主播ID" min-width="120" align="center" prop="id"/>
      <el-table-column label="主播昵称" min-width="140" :show-overflow-tooltip="true" align="center" prop="nickName"/>
      <el-table-column label="所属家族" min-width="120" align="center" prop="familyName">
        <template slot-scope="scope">
          <span v-if="scope.row.familyId === 0">未加入家族</span>
          <el-popover
            v-else
            placement="top"
            :title="scope.row.familyName"
            width="200"
            trigger="click"
          >
            <table>
              <tr>
                <td style="text-align: right">家 族 ID：</td>
                <td style="text-align: left">{{ scope.row.familyId }}</td>
              </tr>
              <tr>
                <td style="text-align: right">家 族 长 ID：</td>
                <td style="text-align: left">{{ scope.row.familyUserId }}</td>
              </tr>
              <tr>
                <td style="text-align: right">家族长昵称：</td>
                <td style="text-align: left">{{ scope.row.familyNickName }}</td>
              </tr>
            </table>
            <a slot="reference" style="color: #00afff">{{ scope.row.familyName }}</a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="认证状态" min-width="120" align="center" prop="isAuthentication">
        <template slot-scope="scope">
          <span v-if="scope.row.isAuthentication === 0" style="color: #C0C0C0">未认证</span>
          <span v-if="scope.row.isAuthentication === 1" style="color: #0000FF">待审核</span>
          <span v-if="scope.row.isAuthentication === 2" style="color: #5FB878">已认证</span>
          <span v-if="scope.row.isAuthentication === 3" style="color: #FF5722">审核不通过</span>
        </template>
      </el-table-column>
      <el-table-column label="印票" min-width="120" align="center" prop="ticket"/>
      <el-table-column label="时薪" min-width="120" align="center" prop="coin"/>
      <el-table-column label="时薪任务" min-width="120" align="center" prop="weixinPrice"/>
      <el-table-column label="礼物任务" min-width="120" align="center" prop="weiboMoney"/>
      <el-table-column label="彩票抽成" min-width="120" align="center" prop="xpoint"/>
      <el-table-column label="礼物抽成" min-width="120" align="center" prop="ypoint"/>
      <el-table-column label="是否禁播" min-width="120" align="center" prop="isBan">
        <template v-slot="{row}">
          <el-switch
            :active-value="0"
            :inactive-value="1"
            active-color="#5B7BFA"
            inactive-color="#dadde5"
            v-model="row.isBan"
            @change=displayCheck(row)
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="100" align="center" prop="mobile"/>
      <el-table-column label="登陆IP" min-width="150" :show-overflow-tooltip="true" align="left" prop="loginIp"/>
      <el-table-column label="禁播原因" min-width="150" align="center" prop="banRemark"/>
      <el-table-column label="操作" min-width="180" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            plain
            type="primary"
            icon="el-icon-s-check"
            @click="handleAuth(scope.row)"
            v-hasPermi="['admin:liveUser:edit']"
            v-show="scope.row.isAuthentication === 1"
          >审核
          </el-button>
          <el-button
            size="small"
            plain
            type="success"
            icon="el-icon-menu"
            @click="handleMore(scope.row)"
          >更多
            <!-- v-hasPermi="['admin:memberInfo:remove']"-->
          </el-button>
        </template>

      </el-table-column>

<!--      <el-table-column label="可用印票" min-width="120" align="center" prop="ticket"/>

      <el-table-column label="粉丝" min-width="120" align="center" prop="fansCount"/>
      <el-table-column label="注册时间" min-width="160" :show-overflow-tooltip="true" align="center" prop="createTime"/>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改主播信息对话框 -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="真实姓名" prop="authenticationName">
          <el-input v-model="form.authenticationName" readonly/>
        </el-form-item>
        <el-form-item label="手机号" prop="contact">
          <el-input v-model="form.mobile" readonly/>
        </el-form-item>
        <el-form-item label="身份证号码" prop="identifyNumber">
          <el-input v-model="form.identifyNumber" readonly/>
        </el-form-item>
        <el-form-item label="时薪" prop="coin">
          <el-input v-model="form.coin" type="number"/>
        </el-form-item>
        <el-form-item label="开播时长任务" prop="weixinPrice">
          <el-input v-model="form.weixinPrice" type="number"/>
        </el-form-item>
        <el-form-item label="收礼礼物" prop="weiboMoney">
          <el-input v-model="form.weiboMoney" type="number"/>
        </el-form-item>
        <el-form-item label="彩票抽成" prop="xpoint">
          <el-input v-model="form.xpoint" type="number"/>
        </el-form-item>
        <el-form-item label="礼物抽成" prop="ypoint">
          <el-input v-model="form.ypoint" type="number"/>
        </el-form-item>
        <el-form-item label="手持身份证照片">
          <img :src="form.identifyHoldImage" style="width: 300px;height: 300px"/>
        </el-form-item>
        <el-form-item label="身份证正面">
          <img :src="form.identifyPositiveImage" style="width: 300px;height: 300px"/>
        </el-form-item>
        <el-form-item label="身份证反面">
          <img :src="form.identifyNagativeImage" style="width: 300px;height: 300px"/>
        </el-form-item>
        <el-form-item label="类型" prop="isAuthentication">
          <el-radio-group v-model="form.isAuthentication">
            <el-radio
              v-for="dict in attestList"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="认证说明" prop="vExplain" v-if="form.isAuthentication === 2">
          <el-input v-model="form.vExplain"/>
        </el-form-item>
        <el-form-item label="拒绝理由" prop="investorSendInfo" v-if="form.isAuthentication === 3">
          <el-input v-model="form.investorSendInfo"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="form.isAuthentication > 1">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <more ref="more" :user-id="userId" @liveUserMore="handleQuery"></more>
  </div>
</template>

<script>
import {
  listLiveUser,
  getLiveUser,
  delLiveUser,
  addLiveUser,
  updateLiveUser,
  exportLiveUser,
  banDetail,
  getFamiily
} from '@/api/live-web/liveUser'
import ImageUpload from '@/components/ImageUpload/index'
import more from './more'
import { pickerDateShortcuts } from '@/utils/dateUtils'
import { addH5Plugin, updateH5Plugin } from '@/api/live-web/h5/h5Plugin'

export default {
  name: 'LiveUser',
  components: {
    ImageUpload,
    more: more
  },
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateShortcuts },
      // 0指未认证  1指待审核 2指认证 3指审核不通过
      attestList: [{ label: '待审核', value: 1 }, { label: '认证', value: 2 }, { label: '审核不通过', value: 3 }],
      //所选的用户id
      userId: 0,
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
      // 主播信息表格数据
      liveUserList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      selectDate: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        id: null,
        nickName: null,
        isAuthentication: null,
        mobile: null,
        familyId: null,
        orderByColumn: 'u.create_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        vExplain: [
          { required: true, message: '认证说明不能为空', trigger: 'blur' }
        ],
        investorSendInfo: [
          { required: true, message: '拒绝理由不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  activated() {
    this.init()
  },
  watch: {
    selectDate: function(newVal, oldVal) {
      if (newVal === null) {
        this.queryParams.sendStartTime = undefined
        this.queryParams.sendEndTime = undefined
      } else {
        this.queryParams.sendStartTime = this.selectDate[0] + ' 00:00:00'
        this.queryParams.sendEndTime = this.selectDate[1] + ' 23:59:59'
      }
    }
  },
  methods: {
    init() {
      const familyId = this.$route.query.familyId
      if (familyId && familyId >= 0) {
        this.queryParams.familyId = familyId
      } else {
        this.queryParams.familyId = null
      }
      this.getList()
    },
    //修改禁播状态
    displayCheck(row) {
      if (row.isBan) {
        this.opens('主播禁播备注', row, row.isBan)
      } else {
        this.banDetail(row, row.isBan)
      }
    },
    opens(hint, row, type) {
      var that = this
      this.$prompt(hint, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        /*inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '验证码格式不正确'*/
      }).then(({ value }) => {
        that.banDetail(row, type, value)
      }).catch(() => {
        row.isBan = row.isBan === 0 ? 1 : 0
      })

    },
    banDetail(row, type, value) {
      banDetail({
        id: row.id,
        isBan: type,
        banRemark: value
      }).then((res) => {
        this.$notify.success(res.msg)
        row.isBan = type
        this.getList()
      }).catch(() => {
        this.$notify.error('修改禁播状态失败')
      })
    },
    /** 查询主播信息列表 */
    getList() {
      this.loading = true
      listLiveUser(this.queryParams).then(response => {
        this.liveUserList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 更多按钮操作 */
    handleMore(row) {
      this.userId = row.id
      this.$refs.more.show(this.userId)
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
        authenticationName: null,
        isAuthentication: null,
        mobile: null,
        identifyHoldImage: null,
        identifyPositiveImage: null,
        identifyNagativeImage: null,
        investorSendInfo: null,
        vExplain: null,
        identifyNumber: null,
        coin: null,
        xpoint: null,
        ypoint: null
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加主播信息'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getLiveUser(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改主播信息'
      })
    },
    /** 提交按钮 */
    submitForm() {
      const that = this
      that.$refs['form'].validate(valid => {
        if (valid) {
          that.$confirm('是否确认' + (that.form.isAuthentication === 3 ? '不' : '') + '通过审核此主播?',
            '警告',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(function() {
            return updateLiveUser(that.form)
          }).then(response => {
            if (response.code === 200) {
              that.msgSuccess('审核成功')
            } else if (response.code === 500) {
              that.msgError(response.msg)
            }
            this.open = false
            that.getList()
          }).catch(function() {
          })
        }
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportLiveUser(queryParams)
      }).then(response => {
        this.downloadExcel(response, '主播列表')
      }).catch(() => {
      })
    },
    handleAuth(row) {
      this.reset()
      getLiveUser(row.id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改主播信息'
      })
    }
  }
}
</script>
