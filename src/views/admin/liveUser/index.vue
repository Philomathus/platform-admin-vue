<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="主播昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入主播昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主播ID" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入主播ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="queryParams.mobile"
          placeholder="请输入手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="daterange" v-model="selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" :style="{width: '60%'}" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="至" clearable></el-date-picker>
      </el-form-item>
      <!--      <el-form-item label="用户密码" prop="userPwd">
              <el-input
                v-model="queryParams.userPwd"
                placeholder="请输入用户密码"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="是否认证 0指未认证  1指待审核 2指认证 3指审核不通过" prop="isAuthentication">
              <el-input
                v-model="queryParams.isAuthentication"
                placeholder="请输入是否认证 0指未认证  1指待审核 2指认证 3指审核不通过"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="0：微信；1：QQ；2：手机；3：微博 ;4 : 游客登录" prop="loginType">
              <el-select v-model="queryParams.loginType" placeholder="请选择0：微信；1：QQ；2：手机；3：微博 ;4 : 游客登录" clearable size="small">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-form-item>
            <el-form-item label="有效性标识" prop="isEffect">
              <el-input
                v-model="queryParams.isEffect"
                placeholder="请输入有效性标识"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="金额" prop="money">
              <el-input
                v-model="queryParams.money"
                placeholder="请输入金额"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="登陆IP" prop="loginIp">
              <el-input
                v-model="queryParams.loginIp"
                placeholder="请输入登陆IP"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="省" prop="province">
              <el-input
                v-model="queryParams.province"
                placeholder="请输入省"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="市" prop="city">
              <el-input
                v-model="queryParams.city"
                placeholder="请输入市"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="能否修改性别 1为可修改 0为不可修改" prop="isEditSex">
              <el-select v-model="queryParams.isEditSex" placeholder="请选择能否修改性别 1为可修改 0为不可修改" clearable size="small">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-form-item>
            <el-form-item label="性别 0:未知, 1-男，2-女" prop="sex">
              <el-select v-model="queryParams.sex" placeholder="请选择性别 0:未知, 1-男，2-女" clearable size="small">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-input
                v-model="queryParams.birthday"
                placeholder="请输入出生日期"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="接受推送消息 0-不接收，1-接收" prop="isRemind">
              <el-input
                v-model="queryParams.isRemind"
                placeholder="请输入接受推送消息 0-不接收，1-接收"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="关注的人数" prop="focusCount">
              <el-input
                v-model="queryParams.focusCount"
                placeholder="请输入关注的人数"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="编码" prop="code">
              <el-input
                v-model="queryParams.code"
                placeholder="请输入编码"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="新浪ID" prop="sinaId">
              <el-input
                v-model="queryParams.sinaId"
                placeholder="请输入新浪ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="新浪令牌" prop="sinaToken">
              <el-input
                v-model="queryParams.sinaToken"
                placeholder="请输入新浪令牌"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="新浪密码" prop="sinaSecret">
              <el-input
                v-model="queryParams.sinaSecret"
                placeholder="请输入新浪密码"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="新浪跳转地址" prop="sinaUrl">
              <el-input
                v-model="queryParams.sinaUrl"
                placeholder="请输入新浪跳转地址"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="腾讯ID" prop="tencentId">
              <el-input
                v-model="queryParams.tencentId"
                placeholder="请输入腾讯ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="腾讯令牌" prop="tencentToken">
              <el-input
                v-model="queryParams.tencentToken"
                placeholder="请输入腾讯令牌"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="腾讯密码" prop="tencentSecret">
              <el-input
                v-model="queryParams.tencentSecret"
                placeholder="请输入腾讯密码"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="腾讯跳转地址" prop="tencentUrl">
              <el-input
                v-model="queryParams.tencentUrl"
                placeholder="请输入腾讯跳转地址"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="验证" prop="verify">
              <el-input
                v-model="queryParams.verify"
                placeholder="请输入验证"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="用户等级;live_user_level.level" prop="userLevel">
              <el-input
                v-model="queryParams.userLevel"
                placeholder="请输入用户等级;live_user_level.level"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->

      <!--   <el-form-item label="用户类型 0指 普通用户 ，1指企业会员" prop="userType">
           <el-select v-model="queryParams.userType" placeholder="请选择用户类型 0指 普通用户 ，1指企业会员" clearable size="small">
             <el-option label="请选择字典生成" value="" />
           </el-select>
         </el-form-item>
         <el-form-item label="是否发送成功" prop="isHasSendSuccess">
           <el-input
             v-model="queryParams.isHasSendSuccess"
             placeholder="请输入是否发送成功"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="设置时间" prop="verifySettingTime">
           <el-input
             v-model="queryParams.verifySettingTime"
             placeholder="请输入设置时间"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="认证类型" prop="authenticationType">
           <el-select v-model="queryParams.authenticationType" placeholder="请选择认证类型" clearable size="small">
             <el-option label="请选择字典生成" value="" />
           </el-select>
         </el-form-item>
         <el-form-item label="认证名称" prop="authenticationName">
           <el-input
             v-model="queryParams.authenticationName"
             placeholder="请输入认证名称"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="联系方式" prop="contact">
           <el-input
             v-model="queryParams.contact"
             placeholder="请输入联系方式"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="来自平台" prop="fromPlatform">
           <el-input
             v-model="queryParams.fromPlatform"
             placeholder="请输入来自平台"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="百度百科" prop="wiki">
           <el-input
             v-model="queryParams.wiki"
             placeholder="请输入百度百科"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="微信openid" prop="wxOpenid">
           <el-input
             v-model="queryParams.wxOpenid"
             placeholder="请输入微信openid"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="公众号的微信openid" prop="gzOpenid">
           <el-input
             v-model="queryParams.gzOpenid"
             placeholder="请输入公众号的微信openid"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="QQopenid" prop="qqOpenid">
           <el-input
             v-model="queryParams.qqOpenid"
             placeholder="请输入QQopenid"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="审核信息" prop="investorSendInfo">
           <el-input
             v-model="queryParams.investorSendInfo"
             placeholder="请输入审核信息"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="提现和支付密码" prop="paypassword">
           <el-input
             v-model="queryParams.paypassword"
             placeholder="请输入提现和支付密码"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="来源url" prop="sourceUrl">
           <el-input
             v-model="queryParams.sourceUrl"
             placeholder="请输入来源url"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="推荐人id" prop="pid">
           <el-input
             v-model="queryParams.pid"
             placeholder="请输入推荐人id"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="积分" prop="score">
           <el-input
             v-model="queryParams.score"
             placeholder="请输入积分"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="信用值" prop="point">
           <el-input
             v-model="queryParams.point"
             placeholder="请输入信用值"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="情感状态" prop="emotionalState">
           <el-input
             v-model="queryParams.emotionalState"
             placeholder="请输入情感状态"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="职位" prop="job">
           <el-input
             v-model="queryParams.job"
             placeholder="请输入职位"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="QQID" prop="qqId">
           <el-input
             v-model="queryParams.qqId"
             placeholder="请输入QQID"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="QQ令牌" prop="qqToken">
           <el-input
             v-model="queryParams.qqToken"
             placeholder="请输入QQ令牌"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="认证类型:0: 未认证;1:普通认证;2:企业认证;3:支付宝认证" prop="vType">
           <el-select v-model="queryParams.vType" placeholder="请选择认证类型:0: 未认证;1:普通认证;2:企业认证;3:支付宝认证" clearable size="small">
             <el-option label="请选择字典生成" value="" />
           </el-select>
         </el-form-item>
         <el-form-item label="加v认证说明" prop="vExplain">
           <el-input
             v-model="queryParams.vExplain"
             placeholder="请输入加v认证说明"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="认证图标" prop="vIcon">
           <el-input
             v-model="queryParams.vIcon"
             placeholder="请输入认证图标"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="粉丝数" prop="fansCount">
           <el-input
             v-model="queryParams.fansCount"
             placeholder="请输入粉丝数"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="印票数" prop="ticket">
           <el-input
             v-model="queryParams.ticket"
             placeholder="请输入印票数"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="已提现的印票" prop="refundTicket">
           <el-input
             v-model="queryParams.refundTicket"
             placeholder="请输入已提现的印票"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="当前还剩钻石数" prop="diamonds">
           <el-input
             v-model="queryParams.diamonds"
             placeholder="请输入当前还剩钻石数"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="累计消费的钻石数" prop="useDiamonds">
           <el-input
             v-model="queryParams.useDiamonds"
             placeholder="请输入累计消费的钻石数"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="用户签名过期时间" prop="expiryAfter">
           <el-input
             v-model="queryParams.expiryAfter"
             placeholder="请输入用户签名过期时间"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="1:用户在线;0:不在线;通过服务端监听更新" prop="isOnline">
           <el-input
             v-model="queryParams.isOnline"
             placeholder="请输入1:用户在线;0:不在线;通过服务端监听更新"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="微信unionid" prop="wxUnionid">
           <el-input
             v-model="queryParams.wxUnionid"
             placeholder="请输入微信unionid"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="微信昵称" prop="userName">
           <el-input
             v-model="queryParams.userName"
             placeholder="请输入微信昵称"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否同步成功 : 0指同步失败 ， 1指同步成功" prop="synchronize">
           <el-input
             v-model="queryParams.synchronize"
             placeholder="请输入是否同步成功 : 0指同步失败 ， 1指同步成功"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="最近上线时间" prop="loginTime">
           <el-date-picker clearable size="small"
             v-model="queryParams.loginTime"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="选择最近上线时间">
           </el-date-picker>
         </el-form-item>
         <el-form-item label="最近下线时间" prop="logoutTime">
           <el-date-picker clearable size="small"
             v-model="queryParams.logoutTime"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="选择最近下线时间">
           </el-date-picker>
         </el-form-item>
         <el-form-item label="是否同意直播协议 0 表示不同意 1表示同意" prop="isAgree">
           <el-input
             v-model="queryParams.isAgree"
             placeholder="请输入是否同意直播协议 0 表示不同意 1表示同意"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="用户总的观看时间，单位为秒" prop="onlineTime">
           <el-input
             v-model="queryParams.onlineTime"
             placeholder="请输入用户总的观看时间，单位为秒"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否关注公众号 0未关注 1已关注" prop="subscribe">
           <el-input
             v-model="queryParams.subscribe"
             placeholder="请输入是否关注公众号 0未关注 1已关注"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="1:机器人" prop="isRobot">
           <el-input
             v-model="queryParams.isRobot"
             placeholder="请输入1:机器人"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="友盟消息推送服务对设备的唯一标识。Android的device_token是44位字符串, iOS的device-token是64位。" prop="apnsCode">
           <el-input
             v-model="queryParams.apnsCode"
             placeholder="请输入友盟消息推送服务对设备的唯一标识。Android的device_token是44位字符串, iOS的device-token是64位。"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="1:android; 2:ios" prop="deviceType">
           <el-select v-model="queryParams.deviceType" placeholder="请选择1:android; 2:ios" clearable size="small">
             <el-option label="请选择字典生成" value="" />
           </el-select>
         </el-form-item>
         <el-form-item label="可回看的直播数量" prop="videoCount">
           <el-input
             v-model="queryParams.videoCount"
             placeholder="请输入可回看的直播数量"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="禁播状态 0-正常；1-禁播" prop="isBan">
           <el-input
             v-model="queryParams.isBan"
             placeholder="请输入禁播状态 0-正常；1-禁播"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="禁播结束时间" prop="banTime">
           <el-input
             v-model="queryParams.banTime"
             placeholder="请输入禁播结束时间"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="身份证号码" prop="identifyNumber">
           <el-input
             v-model="queryParams.identifyNumber"
             placeholder="请输入身份证号码"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="live_authent_list.id 认证ID" prop="authentListId">
           <el-input
             v-model="queryParams.authentListId"
             placeholder="请输入live_authent_list.id 认证ID"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="家族ID" prop="familyId">
           <el-input
             v-model="queryParams.familyId"
             placeholder="请输入家族ID"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否家族长；0：否、1：是" prop="familyChieftain">
           <el-input
             v-model="queryParams.familyChieftain"
             placeholder="请输入是否家族长；0：否、1：是"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否系统管理员 1-是 ；0-否" prop="isAdmin">
           <el-input
             v-model="queryParams.isAdmin"
             placeholder="请输入是否系统管理员 1-是 ；0-否"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="上一次登录时的用户等级" prop="lastLoginLevel">
           <el-input
             v-model="queryParams.lastLoginLevel"
             placeholder="请输入上一次登录时的用户等级"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="上一次登录时的用户等级" prop="bindingAlipay">
           <el-input
             v-model="queryParams.bindingAlipay"
             placeholder="请输入上一次登录时的用户等级"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="上一次登录时的用户等级" prop="alipayName">
           <el-input
             v-model="queryParams.alipayName"
             placeholder="请输入上一次登录时的用户等级"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="上一次登录时的用户等级" prop="alipayAccount">
           <el-input
             v-model="queryParams.alipayAccount"
             placeholder="请输入上一次登录时的用户等级"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="直播间名称" prop="roomTitle">
           <el-input
             v-model="queryParams.roomTitle"
             placeholder="请输入直播间名称"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="靓号号码" prop="luckNum">
           <el-input
             v-model="queryParams.luckNum"
             placeholder="请输入靓号号码"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="支付宝认证的支付宝用户号" prop="alipayUserId">
           <el-input
             v-model="queryParams.alipayUserId"
             placeholder="请输入支付宝认证的支付宝用户号"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="支付宝认证 token" prop="alipayAuthentToken">
           <el-input
             v-model="queryParams.alipayAuthentToken"
             placeholder="请输入支付宝认证 token"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="分销功能 上级用户ID" prop="pUserId">
           <el-input
             v-model="queryParams.pUserId"
             placeholder="请输入分销功能 上级用户ID"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="禁播类型  0 禁止单账号直播, 1 禁止同IP直播，2 禁止同设备直播" prop="banType">
           <el-select v-model="queryParams.banType" placeholder="请选择禁播类型  0 禁止单账号直播, 1 禁止同IP直播，2 禁止同设备直播" clearable size="small">
             <el-option label="请选择字典生成" value="" />
           </el-select>
         </el-form-item>
         <el-form-item label="公会id" prop="societyId">
           <el-input
             v-model="queryParams.societyId"
             placeholder="请输入公会id"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否公会长；0：否、1：是" prop="societyChieftain">
           <el-input
             v-model="queryParams.societyChieftain"
             placeholder="请输入是否公会长；0：否、1：是"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="结算方式；0：对私结算、1：对公结算" prop="societySettlementType">
           <el-select v-model="queryParams.societySettlementType" placeholder="请选择结算方式；0：对私结算、1：对公结算" clearable size="small">
             <el-option label="请选择字典生成" value="" />
           </el-select>
         </el-form-item>
         <el-form-item label="是否VIP会员；0：否、1：是" prop="isVip">
           <el-input
             v-model="queryParams.isVip"
             placeholder="请输入是否VIP会员；0：否、1：是"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="会员到期时间" prop="vipExpireTime">
           <el-input
             v-model="queryParams.vipExpireTime"
             placeholder="请输入会员到期时间"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="游戏币" prop="coin">
           <el-input
             v-model="queryParams.coin"
             placeholder="请输入游戏币"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否全局永久禁言 1-是，0-否" prop="isNospeaking">
           <el-input
             v-model="queryParams.isNospeaking"
             placeholder="请输入是否全局永久禁言 1-是，0-否"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="公会主播上缴的印票" prop="societyTicket">
           <el-input
             v-model="queryParams.societyTicket"
             placeholder="请输入公会主播上缴的印票"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="累计观看次数;累计观看次数明显大于其它用户观看次数时，及有可能是盗连接用户，需要禁用它" prop="viewCount">
           <el-input
             v-model="queryParams.viewCount"
             placeholder="请输入累计观看次数;累计观看次数明显大于其它用户观看次数时，及有可能是盗连接用户，需要禁用它"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="禁热门 0-正常；1-禁止" prop="isHotOn">
           <el-input
             v-model="queryParams.isHotOn"
             placeholder="请输入禁热门 0-正常；1-禁止"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="干预系数，0-100,0表示无干预，全部随机结果、100表示完全干预，收益最大" prop="rate">
           <el-input
             v-model="queryParams.rate"
             placeholder="请输入干预系数，0-100,0表示无干预，全部随机结果、100表示完全干预，收益最大"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="上级分销者ID" prop="gameDistributionId">
           <el-input
             v-model="queryParams.gameDistributionId"
             placeholder="请输入上级分销者ID"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="游戏一级分销抽成比例" prop="gameDistribution1">
           <el-input
             v-model="queryParams.gameDistribution1"
             placeholder="请输入游戏一级分销抽成比例"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="游戏二级分销抽成比例" prop="gameDistribution2">
           <el-input
             v-model="queryParams.gameDistribution2"
             placeholder="请输入游戏二级分销抽成比例"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="邀请码" prop="invitationCode">
           <el-input
             v-model="queryParams.invitationCode"
             placeholder="请输入邀请码"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="邀请人" prop="invitationId">
           <el-input
             v-model="queryParams.invitationId"
             placeholder="请输入邀请人"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="邀请人" prop="gameDistributionTopId">
           <el-input
             v-model="queryParams.gameDistributionTopId"
             placeholder="请输入邀请人"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="审核失败时间" prop="investorTime">
           <el-input
             v-model="queryParams.investorTime"
             placeholder="请输入审核失败时间"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="设置主播提现比例,如果为空,则使用后台通用比例" prop="aloneTicketRatio">
           <el-input
             v-model="queryParams.aloneTicketRatio"
             placeholder="请输入设置主播提现比例,如果为空,则使用后台通用比例"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否开启游戏  0为 禁用 1 为不禁用" prop="openGame">
           <el-input
             v-model="queryParams.openGame"
             placeholder="请输入是否开启游戏  0为 禁用 1 为不禁用"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否开启付费 0为 禁用 1 为不禁用" prop="openPay">
           <el-input
             v-model="queryParams.openPay"
             placeholder="请输入是否开启付费 0为 禁用 1 为不禁用"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否开启竞拍  0为 禁用 1 为不禁用" prop="openAuction">
           <el-input
             v-model="queryParams.openAuction"
             placeholder="请输入是否开启竞拍  0为 禁用 1 为不禁用"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="家族推荐号 填写后审核通过自动加入相对应的家族" prop="familyRecom">
           <el-input
             v-model="queryParams.familyRecom"
             placeholder="请输入家族推荐号 填写后审核通过自动加入相对应的家族"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="分类id" prop="classifiedId">
           <el-input
             v-model="queryParams.classifiedId"
             placeholder="请输入分类id"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="通联支付的用户ID(在通联网站的注册的userID)" prop="allinpayUserId">
           <el-input
             v-model="queryParams.allinpayUserId"
             placeholder="请输入通联支付的用户ID(在通联网站的注册的userID)"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="特权机器人送出的亲贝" prop="noTicket">
           <el-input
             v-model="queryParams.noTicket"
             placeholder="请输入特权机器人送出的亲贝"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="0未开启机器人礼物账号特权，1开启机器人礼物账号特权" prop="roboter">
           <el-input
             v-model="queryParams.roboter"
             placeholder="请输入0未开启机器人礼物账号特权，1开启机器人礼物账号特权"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否修改过昵称" prop="isChangeName">
           <el-input
             v-model="queryParams.isChangeName"
             placeholder="请输入是否修改过昵称"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否过更换QQ头像 ，0 否；1是" prop="isReplaceQq">
           <el-input
             v-model="queryParams.isReplaceQq"
             placeholder="请输入是否过更换QQ头像 ，0 否；1是"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否过更换微信头像 ，0 否；1是" prop="isReplaceWx">
           <el-input
             v-model="queryParams.isReplaceWx"
             placeholder="请输入是否过更换微信头像 ，0 否；1是"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="动态数" prop="weiboCount">
           <el-input
             v-model="queryParams.weiboCount"
             placeholder="请输入动态数"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="动态权重" prop="weiboSortNum">
           <el-input
             v-model="queryParams.weiboSortNum"
             placeholder="请输入动态权重"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="推荐权重" prop="weiboRecommendWeight">
           <el-input
             v-model="queryParams.weiboRecommendWeight"
             placeholder="请输入推荐权重"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="微信账号" prop="weixinAccount">
           <el-input
             v-model="queryParams.weixinAccount"
             placeholder="请输入微信账号"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="微信价格" prop="weixinPrice">
           <el-input
             v-model="queryParams.weixinPrice"
             placeholder="请输入微信价格"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="经度" prop="xpoint">
           <el-input
             v-model="queryParams.xpoint"
             placeholder="请输入经度"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="纬度" prop="ypoint">
           <el-input
             v-model="queryParams.ypoint"
             placeholder="请输入纬度"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="已提现金额" prop="weiboRefundMoney">
           <el-input
             v-model="queryParams.weiboRefundMoney"
             placeholder="请输入已提现金额"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="主播获得的金额" prop="weiboMoney">
           <el-input
             v-model="queryParams.weiboMoney"
             placeholder="请输入主播获得的金额"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="被举报的次数" prop="tipoffCount">
           <el-input
             v-model="queryParams.tipoffCount"
             placeholder="请输入被举报的次数"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="会员中心海报" prop="weiboPhotoImg">
           <el-input
             v-model="queryParams.weiboPhotoImg"
             placeholder="请输入会员中心海报"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="聊天价格" prop="weiboChatPrice">
           <el-input
             v-model="queryParams.weiboChatPrice"
             placeholder="请输入聊天价格"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="微信更新时间" prop="weixinAccountTime">
           <el-date-picker clearable size="small"
             v-model="queryParams.weixinAccountTime"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="选择微信更新时间">
           </el-date-picker>
         </el-form-item>
         <el-form-item label="分成计划中的推广人id" prop="autoInvitationSid">
           <el-input
             v-model="queryParams.autoInvitationSid"
             placeholder="请输入分成计划中的推广人id"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="代理有后台的id" prop="agentId">
           <el-input
             v-model="queryParams.agentId"
             placeholder="请输入代理有后台的id"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="座驾id" prop="nobleCarId">
           <el-input
             v-model="queryParams.nobleCarId"
             placeholder="请输入座驾id"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="是否开启送礼物主播没收益0否1是" prop="isGiftGiving">
           <el-input
             v-model="queryParams.isGiftGiving"
             placeholder="请输入是否开启送礼物主播没收益0否1是"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="分销" prop="qrCode">
           <el-input
             v-model="queryParams.qrCode"
             placeholder="请输入分销"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="分销" prop="totalTime">
           <el-input
             v-model="queryParams.totalTime"
             placeholder="请输入分销"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="邀请审核" prop="pUserShenhe">
           <el-input
             v-model="queryParams.pUserShenhe"
             placeholder="请输入邀请审核"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="主播提现比例" prop="ticketCattyRatio">
           <el-input
             v-model="queryParams.ticketCattyRatio"
             placeholder="请输入主播提现比例"
             clearable
             size="small"
             @keyup.enter.native="handleQuery"
           />
         </el-form-item>
         <el-form-item label="主播禁播原因" prop="banRemark">
           <el-input
             v-model="queryParams.banRemark"
             placeholder="请输入主播禁播原因"
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
          v-hasPermi="['admin:liveUser:add']"
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
          v-hasPermi="['admin:liveUser:edit']"
        >修改
        </el-button>
      </el-col>
