<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态(0= 禁用 1=正常 2=测试号3=超管号)" clearable size="small">
          <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="会员ID/账号/手机号" label-width="150px" prop="memberCode">
        <el-input
          v-model="queryParams.memberCode"
          placeholder="请输入会员编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邀请码" prop="inviterCode">
        <el-input
          v-model="queryParams.inviterCode"
          placeholder="请输入邀请码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道号" prop="channelcode">
        <el-input
          v-model="queryParams.channelcode"
          placeholder="请输入渠道号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登录ip" prop="loginIp">
        <el-input
          v-model="queryParams.loginIp"
          placeholder="请输入登录ip"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <!--
      <el-form-item label="代理编号" prop="cxAgent">
        <el-input
          v-model="queryParams.cxAgent"
          placeholder="请输入代理编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="realName">
        <el-input
          v-model="queryParams.realName"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="会员vip" prop="vip">
        <el-input
          v-model="queryParams.vip"
          placeholder="请输入会员vip"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="余额" prop="totalAccount">
        <el-input
          v-model="queryParams.totalAccount"
          placeholder="请输入余额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="queryParams.email"
          placeholder="请输入邮箱"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="queryParams.password"
          placeholder="请输入密码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否在线(1是0否)" prop="isOnline">
        <el-input
          v-model="queryParams.isOnline"
          placeholder="请输入是否在线(1是0否)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="性别(1男0女)" prop="sex">
        <el-select v-model="queryParams.sex" placeholder="请选择性别(1男0女)" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="注册时间" prop="regTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.regTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择注册时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="注册ip" prop="registIp">
        <el-input
          v-model="queryParams.registIp"
          placeholder="请输入注册ip"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登录ip" prop="loginIp">
        <el-input
          v-model="queryParams.loginIp"
          placeholder="请输入登录ip"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登录地址" prop="loginAddress">
        <el-input
          v-model="queryParams.loginAddress"
          placeholder="请输入登录地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登录设备(1 ios 2 android)" prop="loginDev">
        <el-input
          v-model="queryParams.loginDev"
          placeholder="请输入登录设备(1 ios 2 android)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="生日" prop="birthDay">
        <el-input
          v-model="queryParams.birthDay"
          placeholder="请输入生日"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="qq" prop="qq">
        <el-input
          v-model="queryParams.qq"
          placeholder="请输入qq"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信" prop="wechat">
        <el-input
          v-model="queryParams.wechat"
          placeholder="请输入微信"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="头像" prop="headImg">
        <el-input
          v-model="queryParams.headImg"
          placeholder="请输入头像"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="在线时长" prop="onlineTime">
        <el-input
          v-model="queryParams.onlineTime"
          placeholder="请输入在线时长"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="股东网址" prop="linkUrl">
        <el-input
          v-model="queryParams.linkUrl"
          placeholder="请输入股东网址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登录时间" prop="loginTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.loginTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择登录时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="保险箱余额" prop="boxAccount">
        <el-input
          v-model="queryParams.boxAccount"
          placeholder="请输入保险箱余额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="保险箱密码" prop="boxPass">
        <el-input
          v-model="queryParams.boxPass"
          placeholder="请输入保险箱密码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上次洗码时间" prop="cleanTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.cleanTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择上次洗码时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="总的充值金额" prop="levelIntegral">
        <el-input
          v-model="queryParams.levelIntegral"
          placeholder="请输入总的充值金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="佣金" prop="inviteMoney">
        <el-input
          v-model="queryParams.inviteMoney"
          placeholder="请输入佣金"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="打码账户" prop="codeAccount">
        <el-input
          v-model="queryParams.codeAccount"
          placeholder="请输入打码账户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="玩家所在游戏平台" prop="pid">
        <el-input
          v-model="queryParams.pid"
          placeholder="请输入玩家所在游戏平台"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="累计有效投注" prop="codeTotal">
        <el-input
          v-model="queryParams.codeTotal"
          placeholder="请输入累计有效投注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="0=正常 1 =禁言" prop="speak">
        <el-input
          v-model="queryParams.speak"
          placeholder="请输入0=正常 1 =禁言"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登陆次数" prop="loginNum">
        <el-input
          v-model="queryParams.loginNum"
          placeholder="请输入登陆次数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户端版本号" prop="version">
        <el-input
          v-model="queryParams.version"
          placeholder="请输入客户端版本号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现密码(md5加密)" prop="withdrawalPass">
        <el-input
          v-model="queryParams.withdrawalPass"
          placeholder="请输入提现密码(md5加密)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备ID" prop="deviceId">
        <el-input
          v-model="queryParams.deviceId"
          placeholder="请输入设备ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
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
          v-hasPermi="['admin:memberInfo:add']"
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
          v-hasPermi="['admin:memberInfo:edit']"
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
          v-hasPermi="['admin:memberInfo:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:memberInfo:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="memberInfoList" @selection-change="handleSelectionChange">
      <el-table-column label="会员ID" align="center" prop="memberCode" />
      <el-table-column label="会员vip" align="center" prop="vip" />
      <el-table-column label="积分" align="center" prop="vip" />
      <el-table-column label="账号" align="center" prop="userName" />
      <el-table-column label="状态" align="center" prop="status" :formatter="formatterStatus" />
      <el-table-column label="保险箱余额" align="center" prop="boxAccount" />
      <el-table-column label="注册时间" align="center" prop="regTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.regTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" prop="nickName" />
      <el-table-column label="登陆次数" align="center" prop="loginNum" />

     <!-- <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="系统编号" align="center" prop="id" />
      <el-table-column label="代理编号" align="center" prop="cxAgent" />
      <el-table-column label="姓名" align="center" prop="realName" />
      <el-table-column label="余额" align="center" prop="totalAccount" />
      <el-table-column label="手机" align="center" prop="phone" />
      <el-table-column label="邮箱" align="center" prop="email" />
      <el-table-column label="密码" align="center" prop="password" />
      <el-table-column label="是否在线(1是0否)" align="center" prop="isOnline" />
      <el-table-column label="性别(1男0女)" align="center" prop="sex" />

      <el-table-column label="注册ip" align="center" prop="registIp" />
      <el-table-column label="登录ip" align="center" prop="loginIp" />
      <el-table-column label="登录地址" align="center" prop="loginAddress" />
      <el-table-column label="登录设备(1 ios 2 android)" align="center" prop="loginDev" />
      <el-table-column label="生日" align="center" prop="birthDay" />
      <el-table-column label="qq" align="center" prop="qq" />
      <el-table-column label="微信" align="center" prop="wechat" />
      <el-table-column label="头像" align="center" prop="headImg" />
      <el-table-column label="在线时长" align="center" prop="onlineTime" />
      <el-table-column label="股东网址" align="center" prop="linkUrl" />
      <el-table-column label="登录时间" align="center" prop="loginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="保险箱密码" align="center" prop="boxPass" />
      <el-table-column label="上次洗码时间" align="center" prop="cleanTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.cleanTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总的充值金额" align="center" prop="levelIntegral" />
      <el-table-column label="邀请码" align="center" prop="inviterCode" />
      <el-table-column label="佣金" align="center" prop="inviteMoney" />
      <el-table-column label="打码账户" align="center" prop="codeAccount" />
      <el-table-column label="玩家所在游戏平台" align="center" prop="pid" />
      <el-table-column label="累计有效投注" align="center" prop="codeTotal" />
      <el-table-column label="渠道号" align="center" prop="channelcode" />
      <el-table-column label="0=正常 1 =禁言" align="center" prop="speak" />

      <el-table-column label="客户端版本号" align="center" prop="version" />
      <el-table-column label="提现密码(md5加密)" align="center" prop="withdrawalPass" />
      <el-table-column label="设备ID" align="center" prop="deviceId" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:memberInfo:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:memberInfo:remove']"
          >删除</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-menu"
            @click="handleMore(scope.row)"
            v-hasPermi="['admin:memberInfo:remove']"
          >更多</el-button>
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员编号" prop="memberCode">
          <el-input v-model="form.memberCode" placeholder="请输入会员编号" />
        </el-form-item>
        <el-form-item label="代理编号" prop="cxAgent">
          <el-input v-model="form.cxAgent" placeholder="请输入代理编号" />
        </el-form-item>
        <el-form-item label="账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="状态(0= 禁用 1=正常 2=测试号3=超管号)">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="会员vip" prop="vip">
          <el-input v-model="form.vip" placeholder="请输入会员vip" />
        </el-form-item>
        <el-form-item label="余额" prop="totalAccount">
          <el-input v-model="form.totalAccount" placeholder="请输入余额" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="是否在线(1是0否)" prop="isOnline">
          <el-input v-model="form.isOnline" placeholder="请输入是否在线(1是0否)" />
        </el-form-item>
        <el-form-item label="性别(1男0女)" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别(1男0女)">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间" prop="regTime">
          <el-date-picker clearable size="small"
            v-model="form.regTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择注册时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="注册ip" prop="registIp">
          <el-input v-model="form.registIp" placeholder="请输入注册ip" />
        </el-form-item>
        <el-form-item label="登录ip" prop="loginIp">
          <el-input v-model="form.loginIp" placeholder="请输入登录ip" />
        </el-form-item>
        <el-form-item label="登录地址" prop="loginAddress">
          <el-input v-model="form.loginAddress" placeholder="请输入登录地址" />
        </el-form-item>
        <el-form-item label="登录设备(1 ios 2 android)" prop="loginDev">
          <el-input v-model="form.loginDev" placeholder="请输入登录设备(1 ios 2 android)" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="生日" prop="birthDay">
          <el-input v-model="form.birthDay" placeholder="请输入生日" />
        </el-form-item>
        <el-form-item label="qq" prop="qq">
          <el-input v-model="form.qq" placeholder="请输入qq" />
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="form.wechat" placeholder="请输入微信" />
        </el-form-item>
        <el-form-item label="头像" prop="headImg">
          <el-input v-model="form.headImg" placeholder="请输入头像" />
        </el-form-item>
        <el-form-item label="在线时长" prop="onlineTime">
          <el-input v-model="form.onlineTime" placeholder="请输入在线时长" />
        </el-form-item>
        <el-form-item label="股东网址" prop="linkUrl">
          <el-input v-model="form.linkUrl" placeholder="请输入股东网址" />
        </el-form-item>
        <el-form-item label="登录时间" prop="loginTime">
          <el-date-picker clearable size="small"
            v-model="form.loginTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择登录时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="保险箱余额" prop="boxAccount">
          <el-input v-model="form.boxAccount" placeholder="请输入保险箱余额" />
        </el-form-item>
        <el-form-item label="保险箱密码" prop="boxPass">
          <el-input v-model="form.boxPass" placeholder="请输入保险箱密码" />
        </el-form-item>
        <el-form-item label="上次洗码时间" prop="cleanTime">
          <el-date-picker clearable size="small"
            v-model="form.cleanTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择上次洗码时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="总的充值金额" prop="levelIntegral">
          <el-input v-model="form.levelIntegral" placeholder="请输入总的充值金额" />
        </el-form-item>
        <el-form-item label="邀请码" prop="inviterCode">
          <el-input v-model="form.inviterCode" placeholder="请输入邀请码" />
        </el-form-item>
        <el-form-item label="佣金" prop="inviteMoney">
          <el-input v-model="form.inviteMoney" placeholder="请输入佣金" />
        </el-form-item>
        <el-form-item label="打码账户" prop="codeAccount">
          <el-input v-model="form.codeAccount" placeholder="请输入打码账户" />
        </el-form-item>
        <el-form-item label="玩家所在游戏平台" prop="pid">
          <el-input v-model="form.pid" placeholder="请输入玩家所在游戏平台" />
        </el-form-item>
        <el-form-item label="累计有效投注" prop="codeTotal">
          <el-input v-model="form.codeTotal" placeholder="请输入累计有效投注" />
        </el-form-item>
        <el-form-item label="渠道号" prop="channelcode">
          <el-input v-model="form.channelcode" placeholder="请输入渠道号" />
        </el-form-item>
        <el-form-item label="0=正常 1 =禁言" prop="speak">
          <el-input v-model="form.speak" placeholder="请输入0=正常 1 =禁言" />
        </el-form-item>
        <el-form-item label="登陆次数" prop="loginNum">
          <el-input v-model="form.loginNum" placeholder="请输入登陆次数" />
        </el-form-item>
        <el-form-item label="客户端版本号" prop="version">
          <el-input v-model="form.version" placeholder="请输入客户端版本号" />
        </el-form-item>
        <el-form-item label="提现密码(md5加密)" prop="withdrawalPass">
          <el-input v-model="form.withdrawalPass" placeholder="请输入提现密码(md5加密)" />
        </el-form-item>
        <el-form-item label="设备ID" prop="deviceId">
          <el-input v-model="form.deviceId" placeholder="请输入设备ID" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <more ref="more" @memberMore="handleQuery"></more>
  </div>
