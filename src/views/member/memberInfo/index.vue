<template>
  <div class="app-container">
    <div v-loading="totalLoading">
      <el-button type="primary" @click="copy1">{{ $t('members.memberInfo.index.button.numMem') }} {{ this.totalData.peopledTotal || 0 }}</el-button>
      <el-button type="success" @click="copy2">{{ $t('members.memberInfo.index.button.totBal') }} {{ this.totalData.totalMoney || 0 }}</el-button>
      <el-button type="warning" @click="copy3">{{ $t('members.memberInfo.index.button.totDep') }} {{
          this.totalData.safeBalanceTotalMoney || 0
        }}
      </el-button>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="listCount()" style="margin-left: 20px">
        {{ $t('members.memberInfo.index.button.statQ') }}
      </el-button>
    </div>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px">
      <el-form-item :label=" $t('members.memberInfo.index.button.statQ') " prop="searchValue">
        <el-input
          v-model.trim="queryParams.searchValue"
          :placeholder=" $t('members.memberInfo.index.memSearch') "
          clearable
          size="small"
          type="text"
          style="width: 400px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('global.selectDate') " prop="regTime">
        <el-date-picker type="datetimerange" v-model="dateRange" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '95%'}" :start-placeholder=" $t('global.datePickerStartDate') "
                        :end-placeholder=" $t('global.datePickerEndDate') "
                        :range-separator=" $t('global.selectDateRangeSeparator') " clearable :default-time="['00:00:00', '23:59:59']"
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="status" style="width: 110px;margin-left: -20px">
        <el-select v-model="queryParams.status" :placeholder=" $t('members.memberInfo.index.aState') " clearable size="small">
          <!--          <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value"/>-->
          <el-option
            v-for="(dict,i) in typeList"
            :key="i"
            :label="dict.dictLabel"
            :value="parseInt(dict.dictValue)"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="inviterCode" style="width: 110px;" id="inviterCode">
        <el-input
          v-model="queryParams.inviterCode"
          :placeholder=" $t('members.memberInfo.index.invCode') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="nickName" style="width: 110px;" class="nickName">
        <el-input
          v-model="queryParams.nickName"
          :placeholder=" $t('global.nickname') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="loginIp" style="width: 110px;" class="loginIp">
        <el-input
          v-model="queryParams.loginIp"
          :placeholder=" $t('members.memberInfo.index.lIp') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="bankAccount" style="width: 155px;" class="bankAccount">
        <el-input
          v-model="queryParams.bankAccount"
          :placeholder=" $t('members.memberInfo.index.bName') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="email" style="width: 110px;" class="email">
        <el-input
          v-model="queryParams.email"
          :placeholder=" $t('members.memberInfo.index.logRem') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="channelcode" style="width: 110px;" id="channelCode">
        <el-select v-model="queryParams.channelcode" :placeholder=" $t('members.memberInfo.index.aType') " clearable size="small">
          <el-option
            v-for="(dict,i) in statusOptions"
            :key="'A'+ i"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="version" style="width: 110px;" id="channelCode">
        <el-input
          v-model="queryParams.version"
          :placeholder=" $t('members.memberInfo.index.cvNum') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="loginDev" style="width: 110px;" id="channelCode">
        <el-select v-model="queryParams.loginDev" :placeholder=" $t('members.memberInfo.index.lDev') " clearable style="width: 110px">
          <el-option value="1" label="ios"></el-option>
          <el-option value="2" label="android"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="vipMin" style="width: 110px;" class="vipMin"><!--JAKEEE-->
        <el-input
          v-model="queryParams.vipMin"
          placeholder="min-vip"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>-</el-form-item>
      <el-form-item prop="vipMax" style="width: 110px;" class="vipMax">
        <el-input
          v-model="queryParams.vipMax"
          placeholder="max-vip"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('global.resetButton') }}</el-button>
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
          v-hasPermi="['member:memberInfo:add']"
        >{{ $t('global.newButton') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="openExport"
          v-hasPermi="['member:memberInfo:export']"
        >{{ $t('global.export') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="openIpBlackList()"
        >{{ $t('members.memberInfo.index.button.ip') }}
        </el-button>
      </el-col>


      <!--      adding new button ip click get pop up-->
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="memberListAccordingToIp()"
        >{{ $t('members.memberInfo.index.button.bBlock') }}
        </el-button>
      </el-col>

      <!--      end adding button -->

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberInfoList" @selection-change="handleSelectionChange">
      <el-table-column :label=" $t('members.memberInfo.index.memId') " align="center" prop="id" min-width="140px">
        <template v-slot="{row}">
          <el-button
            type="text text-info"
            size="mini"
            icon="el-icon-copy-document"
            @click="handleCopy(row.id)"
          />
          <a @click="personalReport(row.id)" style="color: #1ab394;margin-left: 5px">{{ row.id }}</a>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('global.userName') " align="center" prop="userName" min-width="120px"/>
      <el-table-column :label=" $t('global.nickname') " :show-overflow-tooltip="true" align="center" prop="nickName" min-width="160"/>
      <el-table-column :label=" $t('members.memberInfo.index.mVip') " align="center" prop="vip" min-width="100px"/>
      <el-table-column :label=" $t('members.memberInfo.index.points') " :show-overflow-tooltip="true" align="center" prop="totalAccount" min-width="120px"/>
      <el-table-column :label=" $t('members.memberInfo.index.sDeposit') " :show-overflow-tooltip="true" align="center" prop="boxAccount"
                       min-width="160px"/>
      <el-table-column :label=" $t('global.status') " align="center" min-width="110px">
        <template v-slot="{row}">
          <el-select v-model="row.status" :placeholder=" $t('global.status') " size="small"
                     @change="changeType(row)"
          >
            <!--<el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value"/>-->
            <el-option
              v-for="(dict,i) in typeList"
              :key="'B'+ i"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('members.memberInfo.index.regTime') " align="center" prop="regTime" width="160"/>
      <el-table-column :label=" $t('members.memberInfo.index.logTime') " align="center" prop="loginTime" width="160"/>
      <el-table-column :label=" $t('members.memberInfo.index.numLog') " align="center" prop="loginNum" min-width="130px"/>
      <el-table-column :label=" $t('members.memberInfo.index.logIp') " :show-overflow-tooltip="true" align="center" prop="loginIp" width="180"/>
      <el-table-column :label=" $t('members.memberInfo.index.regIp') " :show-overflow-tooltip="true" align="center" prop="registIp" width="180"/>
      <el-table-column :label=" $t('members.memberInfo.index.restArea') " :show-overflow-tooltip="true" align="center" prop="qq" width="180"/>

      <el-table-column :label=" $t('members.memberInfo.index.wRest') " align="center" prop="speak" width="165">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.speak"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column :label=" $t('members.memberInfo.index.ban') " align="center" prop="speak" width="160">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.speak"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('members.memberInfo.index.codeAcc') " align="center" prop="codeAccount" min-width="160px"/>

      <el-table-column :label=" $t('members.memberInfo.index.valBets') " align="center" prop="codeTotal" min-width="160px"/>
      <el-table-column :label=" $t('members.memberInfo.index.invCode') " align="center" prop="inviterCode" min-width="120px"/>
      <el-table-column :label=" $t('members.memberInfo.index.uType') " align="center" prop="channelcode" min-width="200px">
        <template slot-scope="scope">
          <span v-if="scope.row.channelcode == null"
                :style="{'color': '#5FB878'}">{{ $t('members.memberInfo.index.mem') }}{{ scope.row.version == null || scope.row.version == '' || scope.row.version == undefined ?  $t('members.memberInfo.index.none')  : scope.row.version }}|{{ scope.row.loginDev == 2 ? 'andriod' : scope.row.loginDev == 1 ? 'ios' :  $t('members.memberInfo.index.other')  }}</span>
          <span v-else :style="{color: (memberType = statusOptions[scope.row.channelcode > 0 ? 1 : 0]).color}">{{
              memberType.dictLabel
            }}|{{ scope.row.version == null || scope.row.version == '' || scope.row.version == undefined ? $t('members.memberInfo.index.none')  : scope.row.version }}|{{ scope.row.loginDev == 2 ? 'andriod' : scope.row.loginDev == 1 ? 'ios' : $t('members.memberInfo.index.other')  }}</span>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('members.memberInfo.index.loginMark')" align="center" prop="email" :show-overflow-tooltip="true" min-width="130px"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width" fixed="right" min-width="220">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            icon="el-icon-menu"
            size="small"
            @click="handleMore(scope.row)"
            v-hasPermi="['member:memberInfo:query']"
          >{{ $t('global.moreButton') }}
          </el-button>
          <el-button
            type="warning"
            plain
            size="small"
            @click="boxDish(scope.row)"
            v-hasPermi="['member:memberInfo:boxDish']"
          >{{ $t('members.memberInfo.index.button.sDepo') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="memberInfoList.length>=10">
      <pagination
        v-show="total>0"
        :total="total"
        :page-sizes="[20,50,100,200]"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <!-- 禁用备注弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title=" $t('members.memberInfo.index.nBan') "
      :visible.sync="muteRemark"
      width="400px"
      append-to-body
      :show-close="false"
      :close-on-press-escape="false"
    >
      <el-input v-model="id" v-show="false"/>
      <el-input v-model="status" v-show="false"/>
      <el-select
        v-model="remark"
        :placeholder=" $t('members.memberInfo.index.selDis') "
        clearable
        style="min-width: 360px"
      >
        <el-option
          v-for="(dict,i) in muteRemarkOptions"
          :key="'C'+ i"
          :label="dict.dictLabel"
          :value="dict.dictValue"
        />
      </el-select>
      <el-input v-model="remarked" :placeholder=" $t('members.memberInfo.index.entDis') " v-if="this.remark == $t('members.memberInfo.index.other') "/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUser()"> {{ $t('members.memberInfo.index.cnc') }} </el-button>
        <el-button type="primary" @click="submitMuteRemark">{{ $t('members.memberInfo.index.cnc') }}</el-button>
      </div>
    </el-dialog>

    <!-- 禁言备注弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title=" $t('members.memberInfo.index.remBan') "
      :visible.sync="muteRemarkSpeak"
      width="400px"
      append-to-body
      :show-close="false"
      :close-on-press-escape="false"
    >
      <el-input v-model="id" v-show="false"/>
      <el-input v-model="speak" v-show="false"/>
      <el-select
        v-model="remark"
        :placeholder=" $t('members.memberInfo.index.selBan') "
        clearable
        style="min-width: 360px"
      >
        <el-option
          v-for="(dict,i) in muteRemarkOptions"
          :key="'D'+ i"
          :label="dict.dictLabel"
          :value="dict.dictValue"
        />
      </el-select>
      <el-input v-model="remarked" :placeholder=" $t('members.memberInfo.index.resBan') " v-if="this.remark == $t('members.memberInfo.index.other')"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSpeak()">{{ $t('members.memberInfo.index.cnc') }}</el-button>
        <el-button type="primary" @click="submitMuteRemarkSpeak">{{ $t('members.memberInfo.index.submit') }}</el-button>
      </div>
    </el-dialog>


    <!-- 添加或修改用户信息对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label=" $t('members.memberInfo.index.cellNum') " style="margin-bottom: 0px">
          <el-input v-model="phone" :placeholder=" $t('members.memberInfo.index.entCell') " maxlength="11" minlength="11"
                    @blur="changetPhone(phone)"/>
        </el-form-item>
        <el-form-item :label=" $t('members.memberInfo.index.recom') ">
          <span style="color: #00afff">
           {{ $t('members.memberInfo.index.lastDig') }}
            </span>
        </el-form-item>
        <el-form-item :label=" $t('members.memberInfo.index.pass') " prop="password" style="margin-bottom: 0px">
          <el-input v-model="password" :placeholder=" $t('members.memberInfo.index.entPass') "/>
        </el-form-item>
        <el-form-item :label=" $t('global.promptTitle') ">
          <span style="color: #00afff">
          {{ $t('members.memberInfo.index.passDig') }}
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('members.memberInfo.index.button.det') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
    <more ref="more" @refMemeberData="getList()" :member-id="memberId" :member-code="memberCode"
          @memberMore="handleQuery"></more>

    <!--查看封停ip View blocked ip -->
    <el-dialog :close-on-click-modal="false" :title=" $t('members.memberInfo.index.button.ip') " :visible.sync="speakIpBlackListList"
               width="1200px" append-to-body>
      <el-form :model="queryParam" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item :label=" $t('members.memberInfo.index.memId') " prop="userId">
          <el-input
            v-model="queryParam.userId"
            :placeholder=" $t('members.memberInfo.index.memId') "
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item :label=" $t('members.memberInfo.index.memIp') " prop="userIp">
          <el-input
            v-model="queryParam.userIp"
            :placeholder=" $t('members.memberInfo.index.memIp') "
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryIpBlack"
                     :disabled='!queryParam.userIp && !queryParam.userId'> {{ $t('global.searchButton') }}
          </el-button>
        </el-form-item>
      </el-form>

      <el-table :stripe="true" v-loading="loading" :data="speakIpBlackData" style="margin-bottom:27px">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column :label=" $t('members.memberInfo.index.memId') " align="center" prop="userId"/>
        <el-table-column :label=" $t('members.memberInfo.index.memIp') " align="center" prop="userIp"/>
        <el-table-column :label=" $t('members.memberInfo.index.bRem') " align="center" prop="msg"/>
        <el-table-column :label=" $t('members.memberInfo.index.cTime') " align="center" prop="createTime"/>
        <el-table-column :label=" $t('global.operationColumn') " min-width="60" align="center" class-name="small-padding fixed-width"
                         fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdateIpBlack(scope.row)"
            >{{ $t('global.operationColumn') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="speakIpBlackData.length>=10">
        <pagination
          v-show="total>0"
          :total="total"
          :page-sizes="[10,20,100]"
          :page.sync="queryParam.pageNum"
          :limit.sync="queryParam.pageSize"
          @pagination="openIpBlackList"
        />
      </div>

      <el-button type="primary" plain @click="blockedIpCloseBtn()" style="float: right;margin-top: -15px">
        {{ $t('global.close') }}
      </el-button>

    </el-dialog>

    <!--member by ip address and realName start from here-->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="memberByIpAddressListList"
               width="1200px" append-to-body>
      <el-form :model="queryParamIp" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item :label=" $t('members.memberInfo.index.memIp') " prop="loginIp">
          <el-input
            v-model="queryParamIp.loginIp"
            :placeholder=" $t('members.memberInfo.index.memIp') "
            clearable
            size="small"
            @keyup.enter.native="handleInputQuery"/>
        </el-form-item>

        <el-form-item :label=" $t('members.memberInfo.index.rName') " prop="realName">
          <el-input
            v-model="queryParamIp.realName"
            :placeholder=" $t('members.memberInfo.index.rName') "
            clearable
            size="small"
            @keyup.enter.native="handleInputQuery"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini"
                     @click="handleSearchQueryByIp"
                     :disabled='!queryParamIp.loginIp && !queryParamIp.realName'>
            {{ $t('global.searchButton') }}
          </el-button>
        </el-form-item>
      </el-form>

      <el-table :stripe="true" v-loading="loading" :data="memberByIpAddress" style="margin-bottom: 2px;">
        <el-table-column :label=" $t('members.memberInfo.index.memId') " align="center" prop="id"/>

        <el-table-column :label=" $t('global.nickname') " align="center" prop="nickName"/>
        <el-table-column :label=" $t('global.status') " min-width="90" align="center" prop="status" :formatter="statusFormat"/>

        <el-table-column :label=" $t('members.memberInfo.index.logIp') " align="center" prop="loginIp"/>
        <el-table-column :label=" $t('members.memberInfo.index.logRem') " align="center" prop="email"/>
      </el-table>

      <div v-if="paginationShow===true">
        <pagination
          v-show="total>10"
          :total="total"
          :page-sizes="[10,20,100]"
          :page.sync="queryParamIp.pageNum"
          :limit.sync="queryParamIp.pageSize"
          @pagination="paginationByIpList"/>
      </div>

      <!--      //** handling close button */-->
      <el-row :gutter="15" class="mb8" style="margin-left: 77%;margin-top: 35px">
        <!--        handling onclick deactivate user status-->
        <el-col :span="1.5">
          <el-button type="primary" plain style="height: auto" @click="ipUnBlockHandler">
            {{ $t('members.memberInfo.index.button.normal') }}
          </el-button>
        </el-col>
        <!--        handling onclick deactivate user status-->
        <el-col :span="1.5">
          <el-button type="primary" plain style="height: auto" @click="ipBlockHandler" :disabled='!isActive'>
            {{ $t('members.memberInfo.index.button.fden') }}
          </el-button>
        </el-col>
        <!--click on clock member searched panel  -->
        <el-col :span="1.5">
          <el-button type="primary" plain @click="closeTap()" style="height: auto">
            {{ $t('global.close') }}
          </el-button>
        </el-col>
      </el-row>


    </el-dialog>
    <!--member by ip address END here-->


    <!-- start personal Record dialog pop box from here-->
    <!--    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="personalReportOpen"-->
    <!--               width="1200px" append-to-body>-->
    <!--      <el-table :stripe="true" v-loading="loading" style="margin-bottom: 50px">-->
    <!--        <el-table-column label="时间选择" align="center"/>-->
    <!--        <el-table-column label="时间选择" align="center"/>-->
    <!--        <el-table-column label="会员ID" align="center"/>-->
    <!--        <el-table-column label="会员ID" align="center"/>-->
    <!--        <el-table-column label="会员ID" align="center"/>-->
    <!--      </el-table>-->
    <!--      <el-button type="primary" plain @click="personalReportOpen=false"  style="float: right;margin-top: -25px">-->
    <!--        关闭-->
    <!--      </el-button>-->
    <!--    </el-dialog>-->
    <!-- end personal Record dialog pop box from here-->

    <PersonalRecordTable ref="tableShow"></PersonalRecordTable>
    <ExcelPrompt ref="excelPrompt" @downLoadExcel="handleExport"></ExcelPrompt>
  </div>
</template>

<script>
import {
  addMemberInfo,
  changeSpeak,
  changeStatus,
  changeStatusBan,
  exportMemberInfo,
  getMemberInfo,
  ipBan, ipUnBlock,
  listCount,
  listMemberInfo, requestBoxDish, resetWithdrawal,
  updateMemberInfo
} from '@/api/platform-web/member/memberInfo'
import more from './more'
import {listSpeakIpBlackList, updateSpeakIpBlackList} from '@/api/live-web/chat/speakIpBlackList'
import {pickerDateTimeShortcuts} from '@/utils/dateUtils'
import {getConfigEnvironment} from "@/api/platform-web/config/configEnvironment";
import ExcelPrompt from '@/layout/components/prompt/excelPrompt.vue';
import PersonalRecordTable from "@/views/member/memberInfo/personalRecordTable";


export default {
  name: 'MemberInfo',
  components: {
    more: more,
    ExcelPrompt,
    PersonalRecordTable
  },
  data() {
    return {
      //统计状态
      totalLoading: false,
      //统计总的数据
      totalData: {
        peopledTotal: 0,
        totalMoney: 0,
        safeBalanceTotalMoney: 0
      },
      //phone 手机号前四位
      phone: null,
      //password 密码
      password: null,
      //代理号
      agent: null,
      // 类型
      statusOptions: [],
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      // 遮罩层
      loading: true,
      // 传递到子组件的memberId/memberCode
      memberCode: 0,
      memberId: null,
      // 日期范围
      dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      minVip : '',
      maxVip : '',
      //禁言禁用
      id: '',
      userName: '',
      speak: '',
      status: '',
      realName: '',


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
      //禁言备注弹框
      muteRemark: false,
      muteRemarkSpeak: false,
      fromMuteRemark: {},
      fromMuteRemarkSpeak: {},
      muteRemarkOptions: [],
      //会员发言表格数据
      speakIpBlackData: [],
      speakIpBlackListList: false,

      // 用户信息表格数据
      memberInfoList: [],
      memberByIpListList: false,

      //adding new member by ip
      memberByIpAddress: [],
      memberByIpAddressListList: false,
      paginationShow: false,
      isActive: false,
      loginIp: '',
      firstOptions: [],
      first: null,
      //end new data

      personalReportOpen: false,

      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态列表0= 禁用 1=正常 2=测试号3=超管号
      typeList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        email: '',
        bankAccount: '',
        searchValue: '', //会员Id,账号,手机号
        status: '',
        loginIp: '',
        nickName: '',
        inviterCode: '',
        channelcode: '',
        vipMin: '',
        vipMax: '',
        downLoadDate: [],
        loginDev: null,
        // orderByColumn: 'reg_time',
        // isAsc: 'desc'
      },
      queryParam: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'create_time',
        isAsc: 'desc'
      },
      queryParamIp: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'reg_time',
        isAsc: 'desc'
      },
      queryParamsByIp: {
        pageNum: 1,
        pageSize: 20,
        email: '',
        searchValue: '', //会员Id,账号,手机号
        status: '',
        loginIp: '',
        userName: '',
        nickName: '',
        realName: '',
        orderByColumn: 'reg_time',
        // isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        /*          phone: [
                    {required: true, message: '手机号不能为空', trigger: 'blur'}
                  ],*/
        // password: [
        //   {required: true, message: '密码不能为空', trigger: 'blur'}
        // ],
        /*          userName: [
                    {required: true, message: '账号不能为空', trigger: 'blur'}
                  ],
                  loginNum: [
                    {required: true, message: '登陆次数不能为空', trigger: 'blur'}
                  ]*/
      }
    }
  },
  created() {
    this.getList()
    getConfigEnvironment('agent_id').then(response => {
      this.phone = '100' + response.data.envValue
    })
    this.getDicts('muteRemarkOptions').then(response => {
      this.muteRemarkOptions = response.data
    })
    this.getDicts('member_type').then(response => {
      this.typeList = response.data
    })
    this.getDicts('device_type').then(response => {
      this.statusOptions = response.data
    })

  },
  methods: {
    //复制
    copy1() {
      this.copyCommand(this.totalData.peopledTotal)
    },
    copy2() {
      this.copyCommand(this.totalData.totalMoney)
    },
    copy3() {
      this.copyCommand(this.totalData.safeBalanceTotalMoney)
    },
    //统计
    listCount() {
      this.totalLoading = true
      this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
      listCount(this.queryParams).then((res) => {
        this.totalData = res
      }).finally(() => {
        this.totalLoading = false
      })
    },
    changetPhone(phone) {
      if (phone) {
        this.password = phone.substr(5, 6)
        this.$forceUpdate()
      }
    },
    //修改用户状态
    changeType(row) {
      //打开备注禁用弹框
      if (row.status === 0) {
        this.remark = null
        this.remarked = null
        this.id = row.id
        this.status = row.status
        this.muteRemark = true
      } else {
        changeStatus({
          id: row.id,
          status: row.status
        }).then((res) => {
          if (res.code === 0) {
            this.$notify.success( this.$t('members.memberInfo.index.sMod') )
          } else {
            this.$notify.error( this.$t('members.memberInfo.index.sModfail') )
          }
        }).catch(() => {
          this.$notify.error( this.$t('members.memberInfo.index.netAnom') )
        }).finally(() => {
          this.getList()
        })
      }
    },
    //禁用备注提交
    submitMuteRemark(row) {
      if (this.remarked != null) {
        this.remark = this.remarked;
      }
      changeStatusBan(this.id, this.status, this.remark).then((res) => {
        if (res.code === 0) {
          this.$notify.success( this.$t('members.memberInfo.index.sMod') )
          this.muteRemark = false
        } else {
          this.$notify.error( this.$t('members.memberInfo.index.sModfail') )
        }
      }).catch(() => {
        this.$notify.error( this.$t('members.memberInfo.index.netAnom') )
      })
    },
    /** 查询用户信息列表 */
    getList() {
      this.loading = true
      // if (this.queryParams.bankAccount===''  &&
      //     this.queryParams.email===''  &&
      //     this.queryParams.searchValue===''  &&
      //     this.queryParams.status===''  &&
      //     this.queryParams.loginIp===''  &&
      //     this.queryParams.nickName===''  &&
      //     this.queryParams.inviterCode===''  &&
      //     this.queryParams.channelcode==='' ) {
      //   this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
      // }else {
      this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
      //   this.queryParams.params = []
      // }
      listMemberInfo(this.queryParams).then(response => {
        this.memberInfoList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    openIpBlackList() {
      this.speakIpBlackListList = true
      this.title = this.$t('members.memberInfo.index.vbIp')
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
    /** 修改按钮操作 */
    handleUpdateIpBlack(row) {
      var that = this
      this.$confirm( this.$t('members.memberInfo.index.confirmUp', {row: row.userId}) , this.$t('members.memberInfo.index.warn') , {
        confirmButtonText: this.$t('members.memberInfo.index.det'),
        cancelButtonText: this.$t('members.memberInfo.index.cnc'),
        type: 'warning'
      }).then(function () {
        var data = {}
        data.userIp = row.userIp
        data.userId = row.userId
        return updateSpeakIpBlackList(data)
      }).then(() => {
        that.msgSuccess( this.$t('members.memberInfo.index.unbSucc') )
        this.openIpBlackList()
        that.getList()
      })

    },
    //禁用弹窗取消按钮
    cancelUser() {
      this.muteRemark = false
      this.getList();
    },
    //禁言弹窗取消按钮
    cancelSpeak() {
      this.muteRemarkSpeak = false
      this.getList();
    },
    // 取消按钮
    cancel() {
      this.open = false
    },
    /** 搜索按钮操作 */
    handleQuery() {
      // if(this.queryParams.searchValue){
      //   const reg = '^[0-9a-zA-Z_]{1,}$'
      //   let flag = this.queryParams.searchValue.match(reg)
      //   // if(!flag){
      //   //   this.msgError("会员ID/账号/手机号只能输入数字及下划线")
      //   //   return
      //   // }
      // }
      this.queryParams.pageNum = 1
      this.getList()
    },
    handleQueryIpBlack() {
      this.queryParam.pageNum = 1
      this.searchIpBlackList()
    },

    /** close block view tab  */
    blockedIpCloseBtn() {
      this.queryParam.userIp = null;
      this.queryParam.userId = null;
      this.speakIpBlackListList = false;
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
      this.open = true
      this.title = this.$t('members.memberInfo.index.addUinf')
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      const id = row.id || this.ids
      getMemberInfo(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = this.$t('members.memberInfo.index.modInf')
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMemberInfo(this.form).then(response => {
              this.msgSuccess( this.$t('members.memberInfo.index.modSucc') )
              this.open = false
              this.getList()
            })
          } else {
            this.form.phone = this.phone;
            this.form.password = this.password;
            addMemberInfo(this.form).then(response => {
              this.msgSuccess( this.$t('members.memberInfo.index.addSucc') )
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 更多按钮操作 */
    handleMore(row) {
      this.memberCode = row.memberCode
      this.memberId = row.id
      this.$refs.more.show(this.memberId, this.memberCode, row.vip, row.nickName, row.phone)
    },
    openExport() {
      this.$refs.excelPrompt.open = true;
    },
    /** 导出按钮操作 */
    handleExport(date) {
      const queryParams = this.queryParams
      queryParams.params = []
      queryParams.downLoadDate = date
      this.$confirm( this.$t('members.memberInfo.index.confExp') ,  this.$t('members.memberInfo.index.warn') , {
        confirmButtonText:  this.$t('members.memberInfo.index.det') ,
        cancelButtonText: this.$t('members.memberInfo.index.cnc') ,
        type: 'warning'
      }).then(function () {
        const exportMemberInfoList = exportMemberInfo(queryParams);
        queryParams.downLoadDate = null
        if (exportMemberInfoList == null) {
          this.msgError( this.$t('members.memberInfo.index.nData') )
        }
        return exportMemberInfoList
      }).then(response => {
        this.downloadExcel(response, this.$t('members.memberInfo.index.memList') )
      })
    },
    //打开备注禁言弹框
    handleStatusChange(row) {
      if (row.speak === "0") {
        changeSpeak(row.id, row.speak, null).then(response => {
          this.msgSuccess( this.$t('members.memberInfo.index.succUnb') )
        })
      } else {
        this.remark = null
        this.remarked = null
        this.id = row.id
        this.speak = row.speak
        this.muteRemarkSpeak = true
      }
    },
    //禁言备注提交
    submitMuteRemarkSpeak() {
      if (this.remarked != null) {
        this.remark = this.remarked;
      }
      changeSpeak(this.id, this.speak, this.remark).then(response => {
        this.msgSuccess( this.$t('members.memberInfo.index.banSucc') )
        this.muteRemarkSpeak = false
        this.getList()
      })
    },

    /** this block of code managed by Rajesh */
    /** Handle click on display tab event by ip address */
    memberListAccordingToIp() {
      this.memberByIpAddressListList = true
      this.title = this.$t('members.memberInfo.index.vMem')
    },
    /** formatting the 0-1-2 value */
    statusFormat(row, column) {
      return this.selectDictLabel(this.typeList, row.status)
    },

    /**creating pagination part */
    paginationByIpList() {
      this.memberByIpAddressListList = true
      this.title = this.$t('members.memberInfo.index.vbIp')
      listMemberInfo(this.queryParamIp).then(response => {
        this.memberByIpAddress = response.rows
        this.total = response.total
        this.loading = false
      })
    },

    /** handling search function */
    handleInputQuery() {
      if (this.queryParamsByIp.userIp || this.queryParams.realName) {
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let userIp = this.queryParamsByIp.userIp.match(reg)
        let realName = this.queryParams.realName.match(reg)
        if (!userIp || !realName) {
          this.msgError( this.$t('members.memberInfo.index.uipInc') )
          return
        }
      }
      this.queryParamsByIp.pageNum = 1
      this.getSearchList()
    },
    /** Query user information list */
    getSearchList() {
      this.loading = true
      this.queryParamsByIp = this.addDateRange(this.queryParamsByIp, this.dateRange);
      this.queryParamsByRealName = this.addDateRange(this.realName, this.dateRange);
      listMemberInfo(this.queryParamsByIp, this.queryParamsByRealName).then(response => {
        this.memberByIpAddress = response.rows
        this.total = response.total
        if (this.memberByIpAddress.length >= 10) {
          this.paginationShow = true;
        }
        if (this.memberByIpAddress.length > 0) {
          this.isActive = true;
        }
        this.loading = false
      })
    },
    /** handle search query By Ip Address */
    handleSearchQueryByIp() {
      this.queryParamIp.pageNum = 1
      this.searchMbyIpList()
    },
    /** Search Member By Ip Address */
    searchMbyIpList() {
      listMemberInfo(this.queryParamIp, this.realName).then(response => {
        this.memberByIpAddress = response.rows
        this.total = response.total
        if (this.memberByIpAddress.length >= 10) {
          this.paginationShow = true;
        }
        if (this.memberByIpAddress.length > 0) {
          this.isActive = true;
        }
        this.loading = false
      })
    },

    /**click to handle clear data from dialog 'only from front end' */
    closeTap() {
      this.paginationShow = false;

      if (this.memberByIpAddressListList === true) {
        this.memberByIpAddressListList = false;
        this.isActive = false;
        this.loading = false

        if (this.queryParamIp.loginIp !== null) {
          this.queryParamIp.loginIp = "";
        }

        if (this.queryParamIp.realName !== null) {
          this.queryParamIp.realName = ""
        }

        if (this.memberByIpAddress !== null) {
          this.memberByIpAddress = null;
        }

        if (this.queryParamIp.pageNum !== null) {
          this.queryParamIp.pageNum = null
        }
      }
    },

    /** start on click ip status to set 0 panel from here */
    ipBlockHandler() {

      /** set Member Status 0, By Ip Address Query Handler*/
      ipBan({
        loginIp: this.queryParamIp.loginIp,
        realName: this.queryParamIp.realName
      }).then((res) => {
        if (res.code === 0 || res.code > 200) {
          this.$notify.error( this.$t('members.memberInfo.index.sModfail') )
        }
        this.$notify.success( this.$t('members.memberInfo.index.statSet') )

      }).catch(() => {
        this.$notify.error( this.$t('members.memberInfo.index.netEx') )
      }).finally(() => {
        this.searchMbyIpList()
      })
    },

    /** start on click ip status to set 0 panel from here */
    ipUnBlockHandler(){
      /** set Member Status 0, By Ip Address Query Handler*/
      ipUnBlock({
        loginIp: this.queryParamIp.loginIp,
        realName: this.queryParamIp.realName
      }).then((res) => {
        if (res.code === 0 || res.code > 200) {
          this.$notify.error( this.$t('members.memberInfo.index.sModfail') )
        }
        this.$notify.success( this.$t('members.memberInfo.index.statNorm') )

      }).catch(() => {
        this.$notify.error( this.$t('members.memberInfo.index.netEx') )
      }).finally(() => {
        this.searchMbyIpList()
      })
    },

    /** click  on ID TO Display show personalRecordTable - personalReport method*/
    personalReport(userId) {
      getMemberInfo(userId).then(res => {
        this.title = res.data.nickName + this.$t('members.memberInfo.index.pStat') ;
        this.$refs.tableShow.show(userId, this.title);
      });
    },

    /** click  on copy to copy the id */
    handleCopy(id) {
      this.copyData = id
      this.copy(this.copyData)
    },
    copy(data) {
      let value = document.createElement('textarea')
      value.value = data
      document.body.appendChild(value)
      value.select()   //select coming value;
      document.execCommand('Copy') // Execute the browser copy command
      this.$message({
        message: data + this.$t('members.memberInfo.index.repSucc') ,
        type: 'success'
      })
      value.remove()
    },


    boxDish(row) {
      console.info(row.id)
      this.$prompt( this.$t('members.memberInfo.index.pGverifcode') ,  this.$t('global.promptTitle') , {
        confirmButtonText: this.$t('members.memberInfo.index.det') ,
        cancelButtonText: this.$t('members.memberInfo.index.cnc') ,
        inputPattern: /^[0-9]{1,10}$/,
        inputErrorMessage: this.$t('members.memberInfo.index.verifInc') ,
      }).then(({value}) => {
        requestBoxDish({
          googleAuthCode: value,
          id: row.id
        }).then((res) => {
          if (res.code === 0) {
            this.$notify.success( this.$t('members.memberInfo.index.sDepo') )
            this.getList()
          } else {
            this.$notify.error( this.$t('members.memberInfo.index.fDepo') )
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('members.memberInfo.index.cInp')
        })
      })
    }
  },
}


</script>


<style>
@media only screen and (min-width: 1200px) and (max-width: 1390px) {
  #inviterCode {
    margin-left: 70px;
  }
}

@media only screen and (min-width: 1330px) and (max-width: 1400px) {
  .email {
    margin-left: 0;
  }
}

@media only screen and (min-width: 1350px) and (max-width: 1390px) {
  #channelCode {
    margin-left: 70px;
  }

  .email {
    margin-left: 0;
  }
}

@media only screen and (min-width: 1391px) and (max-width: 1512px) {
  #channelCode {
    margin-left: 70px;
  }

  .email {
    margin-left: 0;
  }
}

@media only screen and (min-width: 1475px) and (max-width: 1500px) {
  .nickName {
    margin-left: 70px;
  }

  .submit-btn, #channelCode, .email {
    margin-left: 0;
  }
}

@media only screen and (min-width: 1500px) and (max-width: 1562px) {
  .nickName {
    margin-left: 70px;
  }

  .email, .submit-btn, #channelCode {
    margin-left: 0;
  }
}

@media only screen and (min-width: 1562px) and (max-width: 1700px) {
  .loginIp {
    margin-left: 70px;
  }
}

@media only screen and (min-width: 1900px)and (max-width: 2000px) {
  .bankAccount {
    margin-left: 70px;
  }

  .email {
    margin-left: 0;
  }
}


</style>

