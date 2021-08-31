<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item prop="fromPlatform">
        <el-input
          v-model="queryParams.fromPlatform"
          placeholder="会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
          style="width: 150px;"
        />
      </el-form-item>
      <el-form-item prop="userNickName">
        <el-input
          v-model="queryParams.userNickName"
          placeholder="会员昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
          style="width: 150px;"
        />
      </el-form-item>
      <el-form-item prop="poscatId">
        <el-input
          v-model="queryParams.poscatId"
          placeholder="主播ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
          style="width: 150px;"
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="openIpBlackList()"
        >查看封停ip
        </el-button>
      </el-col>
      <el-col :span="10" style="margin-left: 10px">
        <span style="font-size: 16px;margin-right: 10px">记录刷新</span>
        <el-select v-model="refreshSec" placeholder="时间间隔" style="width: 110px">
          <el-option value="5" label="5秒"></el-option>
          <el-option value="10" label="10秒"></el-option>
          <el-option value="15" label="15秒"></el-option>
          <el-option value="20" label="20秒"></el-option>
          <el-option value="30" label="30秒"></el-option>
        </el-select>
        <div style="width: 120px;display: inline-block;text-align: center">
          <span>{{ refreshDesc }}</span>
        </div>
        <el-button :type="refreshType" :icon="refreshIcon" size="mini" @click="refreshData">{{
            refreshLabel
          }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveVideoChatList">
      <el-table-column label="平台会员ID" min-width="130" align="center" prop="fromPlatform"/>
      <el-table-column label="用户昵称" :show-overflow-tooltip="true" width="120" align="center" prop="userNickName"/>
      <el-table-column label="消息类型" width="80" align="center" prop="type" :formatter="msgFormat"/>
      <el-table-column label="消息内容" :show-overflow-tooltip="true" min-width="350" align="center" prop="msg"/>
      <!--      <el-table-column label="会员ID" align="center" prop="id" />-->
      <el-table-column label="主播ID" min-width="120" align="center" prop="poscatId"/>
      <!--      <el-table-column label="消息所在聊天组" align="center" prop="group" />-->
      <!--      <el-table-column label="发送者id" align="center" prop="userId" />-->

      <el-table-column label="主播昵称" :show-overflow-tooltip="true" width="120" align="center" prop="poscatNickName"/>
      <el-table-column label="是否封停" width="80" align="center" prop="noSpeaking">
        <template slot-scope="scope">
          <span v-if="scope.row.noSpeaking" style="color: #FF5722">
            已封停
          </span>
          <span v-else style="color: #5FB878">
            正常
          </span>
        </template>
      </el-table-column>
      <el-table-column label="是否禁言" width="80" align="center" prop="forbid">
        <template slot-scope="scope">
          <span v-if="scope.row.forbid" style="color: #FF5722">
            禁言
          </span>
          <span v-else style="color: #5FB878">
            正常
          </span>
        </template>
      </el-table-column>
      <el-table-column label="发言ip" width="160" align="center" prop="userIp"/>
      <el-table-column label="发送时间" width="160" align="center" prop="createTimes"/>
      <el-table-column label="操作" width="145" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-show="!scope.row.noSpeaking"
            size="small"
            type="danger"
            @click="handleUpdateStop(scope.row)"
            v-if="scope.row.type == '0' || scope.row.type == '1'"
            v-hasPermi="['admin:liveVideoChat:edit']"
          >封停
          </el-button>
          <el-button
            v-show="scope.row.noSpeaking"
            size="small"
            type="success"
            @click="handleUpdate(scope.row)"
            v-if="scope.row.type == '0' || scope.row.type == '1'"
            v-hasPermi="['admin:liveVideoChat:edit']"
            style="margin-left: 0px"
          >解封
          </el-button>
          <el-button
            size="small"
            type="warning"
            @click="handleForbid(scope.row)"
            v-if="scope.row.type == '0' || scope.row.type == '1'"
            v-hasPermi="['admin:liveVideoChat:edit']"
          >禁言
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

    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">

        <el-form-item label="平台会员ID" prop="fromPlatform">
          <el-input v-model="form.fromPlatform" placeholder="请输入平台会员ID" readonly disabled/>
        </el-form-item>

        <el-form-item label="发送者昵称" prop="userNickName">
          <el-input v-model="form.userNickName" placeholder="请输入发送者昵称" readonly disabled/>
        </el-form-item>

        <el-form-item label="消息内容" prop="msg">
          <el-input v-model="form.msg" readonly disabled/>
        </el-form-item>
        <el-form-item label="封停ip" prop="userIp">
          <el-input v-model="form.userIp" readonly disabled/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="suspendUser('',true,1,form.userIp,form.msg)">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 禁言备注弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="备注禁言原因"
      :visible.sync="muteRemarkSpeak"
      width="400px"
      append-to-body
    >
      <el-input v-model="fromPlatform" v-show="false"/>
      <el-input v-model="poscatId" v-show="false"/>
      <el-select
        v-model="remark"
        placeholder="请选择禁言原因"
        clearable
        style="min-width: 360px"
      >
        <el-option
          v-for="dict in muteRemarkOptions"
          :key="dict.dictValue"
          :label="dict.dictLabel"
          :value="dict.dictValue"
        />
      </el-select>
      <el-input v-model="remarked" placeholder="请输入禁言原因" v-if="this.remark == '其他'"/>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMuteRemarkSpeak">立即提交</el-button>
      </div>
    </el-dialog>

    <!--查看封停ip-->
    <el-dialog title="查看封停ip" :visible.sync="speakIpBlackListList" width="1200px" append-to-body>
      <el-form :model="queryParam" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="会员id" prop="userId">
          <el-input
            v-model="queryParam.userId"
            placeholder="会员id"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="会员ip" prop="userIp">
          <el-input
            v-model="queryParam.userIp"
            placeholder="会员ip"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryIpBlack">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-table :stripe="true" v-loading="loading" :data="speakIpBlackData">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column label="会员ID" align="center" prop="userId" width="130"/>
        <el-table-column label="封停ip" show-overflow-tooltip align="center" prop="userIp" width="150"/>
        <el-table-column label="封停备注" show-overflow-tooltip align="center" prop="msg"/>
        <el-table-column label="封停时间" align="center" prop="createTime" width="160"/>
        <el-table-column label="操作" width="80" align="center" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdateIpBlack(scope.row)"
            >解封
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page-sizes="[10,20,100]"
        :page.sync="queryParam.pageNum"
        :limit.sync="queryParam.pageSize"
        @pagination="openIpBlackList"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  Forbid,
  suspendUser,
  listLiveVideoChat,
  getLiveVideoChat,
  delLiveVideoChat,
  addLiveVideoChat,
  updateLiveVideoChat,
  exportLiveVideoChat
} from '@/api/live-web/chat/liveVideoChat'
import request from '@/utils/request'
import { url } from '@/utils/url'
import { listSpeakIpBlackList, updateSpeakIpBlackList } from '@/api/live-web/chat/speakIpBlackList'

