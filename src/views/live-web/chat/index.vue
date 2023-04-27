<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item prop="fromPlatform">
        <el-input
          v-model="queryParams.fromPlatform"
          :placeholder="$t('liveWeb.chat.queryForm.fromPlatformPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
          style="width: 150px;"
        />
      </el-form-item>
      <el-form-item prop="userNickName">
        <el-input
          v-model="queryParams.userNickName"
          :placeholder="$t('liveWeb.chat.queryForm.userNicknamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
          style="width: 150px;"
        />
      </el-form-item>
      <el-form-item prop="poscatId">
        <el-input
          v-model="queryParams.poscatId"
          :placeholder="$t('liveWeb.chat.queryForm.poscatIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
          style="width: 150px;"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.chat.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.chat.queryForm.resetButton')}}</el-button>
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
        >{{$t('liveWeb.chat.actions.viewBlackListButton')}}
        </el-button>
      </el-col>
      <el-col :span="10" style="margin-left: 10px">
        <span style="font-size: 16px;margin-right: 10px">{{$t('liveWeb.chat.refresh.title')}}</span>
        <el-select v-model="refreshSec" :placeholder="$t('liveWeb.chat.refresh.placeholder')" style="width: 110px">
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
      <el-table-column :label="$t('liveWeb.chat.table.fromPlatform')" min-width="130" align="center" prop="fromPlatform"/>
      <el-table-column :label="$t('liveWeb.chat.table.userNickName')" :show-overflow-tooltip="true" width="120" align="center" prop="userNickName"/>
      <el-table-column :label="$t('liveWeb.chat.table.type')" width="90" align="center" prop="type" :formatter="typeFormat"/>
      <el-table-column :label="$t('liveWeb.chat.table.msg')" :show-overflow-tooltip="true" min-width="350" align="center" prop="msg"/>
      <el-table-column :label="$t('liveWeb.chat.table.postcatId')" min-width="120" align="center" prop="poscatId"/>
      <el-table-column :label="$t('liveWeb.chat.table.poscatNickName')" :show-overflow-tooltip="true" width="120" align="center" prop="poscatNickName"/>
      <el-table-column :label="$t('liveWeb.chat.table.noSpeaking')" width="80" align="center" prop="noSpeaking">
        <template slot-scope="scope">
          <span v-if="scope.row.noSpeaking" style="color: #FF5722">
            {{$t('liveWeb.chat.table.noSpeakingTrue')}}
          </span>
          <span v-else style="color: #5FB878">
            {{$t('liveWeb.chat.table.noSpeakingFalse')}}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.chat.table.forbid')" width="80" align="center" prop="forbid">
        <template slot-scope="scope">
          <span v-if="scope.row.forbid" style="color: #FF5722">
            {{$t('liveWeb.chat.table.forbidTrue')}}
          </span>
          <span v-else style="color: #5FB878">
            {{$t('liveWeb.chat.table.forbidFalse')}}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.chat.table.userIp')" width="160" align="center" prop="userIp"/>
      <el-table-column :label="$t('liveWeb.chat.table.createTimes')" width="160" align="center" prop="createTimes"/>
      <el-table-column :label="$t('liveWeb.chat.table.operation')" width="145" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-show="!scope.row.noSpeaking"
            size="small"
            type="danger"
            @click="handleUpdateStop(scope.row)"
            v-if="scope.row.type == '0' || scope.row.type == '1'"
            v-hasPermi="['admin:liveVideoChat:edit']"
          >{{$t('liveWeb.chat.table.muteButton')}}
          </el-button>
          <el-button
            v-show="scope.row.noSpeaking"
            size="small"
            type="success"
            @click="handleUpdate(scope.row)"
            v-if="scope.row.type == '0' || scope.row.type == '1'"
            v-hasPermi="['admin:liveVideoChat:edit']"
            style="margin-left: 0px"
          >{{$t('liveWeb.chat.table.unmuteButton')}}
          </el-button>
          <el-button
            size="small"
            type="warning"
            @click="handleForbid(scope.row)"
            v-if="scope.row.type == '0' || scope.row.type == '1'"
            v-hasPermi="['admin:liveVideoChat:edit']"
          >{{$t('liveWeb.chat.table.forbidButton')}}
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

        <el-form-item :label="$t('liveWeb.chat.suspendUserDialog.fromPlatformLabel')" prop="fromPlatform">
          <el-input v-model="form.fromPlatform" :placeholder="$t('liveWeb.chat.suspendUserDialog.fromPlatformPlaceholder')" readonly disabled/>
        </el-form-item>

        <el-form-item :label="$t('liveWeb.chat.suspendUserDialog.userNickNameLabel')" prop="userNickName">
          <el-input v-model="form.userNickName" :placeholder="$t('liveWeb.chat.suspendUserDialog.userNickNamePlaceholder')" readonly disabled/>
        </el-form-item>

        <el-form-item :label="$t('liveWeb.chat.suspendUserDialog.msgLabel')" prop="msg">
          <el-input v-model="form.msg" readonly disabled/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.chat.suspendUserDialog.userIpLabel')" prop="userIp">
          <el-input v-model="form.userIp" readonly disabled/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="suspendUser('',true,1,form.userIp,form.msg)">{{$t('liveWeb.chat.suspendUserDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.chat.suspendUserDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>

    <!-- 禁言备注弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="$t('liveWeb.chat.banRemarksDialog.title')"
      :visible.sync="muteRemarkSpeak"
      width="400px"
      append-to-body
    >
      <el-input v-model="fromPlatform" v-show="false"/>
      <el-input v-model="poscatId" v-show="false"/>
      <el-select
        v-model="remark"
        :placeholder="$t('liveWeb.chat.banRemarksDialog.remarkPlaceholder')"
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
      <el-input v-model="remarked" :placeholder="$t('liveWeb.chat.banRemarksDialog.remarkedPlaceholder')" v-if="this.remark == '其他'"/>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMuteRemarkSpeak">{{ $t('liveWeb.chat.banRemarksDialog.submitButton') }}</el-button>
      </div>
    </el-dialog>

    <!--查看封停ip-->
    <el-dialog :title="$t('liveWeb.chat.viewBlackListDialog.title1')" :visible.sync="speakIpBlackListList" width="1200px" append-to-body>
      <el-form :model="queryParam" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item :label="$t('liveWeb.chat.viewBlackListDialog.queryForm.userIdLabel')" prop="userId">
          <el-input
            v-model="queryParam.userId"
            :placeholder="$t('liveWeb.chat.viewBlackListDialog.queryForm.userIdPlaceholder')"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.chat.viewBlackListDialog.queryForm.userIpLabel')" prop="userIp">
          <el-input
            v-model="queryParam.userIp"
            :placeholder="$t('liveWeb.chat.viewBlackListDialog.queryForm.userIpPlaceholder')"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryIpBlack">{{$t('liveWeb.chat.viewBlackListDialog.queryForm.searchButton')}}</el-button>
        </el-form-item>
      </el-form>

      <el-table :stripe="true" v-loading="loading" :data="speakIpBlackData">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column :label="$t('liveWeb.chat.viewBlackListDialog.table.userId')" align="center" prop="userId" width="130"/>
        <el-table-column :label="$t('liveWeb.chat.viewBlackListDialog.table.userIp')" show-overflow-tooltip align="center" prop="userIp" width="150"/>
        <el-table-column :label="$t('liveWeb.chat.viewBlackListDialog.table.msg')" show-overflow-tooltip align="center" prop="msg"/>
        <el-table-column :label="$t('liveWeb.chat.viewBlackListDialog.table.createTime')" align="center" prop="createTime" width="160"/>
        <el-table-column :label="$t('liveWeb.chat.viewBlackListDialog.table.operation')" width="80" align="center" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdateIpBlack(scope.row)"
            >{{$t('liveWeb.chat.viewBlackListDialog.table.unblockButton')}}
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
      refreshLabel: this.$t('liveWeb.chat.refresh.startButton'),
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
          { required: true, message: this.$t('liveWeb.chat.suspendUserDialog.validation.postcatIdError'), trigger: 'blur' }
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
    this.refreshLabel = this.$t('liveWeb.chat.refresh.startButton')
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
      this.title = this.$t('liveWeb.chat.viewBlackListDialog.title2')
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
      if(this.queryParams.fromPlatform){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.fromPlatform.match(reg)
        if(!flag){
          this.msgError(this.$t('liveWeb.chat.messageBox.fromPlatformError'))
          return
        }
      }
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
      this.title = this.$t('liveWeb.chat.suspendUserDialog.titleAdd')
    },
    /** 修改按钮操作 */
    handleUpdateStop(row) {
      const id = row.id || this.ids
      getLiveVideoChat(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = this.$t('liveWeb.chat.suspendUserDialog.titleUpdate')
      })
    },
    handleUpdate(row) {
      var that = this

      this.$confirm(this.$t('liveWeb.chat.updateConfirmationDialog.message', { fromPlatform: row.fromPlatform }), this.$t('liveWeb.chat.updateConfirmationDialog.title'), {
        confirmButtonText: this.$t('liveWeb.chat.updateConfirmationDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.chat.updateConfirmationDialog.cancelButton'),
        type: 'warning'
      }).then(function() {
        return that.suspendUser(row.fromPlatform, false, 0, row.userIp, row.msg)
      }).then(() => {
        that.msgSuccess(this.$t('liveWeb.chat.messageBox.unblockSuccess'))
        this.getList()
      })
    },
    /** 修改按钮操作 */
    handleUpdateIpBlack(row) {
      var that = this

      this.$confirm(this.$t('liveWeb.chat.viewBlackListDialog.updateConfirmationDialog.message', { userId: row.userId }), this.$t('liveWeb.chat.viewBlackListDialog.updateConfirmationDialog.title'), {
        confirmButtonText: this.$t('liveWeb.chat.viewBlackListDialog.updateConfirmationDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.chat.viewBlackListDialog.updateConfirmationDialog.cancelButton'),
        type: 'warning'
      }).then(function() {
        var data = {}
        data.userIp = row.userIp
        data.userId = row.userId
        return updateSpeakIpBlackList(data)
      }).then(() => {
        that.msgSuccess(this.$t('liveWeb.chat.viewBlackListDialog.messageBox.unblockSuccess'))
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
      this.msgSuccess(this.$t('liveWeb.chat.banRemarksDialog.messageBox.forbidSuccess'))
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
        this.msgSuccess(this.$t('liveWeb.chat.suspendUserDialog.messageBox.suspendSuccess'))
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
    typeFormat(row, column) {
      if (row.type == '0') {
        return this.$t('liveWeb.chat.table.type0')
      } else if (row.type == '1'){
        return this.$t('liveWeb.chat.table.type1')
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
        this.refreshLabel = this.$t('liveWeb.chat.refresh.stopButton')
        this.refreshDesc = ''

        this.stopRefresh()
        this.getList()
        this.startRefresh()
      } else {
        this.refreshType = 'primary'
        this.refreshIcon = 'el-icon-refresh'
        this.refreshLabel = this.$t('liveWeb.chat.refresh.startButton')
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
        thet.refreshDesc = this.$t('liveWeb.chat.refresh.description', { secs: secs })
        secs--
      }, 1000)
    },
    stopRefresh() {
      clearInterval(window.refreshInterval)
    }
  }
}
</script>