</template>

<script>
import { listMemberInfo, getMemberInfo, delMemberInfo, addMemberInfo, updateMemberInfo, exportMemberInfo,gameBalance } from "@/api/platform-web/admin/memberInfo";
import {listUser} from "@/api/platform-web/system/user";
import more from "./more";
export default {
  name: "MemberInfo",
  components: {
      more: more
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
      // 【请填写功能名称】表格数据
      memberInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
        // 状态列表0= 禁用 1=正常 2=测试号3=超管号
        typeList: [ {label: '所有类型',value: null}, {label: '禁用',value: 0},{label: '正常',value: 1},{label: '测试号',value: 2},{label: '超管号',value: 3}],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        memberCode: null,
        cxAgent: null,
        userName: null,
        realName: null,
        status: null,
        vip: null,
        totalAccount: null,
        phone: null,
        email: null,
        password: null,
        isOnline: null,
        sex: null,
        regTime: null,
        registIp: null,
        loginIp: null,
        loginAddress: null,
        loginDev: null,
        nickName: null,
        birthDay: null,
        qq: null,
        wechat: null,
        headImg: null,
        onlineTime: null,
        linkUrl: null,
        loginTime: null,
        boxAccount: null,
        boxPass: null,
        cleanTime: null,
        levelIntegral: null,
        inviterCode: null,
        inviteMoney: null,
        codeAccount: null,
        pid: null,
        codeTotal: null,
        channelcode: null,
        speak: null,
        loginNum: null,
        version: null,
        withdrawalPass: null,
        deviceId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        memberCode: [
          { required: true, message: "会员编号不能为空", trigger: "blur" }
        ],
        cxAgent: [
          { required: true, message: "代理编号不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        loginNum: [
          { required: true, message: "登陆次数不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
      //格式化列表状态
      formatterStatus (row, column){
          var status = row.status;
        if (status===0){
            return '禁用';
        }else if (status===1){
            return '正常';
        }else if (status===2){
            return '测试号';
        }else if (status===3){
            return '超管号';
        }else {
            return '未知';
        }

      },
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;

      listMemberInfo(this.queryParams).then(response => {
        this.memberInfoList = response.rows;
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
        memberCode: null,
        cxAgent: null,
        userName: null,
        realName: null,
        status: 0,
        vip: null,
        totalAccount: null,
        phone: null,
        email: null,
        password: null,
        isOnline: null,
        sex: null,
        regTime: null,
        registIp: null,
        loginIp: null,
        loginAddress: null,
        loginDev: null,
        nickName: null,
        birthDay: null,
        qq: null,
        wechat: null,
        headImg: null,
        onlineTime: null,
        linkUrl: null,
        loginTime: null,
        boxAccount: null,
        boxPass: null,
        cleanTime: null,
        levelIntegral: null,
        inviterCode: null,
        inviteMoney: null,
        codeAccount: null,
        pid: null,
        codeTotal: null,
        channelcode: null,
        speak: null,
        loginNum: null,
        version: null,
        withdrawalPass: null,
        deviceId: null
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
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMemberInfo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMemberInfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMemberInfo(this.form).then(response => {
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
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMemberInfo(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
      /** 更多按钮操作 */
    handleMore(row) {
          this.$refs.more.show();
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有会员列表数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportMemberInfo(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