<!--      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['admin:liveUser:remove']"
        >删除
        </el-button>
      </el-col>-->
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

    <el-table v-loading="loading" :data="liveUserList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="主播ID" align="center" prop="id"/>
      <el-table-column label="主播昵称" align="center" prop="nickName"/>
      <el-table-column label="头像" align="center" prop="headImage">
        <template slot-scope="scope">
          <a :href="scope.row.headImage" target="_blank">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.headImage"
          >
          </el-image>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="家族ID" align="center" prop="familyId">
        <template v-slot="{row}">
          <el-button @click="getFamiily(row)">{{row.familyId}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="已认证" align="center" prop="authenticationType"/>
      <el-table-column label="印票" align="center" prop="ticket"/>
      <el-table-column label="可用印票" align="center" prop="ticket"/>
      <el-table-column label="粉丝" align="center" prop="fansCount"/>
      <el-table-column label="等级" align="center" prop="userLevel"/>
      <el-table-column label="禁播状态" align="center" prop="isBanStr" :formatter="formatterIsBan">
        <template v-slot="{row}">
<!--          <el-button type="primary" size="mini" @click="displayCheck(row,1)" v-if="row.isBan===0">是</el-button>
          <el-button type="info" size="mini" @click="displayCheck(row,0)" v-if="row.isBan===1">否</el-button>-->
          <el-switch
            on-text ="是"
            off-text = "否"
            active-value="0"
            inactive-value="1"
            on-color="#5B7BFA"
            off-color="#dadde5"
            v-model="row.isBanStr"
            @change=displayCheck(row)
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="累计观看" align="center" prop="viewCount"/>
      <el-table-column label="登陆IP" align="center" prop="loginIp"/>
      <el-table-column label="情感状态" align="center" prop="emotionalState">
      </el-table-column>
      <el-table-column label="直播状态" align="center" prop="emotionalState"/>
      <el-table-column label="禁播备注" align="center" prop="banRemark"/>


      <!--   <el-table-column label="用户密码" align="center" prop="userPwd" />
         <el-table-column label="个性签名" align="center" prop="signature" />
         <el-table-column label="是否认证 0指未认证  1指待审核 2指认证 3指审核不通过" align="center" prop="isAuthentication" />
         <el-table-column label="0：微信；1：QQ；2：手机；3：微博 ;4 : 游客登录" align="center" prop="loginType" />
         <el-table-column label="有效性标识" align="center" prop="isEffect" />
         <el-table-column label="金额" align="center" prop="money" />

         <el-table-column label="省" align="center" prop="province" />
         <el-table-column label="市" align="center" prop="city" />
         <el-table-column label="能否修改性别 1为可修改 0为不可修改" align="center" prop="isEditSex" />
         <el-table-column label="性别 0:未知, 1-男，2-女" align="center" prop="sex" />
         <el-table-column label="出生日期" align="center" prop="birthday" />
         <el-table-column label="接受推送消息 0-不接收，1-接收" align="center" prop="isRemind" />
         <el-table-column label="关注的人数" align="center" prop="focusCount" />
         <el-table-column label="个人简介" align="center" prop="intro" />
         <el-table-column label="编码" align="center" prop="code" />
         <el-table-column label="新浪ID" align="center" prop="sinaId" />
         <el-table-column label="新浪令牌" align="center" prop="sinaToken" />
         <el-table-column label="新浪密码" align="center" prop="sinaSecret" />
         <el-table-column label="新浪跳转地址" align="center" prop="sinaUrl" />
         <el-table-column label="腾讯ID" align="center" prop="tencentId" />
         <el-table-column label="腾讯令牌" align="center" prop="tencentToken" />
         <el-table-column label="腾讯密码" align="center" prop="tencentSecret" />
         <el-table-column label="腾讯跳转地址" align="center" prop="tencentUrl" />
         <el-table-column label="验证" align="center" prop="verify" />

         <el-table-column label="手机号" align="center" prop="mobile" />
         <el-table-column label="用户类型 0指 普通用户 ，1指企业会员" align="center" prop="userType" />
         <el-table-column label="是否发送成功" align="center" prop="isHasSendSuccess" />
         <el-table-column label="设置时间" align="center" prop="verifySettingTime" />

         <el-table-column label="认证名称" align="center" prop="authenticationName" />
         <el-table-column label="联系方式" align="center" prop="contact" />
         <el-table-column label="来自平台" align="center" prop="fromPlatform" />
         <el-table-column label="百度百科" align="center" prop="wiki" />
         <el-table-column label="手持身份证照片" align="center" prop="identifyHoldImage" />
         <el-table-column label="身份证正面" align="center" prop="identifyPositiveImage" />
         <el-table-column label="身份证反面" align="center" prop="identifyNagativeImage" />
         <el-table-column label="微信openid" align="center" prop="wxOpenid" />
         <el-table-column label="公众号的微信openid" align="center" prop="gzOpenid" />
         <el-table-column label="QQopenid" align="center" prop="qqOpenid" />
         <el-table-column label="审核信息" align="center" prop="investorSendInfo" />
         <el-table-column label="提现和支付密码" align="center" prop="paypassword" />
         <el-table-column label="来源url" align="center" prop="sourceUrl" />
         <el-table-column label="推荐人id" align="center" prop="pid" />
         <el-table-column label="积分" align="center" prop="score" />
         <el-table-column label="信用值" align="center" prop="point" />

         <el-table-column label="职位" align="center" prop="job" />
         <el-table-column label="用户头像" align="center" prop="headImage" />
         <el-table-column label="头像缩略图" align="center" prop="thumbHeadImage" />
         <el-table-column label="QQID" align="center" prop="qqId" />
         <el-table-column label="QQ令牌" align="center" prop="qqToken" />
         <el-table-column label="认证类型:0: 未认证;1:普通认证;2:企业认证;3:支付宝认证" align="center" prop="vType" />
         <el-table-column label="加v认证说明" align="center" prop="vExplain" />
         <el-table-column label="认证图标" align="center" prop="vIcon" />


         <el-table-column label="已提现的印票" align="center" prop="refundTicket" />
         <el-table-column label="当前还剩钻石数" align="center" prop="diamonds" />
         <el-table-column label="累计消费的钻石数" align="center" prop="useDiamonds" />
         <el-table-column label="用户签名" align="center" prop="usersig" />
         <el-table-column label="用户签名过期时间" align="center" prop="expiryAfter" />
         <el-table-column label="1:用户在线;0:不在线;通过服务端监听更新" align="center" prop="isOnline" />
         <el-table-column label="微信unionid" align="center" prop="wxUnionid" />
         <el-table-column label="微信昵称" align="center" prop="userName" />
         <el-table-column label="是否同步成功 : 0指同步失败 ， 1指同步成功" align="center" prop="synchronize" />
         <el-table-column label="最近上线时间" align="center" prop="loginTime" width="180">
           <template slot-scope="scope">
             <span>{{ parseTime(scope.row.loginTime, '{y}-{m}-{d}') }}</span>
           </template>
         </el-table-column>
         <el-table-column label="最近下线时间" align="center" prop="logoutTime" width="180">
           <template slot-scope="scope">
             <span>{{ parseTime(scope.row.logoutTime, '{y}-{m}-{d}') }}</span>
           </template>
         </el-table-column>
         <el-table-column label="是否同意直播协议 0 表示不同意 1表示同意" align="center" prop="isAgree" />
         <el-table-column label="用户总的观看时间，单位为秒" align="center" prop="onlineTime" />
         <el-table-column label="是否关注公众号 0未关注 1已关注" align="center" prop="subscribe" />
         <el-table-column label="1:机器人" align="center" prop="isRobot" />
         <el-table-column label="友盟消息推送服务对设备的唯一标识。Android的device_token是44位字符串, iOS的device-token是64位。" align="center" prop="apnsCode" />
         <el-table-column label="1:android; 2:ios" align="center" prop="deviceType" />
         <el-table-column label="可回看的直播数量" align="center" prop="videoCount" />

         <el-table-column label="禁播结束时间" align="center" prop="banTime" />
         <el-table-column label="身份证号码" align="center" prop="identifyNumber" />
         <el-table-column label="live_authent_list.id 认证ID" align="center" prop="authentListId" />

         <el-table-column label="是否家族长；0：否、1：是" align="center" prop="familyChieftain" />
         <el-table-column label="是否系统管理员 1-是 ；0-否" align="center" prop="isAdmin" />
         <el-table-column label="上一次登录时的用户等级" align="center" prop="lastLoginLevel" />
         <el-table-column label="上一次登录时的用户等级" align="center" prop="bindingAlipay" />
         <el-table-column label="上一次登录时的用户等级" align="center" prop="alipayName" />
         <el-table-column label="上一次登录时的用户等级" align="center" prop="alipayAccount" />
         <el-table-column label="直播间名称" align="center" prop="roomTitle" />
         <el-table-column label="靓号号码" align="center" prop="luckNum" />
         <el-table-column label="支付宝认证的支付宝用户号" align="center" prop="alipayUserId" />
         <el-table-column label="支付宝认证 token" align="center" prop="alipayAuthentToken" />
         <el-table-column label="分销功能 上级用户ID" align="center" prop="pUserId" />
         <el-table-column label="禁播类型  0 禁止单账号直播, 1 禁止同IP直播，2 禁止同设备直播" align="center" prop="banType" />
         <el-table-column label="公会id" align="center" prop="societyId" />
         <el-table-column label="是否公会长；0：否、1：是" align="center" prop="societyChieftain" />
         <el-table-column label="结算方式；0：对私结算、1：对公结算" align="center" prop="societySettlementType" />
         <el-table-column label="是否VIP会员；0：否、1：是" align="center" prop="isVip" />
         <el-table-column label="会员到期时间" align="center" prop="vipExpireTime" />
         <el-table-column label="游戏币" align="center" prop="coin" />
         <el-table-column label="是否全局永久禁言 1-是，0-否" align="center" prop="isNospeaking" />
         <el-table-column label="公会主播上缴的印票" align="center" prop="societyTicket" />

         <el-table-column label="禁热门 0-正常；1-禁止" align="center" prop="isHotOn" />
         <el-table-column label="干预系数，0-100,0表示无干预，全部随机结果、100表示完全干预，收益最大" align="center" prop="rate" />
         <el-table-column label="上级分销者ID" align="center" prop="gameDistributionId" />
         <el-table-column label="游戏一级分销抽成比例" align="center" prop="gameDistribution1" />
         <el-table-column label="游戏二级分销抽成比例" align="center" prop="gameDistribution2" />
         <el-table-column label="邀请码" align="center" prop="invitationCode" />
         <el-table-column label="邀请人" align="center" prop="invitationId" />
         <el-table-column label="邀请人" align="center" prop="gameDistributionTopId" />
         <el-table-column label="审核失败时间" align="center" prop="investorTime" />
         <el-table-column label="设置主播提现比例,如果为空,则使用后台通用比例" align="center" prop="aloneTicketRatio" />
         <el-table-column label="是否开启游戏  0为 禁用 1 为不禁用" align="center" prop="openGame" />
         <el-table-column label="是否开启付费 0为 禁用 1 为不禁用" align="center" prop="openPay" />
         <el-table-column label="是否开启竞拍  0为 禁用 1 为不禁用" align="center" prop="openAuction" />
         <el-table-column label="家族推荐号 填写后审核通过自动加入相对应的家族" align="center" prop="familyRecom" />
         <el-table-column label="分类id" align="center" prop="classifiedId" />
         <el-table-column label="通联支付的用户ID(在通联网站的注册的userID)" align="center" prop="allinpayUserId" />
         <el-table-column label="特权机器人送出的亲贝" align="center" prop="noTicket" />
         <el-table-column label="0未开启机器人礼物账号特权，1开启机器人礼物账号特权" align="center" prop="roboter" />
         <el-table-column label="是否修改过昵称" align="center" prop="isChangeName" />
         <el-table-column label="是否过更换QQ头像 ，0 否；1是" align="center" prop="isReplaceQq" />
         <el-table-column label="是否过更换微信头像 ，0 否；1是" align="center" prop="isReplaceWx" />
         <el-table-column label="动态数" align="center" prop="weiboCount" />
         <el-table-column label="动态权重" align="center" prop="weiboSortNum" />
         <el-table-column label="推荐权重" align="center" prop="weiboRecommendWeight" />
         <el-table-column label="微信账号" align="center" prop="weixinAccount" />
         <el-table-column label="微信价格" align="center" prop="weixinPrice" />
         <el-table-column label="经度" align="center" prop="xpoint" />
         <el-table-column label="纬度" align="center" prop="ypoint" />
         <el-table-column label="展示图片列表" align="center" prop="showImage" />
         <el-table-column label="已提现金额" align="center" prop="weiboRefundMoney" />
         <el-table-column label="主播获得的金额" align="center" prop="weiboMoney" />
         <el-table-column label="被举报的次数" align="center" prop="tipoffCount" />
         <el-table-column label="会员中心海报" align="center" prop="weiboPhotoImg" />
         <el-table-column label="聊天价格" align="center" prop="weiboChatPrice" />
         <el-table-column label="微信更新时间" align="center" prop="weixinAccountTime" width="180">
           <template slot-scope="scope">
             <span>{{ parseTime(scope.row.weixinAccountTime, '{y}-{m}-{d}') }}</span>
           </template>
         </el-table-column>
         <el-table-column label="分成计划中的推广人id" align="center" prop="autoInvitationSid" />
         <el-table-column label="代理有后台的id" align="center" prop="agentId" />
         <el-table-column label="座驾id" align="center" prop="nobleCarId" />
         <el-table-column label="是否开启送礼物主播没收益0否1是" align="center" prop="isGiftGiving" />
         <el-table-column label="分销" align="center" prop="qrCode" />
         <el-table-column label="分销" align="center" prop="totalTime" />
         <el-table-column label="邀请审核" align="center" prop="pUserShenhe" />
         <el-table-column label="主播提现比例" align="center" prop="ticketCattyRatio" />
        -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
<!--          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveUser:edit']"
          >修改
          </el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-menu"
            @click="handleMore(scope.row)"
            v-hasPermi="['admin:memberInfo:remove']"
          >更多
          </el-button>
          <!--          <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-delete"
                      @click="handleDelete(scope.row)"
                      v-hasPermi="['admin:liveUser:remove']"
                    >删除</el-button>-->
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

    <!-- 添加或修改//用户信息对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="主播昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入用户昵称"/>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="能否修改性别 1为可修改 0为不可修改" prop="isEditSex">
          <el-select v-model="form.isEditSex" placeholder="请选择能否修改性别 1为可修改 0为不可修改">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="会员等级;live_user_level.level" prop="userLevel">
          <el-input v-model="form.userLevel" placeholder="请输入用户等级;live_user_level.level"/>
        </el-form-item>
        <el-form-item label="个性签名" prop="signature">
          <el-input v-model="form.signature" type="textarea" placeholder="请输入内容"/>
        </el-form-item>





        <el-form-item label="用户密码" prop="userPwd">
          <el-input v-model="form.userPwd" placeholder="请输入用户密码"/>
        </el-form-item>

        <el-form-item label="是否认证 0指未认证  1指待审核 2指认证 3指审核不通过" prop="isAuthentication">
          <el-input v-model="form.isAuthentication" placeholder="请输入是否认证 0指未认证  1指待审核 2指认证 3指审核不通过"/>
        </el-form-item>
        <el-form-item label="0：微信；1：QQ；2：手机；3：微博 ;4 : 游客登录" prop="loginType">
          <el-select v-model="form.loginType" placeholder="请选择0：微信；1：QQ；2：手机；3：微博 ;4 : 游客登录">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="有效性标识" prop="isEffect">
          <el-input v-model="form.isEffect" placeholder="请输入有效性标识"/>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入金额"/>
        </el-form-item>
        <el-form-item label="登陆IP" prop="loginIp">
          <el-input v-model="form.loginIp" placeholder="请输入登陆IP"/>
        </el-form-item>
        <el-form-item label="省" prop="province">
          <el-input v-model="form.province" placeholder="请输入省"/>
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input v-model="form.city" placeholder="请输入市"/>
        </el-form-item>

        <el-form-item label="性别 0:未知, 1-男，2-女" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别 0:未知, 1-男，2-女">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-input v-model="form.birthday" placeholder="请输入出生日期"/>
        </el-form-item>
        <el-form-item label="接受推送消息 0-不接收，1-接收" prop="isRemind">
          <el-input v-model="form.isRemind" placeholder="请输入接受推送消息 0-不接收，1-接收"/>
        </el-form-item>
        <el-form-item label="关注的人数" prop="focusCount">
          <el-input v-model="form.focusCount" placeholder="请输入关注的人数"/>
        </el-form-item>
        <el-form-item label="个人简介" prop="intro">
          <el-input v-model="form.intro" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入编码"/>
        </el-form-item>
        <el-form-item label="新浪ID" prop="sinaId">
          <el-input v-model="form.sinaId" placeholder="请输入新浪ID"/>
        </el-form-item>
        <el-form-item label="新浪令牌" prop="sinaToken">
          <el-input v-model="form.sinaToken" placeholder="请输入新浪令牌"/>
        </el-form-item>
        <el-form-item label="新浪密码" prop="sinaSecret">
          <el-input v-model="form.sinaSecret" placeholder="请输入新浪密码"/>
        </el-form-item>
        <el-form-item label="新浪跳转地址" prop="sinaUrl">
          <el-input v-model="form.sinaUrl" placeholder="请输入新浪跳转地址"/>
        </el-form-item>
        <el-form-item label="腾讯ID" prop="tencentId">
          <el-input v-model="form.tencentId" placeholder="请输入腾讯ID"/>
        </el-form-item>
        <el-form-item label="腾讯令牌" prop="tencentToken">
          <el-input v-model="form.tencentToken" placeholder="请输入腾讯令牌"/>
        </el-form-item>
        <el-form-item label="腾讯密码" prop="tencentSecret">
          <el-input v-model="form.tencentSecret" placeholder="请输入腾讯密码"/>
        </el-form-item>
        <el-form-item label="腾讯跳转地址" prop="tencentUrl">
          <el-input v-model="form.tencentUrl" placeholder="请输入腾讯跳转地址"/>
        </el-form-item>
        <el-form-item label="验证" prop="verify">
          <el-input v-model="form.verify" placeholder="请输入验证"/>
        </el-form-item>


        <el-form-item label="用户类型 0指 普通用户 ，1指企业会员" prop="userType">
          <el-select v-model="form.userType" placeholder="请选择用户类型 0指 普通用户 ，1指企业会员">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否发送成功" prop="isHasSendSuccess">
          <el-input v-model="form.isHasSendSuccess" placeholder="请输入是否发送成功"/>
        </el-form-item>
        <el-form-item label="设置时间" prop="verifySettingTime">
          <el-input v-model="form.verifySettingTime" placeholder="请输入设置时间"/>
        </el-form-item>
        <el-form-item label="认证类型" prop="authenticationType">
          <el-select v-model="form.authenticationType" placeholder="请选择认证类型">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="认证名称" prop="authenticationName">
          <el-input v-model="form.authenticationName" placeholder="请输入认证名称"/>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="form.contact" placeholder="请输入联系方式"/>
        </el-form-item>
        <el-form-item label="来自平台" prop="fromPlatform">
          <el-input v-model="form.fromPlatform" placeholder="请输入来自平台"/>
        </el-form-item>
        <el-form-item label="百度百科" prop="wiki">
          <el-input v-model="form.wiki" placeholder="请输入百度百科"/>
        </el-form-item>
        <el-form-item label="手持身份证照片">
          <imageUpload v-model="form.identifyHoldImage"/>
        </el-form-item>
        <el-form-item label="身份证正面">
          <imageUpload v-model="form.identifyPositiveImage"/>
        </el-form-item>
        <el-form-item label="身份证反面">
          <imageUpload v-model="form.identifyNagativeImage"/>
        </el-form-item>
        <el-form-item label="微信openid" prop="wxOpenid">
          <el-input v-model="form.wxOpenid" placeholder="请输入微信openid"/>
        </el-form-item>
        <el-form-item label="公众号的微信openid" prop="gzOpenid">
          <el-input v-model="form.gzOpenid" placeholder="请输入公众号的微信openid"/>
        </el-form-item>
        <el-form-item label="QQopenid" prop="qqOpenid">
          <el-input v-model="form.qqOpenid" placeholder="请输入QQopenid"/>
        </el-form-item>
        <el-form-item label="审核信息" prop="investorSendInfo">
          <el-input v-model="form.investorSendInfo" placeholder="请输入审核信息"/>
        </el-form-item>
        <el-form-item label="提现和支付密码" prop="paypassword">
          <el-input v-model="form.paypassword" placeholder="请输入提现和支付密码"/>
        </el-form-item>
        <el-form-item label="来源url" prop="sourceUrl">
          <el-input v-model="form.sourceUrl" placeholder="请输入来源url"/>
        </el-form-item>
        <el-form-item label="推荐人id" prop="pid">
          <el-input v-model="form.pid" placeholder="请输入推荐人id"/>
        </el-form-item>
        <el-form-item label="积分" prop="score">
          <el-input v-model="form.score" placeholder="请输入积分"/>
        </el-form-item>
        <el-form-item label="信用值" prop="point">
          <el-input v-model="form.point" placeholder="请输入信用值"/>
        </el-form-item>
        <el-form-item label="情感状态" prop="emotionalState">
          <el-input v-model="form.emotionalState" placeholder="请输入情感状态"/>
        </el-form-item>
        <el-form-item label="职位" prop="job">
          <el-input v-model="form.job" placeholder="请输入职位"/>
        </el-form-item>
        <el-form-item label="用户头像">
          <imageUpload v-model="form.headImage"/>
        </el-form-item>
        <el-form-item label="头像缩略图">
          <imageUpload v-model="form.thumbHeadImage"/>
        </el-form-item>
        <el-form-item label="QQID" prop="qqId">
          <el-input v-model="form.qqId" placeholder="请输入QQID"/>
        </el-form-item>
        <el-form-item label="QQ令牌" prop="qqToken">
          <el-input v-model="form.qqToken" placeholder="请输入QQ令牌"/>
        </el-form-item>
        <el-form-item label="认证类型:0: 未认证;1:普通认证;2:企业认证;3:支付宝认证" prop="vType">
          <el-select v-model="form.vType" placeholder="请选择认证类型:0: 未认证;1:普通认证;2:企业认证;3:支付宝认证">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="加v认证说明" prop="vExplain">
          <el-input v-model="form.vExplain" placeholder="请输入加v认证说明"/>
        </el-form-item>
        <el-form-item label="认证图标" prop="vIcon">
          <el-input v-model="form.vIcon" placeholder="请输入认证图标"/>
        </el-form-item>
        <el-form-item label="粉丝数" prop="fansCount">
          <el-input v-model="form.fansCount" placeholder="请输入粉丝数"/>
        </el-form-item>
        <el-form-item label="印票数" prop="ticket">
          <el-input v-model="form.ticket" placeholder="请输入印票数"/>
        </el-form-item>
        <el-form-item label="已提现的印票" prop="refundTicket">
          <el-input v-model="form.refundTicket" placeholder="请输入已提现的印票"/>
        </el-form-item>
        <el-form-item label="当前还剩钻石数" prop="diamonds">
          <el-input v-model="form.diamonds" placeholder="请输入当前还剩钻石数"/>
        </el-form-item>
        <el-form-item label="累计消费的钻石数" prop="useDiamonds">
          <el-input v-model="form.useDiamonds" placeholder="请输入累计消费的钻石数"/>
        </el-form-item>
        <el-form-item label="用户签名" prop="usersig">
          <el-input v-model="form.usersig" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="用户签名过期时间" prop="expiryAfter">
          <el-input v-model="form.expiryAfter" placeholder="请输入用户签名过期时间"/>
        </el-form-item>
        <el-form-item label="1:用户在线;0:不在线;通过服务端监听更新" prop="isOnline">
          <el-input v-model="form.isOnline" placeholder="请输入1:用户在线;0:不在线;通过服务端监听更新"/>
        </el-form-item>
        <el-form-item label="微信unionid" prop="wxUnionid">
          <el-input v-model="form.wxUnionid" placeholder="请输入微信unionid"/>
        </el-form-item>
        <el-form-item label="微信昵称" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入微信昵称"/>
        </el-form-item>
        <el-form-item label="是否同步成功 : 0指同步失败 ， 1指同步成功" prop="synchronize">
          <el-input v-model="form.synchronize" placeholder="请输入是否同步成功 : 0指同步失败 ， 1指同步成功"/>
        </el-form-item>
        <el-form-item label="最近上线时间" prop="loginTime">
          <el-date-picker clearable size="small"
                          v-model="form.loginTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择最近上线时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最近下线时间" prop="logoutTime">
          <el-date-picker clearable size="small"
                          v-model="form.logoutTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择最近下线时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否同意直播协议 0 表示不同意 1表示同意" prop="isAgree">
          <el-input v-model="form.isAgree" placeholder="请输入是否同意直播协议 0 表示不同意 1表示同意"/>
        </el-form-item>
        <el-form-item label="用户总的观看时间，单位为秒" prop="onlineTime">
          <el-input v-model="form.onlineTime" placeholder="请输入用户总的观看时间，单位为秒"/>
        </el-form-item>
        <el-form-item label="是否关注公众号 0未关注 1已关注" prop="subscribe">
          <el-input v-model="form.subscribe" placeholder="请输入是否关注公众号 0未关注 1已关注"/>
        </el-form-item>
        <el-form-item label="1:机器人" prop="isRobot">
          <el-input v-model="form.isRobot" placeholder="请输入1:机器人"/>
        </el-form-item>
        <el-form-item label="友盟消息推送服务对设备的唯一标识。Android的device_token是44位字符串, iOS的device-token是64位。" prop="apnsCode">
          <el-input v-model="form.apnsCode"
                    placeholder="请输入友盟消息推送服务对设备的唯一标识。Android的device_token是44位字符串, iOS的device-token是64位。"/>
        </el-form-item>
        <el-form-item label="1:android; 2:ios" prop="deviceType">
          <el-select v-model="form.deviceType" placeholder="请选择1:android; 2:ios">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="可回看的直播数量" prop="videoCount">
          <el-input v-model="form.videoCount" placeholder="请输入可回看的直播数量"/>
        </el-form-item>
        <el-form-item label="禁播状态 0-正常；1-禁播" prop="isBan">
          <el-input v-model="form.isBan" placeholder="请输入禁播状态 0-正常；1-禁播"/>
        </el-form-item>
        <el-form-item label="禁播结束时间" prop="banTime">
          <el-input v-model="form.banTime" placeholder="请输入禁播结束时间"/>
        </el-form-item>
        <el-form-item label="身份证号码" prop="identifyNumber">
          <el-input v-model="form.identifyNumber" placeholder="请输入身份证号码"/>
        </el-form-item>
        <el-form-item label="live_authent_list.id 认证ID" prop="authentListId">
          <el-input v-model="form.authentListId" placeholder="请输入live_authent_list.id 认证ID"/>
        </el-form-item>
        <el-form-item label="家族ID" prop="familyId">
          <el-input v-model="form.familyId" placeholder="请输入家族ID"/>
        </el-form-item>
        <el-form-item label="是否家族长；0：否、1：是" prop="familyChieftain">
          <el-input v-model="form.familyChieftain" placeholder="请输入是否家族长；0：否、1：是"/>
        </el-form-item>
        <el-form-item label="是否系统管理员 1-是 ；0-否" prop="isAdmin">
          <el-input v-model="form.isAdmin" placeholder="请输入是否系统管理员 1-是 ；0-否"/>
        </el-form-item>
        <el-form-item label="上一次登录时的用户等级" prop="lastLoginLevel">
          <el-input v-model="form.lastLoginLevel" placeholder="请输入上一次登录时的用户等级"/>
        </el-form-item>
        <el-form-item label="上一次登录时的用户等级" prop="bindingAlipay">
          <el-input v-model="form.bindingAlipay" placeholder="请输入上一次登录时的用户等级"/>
        </el-form-item>
        <el-form-item label="上一次登录时的用户等级" prop="alipayName">
          <el-input v-model="form.alipayName" placeholder="请输入上一次登录时的用户等级"/>
        </el-form-item>
        <el-form-item label="上一次登录时的用户等级" prop="alipayAccount">
          <el-input v-model="form.alipayAccount" placeholder="请输入上一次登录时的用户等级"/>
        </el-form-item>
        <el-form-item label="直播间名称" prop="roomTitle">
          <el-input v-model="form.roomTitle" placeholder="请输入直播间名称"/>
        </el-form-item>
        <el-form-item label="靓号号码" prop="luckNum">
          <el-input v-model="form.luckNum" placeholder="请输入靓号号码"/>
        </el-form-item>
        <el-form-item label="支付宝认证的支付宝用户号" prop="alipayUserId">
          <el-input v-model="form.alipayUserId" placeholder="请输入支付宝认证的支付宝用户号"/>
        </el-form-item>
        <el-form-item label="支付宝认证 token" prop="alipayAuthentToken">
          <el-input v-model="form.alipayAuthentToken" placeholder="请输入支付宝认证 token"/>
        </el-form-item>
        <el-form-item label="分销功能 上级用户ID" prop="pUserId">
          <el-input v-model="form.pUserId" placeholder="请输入分销功能 上级用户ID"/>
        </el-form-item>
        <el-form-item label="禁播类型  0 禁止单账号直播, 1 禁止同IP直播，2 禁止同设备直播" prop="banType">
          <el-select v-model="form.banType" placeholder="请选择禁播类型  0 禁止单账号直播, 1 禁止同IP直播，2 禁止同设备直播">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="公会id" prop="societyId">
          <el-input v-model="form.societyId" placeholder="请输入公会id"/>
        </el-form-item>
        <el-form-item label="是否公会长；0：否、1：是" prop="societyChieftain">
          <el-input v-model="form.societyChieftain" placeholder="请输入是否公会长；0：否、1：是"/>
        </el-form-item>
        <el-form-item label="结算方式；0：对私结算、1：对公结算" prop="societySettlementType">
          <el-select v-model="form.societySettlementType" placeholder="请选择结算方式；0：对私结算、1：对公结算">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否VIP会员；0：否、1：是" prop="isVip">
          <el-input v-model="form.isVip" placeholder="请输入是否VIP会员；0：否、1：是"/>
        </el-form-item>
        <el-form-item label="会员到期时间" prop="vipExpireTime">
          <el-input v-model="form.vipExpireTime" placeholder="请输入会员到期时间"/>
        </el-form-item>
        <el-form-item label="游戏币" prop="coin">
          <el-input v-model="form.coin" placeholder="请输入游戏币"/>
        </el-form-item>
        <el-form-item label="是否全局永久禁言 1-是，0-否" prop="isNospeaking">
          <el-input v-model="form.isNospeaking" placeholder="请输入是否全局永久禁言 1-是，0-否"/>
        </el-form-item>
        <el-form-item label="公会主播上缴的印票" prop="societyTicket">
          <el-input v-model="form.societyTicket" placeholder="请输入公会主播上缴的印票"/>
        </el-form-item>
        <el-form-item label="累计观看次数;累计观看次数明显大于其它用户观看次数时，及有可能是盗连接用户，需要禁用它" prop="viewCount">
          <el-input v-model="form.viewCount" placeholder="请输入累计观看次数;累计观看次数明显大于其它用户观看次数时，及有可能是盗连接用户，需要禁用它"/>
        </el-form-item>
        <el-form-item label="禁热门 0-正常；1-禁止" prop="isHotOn">
          <el-input v-model="form.isHotOn" placeholder="请输入禁热门 0-正常；1-禁止"/>
        </el-form-item>
        <el-form-item label="干预系数，0-100,0表示无干预，全部随机结果、100表示完全干预，收益最大" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入干预系数，0-100,0表示无干预，全部随机结果、100表示完全干预，收益最大"/>
        </el-form-item>
        <el-form-item label="上级分销者ID" prop="gameDistributionId">
          <el-input v-model="form.gameDistributionId" placeholder="请输入上级分销者ID"/>
        </el-form-item>
        <el-form-item label="游戏一级分销抽成比例" prop="gameDistribution1">
          <el-input v-model="form.gameDistribution1" placeholder="请输入游戏一级分销抽成比例"/>
        </el-form-item>
        <el-form-item label="游戏二级分销抽成比例" prop="gameDistribution2">
          <el-input v-model="form.gameDistribution2" placeholder="请输入游戏二级分销抽成比例"/>
        </el-form-item>
        <el-form-item label="邀请码" prop="invitationCode">
          <el-input v-model="form.invitationCode" placeholder="请输入邀请码"/>
        </el-form-item>
        <el-form-item label="邀请人" prop="invitationId">
          <el-input v-model="form.invitationId" placeholder="请输入邀请人"/>
        </el-form-item>
        <el-form-item label="邀请人" prop="gameDistributionTopId">
          <el-input v-model="form.gameDistributionTopId" placeholder="请输入邀请人"/>
        </el-form-item>
        <el-form-item label="审核失败时间" prop="investorTime">
          <el-input v-model="form.investorTime" placeholder="请输入审核失败时间"/>
        </el-form-item>
        <el-form-item label="设置主播提现比例,如果为空,则使用后台通用比例" prop="aloneTicketRatio">
          <el-input v-model="form.aloneTicketRatio" placeholder="请输入设置主播提现比例,如果为空,则使用后台通用比例"/>
        </el-form-item>
        <el-form-item label="是否开启游戏  0为 禁用 1 为不禁用" prop="openGame">
          <el-input v-model="form.openGame" placeholder="请输入是否开启游戏  0为 禁用 1 为不禁用"/>
        </el-form-item>
        <el-form-item label="是否开启付费 0为 禁用 1 为不禁用" prop="openPay">
          <el-input v-model="form.openPay" placeholder="请输入是否开启付费 0为 禁用 1 为不禁用"/>
        </el-form-item>
        <el-form-item label="是否开启竞拍  0为 禁用 1 为不禁用" prop="openAuction">
          <el-input v-model="form.openAuction" placeholder="请输入是否开启竞拍  0为 禁用 1 为不禁用"/>
        </el-form-item>
        <el-form-item label="家族推荐号 填写后审核通过自动加入相对应的家族" prop="familyRecom">
          <el-input v-model="form.familyRecom" placeholder="请输入家族推荐号 填写后审核通过自动加入相对应的家族"/>
        </el-form-item>
        <el-form-item label="分类id" prop="classifiedId">
          <el-input v-model="form.classifiedId" placeholder="请输入分类id"/>
        </el-form-item>
        <el-form-item label="通联支付的用户ID(在通联网站的注册的userID)" prop="allinpayUserId">
          <el-input v-model="form.allinpayUserId" placeholder="请输入通联支付的用户ID(在通联网站的注册的userID)"/>
        </el-form-item>
        <el-form-item label="特权机器人送出的亲贝" prop="noTicket">
          <el-input v-model="form.noTicket" placeholder="请输入特权机器人送出的亲贝"/>
        </el-form-item>
        <el-form-item label="0未开启机器人礼物账号特权，1开启机器人礼物账号特权" prop="roboter">
          <el-input v-model="form.roboter" placeholder="请输入0未开启机器人礼物账号特权，1开启机器人礼物账号特权"/>
        </el-form-item>
        <el-form-item label="是否修改过昵称" prop="isChangeName">
          <el-input v-model="form.isChangeName" placeholder="请输入是否修改过昵称"/>
        </el-form-item>
        <el-form-item label="是否过更换QQ头像 ，0 否；1是" prop="isReplaceQq">
          <el-input v-model="form.isReplaceQq" placeholder="请输入是否过更换QQ头像 ，0 否；1是"/>
        </el-form-item>
        <el-form-item label="是否过更换微信头像 ，0 否；1是" prop="isReplaceWx">
          <el-input v-model="form.isReplaceWx" placeholder="请输入是否过更换微信头像 ，0 否；1是"/>
        </el-form-item>
        <el-form-item label="动态数" prop="weiboCount">
          <el-input v-model="form.weiboCount" placeholder="请输入动态数"/>
        </el-form-item>
        <el-form-item label="动态权重" prop="weiboSortNum">
          <el-input v-model="form.weiboSortNum" placeholder="请输入动态权重"/>
        </el-form-item>
        <el-form-item label="推荐权重" prop="weiboRecommendWeight">
          <el-input v-model="form.weiboRecommendWeight" placeholder="请输入推荐权重"/>
        </el-form-item>
        <el-form-item label="微信账号" prop="weixinAccount">
          <el-input v-model="form.weixinAccount" placeholder="请输入微信账号"/>
        </el-form-item>
        <el-form-item label="微信价格" prop="weixinPrice">
          <el-input v-model="form.weixinPrice" placeholder="请输入微信价格"/>
        </el-form-item>
        <el-form-item label="经度" prop="xpoint">
          <el-input v-model="form.xpoint" placeholder="请输入经度"/>
        </el-form-item>
        <el-form-item label="纬度" prop="ypoint">
          <el-input v-model="form.ypoint" placeholder="请输入纬度"/>
        </el-form-item>
        <el-form-item label="展示图片列表">
          <imageUpload v-model="form.showImage"/>
        </el-form-item>
        <el-form-item label="已提现金额" prop="weiboRefundMoney">
          <el-input v-model="form.weiboRefundMoney" placeholder="请输入已提现金额"/>
        </el-form-item>
        <el-form-item label="主播获得的金额" prop="weiboMoney">
          <el-input v-model="form.weiboMoney" placeholder="请输入主播获得的金额"/>
        </el-form-item>
        <el-form-item label="被举报的次数" prop="tipoffCount">
          <el-input v-model="form.tipoffCount" placeholder="请输入被举报的次数"/>
        </el-form-item>
        <el-form-item label="会员中心海报" prop="weiboPhotoImg">
          <el-input v-model="form.weiboPhotoImg" placeholder="请输入会员中心海报"/>
        </el-form-item>
        <el-form-item label="聊天价格" prop="weiboChatPrice">
          <el-input v-model="form.weiboChatPrice" placeholder="请输入聊天价格"/>
        </el-form-item>
        <el-form-item label="微信更新时间" prop="weixinAccountTime">
          <el-date-picker clearable size="small"
                          v-model="form.weixinAccountTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择微信更新时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="分成计划中的推广人id" prop="autoInvitationSid">
          <el-input v-model="form.autoInvitationSid" placeholder="请输入分成计划中的推广人id"/>
        </el-form-item>
        <el-form-item label="代理有后台的id" prop="agentId">
          <el-input v-model="form.agentId" placeholder="请输入代理有后台的id"/>
        </el-form-item>
        <el-form-item label="座驾id" prop="nobleCarId">
          <el-input v-model="form.nobleCarId" placeholder="请输入座驾id"/>
        </el-form-item>
        <el-form-item label="是否开启送礼物主播没收益0否1是" prop="isGiftGiving">
          <el-input v-model="form.isGiftGiving" placeholder="请输入是否开启送礼物主播没收益0否1是"/>
        </el-form-item>
        <el-form-item label="分销" prop="qrCode">
          <el-input v-model="form.qrCode" placeholder="请输入分销"/>
        </el-form-item>
        <el-form-item label="分销" prop="totalTime">
          <el-input v-model="form.totalTime" placeholder="请输入分销"/>
        </el-form-item>
        <el-form-item label="邀请审核" prop="pUserShenhe">
          <el-input v-model="form.pUserShenhe" placeholder="请输入邀请审核"/>
        </el-form-item>
        <el-form-item label="主播提现比例" prop="ticketCattyRatio">
          <el-input v-model="form.ticketCattyRatio" placeholder="请输入主播提现比例"/>
        </el-form-item>
        <el-form-item label="主播禁播原因" prop="banRemark">
          <el-input v-model="form.banRemark" placeholder="请输入主播禁播原因"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
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
    } from "@/api/platform-web/admin/liveUser";
    import ImageUpload from '@/components/ImageUpload';
    import more from "./more";

    export default {
        name: "LiveUser",
        components: {
            ImageUpload,
            more: more
        },
        data() {
            return {
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
                // //用户信息表格数据
                liveUserList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                selectDate: null,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    id: null,
                    nickName: null,
                    userPwd: null,
                    signature: null,
                    isAuthentication: null,
                    loginType: null,
                    isEffect: null,
                    money: null,
                    loginIp: null,
                    province: null,
                    city: null,
                    isEditSex: null,
                    sex: null,
                    birthday: null,
                    isRemind: null,
                    focusCount: null,
                    intro: null,
                    code: null,
                    sinaId: null,
                    sinaToken: null,
                    sinaSecret: null,
                    sinaUrl: null,
                    tencentId: null,
                    tencentToken: null,
                    tencentSecret: null,
                    tencentUrl: null,
                    verify: null,
                    userLevel: null,
                    mobile: null,
                    userType: null,
                    isHasSendSuccess: null,
                    verifySettingTime: null,
                    authenticationType: null,
                    authenticationName: null,
                    contact: null,
                    fromPlatform: null,
                    wiki: null,
                    identifyHoldImage: null,
                    identifyPositiveImage: null,
                    identifyNagativeImage: null,
                    wxOpenid: null,
                    gzOpenid: null,
                    qqOpenid: null,
                    investorSendInfo: null,
                    paypassword: null,
                    sourceUrl: null,
                    pid: null,
                    score: null,
                    point: null,
                    emotionalState: null,
                    job: null,
                    headImage: null,
                    thumbHeadImage: null,
                    qqId: null,
                    qqToken: null,
                    vType: null,
                    vExplain: null,
                    vIcon: null,
                    fansCount: null,
                    ticket: null,
                    refundTicket: null,
                    diamonds: null,
                    useDiamonds: null,
                    usersig: null,
                    expiryAfter: null,
                    isOnline: null,
                    wxUnionid: null,
                    userName: null,
                    synchronize: null,
                    loginTime: null,
                    logoutTime: null,
                    isAgree: null,
                    onlineTime: null,
                    subscribe: null,
                    isRobot: null,
                    apnsCode: null,
                    deviceType: null,
                    videoCount: null,
                    isBan: null,
                    banTime: null,
                    identifyNumber: null,
                    authentListId: null,
                    familyId: null,
                    familyChieftain: null,
                    isAdmin: null,
                    lastLoginLevel: null,
                    bindingAlipay: null,
                    alipayName: null,
                    alipayAccount: null,
                    roomTitle: null,
                    luckNum: null,
                    alipayUserId: null,
                    alipayAuthentToken: null,
                    pUserId: null,
                    banType: null,
                    societyId: null,
                    societyChieftain: null,
                    societySettlementType: null,
                    isVip: null,
                    vipExpireTime: null,
                    coin: null,
                    isNospeaking: null,
                    societyTicket: null,
                    viewCount: null,
                    isHotOn: null,
                    rate: null,
                    gameDistributionId: null,
                    gameDistribution1: null,
                    gameDistribution2: null,
                    invitationCode: null,
                    invitationId: null,
                    gameDistributionTopId: null,
                    investorTime: null,
                    aloneTicketRatio: null,
                    openGame: null,
                    openPay: null,
                    openAuction: null,
                    familyRecom: null,
                    classifiedId: null,
                    allinpayUserId: null,
                    noTicket: null,
                    roboter: null,
                    isChangeName: null,
                    isReplaceQq: null,
                    isReplaceWx: null,
                    weiboCount: null,
                    weiboSortNum: null,
                    weiboRecommendWeight: null,
                    weixinAccount: null,
                    weixinPrice: null,
                    xpoint: null,
                    ypoint: null,
                    showImage: null,
                    weiboRefundMoney: null,
                    weiboMoney: null,
                    tipoffCount: null,
                    weiboPhotoImg: null,
                    weiboChatPrice: null,
                    weixinAccountTime: null,
                    autoInvitationSid: null,
                    agentId: null,
                    nobleCarId: null,
                    isGiftGiving: null,
                    qrCode: null,
                    totalTime: null,
                    pUserShenhe: null,
                    ticketCattyRatio: null,
                    banRemark: null,
                    orderByColumn: 'create_time',
                    isAsc: 'desc',
                },
                // 表单参数
                form: {},
                // 表单校验
                rules: {
                    nickName: [
                        {required: true, message: "用户昵称不能为空", trigger: "blur"}
                    ],
                    createTime: [
                        {required: true, message: "创建时间不能为空", trigger: "blur"}
                    ],
                    updateTime: [
                        {required: true, message: "更新时间不能为空", trigger: "blur"}
                    ],
                    isAuthentication: [
                        {required: true, message: "是否认证 0指未认证  1指待审核 2指认证 3指审核不通过不能为空", trigger: "blur"}
                    ],
                    isEffect: [
                        {required: true, message: "有效性标识不能为空", trigger: "blur"}
                    ],
                    money: [
                        {required: true, message: "金额不能为空", trigger: "blur"}
                    ],
                    isEditSex: [
                        {required: true, message: "能否修改性别 1为可修改 0为不可修改不能为空", trigger: "change"}
                    ],
                    sex: [
                        {required: true, message: "性别 0:未知, 1-男，2-女不能为空", trigger: "change"}
                    ],
                    isRemind: [
                        {required: true, message: "接受推送消息 0-不接收，1-接收不能为空", trigger: "blur"}
                    ],
                    focusCount: [
                        {required: true, message: "关注的人数不能为空", trigger: "blur"}
                    ],
                    userLevel: [
                        {required: true, message: "用户等级;live_user_level.level不能为空", trigger: "blur"}
                    ],
                    mobile: [
                        {required: true, message: "手机号不能为空", trigger: "blur"}
                    ],
                    userType: [
                        {required: true, message: "用户类型 0指 普通用户 ，1指企业会员不能为空", trigger: "change"}
                    ],
                    score: [
                        {required: true, message: "积分不能为空", trigger: "blur"}
                    ],
                    point: [
                        {required: true, message: "信用值不能为空", trigger: "blur"}
                    ],
                    emotionalState: [
                        {required: true, message: "情感状态不能为空", trigger: "blur"}
                    ],
                    job: [
                        {required: true, message: "职位不能为空", trigger: "blur"}
                    ],
                    headImage: [
                        {required: true, message: "用户头像不能为空", trigger: "blur"}
                    ],
                    vType: [
                        {required: true, message: "认证类型:0: 未认证;1:普通认证;2:企业认证;3:支付宝认证不能为空", trigger: "change"}
                    ],
                    fansCount: [
                        {required: true, message: "粉丝数不能为空", trigger: "blur"}
                    ],
                    ticket: [
                        {required: true, message: "印票数不能为空", trigger: "blur"}
                    ],
                    refundTicket: [
                        {required: true, message: "已提现的印票不能为空", trigger: "blur"}
                    ],
                    diamonds: [
                        {required: true, message: "当前还剩钻石数不能为空", trigger: "blur"}
                    ],
                    useDiamonds: [
                        {required: true, message: "累计消费的钻石数不能为空", trigger: "blur"}
                    ],
                    isOnline: [
                        {required: true, message: "1:用户在线;0:不在线;通过服务端监听更新不能为空", trigger: "blur"}
                    ],
                    synchronize: [
                        {required: true, message: "是否同步成功 : 0指同步失败 ， 1指同步成功不能为空", trigger: "blur"}
                    ],
                    isAgree: [
                        {required: true, message: "是否同意直播协议 0 表示不同意 1表示同意不能为空", trigger: "blur"}
                    ],
                    onlineTime: [
                        {required: true, message: "用户总的观看时间，单位为秒不能为空", trigger: "blur"}
                    ],
                    subscribe: [
                        {required: true, message: "是否关注公众号 0未关注 1已关注不能为空", trigger: "blur"}
                    ],
                    isRobot: [
                        {required: true, message: "1:机器人不能为空", trigger: "blur"}
                    ],
                    deviceType: [
                        {required: true, message: "1:android; 2:ios不能为空", trigger: "change"}
                    ],
                    videoCount: [
                        {required: true, message: "可回看的直播数量不能为空", trigger: "blur"}
                    ],
                    isBan: [
                        {required: true, message: "禁播状态 0-正常；1-禁播不能为空", trigger: "blur"}
                    ],
                    banTime: [
                        {required: true, message: "禁播结束时间不能为空", trigger: "blur"}
                    ],
                    authentListId: [
                        {required: true, message: "live_authent_list.id 认证ID不能为空", trigger: "blur"}
                    ],
                    familyId: [
                        {required: true, message: "家族ID不能为空", trigger: "blur"}
                    ],
                    pUserId: [
                        {required: true, message: "分销功能 上级用户ID不能为空", trigger: "blur"}
                    ],
                    banType: [
                        {required: true, message: "禁播类型  0 禁止单账号直播, 1 禁止同IP直播，2 禁止同设备直播不能为空", trigger: "change"}
                    ],
                    societyId: [
                        {required: true, message: "公会id不能为空", trigger: "blur"}
                    ],
                    societyChieftain: [
                        {required: true, message: "是否公会长；0：否、1：是不能为空", trigger: "blur"}
                    ],
                    societySettlementType: [
                        {required: true, message: "结算方式；0：对私结算、1：对公结算不能为空", trigger: "change"}
                    ],
                    isVip: [
                        {required: true, message: "是否VIP会员；0：否、1：是不能为空", trigger: "blur"}
                    ],
                    vipExpireTime: [
                        {required: true, message: "会员到期时间不能为空", trigger: "blur"}
                    ],
                    coin: [
                        {required: true, message: "游戏币不能为空", trigger: "blur"}
                    ],
                    isNospeaking: [
                        {required: true, message: "是否全局永久禁言 1-是，0-否不能为空", trigger: "blur"}
                    ],
                    societyTicket: [
                        {required: true, message: "公会主播上缴的印票不能为空", trigger: "blur"}
                    ],
                    viewCount: [
                        {required: true, message: "累计观看次数;累计观看次数明显大于其它用户观看次数时，及有可能是盗连接用户，需要禁用它不能为空", trigger: "blur"}
                    ],
                    isHotOn: [
                        {required: true, message: "禁热门 0-正常；1-禁止不能为空", trigger: "blur"}
                    ],
                    rate: [
                        {required: true, message: "干预系数，0-100,0表示无干预，全部随机结果、100表示完全干预，收益最大不能为空", trigger: "blur"}
                    ],
                    gameDistributionId: [
                        {required: true, message: "上级分销者ID不能为空", trigger: "blur"}
                    ],
                    gameDistribution1: [
                        {required: true, message: "游戏一级分销抽成比例不能为空", trigger: "blur"}
                    ],
                    gameDistribution2: [
                        {required: true, message: "游戏二级分销抽成比例不能为空", trigger: "blur"}
                    ],
                    aloneTicketRatio: [
                        {required: true, message: "设置主播提现比例,如果为空,则使用后台通用比例不能为空", trigger: "blur"}
                    ],
                    openGame: [
                        {required: true, message: "是否开启游戏  0为 禁用 1 为不禁用不能为空", trigger: "blur"}
                    ],
                    openPay: [
                        {required: true, message: "是否开启付费 0为 禁用 1 为不禁用不能为空", trigger: "blur"}
                    ],
                    openAuction: [
                        {required: true, message: "是否开启竞拍  0为 禁用 1 为不禁用不能为空", trigger: "blur"}
                    ],
                    familyRecom: [
                        {required: true, message: "家族推荐号 填写后审核通过自动加入相对应的家族不能为空", trigger: "blur"}
                    ],
                    classifiedId: [
                        {required: true, message: "分类id不能为空", trigger: "blur"}
                    ],
                    allinpayUserId: [
                        {required: true, message: "通联支付的用户ID(在通联网站的注册的userID)不能为空", trigger: "blur"}
                    ],
                    noTicket: [
                        {required: true, message: "特权机器人送出的亲贝不能为空", trigger: "blur"}
                    ],
                    roboter: [
                        {required: true, message: "0未开启机器人礼物账号特权，1开启机器人礼物账号特权不能为空", trigger: "blur"}
                    ],
                    isChangeName: [
                        {required: true, message: "是否修改过昵称不能为空", trigger: "blur"}
                    ],
                    isReplaceQq: [
                        {required: true, message: "是否过更换QQ头像 ，0 否；1是不能为空", trigger: "blur"}
                    ],
                    isReplaceWx: [
                        {required: true, message: "是否过更换微信头像 ，0 否；1是不能为空", trigger: "blur"}
                    ],
                    weiboCount: [
                        {required: true, message: "动态数不能为空", trigger: "blur"}
                    ],
                    weiboSortNum: [
                        {required: true, message: "动态权重不能为空", trigger: "blur"}
                    ],
                    weiboRecommendWeight: [
                        {required: true, message: "推荐权重不能为空", trigger: "blur"}
                    ],
                    weixinPrice: [
                        {required: true, message: "微信价格不能为空", trigger: "blur"}
                    ],
                    xpoint: [
                        {required: true, message: "经度不能为空", trigger: "blur"}
                    ],
                    ypoint: [
                        {required: true, message: "纬度不能为空", trigger: "blur"}
                    ],
                    weiboRefundMoney: [
                        {required: true, message: "已提现金额不能为空", trigger: "blur"}
                    ],
                    weiboMoney: [
                        {required: true, message: "主播获得的金额不能为空", trigger: "blur"}
                    ],
                    tipoffCount: [
                        {required: true, message: "被举报的次数不能为空", trigger: "blur"}
                    ],
                    weiboPhotoImg: [
                        {required: true, message: "会员中心海报不能为空", trigger: "blur"}
                    ],
                    weiboChatPrice: [
                        {required: true, message: "聊天价格不能为空", trigger: "blur"}
                    ],
                    pUserShenhe: [
                        {required: true, message: "邀请审核不能为空", trigger: "blur"}
                    ],
                }
            };
        },
        created() {
            this.getList();
        },
        watch: {
            selectDate: function (newVal, oldVal) {
                if (newVal === null) {
                    this.queryParams.sendStartTime = undefined
                    this.queryParams.sendEndTime = undefined
                } else {
                    this.queryParams.sendStartTime = this.selectDate[0] + ' 00:00:00'
                    this.queryParams.sendEndTime = this.selectDate[1] + ' 23:59:59'
                }
            },
        },
        methods: {
            //修改禁播状态
            displayCheck(row) {
                if (parseInt(row.isBanStr)){
                    this.opens('主播禁播备注', row, row.isBanStr)
                }else {
                    this.banDetail(row,row.isBanStr)
                }
            },
            opens(hint, row, type) {
                var that = this
                this.$prompt(hint, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    /*inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '验证码格式不正确'*/
                }).then(({value}) => {
                    this.$message({
                        type: 'success',
                        message: '你的主播禁播备注是: ' + value
                    });
                    that.banDetail(row,type,value)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });


            },
            banDetail(row,type,value){
                banDetail({
                    id: row.id,
                    isBan: type,
                    banRemark: value
                }).then((res) => {
                    this.$notify.success(res.msg)
                    row.isBan = type
                }).catch(() => {
                    this.$notify.error('修改禁播状态失败')
                });
            },
            //获取家族信息
            getFamiily(row) {
                getFamiily(row.familyId).then((res) => {
                    console.log(res)
                    var content = '信息为空'
                    if (res.data) {
                        // content = '家族名称: ' + res.data.name +'<br/>'+ '\n族长昵称: ' + res.data.nickName + '\n族长ID: ' + res.data.userId
                        content = "家族名称："+res.data.name+"</br> 族长昵称："+res.data.nickName+"\n</br> 族长ID:"+res.data.userId
                    }
                    this.$alert(content, '家族信息', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    })
                }).catch(() => {
                    this.$notify.error('网络异常')
                });
            },
            /*格式换禁播状态*/
            formatterIsBan(row, column) {
                var isBan = row.isBan
                if (isBan === 0) {
                    return '正常';
                } else if (isBan === 1) {
                    return '禁播';
                } else {
                    return '未知';
                }
            },
            /** 查询//用户信息列表 */
            getList() {
                this.loading = true;
                listLiveUser(this.queryParams).then(response => {
                    this.liveUserList = response.rows;
                    this.total = response.total;
                    this.loading = false;
                });
            },
            /** 更多按钮操作 */
            handleMore(row) {
                console.log(row)
                this.userId = row.id;
                this.$refs.more.show();
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
                    nickName: null,
                    userPwd: null,
                    signature: null,
                    createTime: null,
                    updateTime: null,
                    isAuthentication: null,
                    loginType: null,
                    isEffect: null,
                    money: null,
                    loginIp: null,
                    province: null,
                    city: null,
                    isEditSex: null,
                    sex: null,
                    birthday: null,
                    isRemind: null,
                    focusCount: null,
                    intro: null,
                    code: null,
                    sinaId: null,
                    sinaToken: null,
                    sinaSecret: null,
                    sinaUrl: null,
                    tencentId: null,
                    tencentToken: null,
                    tencentSecret: null,
                    tencentUrl: null,
                    verify: null,
                    userLevel: null,
                    mobile: null,
                    userType: null,
                    isHasSendSuccess: null,
                    verifySettingTime: null,
                    authenticationType: null,
                    authenticationName: null,
                    contact: null,
                    fromPlatform: null,
                    wiki: null,
                    identifyHoldImage: null,
                    identifyPositiveImage: null,
                    identifyNagativeImage: null,
                    wxOpenid: null,
                    gzOpenid: null,
                    qqOpenid: null,
                    investorSendInfo: null,
                    paypassword: null,
                    sourceUrl: null,
                    pid: null,
                    score: null,
                    point: null,
                    emotionalState: null,
                    job: null,
                    headImage: null,
                    thumbHeadImage: null,
                    qqId: null,
                    qqToken: null,
                    vType: null,
                    vExplain: null,
                    vIcon: null,
                    fansCount: null,
                    ticket: null,
                    refundTicket: null,
                    diamonds: null,
                    useDiamonds: null,
                    usersig: null,
                    expiryAfter: null,
                    isOnline: null,
                    wxUnionid: null,
                    userName: null,
                    synchronize: null,
                    loginTime: null,
                    logoutTime: null,
                    isAgree: null,
                    onlineTime: null,
                    subscribe: null,
                    isRobot: null,
                    apnsCode: null,
                    deviceType: null,
                    videoCount: null,
                    isBan: null,
                    banTime: null,
                    identifyNumber: null,
                    authentListId: null,
                    familyId: null,
                    familyChieftain: null,
                    isAdmin: null,
                    lastLoginLevel: null,
                    bindingAlipay: null,
                    alipayName: null,
                    alipayAccount: null,
                    roomTitle: null,
                    luckNum: null,
                    alipayUserId: null,
                    alipayAuthentToken: null,
                    pUserId: null,
                    banType: null,
                    societyId: null,
                    societyChieftain: null,
                    societySettlementType: null,
                    isVip: null,
                    vipExpireTime: null,
                    coin: null,
                    isNospeaking: null,
                    societyTicket: null,
                    viewCount: null,
                    isHotOn: null,
                    rate: null,
                    gameDistributionId: null,
                    gameDistribution1: null,
                    gameDistribution2: null,
                    invitationCode: null,
                    invitationId: null,
                    gameDistributionTopId: null,
                    investorTime: null,
                    aloneTicketRatio: null,
                    openGame: null,
                    openPay: null,
                    openAuction: null,
                    familyRecom: null,
                    classifiedId: null,
                    allinpayUserId: null,
                    noTicket: null,
                    roboter: null,
                    isChangeName: null,
                    isReplaceQq: null,
                    isReplaceWx: null,
                    weiboCount: null,
                    weiboSortNum: null,
                    weiboRecommendWeight: null,
                    weixinAccount: null,
                    weixinPrice: null,
                    xpoint: null,
                    ypoint: null,
                    showImage: null,
                    weiboRefundMoney: null,
                    weiboMoney: null,
                    tipoffCount: null,
                    weiboPhotoImg: null,
                    weiboChatPrice: null,
                    weixinAccountTime: null,
                    autoInvitationSid: null,
                    agentId: null,
                    nobleCarId: null,
                    isGiftGiving: null,
                    qrCode: null,
                    totalTime: null,
                    pUserShenhe: null,
                    ticketCattyRatio: null,
                    banRemark: null,
                    orderByColumn: 'create_time',
                    isAsc: 'desc',
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
                this.reset();
                this.open = true;
                this.title = "添加//用户信息";
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                const id = row.id || this.ids
                getLiveUser(id).then(response => {
                    this.form = response.data;
                    this.open = true;
                    this.title = "修改//用户信息";
                });
            },
            /** 提交按钮 */
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.id != null) {
                            updateLiveUser(this.form).then(response => {
                                this.msgSuccess("修改成功");
                                this.open = false;
                                this.getList();
                            });
                        } else {
                            addLiveUser(this.form).then(response => {
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
                this.$confirm('是否确认删除//用户信息编号为"' + ids + '"的数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function () {
                    return delLiveUser(ids);
                }).then(() => {
                    this.getList();
                    this.msgSuccess("删除成功");
                })
            },
            /** 导出按钮操作 */
            handleExport() {
                const queryParams = this.queryParams;
                this.$confirm('是否确认导出所有//用户信息数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function () {
                    return exportLiveUser(queryParams);
                }).then(response => {
                    this.download(response.msg);
                })
            }
        }
    };
</script>