export default {
  name: 'LiveVideoChat',
  components: {},
  data() {
    return {
      //是否封停
      noSpeaking: null,
      refreshSec: '5',
      refreshType: 'primary',
      refreshIcon: 'el-icon-refresh',
      refreshLabel: '开始刷新',
      refreshDesc: '',
      // 遮罩层
      loading: true,
      //禁言备注弹框
      muteRemarkSpeak: false,
      muteRemarkOptions: [],
      fromPlatform: '',
      poscatId: '',
      remark: '',
      remarked: '',
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
      speakIpBlackListList: false,
      // 会员发言表格数据
      liveVideoChatList: [],
      speakIpBlackData: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        poscatId: null,
        group: null,
        userId: null,
        msg: null,
        type: null,
        poscatNickName: null,
        userNickName: null,
        fromPlatform: null,
        orderByColumn: 'create_time',
        isAsc: 'desc'
      },
      queryParam: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'create_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        poscatId: [
          { required: true, message: '主播ID不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('muteRemarkOptions').then(response => {
      this.muteRemarkOptions = response.data
    })
  },
  activated() {
    this.refreshType = 'primary'
    this.refreshIcon = 'el-icon-refresh'
    this.refreshLabel = '开始刷新'
    this.refreshDesc = ''

    this.stopRefresh()
  },
  methods: {
    /** 查询会员发言列表 */
    getList() {
      this.loading = true
      listLiveVideoChat(this.queryParams).then(response => {
        this.liveVideoChatList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    openIpBlackList() {
      this.speakIpBlackListList = true
      this.title = '查看已封停的ip'
      listSpeakIpBlackList(this.queryParam).then(response => {
        this.speakIpBlackData = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    searchIpBlackList() {
      listSpeakIpBlackList(this.queryParam).then(response => {
        this.speakIpBlackData = response.rows
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
        poscatId: null,
        group: null,
        userId: null,
        msg: null,
        createTime: null,
        type: null,
        poscatNickName: null,
        userNickName: null,
        fromPlatform: null
      }
      this.queryParam = {
        userId: null,
        userIp: null
      }
      this.resetForm('form')
      this.resetForm('queryParam')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    handleQueryIpBlack() {
      this.queryParam.pageNum = 1
      this.searchIpBlackList()
    },
    /** 重置按钮操作 */
    resetQuery() {
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
      this.title = '添加会员发言'
    },
    /** 修改按钮操作 */
    handleUpdateStop(row) {
      const id = row.id || this.ids
      getLiveVideoChat(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '封停用户'
      })
    },
    handleUpdate(row) {
      var that = this
      this.$confirm('确定要' + row.fromPlatform + '解封吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return that.suspendUser(row.fromPlatform, false, 0, row.userIp, row.msg)
      }).then(() => {
        that.msgSuccess('解封成功')
        this.getList()
      })
    },
    /** 修改按钮操作 */
    handleUpdateIpBlack(row) {
      var that = this
      this.$confirm('确定要' + row.userId + '解封吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        var data = {}
        data.userIp = row.userIp
        data.userId = row.userId
        return updateSpeakIpBlackList(data)
      }).then(() => {
        that.msgSuccess('解封成功')
        this.openIpBlackList()
        that.getList()
      })

    },
    // handleForbid(row) {
    //   var that = this
    //   this.$confirm('确定要' + row.fromPlatform + '禁言吗?', '警告', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(function() {
    //     return that.Forbid(row.fromPlatform, row.poscatId)
    //   }).then(() => {
    //     that.msgSuccess('禁言成功')
    //   })
    // },
    //打开备注禁言弹框
    handleForbid(row) {
      this.remark = null
      this.remarked = null
      this.fromPlatform = row.fromPlatform
      this.poscatId = row.poscatId
      this.muteRemarkSpeak = true
    },
    //禁言备注提交
    submitMuteRemarkSpeak() {
      if (this.remarked != null) {
        this.remark = this.remarked
      }
      this.Forbid(this.fromPlatform, this.poscatId, this.remark)
    },
    Forbid(pUserId, videoId, remark) {
      var data = {}
      data.pUserId = pUserId
      data.videoId = videoId
      data.remark = remark
      request({
        url: url.platformWeb + '/admin/liveVideoChat/forbidSendMsg',
        method: 'post',
        data: data
      })
      this.msgSuccess('禁言成功')
      this.muteRemarkSpeak = false
      this.getList()
    },
    suspendUser(pUserId, falg, num, userIp, msg) {
      var data = {}
      if (num == 1) {
        data.pUserId = this.form.fromPlatform
      } else {
        data.pUserId = pUserId
      }
      data.flag = falg
      data.num = num
      data.userIp = userIp
      data.msg = msg
      request({
        url: url.platformWeb + '/admin/liveVideoChat/suspendUser',
        method: 'post',
        data: data
      })
      if (falg == 1) {
        this.msgSuccess('封停成功')
      }
      this.open = false
      this.getList()
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveVideoChat(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addLiveVideoChat(this.form).then(response => {
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
      this.$confirm('是否确认删除会员发言编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delLiveVideoChat(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    msgFormat(row, column) {
      if (row.type == '0') {
        return '普通消息'
      } else if (row.type == '1'){
        return '弹幕消息'
      } else if (row.type == '2'){
        return '主播单聊'
      }
    },
    speakFormat(row, column) {
      if (row.noSpeaking === true) {
        return '已封停'
      } else {
        return '正常'
      }
    },
    forbidFormat(row, column) {
      if (row.forbid === true) {
        return '禁言'
      } else {
        return '正常'
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有会员发言数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportLiveVideoChat(queryParams)
      }).then(response => {
        (response.msg)
      })
    },
    refreshData() {
      if (this.refreshType === 'primary') {
        this.refreshType = 'danger'
        this.refreshIcon = 'el-icon-circle-close'
        this.refreshLabel = '停止刷新'
        this.refreshDesc = ''

        this.stopRefresh()
        this.getList()
        this.startRefresh()
      } else {
        this.refreshType = 'primary'
        this.refreshIcon = 'el-icon-refresh'
        this.refreshLabel = '开始刷新'
        this.refreshDesc = ''

        this.stopRefresh()
      }
    },
    startRefresh() {
      const thet = this
      let secs = thet.refreshSec
      window.refreshInterval = setInterval(function() {
        if (secs === 0) {
          thet.getList()
          secs = thet.refreshSec
        }
        thet.refreshDesc = secs + '秒后开始刷新'
        secs--
      }, 1000)
    },
    stopRefresh() {
      clearInterval(window.refreshInterval)
    }
  }
}
</script>
