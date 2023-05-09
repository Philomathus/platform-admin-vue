import {addLiveUserWithdrawNewlog} from "@/api/platform-web/live-web/liveUserWithdrawNewlog";
import {
  addLiveVideoClassified,
  updateLiveVideoClassified
} from "@/api/live-web/liveVideoClassified/liveVideoClassified";

export default {

  global: {
    export: '导出',
    cancelButton: '取消',
    confirmButton: '确定',
    refresh: '刷新',
    close: '关闭',
    searchButton: '搜索',
    resetButton: '重置',
    addButton: '新增',
    editButton: '修改',
    deleteButton: '删除',
    exportButton: '导出',
    submitButton: '确 定',
    newButton: '新的',
    moreButton: '更多',
    statusEnable: '启用',
    statusDisable: '停用',
    sort: '排序',
    qq: '问号',
    selectDateRangeSeparator: '至',
    icon: '图标',
    userName: '用户名',
    realName: '真名',
    memberId: '会员ID',
    memberIdPlaceholder: '请输入会员ID',
    edit: '修改',
    delete: '删除',
    id: '身份证',
    selectDate: '选择日期',
    exportMessage: '返现结果导出',
    dialogTitle: '警告',
    promptTitle: '提示',
    name: '名称',
    nickname: '昵称',
    status: '状态',
    ctime: '发布时间',
    ctTimePlaceholder: '选择发布时间',
    sortPlaceholder: '请输入排序',
    statusPlaceholder: '请选择状态',
    nicknamePlaceholder: '请输入昵称',
    userNamePlaceholder: '请输入一个用户名',
    dateTimePickerStartTimePlaceholder: '开始时间',
    dateTimePickerEndTimePlaceholder: '结束时间',
    dateTimePickerRangeSeparator: '至',
    namePlaceholder: '请输入姓名',
    selectDateLabel: '日期范围',
    datePickerStartDatePlaceholder: '开始日期',
    datePickerEndDatePlaceholder: '结束日期',
    operationColumn: '操作',
    editSuccessMsg: '修改成功',
    addSuccessMsg: '新增成功',
    deleteSuccessMsg: '删除成功',
    deleteConfirm1: '是否确认删除【充值返现】编号为"',
    deleteConfirm2: '"的数据项?',
    deleteConfirmTitle: '警告',
    statusConfirm: '确认要"',
    statusConfirmTitle: '警告',
    statusConfirmQuestion: '吗?',
    statusEditSuccess: '成功',
    selectStatus: '请选择状态',
    releaseTime: '释放时间',
    confirmExport: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
    confirmExportTitle: '警告',
    exportResponse: 'Activity Information',
  },

  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小',
    layOutSetting: '布局设置',
    homepage: '首页'
  },

  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },

  logout: {
    confirm: '确定注销并退出系统吗',
    prompt: '提示'
  },

  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)',
    noLongerThanSevenDaysWarning: '所选时间不能大于七天',
    exportPrompt: '导出提示',
    startDatePlaceholder: '开始日期',
    endDatePlaceholder: '结束日期',
    rangeSeparator: '至',
    cancelButton: '取 消',
    submitButton: '确 定'
  },

  settings: {
    title: '主题风格设置',
    themeColor: '主题颜色',
    systemLayoutConfig: '系统布局配置',
    openTagsView: '开启 Tags-Views',
    fixedHeader: '固定 Header',
    sidebarLogo: '显示 Logo',
    closeAllTags: '',
    closeOthersTags: ''
  },

  tagsView: {
    closeOthersTags: '关闭其他',
    closeAllTags: '关闭所有',
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭所有',
    closeAll: '关闭其他'
  },

  activity: {
    startDatePlaceholder: '开始时间',
    endDatePlaceholder: '结束时间',
    rangeSeparator: '至',
    searchButton: '搜索',
    resetButton: '重置',
    addButton: '新增',
    editButton: '修改',
    deleteButton: '删除',
    exportButton: '返现结果导出',
    submitButton: '确 定',
    confirmButton: '确定',
    cancelButton: '取 消',
    cancelConfirmButton: '取 消',
    operation: '操作',
    editSuccessMsg: '修改成功',
    editFailMsg: '',
    addSuccessMsg: '新增成功',
    addFailMsg: '',
    submitSuccess: '',
    submitFail: '',
    deleteSuccessMsg: '删除成功',
    submitSuccessful: '',
    statusEnable: '启用',
    statusDisable: '停用',
    statusConfirm: '确认要"',
    statusConfirmTitle: '警告',
    statusConfirmQuestion: '"吗?',
    statusEditSuccess: '成功',
    confirmExport: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
    confirmExportTitle: '警告',
    selectStatus: '请选择状态',
    deleteConfirm1: '是否确认删除【充值返现】编号为"',
    deleteConfirm2: '"的数据项?',
    deleteConfirmTitle: '警告',
    releaseTime: '释放时间',
    ipDuplicateCheckButton: 'ip重复检查',
    mobilePhoneSerialNumberCheckButton: '手机序列号检查',
    displayMobilePhoneNumberButton: '显示手机号',
    selectDateStartPlaceholder: '开始时间',
    selectDateEndPlaceholder: '开始时间',
    selectDateRangeSeparator: '至',
    qq: 'qq',
    wechat: '微信',
    tableDialog: {
      name: '名称',
      namePlaceholder: '请输入名称',
      status: '状态',
      statusPlaceholder: '请选择状态',
    },
    validation: {
      name: '名称不能为空',
      sort: '排序号不能为空',
      coverImg: '图片不能为空',
    },
    activityManage: {
      activityCashBack: {
        title: '充值返现',
        cashBackResultTime: '返现结果时间',
        rebateAmount: '返现金额',
        addCashbackTitle: '添加【充值返现】',
        editCashbackTitle: '修改【充值返现】',
        exportResponse: '【充值返现】',
        tableDialog: {
          tableId: '主键id',
          minDeposit: '当日存款总额最小值',
          maxDeposit: '当日存款总额最大值',
          minDepositPlaceholder: '请输入当日存款总额最小值',
          maxDepositPlaceholder: '请输入当日存款总额最大值',
          status: '状态',
        },
        validation: {
          depositTotalMin: '当日存款总额最小值不能为空',
          depositTotalMax: '当日存款总额最大值不能不上传',
          rebate: '返现金额不能为空'
        },
      },
      activityInfo: {
        title: '请输入活动标题',
        addActivityTitle: '添加活动信息',
        editActivityTitle: '修改活动信息',
        exportResponse: '活动信息',
        tableDialog: {
          title: '标题',
          titlePlaceholder: '请输入活动标题',
          typeId: '活动类型',
          typeIdPlaceholder: '请选择活动类型',
          sort: '排序',
          sortPlaceholder: '请输入排序',
          icon: '图标',
          jumpType: '跳转类型',
          activityDetails: '活动详情',
          jumpLink: '跳转链接',
          jumpLinkPlaceholder: '请输入图标跳转链接',
          releaseTime: '发布时间',
          url: '跳转链接',
          urlPlaceholder: '请输入图标跳转链接',
          iconUrl: '图标跳转链接',
          status: '状态',
          operation: '操作',
          edit: '修改',
          delete: '删除',
        },
        validation: {
          title: '标题不能为空',
          icon: '图标不能不上传',
          typeId: '活动类型不能为空',
          type: '跳转类型不能为空'
        }
      },
      activityQuestInfo: {
        // title: '标题',
        // titlePlaceholder: '请输入标题',
        // platformGameType: '平台游戏类型',
        // platformGameTypePlaceholder: '请选择平台游戏类型',
        // platformId: '平台类型',
        // platformIdPlaceholder: '请选择平台类型',
        dailyTask: '每日任务',
        permanentTask: '永久任务',
        addTitle: '添加任务信息',
        editTitle: '修改任务信息',
        tableDialog: {
          title: '标题',
          titlePlaceholder: '请输入标题',
          icon: '图标',
          index: '排序号',
          indexPlaceholder: '请输入排序号',
          typeId: '任务类型',
          typeIdPlaceholder: '请选择任务类型',
          gameId: '所属游戏',
          gameIdPlaceholder: '请选择所属游戏',
          target: '目标任务量',
          targetPlaceholder: '请输入目标任务数量',
          reward: '完成后增加的资金',
          rewardPlaceholder: '请输入完成后增加的资金',
          content: '描述',
          contentPlaceholder: '请输入内容',
          detail: '任务有效时间',
          detailPlaceholder: '请输入内容',
          kindId: '平台游戏类型',
          kindIdPlaceholder: '请选择平台游戏类型',
          platformId: '平台类型',
          platformIdPlaceholder: '请选择平台类型',
          taskMode: '任务模式',
          taskModePlaceholder: '任务模式',
          ctime: '发布时间',
          operation: '操作',
          edit: '修改',
          delete: '删除',
        },
        validation: {
          icon: '图标不能不上传',
          title: '标题不能为空',
          index: '排序号不能为空',
          typeId: '任务类型不能为空',
          target: '目标任务量不能为空',
          reward: '完成后增加的资金不能为空',
          detail: '任务有效时间不能为空',
          gameId: '所属游戏不能为空',
          kindId: '平台游戏类型不能为空',
          platformId: '平台类型不能为空',
          taskMode: '任务模式不能为空',

        }
      },
      activityQuestType: {
        game: '名称',
        gamePlaceholder: '请输入名称',
        gameId: '所属游戏id',
        gameIdPlaceholder: '请输入所属游戏id',
        addTitle: '添加任务类型',
        editTitle: '修改任务类型',
        tableDialog: {},
        validation: {
          game: '名称不能为空'
        }
      },
      activityType: {
        addTitle: '添加活动类型',
        editTitle: '修改活动类型',
        exportTile: '活动类型',
        tableDialog: {
          name: '名称',
          namePlaceholder: '请输入名称',
          oder: '排序',
          oderPlaceholder: '请输入名称',
        },
        validation: {
          name: '名称不能为空',
          oder: '不能为空'
        }
      },
      wheelDiceConfig: {
        addTitle: "添加【抽奖配置】",
        editTitle: "修改【抽奖配置】",
        tableDialog: {
          id: '主键id',
          idPlaceholder: '',
          depositTotalMin: '当日存款总额最小值',
          depositTotalMinPlaceholder: '请输入当日存款总额最小值',
          depositTotalMax: '当日存款总额最大值',
          depositTotalMaxPlaceholder: '请输入当日存款总额最大值',
          lotteryTimes: '抽奖次数',
          lotteryTimesPlaceholder: '请输入抽奖次数',
          status: '状态',
          statusPlaceholder: '请选择状态'
        },
        validation: {
          depositTotalMin: '名称不能为空',
          depositTotalMax: '当日存款总额最大值不能不上传',
          lotteryTimes: '抽奖次数不能为空'
        }
      },
    },
    activityMemberInfo: {
      addTitle: '添加会员推广管理',
      editTitle: '修改会员推广管理',
      tableDialog: {
        duplicateIpHeader: '重复次数超过两次',
        inviterCode: '邀请码',
        inviterCodePlaceholder: '请输入邀请码',
        loginIp: '登录ip',
        loginIpPlaceholder: '请输入登录ip',
        id: '系统编号',
        idPlaceholder: '',
        regTime: '注册时间',
        regTimePlaceholder: '选择注册时间',
        loginTime: '上次登录时间',
        loginTimePlaceholder: '选择登录时间',
        phone: '手机',
        phonePlaceholder: '请输入手机',
        vip: '会员vip',
        vipPlaceholder: '请输入会员vip',
        count: '重复次数',
        memberCode: '会员编号',
        memberCodePlaceholder: '请输入会员编号',
        cxAgent: '代理编号',
        cxAgentPlaceholder: '请输入代理编号',
        userName: '账号',
        userNamePlaceholder: '请输入账号',
        realName: '姓名',
        realNamePlaceholder: '请输入姓名',
        status: '状态(0= 禁用 1=正常 2=测试号3=超管号)',
        statusRadio: '请选择字典生成',
        totalAccount: '余额',
        totalAccountPlaceholder: '请输入余额',
        email: '邮箱',
        emailPlaceholder: '请输入邮箱',
        isOnline: '是否在线(1是0否)',
        isOnlinePlaceholder: '请输入是否在线(1是0否)',
        sex: '性别(1男0女)',
        sexPlaceholder: '请选择性别(1男0女)',
        sexSelect: '请选择字典生成',
        registIp: '注册ip',
        registIpPlaceholder: '请输入注册ip',
        loginAddress: '登录地址',
        loginAddressPlaceholder: '请输入登录地址',
        loginDev: '登录设备(1 ios 2 android)',
        loginDevPlceholder: '请输入登录设备(1 ios 2 android)',
        nickName: '昵称',
        nickNamePlaceholder: '请输入昵称',
        birthDay: '生日',
        birthDayPlaceholder: '请输入生日',
        qq: 'qq',
        qqPlaceholder: '请输入qq',
        wechat: '微信',
        wechatPlaceholder: '请输入微信',
        headImg: '头像',
        headImgPlaceholder: '请输入头像',
        onlineTime: '在线时长',
        onlineTimePlaceholder: '请输入在线时长',
        linkUrl: '股东网址',
        linkUrlPlaceholder: '请输入股东网址',
        boxAccount: '保险箱余额',
        boxAccountPlaceholder: '请输入保险箱余额',
        boxPass: '保险箱密码',
        boxPassPlaceholder: '请输入保险箱密码',
        cleanTime: '总的充值金额',
        cleanTimePlaceholder: '请输入总的充值金额',
        levelIntegral: '总的充值金额',
        levelIntegralPlaceholder: '请输入总的充值金额',
        inviteMoney: '佣金',
        inviteMoneyPlaceholder: '请输入佣金',
        codeAccount: '打码账户',
        codeAccountPlaceholder: '请输入打码账户',
        pid: '玩家所在游戏平台',
        pidPlaceholder: '请输入玩家所在游戏平台',
        codeTotal: '累计有效投注',
        codeTotalPlaceholder: '请输入累计有效投注',
        channelcode: '渠道号',
        channelcodePlaceholder: '请输入渠道号',
        speak: '0=正常 1 =禁言',
        speakPlaceholder: '请输入0=正常 1 =禁言',
        loginNum: '登陆次数',
        loginNumPlaceholder: '请输入登陆次数',
        version: '客户端版本号',
        versionPlaceholder: '请输入客户端版本号',
        withdrawalPass: '提现密码(md5加密)',
        withdrawalPassPlaceholder: '请输入提现密码(md5加密)',
        deviceId: '设备ID',
        deviceIdPlaceholder: '请输入设备ID',
      },
      validation: {
        memberCode: '会员编号不能为空',
        cxAgent: '代理编号不能为空',
        userName: '账号不能为空',
        loginNum: '登陆次数不能为空',
      },
    },
    chatComplaint: {
      addTitle: '添加客服投诉',
      editTitle: '',
      exportResponse: '客服投诉',
      updateChatComplaintSuccess: '审核处理成功',
      updateChatComplaintError: '取消输入',
      updateChatComplaintPrompt: '请输入审核备注',

      tableDialog: {
        remark: '投诉内容',
        remarkPlaceholder: '请输入内容',
        userId: '发起人id',
        userIdPlaceholder: '请输入发起人id',
        kfId: '客服id',
        kfIdPlaceholder: '请输入客服id',
        processingTime: '选择审批时间',
        processingTimePlaceholder: '选择审批时间',
        accountPlaceholder: '请输入客服代充账号',
        approver: '审批人',
        approverPlaceholder: '请输入审批人',
        statusPlaceholder: '请选择处理状态',
        createTime: '创建时间',
        comments: '审批备注',
        commentsPlaceholder: '请输入审批备注',
        status: '处理状态',
        statusOptions: '处理状态(0未处理 1已处理 2驳回)',
      },
      statusOptions: {
        unprocessed: '未处理',
        processed: '已处理',
        rejected: '驳回',
      },
    },
    commonProblem: {
      addTitle: '添加常见问题',
      editTitle: '修改常见问题',
      tableDialog: {
        title: '标题',
        titlePlaceholder: '请输入标题',
        status: '状态',
        statusPlaceholder: '请选择状态',
        content: '内容',
        contentPlaceholder: '请输入内容',
        index: '排序',
        indexPlaceholder: '请输入排序',
      },
    },
    configWaiter: {
      addTitle: '添加客服管理',
      editTitle: '修改客服管理',
      tableDialog: {
        status: '状态',
        nickname: '昵称',
        nicknamePlaceholder: '请输入昵称',
        type: '类型',
        typePlaceholder: '请选择',
        code: '账号',
        codePlaceholder: '请输入微信或QQ号',
        name: '昵称',
        namePlaceholder: '请输入昵称',
        icon: '图标',
        iconPlaceholder: '请输入排序',
        remark: '备注信息',
        remarkPlaceholder: '请输入备注信息',
        updateBy: '更新人',
        updateTime: '更新时间',
        index: '排序',
      },
    },
    homeBanner: {
      addTitle: '添加首页轮播图',
      editTitle: '修改首页轮播图',
      exportTitle: '首页轮播图',
      tableDialog: {
        coverImg: '图片',
      },
    },
    homeNotice: {
      addTitle: '添加系统公告',
      editTitle: '修改系统公告',
      tableDialog: {
        title: '标题',
        titlePlaceholder: '请输入标题',
        type: '类型',
        typePlaceholder: '请选择类型',
        content: '内容',
        contentPlaceholder: '请输入内容',
        index: '排序',
        indexPlaceholder: '请输入排序',
      },
    },
    redPacketManage: {
      lotteryPrize: {
        addTitle: '添加奖项设置',
        editTitle: '修改奖项设置',
        exportTitle: '【请填写功能名称】',
        tableDialog: {
          id: '编号',
          prizeName: '名称',
          prizeNamePlaceholder: '请输入名称',
          prize: '奖励',
          prizePlaceholder: '请输入奖励',
          prizeAmount: '奖品（剩余）数量',
          prizeAmountPlaceholder: '请输入奖品（剩余）数量',
          type: '活动类型',
          typePlaceholder: '请输入活动类型',
          prizeWeight: '奖品权重',
          prizeWeightPlaceholder: '请输入奖品权重',
        },
        validation: {
          type: '活动类型不能为空',
          prizeName: '名称不能为空',
          prize: '奖励不能为空',
          prizeWeight: '奖品权重不能为空，且为1-9的一个数字',
          prizeAmount: '奖品不能为空',
        },
      },

    },
    messageGameNotice: {
      addTitle: '添加游戏公告',
      editTitle: '修改游戏公告',
      tableDialog: {
        title: '公告标题',
        titlePlaceholder: '请输入公告标题',
        device: '设备端',
        devicePlaceholder: '请输入设备端',
        action: '动作',
        content: '内容',
      },
      validation: {
        title: '公告标题不能为空',
        device: '设备端不能为空',
        action: '动作不能为空',
        pubdatetime: '发布时间不能为空',
        content: '内容不能为空',
      }
    },
    messageOnSite: {
      addTitle: '添加站内信息',
      addUserTitle: '单个会员发送消息',
      editTitle: '修改站内信息',
      submitFormSuccess: '发送成功',
      sendMemberMsgButton: '发送会员消息',
      tableDialog: {
        title: '信息标题',
        titlePlaceholder: '请输入信息标题',
        device: '设备端',
        devicePlaceholder: '请输入设备端',
        action: '动作',
        content: '内容',
        contentPlaceholder: '请输入内容',
        userId: '会员id',
        userIdPlaceholder: '会员id',
      },
      validation: {
        title: '信息标题不能为空',
        toUserId: '会员id不能为空',
        content: '内容不能为空',
        receiverType: '接收者类型不能为空',
        action: '动作不能为空',
        pubdatatime: '发布时间不能为空',
      }
    },
    messageSystemNotice: {
      addTitle: '添加系统公告',
      editTitle: '修改系统公告',
      exportTitle: '系统公告',
      tableDialog: {
        title: '信息标题',
        titlePlaceholder: '请输入信息标题',
        device: '设备端',
        devicePlaceholder: '请输入设备端',
        action: '动作',
        content: '内容',
        contentPlaceholder: '请输入内容',
      },
      validation: {
        title: '公告标题不能为空',
        content: '内容不能为空',
        device: '设备不能为空',
        action: '动作不能为空',
        pubdatatime: '发布时间不能为空',
      },
    },
    recommend: {
      logCommission: {
        addTitle: '添加佣金领取日志',
        editTitle: '修改佣金领取日志',
        exportTitle: '佣金领取日志',
        queryValidation: '会员ID只能输入数字及下划线',
        tableDialog: {
          commission: '佣金',
          commissionPlaceholder: '请输入佣金',
        },
      },
      configRecommon: {
        addTitle: '添加推广设置',
        editTitle: '修改推广设置',
        exportTitle: '推广设置',
        tableDialog: {
          level: '级别(1 一级 2 二级)',
          levelPlaceholder: '请输入级别(1 一级 2 二级)',
          bill: '比例',
          billPlaceholder: '请输入比例',
        },
      },
      recommonPic: {
        editTitle: '修改推广图',
        tableDialog:{
          envTitle: '参数名称',
          envCode: '参数编码',
          envValue: '图片',
          envGroup: '参数组',
          envSort: '排序',
        },
      },
    },
  },

  members: {
    configVip: {
      home: '',
      table: {
        vipLvl: 'vip等级',
        demandCodingValue: '需求打码量',
        advancementJackpot: '晋级彩金',
        weeklySalary: '周俸禄',
        monthlySalary: '月俸禄',
        creationTime: '创建时间',
        lastUpdateBy: '最后更新人',
        lastUpdateAt: '最后更新时间',
        operation: '操作',
        edit: '修改',
        delete: '删除',
        submit: '确 定',
        cancel: '取 消',
      },
      dialog: {
        vipLvlreq: '请输入vip等级',
        demCodereq: '请输入需求打码量',
        advJackpotreq: '请输入晋级彩金',
        weeklySalreq: '请输入周俸禄',
        monthlySalreq: '请输入月俸禄'
      },
      rules: {
        vipRule: 'vip等级不能为空只能是数字',
        demandRule: '需求打码不能为空只能是数字',
        promoteRule: '晋级彩金不能为空只能是数字',
        weekSalaryRule: '周俸禄不能为空只能是数字',
        monthSalaryRule: '月俸禄不能为空只能是数字'
      },
      queries: {
        addQuery: '添加vip配置',
        updateQuery: '修改vip等级设置',
        delQuery: '是否确认删除vip',
        delQuery2: '的数据项',
        warning: '警告',
        sure: '确定',
        cancel: '取消',
        delSuccess: '删除成功',
        confExcel: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirm: '确认',
        function: '请填写功能名称'
      }
    },
    liveVideoProp: {
      form: {
        giftAmt: '送礼金额',
        dateRange: {
          label: '日期范围',
          sep: '至',
          sel: '日期选择',
          sel2: '请选择日期选择'
        },
        memId: '会员ID',
        memNn: '会员昵称',
        hostId: '主播ID',
        search: '搜索',
        reset: '重置',
        export: '导出',
        testGift: '测试号送礼明细',
        status: '状态',
        giftName: '礼物名',
        hostNn: '主播昵称',
        giftDate: '送礼日期',
        testAcct: '测试号送礼明细',
        netErr: '网络异常',
        memIdErr: '会员ID只能输入数字及下划线',
        excelErr: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        warning: '警告',
        confirm: '确认',
        cancel: '取消',
        giftLog: '用户送礼日志',
      }
    },
    logGameOrder: {
      analyze: {
        date: {
          range: '日期范围',
          start: '开始日期',
          end: '结束日期'
        },
        memIdAcc: '会员ID/会员账号',
        plat: '请选择平台',
        types: '全部类型',
        search: '搜索',
        reset: '重置',
        batch: '批量处理上下分',
        memId: '会员ID',
        orderId: '订单ID',
        gamePlat: '游戏平台',
        amt: '金额',
        type: '类型',
        opt: '操作',
        bckUp: '回退上分',
        nxtPoint: '补发下分',
        fHall: '入厅失败',
        eHall: '入厅开始',
        regFail: '注册失败',
        scoreSuc: '上分成功',
        credEx: '上分扣款异常',
        scoreDec: '上分扣款失败',
        failScr: '上分失败',
        tmoutScr: '上分超时',
        blncInq: '查询余额失败',
        failUpscr: '上分查询明细失败',
        tmoutUpscr: '上分查询明细超时',
        upScrnotex: '上分交易不存在',
        getGfail: '获取游戏失败',
        unkAnom: '未知异常',
        bckScr: '回退上分',
        fexHall: '出厅失败',
        sNextscr: '下分开始',
        dScoresucc: '下分成功',
        fScore: '下分失败',
        dTime: '下分超时',
        bInqf: '查询余额失败',
        fQuery: '下分查询明细失败',
        tmoutQuery: '下分查询明细超时',
        lScore: '下分交易不存在',
        tScore: '上分',
        lDiv: '下分',
        unk: '未知',
        enHall: '入厅',
        exHall: '出厅',
        start: '开始',
        success: '成功',
        anom: '异常',
        failure: '失败',
        tmOut: '超时',
        fChk: '查询明细失败',
        tmoutQueryDetails: '查询明细超时',
        trnsctNot: '交易不存在',
        getGame: '获取游戏失败',
        rollback: '回退',
        slctMem: '请选中会员',
        tips: '提示',
        determine: '确定',
        succFund: '资金回退成功',


      },
      index: {
        allStat: '全部状态',
        analysis: '分析上下分',
        stTime: '开始时间',
        endTime: '结束时间',
        status: '状态',
        numRet: '重试次数',
        plsMemId: '请输入会员ID',
        plsPlat: '请选择平台',
        determ: '确 定',
        cancel: '取 消',
        retFunds: '资金回退',
        conf: '会员ID/会员账号只能输入数字及下划线',
        confEx: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        warn: '警告',
        confirm: '确认',
        cancellation: '取消',
        mUpdown: '会员上下分',
        confStat: '确认要修改状态为',
        modSuc: '修改成功',
        addScore: '添加会员上分缺少',
        addSucc: '新增成功',
        expo: '导出',
        addMem: '添加会员上分缺少',
      }
    },
    memberBcode: {
      index: {
        totalRech: '总充值',
        totalCode: '总打码',
        codReq: '还需打码',
        datRange: '日期范围',
        sDate: '开始日期',
        eDate: '结束日期',
        to: '至',
        memId: '会员ID',
        search: '搜索',
        reset: '重置',
        export: '导出',
        rev: '收入',
        desc: '描述',
        wCode: '是否打码',
        ccVol: '当前打码量',
        cTime: '创建时间',
        opt: '操作',
        mod: '修改',
        pccVol: '请输入当前打码量',
        gCaptcha: 'Google验证码',
        pGverifcode: '请输入Google验证码',
        det: '确定',
        canc: '取消',
        codingEmpty: '当前打码量不能为空,且数值大于等于0',
        gCaptchaEmpt: 'google验证码不能为空',
        netAnom: '网络异常',
        unc: '未打码',
        coded: '已打码',
        unk: '未知',
        memNum: '会员ID只能输入数字及下划线',
        modCod: '修改会员打码数据',
        codingNotGreater: '当前打码量数值不能大于收入',
        modSuc: '修改成功',
        confEx: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        warn: '警告',
        confirmation: '确认',
        memData: '会员打码数据'
      }
    },
    memberCard: {
      index: {
        name: '姓名',
        pName: '请输入姓名',
        bName: '银行名称',
        pbName: '请输入银行名称',
        bCode: '银行编码',
        pbCode: '请输入银行编码',
        bAccnum: '银行账号',
        pbAccnum: '请输入银行账号',
        bAdd: '银行地址',
        pbAdd: '请输入银行地址',
        memId: '会员ID',
        pmemId: '请输入会员ID',
        cType: '卡片类型1=银行卡2=支付宝',
        scType: '请选择卡片类型1=银行卡2=支付宝',
        pDict: '请选择字典生成',
        default: '是否默认',
        pdef: '请输入是否默认',
        search: '搜索',
        reset: '重置',
        new: '新增',
        mod: '修改',
        del: '删除',
        exp: '导出',
        sysNum: '系统编号',
        opt: '操作',
        det: '确 定',
        cnc: '取 消',
        addFnc: '添加【请填写功能名称】',
        modFnc: '修改【请填写功能名称】',
        modSucc: '修改成功',
        addSucc: '新增成功',
        conDel: '是否确认删除【请填写功能名称】编号为"',
        datItem: '的数据项?',
        warn: '警告',
        cancellation: '取消',
        delSucc: '删除成功',
        exDown: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmation: '确认',
        memBank: '会员银行卡'
      }
    },
    memberGameData: {
      agRecord: {
        buttons: {
          more: '更多',
        },
        table: {
          titles: '注单数据详情',
          ordNum: '订单号',
          userName: '用户名',
          buNum: '局号',
          payAmt: '派彩额度',
          plBets: '下注时间',
          gType: '游戏类型',
          gTypes: {
            bacc: '百家乐',
            dt: '龙虎',
          },
          tBet: '总投注',
          vBet: '有效投注',
          oStat: '订单状态',
          anom: '异常',
          pOut: '已派彩',
          canc: '已取消',
          howTo: '玩法',
          howtos: {
            banker: '庄',
            casual: '闲',
            sum: '和',
            dragon: '龙',
            tiger: '虎'
          },
          tNum: '桌台号',
          pTime: '派彩时间',
          bal: '余额',
          betIp: '投注IP',
          det: '详情',

        },
        data: {
          title: '游戏对局列表',
          vipLvl: 'vip等级只能大于之前的等级',

        }
      },
      detail: {
        title: '游戏对局详情',
        vipLvl: 'vip等级只能大于之前的等级',
      },
      index: {
        button: {
          vBets: '有效下注',
          tBets: '总下注',
          profit: '盈利',
          search: '搜索',
          reset: '重置',
          exp: '导出',

        },
        // pName: '平台名称',
        sel: '全选/全不选',
        date: {
          datRange: '日期范围',
          sTime: '开始时间',
          eTime: '结束时间',
          to: '至'
        },
        entMemid: '请输入会员ID',
        entbNum: '请输入游戏局号',
        memId: '会员ID',
        subId: '子平台ID',
        gameId: '游戏ID',
        gbNum: '游戏局号',
        gName: '游戏名称',
        subName: '子平台名称',
        vBets: '有效下注',
        tBets: '总下注',
        profit: '盈利',
        setTime: '结算时间',
        gLog: '游戏对局日志',
        nData: '注单数据详情',
        proName: '项目名称',
        proVal: '项目值',
        gbNotemp: '游戏局号不能为空',
        script: {
          uCode: '未洗码',
          wCode: '已洗码',
          unk: '未知',
          memNum: '会员ID只能输入数字及下划线',
          conEx: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
          warn: '警告',
          canc: '取消',
          mNote: '会员注单数据',
          mPlat: '会员平台ID',
          nPer: '期数',
          lAm: '彩票金额',
          amt: '金额',
          won: '  已中奖',
          unwin: '  未中奖',
          lName: '彩票名称',
          pBet: '下注时间',
          lCode: '彩票码',
          cNote: '下注内容',
          nData: '注单数据'
        },
      },
      record: {
        div: {
          button: {
            more: '更多',

          },
          gbNum: '游戏局号',
          pAcc: '玩家帐号',
          rId: '房间ID',
          gId: '游戏ID',
          tNum: '桌子号',
          cNo: '椅子号',
          nPlayers: '玩家数量',
          hPub: '手牌公共牌',
          vBets: '有效下注',
          wPump: '抽水',
          setTime: '结算时间',
          proxy: '代理ID',
          affState: '所属站点',
          det: '详情',
          gMatch: '游戏对局日志',
          cMatch: '点击打开对局详情'
        },
        data: {
          gList: '游戏对局列表',
          vipLvl: 'vip等级只能大于之前的等级'
        }
      }
    },
    memberGameDataMin: {
      index: {
        div: {
          date: {
            dRange: '日期范围',
            sTime: '开始时间',
            eTime: '结束时间',
            to: '至'
          },
          button: {
            search: '搜索',
            reset: '重置',

          },
          entMemid: '请输入会员ID',
          entbNum: '请输入游戏局号',
          sBet: '请选择投注状态',
          memId: '会员ID',
          proxyId: '代理ID',
          trnsctNum: '交易订单号',
          gbNum: '游戏局号',
          bStat: '下注状态',
          pName: '平台名称',
          vBets: '有效下注',
          tBets: '总下注',
          profit: '盈利',
          pBets: '下注时间',
          sportBet: '体育投注明细'
        },
        data: {
          gbNum: '游戏局号不能为空',
          entMemid: '会员ID只能输入数字及下划线',
        }
      }
    },
    memberGameTransfer: {
      index: {
        div: {
          btn: {
            search: '搜索',
            reset: '重置'
          },
          date: {
            dRange: '日期范围',
            sDate: '开始日期',
            eDate: '结束日期',
          },
          template: {
            kChess: '开元棋牌',
            ppFish: 'PP捕鱼',
            lot77: '77彩票',
            agPlat: 'AG平台',
            mgPlat: 'MG平台',
            ngElec: 'NG电子',
            bbinV: 'BBIN视讯',
            bbinS: 'BBIN体育',
            bbinE: 'BBIN电子',
            bbinF: 'BBIN捕鱼',
            sabS: '沙巴体育',
            mChess: '美天棋牌',
            tChess: '凯旋棋牌',
            lChess: '乐游棋牌',
            nwChess: '新世界棋牌',
            afbEl: 'AFB电子',
            panSport: '泛亚电竞',
            bgVid: 'BG视讯',
            bgFish: 'BG捕鱼',
            bgGame: 'BG电游',
            tChessx: '凯旋棋牌X'
          },
          entPid: '请输入玩家ID',
          entPod: '请输入订单ID',
          selTstat: '请选择交易状态',
          selTtype: '请选择交易类型',
          tId: '交易ID',
          pId: '玩家ID',
          proxy: '代理ID',
          plat: '平台ID',
          ordId: '订单ID',
          pType: '产品类型',
          tStat: '交易状态',
          succ: '成功',
          tobe: '待处理',
          nConf: '未确认',
          fail: '失败',
          unk: '未知',
          tType: '交易类型',
          tQuota: '额度转出',
          cTrans: '额度转入',
          tAmt: '交易金额',
          tHours: '交易时间',

        }
      }
    },
    memberInfo: {
      index: {
        button: {
          numMem: '会员人数',
          totBal: '余额总计',
          totDep: '保险箱余额总计',
          statQ: '统计查询',
          ip: '查看封停ip',
          bBlock: '批量封禁',
          sDepo: '保险箱余额提出',
          det: '确 定',
          normal: '正常',
          fden: '封禁',

        },
        date: {
          range: '日期范围',
          sTime: '开始时间',
          eTime: '结束时间',
          to: '至'
        },
        invCode: '邀请码',
        aState: '全部状态',
        lIp: '登录IP',
        bName: '银行卡号/真实姓名',
        logRem: '登录备注',
        aType: '全部类型',
        cvNum: '客户端版本号',
        lDev: '登录设备',
        memId: '会员ID',
        mVip: '会员vip',
        points: '积分',
        sDeposit: '保险箱余额',
        selStat: '请选择状态',
        memSearch: '会员ID/账号/手机号 , 逗号分隔的成员搜索',
        regTime: '注册时间',
        logTime: '登录时间',
        numLog: '登陆次数',
        logIp: '登录ip',
        regIp: '注册IP',
        restArea: '限制地区',
        wRest: '出款限制',
        ban: '是否禁言',
        codeAcc: '打码账户',
        valBets: '累计有效投注',
        uType: '用户类型',
        mem: '会员',
        none: '无',
        other: '其它',
        lRem: '登录备注',
        nBan: '备注禁用原因',
        selDis: '请选择禁用原因',
        entDis: '请输入禁用原因',
        cnc: '取消',
        sbmt: '立即提交',
        remBan: '备注禁言原因',
        selBan: '请选择禁言原因',
        resBan: '请输入禁言原因',
        submit: '立即提交',
        cellNum: '手机号',
        entCell: '请输入手机号',
        recom: '建议:',
        lastDig: '请统一测试账号格式,默认格式已生成,请只输入后四位',
        pass: '密码',
        entPass: '请输入密码',
        passDig: '密码自动分配,为电话号码后六位',
        memIp: '会员ip',
        bRem: '封停备注',
        cTime: '封停时间',
        rName: '真实姓名',
        sMod: '状态修改成功',
        sModfail: '状态修改失败',
        netAnom: '网络异常',
        vbIp: '查看已封停的ip',
        confirmUp: '确定要 {row} 解封吗?',
        warn: '警告',
        det: '确定',
        unbSucc: '解封成功',
        addUinf: '添加测试用户信息',
        modInf: '修改用户信息',
        modSucc: '修改成功',
        addSucc: '新增成功',
        confExp: '是否确认导出所有会员列表数据项?',
        nData: '没有数据',
        memList: '会员列表',
        succUnb: '解禁成功',
        banSucc: '禁言成功',
        vMem: '查看会员',
        uipInc: '用户名或ip不正确!',
        statSet: '状态设置0成功',
        netEx: '网络异常error',
        statNorm: '状态设置正常成功',
        pStat: ' - 个人报表',
        repSucc: '复制成功',
        pGverifcode: '请输入您的谷歌验证码',
        loginMark: '登录备注',
        operation: '操作',
        verifInc: '验证码格式不正确,0-10数字,请重新输入',
        sDepo: '保险箱余额提出成功',
        fDepo: '保险箱余额提出失败',
        cInp: '取消输入',
      },
      more: {
        exCred: '加分',
        threeWay: '三方游戏',
        bCard: '银行卡',
        sms: '发送短信',
        rCp: '重置手机号',
        rIc: '重置邀请码',
        fAnc: '关注主播',
        gAnc: '守护主播',
        fDet: '资金明细',
        rPass: '重置保险箱密码',
        rwPass: '重置提现密码',
        rlPass: '重置登入密码',
        cFix: '打码修复',
        mVip: '修改Vip',
        imban: 'IM禁言',
        dShow: '域名展示',
        gName: '游戏名称',
        amt: '金额',
        lDiv: '下分',
        amtEx: '加分金额',
        pAmt: '请输入金额',
        dType: '入款类型',
        pRem: '支付备注',
        pNote: '请输入支付备注',
        exCredRem: '加分备注',
        pNoteR: '请备注具体加分入金原因',
        oRem: '订单备注',
        pfOM: '补单请填写补单订单号，末开奖补回请填写开期号，无则填写为0',
        amtCoded: '待打码金额',
        alsoCode: '还需打码金额',
        cMulti: '打码倍数',
        peAC: '请按顺序先输入加分金额，再输入待打码金额，系统会自动计算打码倍数。默认请填写1,如未打算打码可填写为0',
        gCaptcha: '谷歌验证码',
        pgAC: '请输入谷歌验证码',
        resPass: '重置密码',
        pNP: '请输入新密码',
        gvc: 'google验证码',
        pgvc: '请输入google验证码',
        sMess: '短信信息',
        psms: '请选择发送的信息',
        ocpn: '旧手机号',
        pocpn: '请输入旧手机号',
        vCp: '查看完整手机号',
        ncp: '新手机号',
        pncp: '请输入新手机号',
        ric: '重置邀请码',
        peic: '请输入邀请码',
        lDom: '登录域名',
        rDomn: '注册域名',
        bName: '银行名称',
        bcNum: '银行卡号',
        bAdd: '银行地址',
        bTime: '绑定时间',
        mcUnb: '主卡解绑',
        subUnb: '副卡解绑',
        cMod: '确认修改',
        hid: '主播ID',
        nAnc: '主播昵称',
        gType: '守护类型',
        exTime: '到期时间',
        det: '确 定',
        mVIP: '修改vip等级和昵称',
        vl: 'Vip等级',
        cancel: '取消',
        sub: '立即提交',
        dEnab: '禁用启用IM发言',
        remban: '剩余禁言时间:',
        mAcc: '会员账号:',
        imbantime: 'IM禁言时间备注：0取消禁言,4294967295永久禁言,其它值具体禁言时间,以秒为单位',
        btime: '禁言时间（单位秒）',
        snow: '立即提交',
        old: '旧手机号码不能为空',
        lold: '旧手机号码长度不能超过11位',
        newcp: '新手机号码不能为空',
        lnewcp: '新手机号码长度不能超过11位',
        gcapnot: '谷歌验证码不能为空',
        ricbe: '重置邀请码不能为空',
        lricbe: '重置邀请码长度不能超过500个字符',
        gCap: 'google验证码不能为空',
        resPassEmp: '重置密码不能为空',
        rpl: '重置密码长度不能超过30个字符',
        epcannot: '加分金额不能为空',
        ennot: '入款备注不能为空',
        cinot: '备注信息不能为空',
        lengthcomm: '备注信息长度不能超过200位',
        onemp: '订单备注不能为空',
        cellChange: '手机号修改成功',
        cellnot: '手机号码不可用',
        cellComp: '完整手机号码已展示',
        icMod: '邀请码修改成功',
        sendSucc: '发送短信成功',
        dsSucc: '下分成功',
        bTran: '银行卡转账',
        unk: '未知',
        bci: '是否修改银行卡信息?',
        cnced: '已取消',
        sres: '确定重置保险箱?',
        pvl: '请输入VIP等级',
        succOp: '操作成功!',
        rsSucc: '重置保险箱成功',
        fSafe: '重置保险箱失败',
        fvcnc: '验证码格式不正确,0-10数字,请重新输入',
        rws: '重置提现成功',
        rwf: '重置提现失败',
        cinp: '取消输入',
        rdSucc: '修复打码数据成功',
        fixCode: '修复打码数据失败',
        maxVip: 'VIP等级最大为50级',
        vipMod: 'vip等级修改不能小于之前的等级',
        vipModF: 'vip等级修改失败',
        fThree: '获取三方游戏列表失败',
        flfund: '获取资金明细列表失败',
        ffollow: '获取关注列表失败'
      },
      personalRecordTable: {
        memId: '会员ID',
        wFunds: '提款',
        oTop: '线上充值',
        ofTop: '线下充值',
        tRech: '合计充值',
        cVol: '打码量',
        gGiv: '送礼',
        pnl: '盈亏',
        bal: '余额',
        sdepB: '保险箱余额',
        bGames: '投注游戏',
        vBets: '有效投注',
        sTime: '搜索时间不允许为空'
      }
    },
    memberInfoHistory: {
      index: {
        aStates: '全部状态',
        mam: '会员ID/账号/手机号',
        iCode: '邀请码',
        aTypes: '全部类型',
        lip: '登录IP',
        bcNum: '银行卡号',
        lRem: '登录备注',
        vip: '查看封停IP',
        mid: '会员ID',
        aNum: '账号',
        lTime: '登录时间',
        psStat: '请选择状态',
        rTime: '注册时间',
        nLogs: '登陆次数',
        wBan: '是否禁言',
        cam: '打码账户',
        cvBets: '累计有效投注',
        uType: '用户类型',
        nrBan: '备注禁用原因',
        psrDis: '请选择禁用原因',
        perDis: '请输入禁用原因',
        other: '其他',
        cnc: '取消',
        snow: '立即提交',
        rbr: '备注禁言原因',
        selrBan: '请选择禁言原因',
        entrBan: '请输入禁言原因',
        cpNum: '手机号',
        ecpNum: '请输入手机号',
        rcm: '建议:',
        unifyAcc: '请统一测试账号格式,默认格式已生成,请只输入后四位',
        pass: '密码',
        ppass: '请输入密码',
        paut: '密码自动分配,为电话号码后六位',
        det: '确 定',
        mip: '会员IP',
        bRem: '封停备注',
        cTime: '封停时间',
        ublock: '解封',
        smode: '状态修改成功',
        smodf: '状态修改失败',
        nAnom: '网络异常',
        ditto: '确定要 {row} 解封吗?',
        warn: '警告',
        unbSucc: '解封成功',
        onu: '会员ID/账号/手机号只能输入数字及下划线',
        auInfo: '添加测试用户信息',
        mInf: '修改用户信息',
        modSucc: '修改成功',
        asucc: '新增成功',
        dcon: '是否确认导出所有会员列表数据项?',
        mList: '会员列表',
        sunb: '解禁成功',
        bsucc: '禁言成功'
      },
      more: {
        eCred: '加分',
        twGame: '三方游戏',
        bCard: '银行卡',
        sms: '发送短信',
        rPass: '重置密码',
        rcp: '重置手机号',
        ric: '重置邀请码',
        fdet: '资金明细',
        rsafe: '重置保险箱',
        rwith: '重置提现',
        cfix: '打码修复',
        mvip: '修改VIP',
        imban: 'IM禁言',
        gname: '游戏名称',
        amt: '金额',
        ldiv: '下分',
        aep: '加分金额',
        pea: '请输入金额',
        dtype: '入款类型',
        pRem: '支付备注',
        pnote: '请输入支付备注',
        eRem: '加分备注',
        prap: '请备注具体加分入金原因',
        orem: '订单备注',
        pfro: '补单请填写补单订单号，末开奖补回请填写开期号，无则填写为0',
        acoded: '待打码金额',
        aca: '还需打码金额',
        cmult: '打码倍数',
        peax: '请按顺序先输入加分金额，再输入待打码金额，系统会自动计算打码倍数。默认请填写1,如未打算打码可填写为0',
        gcap: '谷歌验证码',
        pgac: '请输入谷歌验证码',
        rpass: '重置密码',
        penp: '请输入新密码',
        gvc: 'google验证码',
        pegvc: '请输入google验证码',
        peic: '请输入邀请码',
        smsm: '短信信息',
        psms: '请选择发送的信息',
        ocpn: '旧手机号',
        peocpn: '请输入旧手机号',
        vfcpn: '查看完整手机号',
        ncpn: '新手机号',
        pencn: '请输入新手机号',
        bname: '银行名称',
        bcnum: '银行卡号',
        badd: '银行地址',
        btime: '绑定时间',
        mcunb: '主卡解绑',
        scunb: '副卡解绑',
        cmod: '确认修改',
        det: '确 定',
        mvipln: '修改VIP等级和昵称',
        vlvl: 'VIP等级',
        cnc: '取消',
        snow: '立即提交',
        dims: '禁用启用IM发言',
        remban: '剩余禁言时间:',
        macc: '会员账号',
        imbtime: 'IM禁言时间备注：0取消禁言,4294967295永久禁言,其它值具体禁言时间,以秒为单位',
        bant: '禁言时间（单位秒）',
        mdep: '人工入款',
        ecred: '加分',
        ocne: '旧手机号码不能为空',
        lopn: '旧手机号码长度不能超过11位',
        ncne: '新手机号码不能为空',
        lcne: '新手机号码长度不能超过11位',
        gcce: '谷歌验证码不能为空',
        ricce: '重置邀请码不能为空',
        lricce: '重置邀请码长度不能超过500个字符',
        rpassemp: '重置密码不能为空',
        rpl: '重置密码长度不能超过30个字符',
        taep: '加分金额不能为空',
        tetemp: '入款类型不能为空',
        tcic: '备注信息不能为空',
        tlci: '备注信息长度不能超过200位',
        once: '订单备注不能为空',
        vpl: 'VIP等级只能大于之前的等级',
        cpn: '手机号修改成功',
        cnd: '完整手机号码已展示',
        icms: '邀请码修改成功',
        dss: '下分成功',
        bct: '银行卡转账',
        unk: '未知',
        wcbc: '是否修改银行卡信息?',
        cancel: '已取消',
        srs: '确定重置保险箱?',
        pevip: '请输入VIP等级',
        sop: '操作成功',
        rss: '重置保险箱成功',
        frs: '重置保险箱失败',
        fvc: '验证码格式不正确,0-10数字,请重新输入',
        rws: '重置提现成功',
        rwf: '重置提现失败',
        cip: '取消输入',
        rcds: '修复打码数据成功',
        fcdf: '修复打码数据失败',
        vlms: 'VIP等级修改成功',
        vlmf: 'VIP等级修改失败',
        fthree: '获取三方游戏列表失败',
        ffund: '获取资金明细列表失败',
        fbcard: '获取银行卡列表失败',

      },
      tableShow: {
        bmi: '会员基本信息',
        fdet: '资金明细',
        mid: '会员ID',
        rtime: '注册时间',
        utype: '用户类型',
        mcod: '会员打码',
        mip: '会员IP',
        cbal: '当前余额',
        ltime: '登录时间',
        vlvl: 'VIP等级',
        mnf: '会员注单',
        ladd: '登录地址',
        mmi: '会员资金信息',
        ora: '线上充值金额(一月内):',
        ohra: '线上历史充值金额',
        inq: '查询',
        ota: '线下充值金额',
        ca: '代充金额:',
        mca: '手工上分金额:',
        taor: '充值总金额:',
        now: '提现次数:',
        cwa: '提现金额:',
        mr: '会员备注',
        upd: '更新',
        ltest: '彩票检测',
        noab: '异常投注次数:',
        gp: '游戏盈利(一月内)',
        icc: '最多输入50个汉字',
        ms: '修改成功',
        ncn: '此会员无手机号',

      }
    },
    memberMoney: {
      mid: '会员ID',
      pemid: '请输入会员ID',
      uex: '上传Excel',
      sdel: '开始派送',
      cd: '清除数据',
      tda: '总派送金额:',
      sda: '统计派送金额',
      da: '派送金额',
      cm: '打码倍数',
      peda: '请输入派送金额',
      pecm: '请输入打码倍数',
      rod: '入款备注',
      peen: '请输入入款备注',
      pegac: '请输入谷歌验证码',
      sd: '开始派送',
      dace: '派送金额不能为空',
      cmce: '打码倍数不能为空',
      tenc: '入款备注不能为空',
      gcce: '谷歌验证码不能为空',
      eus: 'Excel上传成功',
      euf: 'Excel上传失败!',
      ooe: '只能选取一个excel,如需更换请x掉再选取',
      ute: '上传模板只能是xlsx or xls 格式的Excel文件!',
      sut: '上传模板大小不能超过10MB!',
      rs: '移除成功',
      tfis: '此文件导入成功',
      tfif: '此文件导入失败',
      sfc: '数据清理成功',
      dip: '正在派送中',
      ds: '派送成功',
      apsf: '添加派送彩金暂存表',
      mpbs: '修改派送彩金暂存表',
      ms: '修改成功',
      as: '新增成功',
      wcd: '是否确认删除派送彩金暂存表编号为 {mid} 的数据项?',
      dels: '删除成功',
      cpe: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
      pbtd: '派送彩金暂存表'
    },
    memberOnline: {
      nom: '在线会员数量',
      man: '会员ID/账号',
      pemn: '请输入会员昵称',
      mid: '会员ID',
      ma: '会员账号',
      mv: '会员VIP',
      lat: '最后活跃时间',
      lip: '登入IP',
      menu: '会员ID/账号只能输入数字及下划线',
      cpe: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
      oml: '在线会员列表'
    }
  },

  liveWeb: {
    anchorAward: {
      queryForm: {
        updateTimeLabel: '日期范围',
        updateTimePlaceholder: '请选择日期选择',
        idPlaceholder: '主播ID',
        nickNamePlaceholder: '主播昵称',
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        exportButton: '@:common.exportButton'
      },
      table: {
        anchor: '主播ID',
        nickName: '主播昵称',
        cost: '投注',
        prize: '派奖',
        prizeSixThousand: '派奖千六',
        updateTime: '修改时间'
      },
      confirmExportDialog: {
        title: '@:common.titleDialog',
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      }
    },
    chat: {
      queryForm: {
        fromPlatformPlaceholder: '会员ID',
        userNicknamePlaceholder: '会员昵称',
        poscatIdPlaceholder: '主播ID',
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        viewBlackListButton: '查看封停ip'
      },
      refresh: {
        title: '记录刷新',
        placeholder: '时间间隔',
        description: '{secs}秒后开始刷新',
        interval: '{secs}秒',
        startButton: '开始刷新',
        stopButton: '停止刷新'
      },
      table: {
        fromPlatform: '平台会员ID',
        userNickName: '用户昵称',
        type: '消息类型',
        type0: '普通消息',
        type1: '弹幕消息',
        msg: '消息内容',
        poscatId: '主播ID',
        poscatNickName: '主播昵称',
        noSpeaking: '是否封停',
        noSpeakingTrue: '已封停',
        noSpeakingFalse: '正常',
        forbid: '是否禁言',
        forbidTrue: '禁言',
        forbidFalse: '正常',
        userIp: '发言ip',
        createTimes: '发送时间',
        operation: '@:global.operationColumn',
        muteButton: '封停',
        unmuteButton: '解封',
        forbidButton: '禁言'
      },
      confirmUpdateDialog: {
        title: '@:global.dialogTitle',
        message: '确定要{fromPlatform}解封吗?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        fromPlatformError: '会员ID只能输入数字及下划线',
        unblockSuccess: '解封成功'
      },
      suspendUserDialog: {
        titleAdd: '添加会员发言',
        titleUpdate: '封停用户',
        fromPlatformLabel: '平台会员ID',
        fromPlatformPlaceholder: '请输入平台会员ID',
        userNickNameLabel: '发送者昵称',
        userNickNamePlaceholder: '请输入发送者昵称',
        msgLabel: '消息内容',
        userIpLabel: '封停ip',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        validation: {
          postcatId: '主播ID不能为空'
        },
        messageBox: {
          suspendSuccess: '封停成功'
        }
      },
      banRemarksDialog: {
        title: '备注禁言原因',
        remarkPlaceholder: '请选择禁言原因',
        remarkedPlaceholder: '请输入禁言原因',
        submitButton: '立即提交',
        messageBox: {
          forbidSuccess: '禁言成功'
        }
      },
      viewBlackListDialog: {
        title1: '查看封停ip',
        title2: '查看已封停的ip',
        queryForm: {
          userIdLabel: '会员id',
          userIdPlaceholder: '会员id',
          userIpLabel: '会员ip',
          userIpPlaceholder: '会员ip',
          searchButton: '@:global.searchButton'
        },
        table: {
          userId: '会员ID',
          userIp: '封停ip',
          msg: '封停备注',
          createTime: '封停时间',
          operation: '@:global.operationColumn',
          unblockButton: '解封'
        },
        confirmUpdateDialog: {
          title: '@:global.dialogTitle',
          message: '确定要{userId}解封吗?',
          confirmButton: '@:global.confirmButton',
          cancelButton: '@:global.cancelButton'
        },
        messageBox: {
          unblockSuccess: '解封成功'
        }
      }
    },
    family: {
      queryForm: {
        namePlaceholder: '名称',
        userIdPlaceholder: '族长ID',
        idPlaceholder: '家族ID',
        statusPlaceholder: '全部状态',
        status0: '未审核',
        status1: '审核通过',
        status2: '审核拒绝',
        status3: '封停中',
        status4: '解散',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: '新增家族'
      },
      table: {
        name: '家族名称',
        notice: '公告',
        manifesto: '家族宣言',
        nickName: '族推荐号',
        userId: '家族长ID',
        userCount: '成员数量',
        createTimes: '创建时间',
        status: '状态',
        status0: '未审核',
        status1: '审核通过',
        status2: '审核拒绝',
        status3: '封停中',
        status4: '解散',
        contribution: '家族成员的贡献',
        videoTime: '直播时间',
        memo: '备注',
        operation: '@:global.operationColumn',
        updateFamilyButton: '修改',
        removeButton: '解散',
        updateFlag0Button: '不通过',
        updateFlag1Button: '通过',
        updateFlag2Button: '封停',
        updateFlag3Button: '解封'
      },
      addUpdateDialog: {
        titleAdd: '添加家族',
        titleUpdate: '修改家族',
        nameLabel: '家族名称',
        namePlaceholder: '请输入家族名称',
        userIdLabel: '家族长ID',
        userIdPlaceholder: '请输入家族长ID',
        nickNameLabel: '家族长昵称',
        nickNamePlaceholder: '请输入家族长昵称',
        logoLabel: '家族LOGO',
        manifestoLabel: '家族宣言',
        manifestoPlaceholder: '请输入家族宣言',
        noticeLabel: '公告',
        noticePlaceholder: '请输入内容',
        memoLabel: '备注',
        memoPlaceholder: '请输入内容',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        validation: {
          logo: '请上传家族LOGO',
          name: '请输入家族名称',
          userId: '请输入家族长ID',
          nickName: '请输入家族长昵称',
          manifesto: '请输入家族宣言',
          notice: '请输入公告',
          memo: '请输入备注'
        }
      },
      confirmUpdateFlag0Dialog: {
        title: '@:global.dialogTitle',
        message: '是否确认拒绝家族名称"{name}"的数据项?',
        confirmButton: '@:global:confirmButton',
        cancelButton: '@:global:cancelButton'
      },
      confirmUpdateFlag1Dialog: {
        title: '@:global.dialogTitle',
        message: '是否确认通过审核家族名称"{name}"的数据项?',
        confirmButton: '@:global:confirmButton',
        cancelButton: '@:global:cancelButton'
      },
      confirmUpdateFlag2Prompt: {
        title: '@:global.promptTitle',
        message: '请输入封停原因',
        confirmButton: '@:global:confirmButton',
        cancelButton: '@:global:cancelButton',
        inputErrorMessage: '封停原因不能为空'
      },
      confirmUpdateFlag3Prompt: {
        title: '@:global.promptTitle',
        message: '请输入解封原因',
        confirmButton: '@:global:confirmButton',
        cancelButton: '@:global:cancelButton',
        inputErrorMessage: '解封原因不能为空'
      },
      confirmRemoveDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认解散"{name}"家族?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认导出所有家族数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        updateFlag0Success: '审核拒绝成功',
        updateFlag1Success: '审核通过',
        updateFlag2Success: '封停成功',
        updateFlag2Cancel: '取消输入',
        updateFlag3Success: '解封成功',
        updateFlag3Cancel: '取消输入',
        removeSuccess: '删除成功'
      }
    },
    guard: {
      queryForm: {
        specificationsLabel: '规格',
        specificationsPlaceholder: '请输入规格',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: '@:global.addButton',
        edit: '@:global.editButton',
        remove: '@:global.deleteButton'
      },
      table: {
        specifications: '规格',
        month: '守护月数',
        price: '价格',
        type: '守护类型',
        type1: '银之守护',
        typeOthers: '星之守护',
        propId: '礼物id',
        discountPrice: '优惠价格',
        giveday: '赠送天数',
        operation: '@:global.operationColumn',
        editButton: '修改',
        removeButton: '删除'
      },
      addUpdateDialog: {
        titleAdd: '添加',
        titleUpdate: '修改',
        specificationsLabel: '规格',
        specificationsPlaceholder: '请选择规格',
        monthLabel: '守护月数',
        monthPlaceholder: '请输入守护月数',
        priceLabel: '价格',
        pricePlaceholder: '请输入价格',
        typeLabel: '守护类型',
        typePlaceholder: '请选择',
        propIdLabel: '关联礼物',
        propIdPlaceholder: '请选择',
        discountPriceLabel: '优惠价格',
        discountPricePlaceholder: '请输入优惠价格',
        givedayLabel: '赠送天数',
        givedayPlaceholder: '请输入赠送天数',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmRemoveDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认删除编号为"{ids}"的数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认导出所有数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        editLiveGuardConfigSuccess: '修改成功',
        addLiveGuardConfigSuccess: '新增成功',
        removeLiveGuardConfigSuccess: '删除成功'
      }
    },
    h5: {
      queryForm: {
        nameLabel: '名称',
        namePlaceholder: '请输入名称',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: '@:global.addButton',
        edit: '@:global.editButton',
        remove: '@:global.deleteButton'
      },
      table: {
        id: '编号',
        name: '插件名称',
        status: '状态',
        status0: '停用',
        status1: '启用',
        conUrl: '地址',
        iconUrl: '图标',
        operation: '@:global.operationColumn',
        editButton: '修改',
        removeButton: '删除'
      },
      validations: {
        name: '名称不能为空',
        id: '编号不能为空'
      },
      addDialog: {
        title: '添加h5插件',
        idLabel: '编号',
        idPlaceholder: '请输入编号',
        nameLabel: '插件名称',
        namePlaceholder: '请输入名称',
        conUrlLabel: '内容地址',
        conUrlPlaceholder: '请输入内容地址',
        iconUrlLabel: '图标地址',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      editDialog: {
        title: '修改h5插件',
        nameLabel: '插件名称',
        namePlaceholder: '请输入名称',
        conUrlLabel: '内容地址',
        conUrlPlaceholder: '请输入内容地址',
        iconUrlLabel: '图标地址',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmRemoveDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认删除h5插件编号为"{ids}"的数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmStatusChangeDialog: {
        title: '@:global.dialogTitle',
        message: '确认要{text}"{name}"吗?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        addSuccess: '新增成功',
        editSuccess: '修改成功',
        removeSuccess: '删除成功',
        statusChangeSuccess: '{text}成功'
      }
    },
    imMute: {
      queryForm: {
        userIdLabel: '会员ID',
        userIdPlaceholder: '请输入会员ID',
        nickNameLabel: '会员昵称',
        nickNamePlaceholder: '请输入会员昵称',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      table: {
        memberAccount: '用户Id',
        nickName: '用户昵称',
        shuttedUntil: '截止时间',
        shuttedUntilNegative1: '永久',
        shuttedUntil0: '未封停'
      },
      messageBox: {
        userIdAndNickNameEmptyWarning: '当主播Id和主播昵称不能同时为空',
        userIdFormatError: '会员ID只能输入数字及下划线'
      }
    },
    liveBlack: {
      queryForm: {
        hostIdLabel: '主播ID',
        hostIdPlaceholder: '请输入主播ID',
        blackUserIdLabel: '会员ID',
        blackUserIdPlaceholder: '请输入被设置的用户ID',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      table: {
        blackUserId: '会员ID',
        nickName: '会员昵称',
        hostId: '主播ID',
        hostName: '主播昵称',
        remark: '封停备注',
        createTime: '封停时间',
        operation: '@:global.operationColumn',
        removeButton: '移除黑名单禁言'
      },
      messageBox: {
        memberIdFormatError: '会员ID只能输入数字及下划线',
        removeSuccess: '删除成功'
      },
      confirmRemoveDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认删除拉黑编号为"{ids}"的数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      }
    },
    liveComplaint: {
      queryForm: {
        selectDateLabel: '创建时间',
        selectDateStartPlaceholder: '开始日期',
        selectDateEndPlaceholder: '结束日期',
        userIdPlaceholder: '请输入会员ID',
        anchorPlaceholder: '请输入主播ID',
        statusPlaceholder: '请选择处理状态',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        export: '@:global.exportButton'
      },
      table: {
        content: '投诉内容',
        mobile: '会员手机号',
        roomName: '房间名称',
        userId: '会员ID',
        anchor: '主播',
        createTime: '创建时间',
        approver: '审批人',
        remark: '审批备注',
        processingTime: '审批时间',
        status: '处理状态',
        status0: '未处理',
        status1: '已处理',
        status2: '驳回',
        operation: '@:global.operationColumn',
        processButton: '处理',
        rejectButton: '驳回'
      },
      addDialog: {
        title: '添加主播投诉记录',
        remarkLabel: '投诉内容',
        remarkPlaceholder: '请输入内容',
        userIdLabel: '会员ID',
        userIdPlaceholder: '请输入会员ID',
        anchorLabel: '主播',
        anchorPlaceholder: '请输入主播',
        approverLabel: '审批人',
        approverPlaceholder: '请输入审批人',
        processingTimeLabel: '审批时间',
        processingTimePlaceholder: '选择审批时间',
        statusLabel: '状态(0待处理 1审核通过 2驳回)',
        statusPlaceholder: '请选择字典生成',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmEditConfirmationPrompt: {
        title: '@:global.promptTitle',
        message: '请输入审核备注',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        userIdFormatError: '会员ID只能输入数字及下划线',
        editSuccess: '审核处理成功',
        editCancel: '取消输入',
        updateLiveComplaintSuccess: '修改成功',
        addLiveComplaintSuccess: '新增成功'
      }
    },
    liveHostPre: {
      queryForm: {
        dateDayPlaceholder: '选择日期',
        livePlaceholder: '预约时间(可多选)',
        liveLabel: '{num}点',
        familyIdPlaceholder: '请输入家族ID',
        hostId: '请输入主播ID',
        hostName: '请输入直播昵称',
        statusPlaceholder: '全部状态',
        searchButton: '@:global.searchButton'
      },
      actions: {
        export: '@:global.exportButton'
      },
      table: {
        id: '日期+主播ID',
        familyId: '家族ID',
        hostId: '主播ID',
        hostName: '直播昵称',
        status: '状态',
        live: '{num}点',
        remark: '备注',
        createTime: '创建时间',
        operation: '@:global.operationColumn',
        passButton: '通过',
        rejectButton: '驳回'
      },
      addDialog: {
        title: '添加主播开播时间预约',
        familyIdLabel: '家族ID',
        familyIdPlaceholder: '请输入家族ID',
        hostIdLabel: '主播ID',
        hostIdPlaceholder: '请输入主播ID',
        hostNameLabel: '直播昵称',
        hostNamePlaceholder: '请输入直播昵称',
        statusLabel: '0=申请1通过2=驳回',
        statusPlaceholder: '请选择字典生成',
        liveLabel: '直播时间',
        livePlaceholder: '请输入直播时间',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmUpdateStatusFlag1Dialog: {
        title: '@:global.dialogTitle',
        message: '是否确认通过"{hostName}"的申请?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmUpdateStatusFlag2Prompt: {
        title: '@:global.promptTitle',
        message: '请输入驳回原因',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        inputErrorMessage: '驳回原因不能为空'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        updateStatusFlag1Success: '审核通过',
        updateStatusFlag2Success: '驳回成功',
        updateStatusFlag2Cancel: '取消输入',
        updateLiveHostPreSuccess: '修改成功',
        addLiveHostPreSuccess: '新增成功'
      }
    },
    liveHostWageNote: {
      queryForm: {
        dateDayPlaceholder: '选择日期',
        settlementRateLabel: '散户结算率',
        settlementRatePlaceholder: '请输入散户结算率',
        familyIdPlaceholder: '家族ID',
        familyNamePlaceholder: '家族名称',
        familyNickNamePlaceholder: '族长昵称',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        export: '@:global.exportButton',
        familyShow: '所有主播'
      },
      table: {
        familyId: '家族ID',
        familyName: '家族名称',
        familyId0Name: '散户',
        familyUserId: '族长ID',
        familyNickName: '族长昵称',
        livetime: '直播时长',
        livetimejiesuan: '时长结算',
        liwu: '礼物金额',
        liwujiesuan: '礼物结算',
        lotteryCost: '彩票投注',
        costQianliu: '彩票结算',
        times: '开播次数',
        totalsettle: '结算总计'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      }
    },
    liveHostWageNotedays: {
      queryForm: {
        selectDateLabel: '日期选择',
        selectDateStartPlaceholder: '开始日期',
        selectDateEndPlaceholder: '结束日期',
        hostIdPlaceholder: '主播ID',
        nickNamePlaceholder: '主播昵称',
        familyNamePlaceholder: '家族名称',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        export: '@:global.exportButton'
      },
      table: {
        hostId: '主播ID',
        nickName: '主播昵称',
        familyName: '家族名称',
        livetime: '开播时长',
        livetimejiesuan: '时长结算',
        ticket: '礼物结算',
        costQianliu: '彩票结算',
        times: '开播次数',
        totalsettle: '总收入'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认导出所有主播时长数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      }
    },
    liveHostWageNoteJump: {
      queryForm: {
        dateDayPlaceholder: '选择日期',
        settlementRateLabel: '散户结算率',
        settlementRatePlaceholder: '请输入散户结算率',
        hostIdPlaceholder: '主播ID',
        nickNamePlaceholder: '主播昵称',
        familyIdPlaceholder: '家族ID',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        export: '@:global.exportButton'
      },
      statistics: {
        totalsettleTotalPlaceholder: '结算总计统计'
      },
      table: {
        hostId: '主播ID',
        nickName: '主播昵称',
        familyId: '家族ID',
        familyIdPopover: '家 族 ID：',
        familyUserIdPopover: '家 族 长 ID：',
        familyNickName: '家族长昵称：',
        familyName: '家族名称',
        startTime: '直播开始时间',
        endTime: '直播结束时间',
        livetime: '直播时长',
        lwrenwu: '礼物任务',
        screnwu: '时长任务',
        coin: '时薪',
        livetimejiesuan: '时长结算',
        liwu: '收礼金额',
        liwujiesuanbili: '礼物提成',
        ticket: '礼物结算',
        lotteryCost: '彩票投注',
        lotteryBili: '彩票提成',
        costQianliu: '彩票结算',
        times: '开播次数',
        totalsettle: '结算总计'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认导出所有主播时长数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      }
    },
    liveMount: {
      queryForm: {
        gvipLabel: 'VIP等级',
        gvipPlaceholder: 'VIP等级',
        nameLabel: '坐骑名',
        namePlaceholder: '请输入坐骑名',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: '@:global.addButton',
        edit: '@:global.editButton',
        remove: '@:global.deleteButton'
      },
      table: {
        id: '坐骑id',
        gvip: 'vip等级',
        name: '坐骑名',
        status: '状态',
        status0: '停用',
        status1: '启用',
        iconUrl: '图标',
        price: '价格',
        disPrice: '折扣价格',
        vday: '有效天数',
        oder: '排序',
        operation: '@:global.operationColumn',
        editButton: '@:global.editButton',
        removeButton: '@:global.deleteButton'
      },
      addEditDialog: {
        titleAdd: '添加礼物',
        titleEdit: '修改礼物',
        gvipLabel: 'vip等级',
        gvipPlaceholder: '请输入免费领取VIP(-1只能买)',
        nameLabel: '坐骑名',
        namePlaceholder: '请输入坐骑名',
        statusLabel: '状态',
        status0: '未启用',
        status1: '启用',
        iconUrlLabel: '图标',
        svgUrlLabel: 'svga动画',
        priceLabel: '价格',
        pricePlaceholder: '请输入价格',
        disPriceLabel: '折扣价格',
        disPricePlaceholder: '请输入折扣价格',
        vdayLabel: '有效天数',
        vdayPlaceholder: '请输入有效天数',
        oderLabel: '排序',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        validations: {
          id: 'ID不能为空',
          name: '坐骑名不能为空',
          status: '状态不能为空',
          iconUrl: 'PC端图标不能为空',
          gvip: 'vip等级不能为空',
          svgUrl: 'svgUrl动画不能为空',
          price: '价格不能为空',
          disPrice: '折扣价格不能为空',
          vday: '赠送天数不能为空',
          oder: '不能为空'
        }
      },
      confirmRemoveDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认删除礼物列编号为"{ids}"的数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmStatusChangeDialog: {
        title: '@:global.dialogTitle',
        message: '确认要{text}"{name}"吗?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        updateLiveMountSuccess: '修改成功',
        addLiveMountSuccess: '新增成功',
        removeSuccess: '删除成功',
        statusChangeSuccess: '{text}成功'
      }
    },
    liveMsgEngage: {
      actions: {
        add: '@:global.addButton'
      },
      table: {
        msg: '互动信息',
        operation: '@:global.operationColumn',
        editButton: '@:global.editButton',
        removeButton: '@:global.deleteButton'
      },
      addEditDialog: {
        titleAdd: '添加主播互动消息',
        titleEdit: '修改主播互动消息',
        msgLabel: '互动消息',
        msgPlaceholder: '请输入互动信息',
        confirmButton: '@:global.confirmButton',
        validations: {
          id: 'id不能为空只能是数字',
          msg: '互动消息不能为空'
        }
      },
      confirmRemoveDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认删除消息为为"{msg}"的数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        removeSuccess: '删除成功'
      }
    },
    liveProp: {
      queryForm: {
        nameLabel: '道具名',
        namePlaceholder: '请输入道具名',
        typeLabel: '类型',
        typePlaceholder: '请选择类型',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: '@:global.addButton',
        edit: '@:global.editButton',
        remove: '@:global.deleteButton'
      },
      table: {
        name: '名称',
        icon: '图标',
        diamonds: '消费钻石',
        ticket: 'RMB/钻石',
        isMuch: '是否连送',
        isMuch1: '是',
        isMuchOthers: '否',
        type: '类型',
        type0: '礼物',
        type1: '打赏',
        type2: '守护',
        isAnimated: '展示动画',
        isAnimated0: '普通礼物',
        isAnimated1: 'gif礼物',
        isAnimatedOthers: '大型动画礼物',
        isEffect: '状态',
        isEffect1: '有效',
        isEffect0: '无效',
        operation: '@:global.operationColumn',
        editButton: '@:global.editButton',
        removeButton: '@:global.deleteButton'
      },
      addEditDialog: {
        titleAdd: '添加礼物列',
        titleEdit: '修改礼物列',
        nameLabel: '名称',
        namePlaceholder: '请输入道具名',
        diamondsLabel: '消费钻石',
        diamondsPlaceholder: '请输入',
        ticketLabel: '主播获得热度:',
        ticketPlaceholder: '请输入',
        iconLabel: '图标',
        isMuchLabel: '连续',
        isAnimatedLabel: '展示动画',
        animatedUrlLabel: 'svga动画',
        isSpecialLabel: '是否特殊礼物',
        isSpecial0: '正常',
        isSpecial1: '特殊',
        typeLabel: '类型',
        isEffectLabel: '状态',
        sortLabel: '排序',
        sortPlaceholder: '请输入排序',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmRemoveDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认删除礼物列编号为"{ids}"的数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmStatusChangeDialog: {
        title: '@:global.dialogTitle',
        message: '确认要{text}"{name}"吗?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        updateLivePropSuccess: '修改成功',
        addLivePropSuccess: '新增成功',
        removeSuccess: '删除成功',
        statusChangeSuccess: '{text}成功'
      }
    },
    liveUser: {
      queryForm: {
        userIdsLabel: '主播ID',
        userIdsPlaceholder: '主播ID,批量搜索请用英文逗号隔开',
        selectDateLabel: '注册日期',
        selectDateStartPlaceholder: '开始日期',
        selectDateEndPlaceholder: '结束日期',
        selectDateRangeSeparator: '至',
        nickNamePlaceholder: '主播昵称',
        phonePlaceholder: '手机号',
        isBanPlaceholder: '是否禁播',
        isAuthenticationPlaceholder: '全部状态',
        mobilePlaceholder: '家族ID',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: '@:global.addButton',
        export: '@:global.exportButton',
        liveRoomAssistant: '直播间小助手',
        batchJoin: '批量加入家族',
        batchKickOut: '批量踢出家族'
      },
      table: {
        id: '主播ID',
        nickName: '主播昵称',
        weixinAccount: '主播名片',
        familyName: '所属家族',
        familyId0: '未加入家族',
        familyIdPopover: '家 族 ID：',
        familyUserIdPopover: '家 族 长 ID：',
        familyNickNamePopover: '家族长昵称：',
        familyChieftain: '是否家族长',
        familyChieftain1: '是',
        familyChieftainOthers: '否',
        isAuthentication: '状态',
        isAuthenticationPlaceholder: '请选择状态',
        isAuthentication0: '未认证',
        isAuthentication1: '待审核',
        isAuthentication2: '已认证',
        isAuthentication3: '审核不通过',
        ticket: '印票',
        coin: '时薪',
        weixinPrice: '时薪任务',
        weiboMoney: '礼物任务',
        xpoint: '彩票抽成',
        ypoint: '礼物抽成',
        isBan: '是否禁播',
        isBan0: '正常',
        isBan1: '禁播',
        mobile: '手机号',
        loginIp: '登陆IP',
        banRemark: '禁播原因',
        operation: '@:global.operationColumn',
        kickOutButton: '踢出家族',
        auditButton: '审核',
        starBroadcastButton: '开播',
        endBroadcastButton: '关播',
        moreButton: '更多'
      },
      messageBox: {
        banError: '修改禁播状态失败',
        submitSuccess: '审核成功',
        openLiveSuccess: '开播成功',
        openLiveError: '开播失败',
        closeLiveSuccess: '关播成功',
        closeLiveError: '关播失败',
        kickOutSuccess: '踢出成功',
        kickOutError: '踢出主播失败',
        kickOutFamilyBulkError: '踢出家族失败',
        changeAuthTypeSuccess: '状态修改成功',
        changeAuthTypeError1: '状态修改失败',
        changeAuthTypeError2: '网络异常',
        joinFamilyBulkError: '加入家族失败'
      },
      addDialog: {
        title: '添加虚拟主播',
        mobileLabel: '手机号',
        nickNameLabel: '昵称',
        headImageLabel: '用户头像',
        isAuthenticationLabel: '类型',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      liveRoomAssistantDialog: {
        title: '直播间小助手',
        infoLabel: '小助手消息',
        infoPlaceholder: '请输入发送小助手消息',
        confirmButton: '@:global.confirmButton'
      },
      liveBroadcastDialog: {
        title: '开播信息',
        titleLabel: '标题',
        flvLabel: '视频流地址',
        liveImageLabel: '开播背景',
        lotteryLabel: '彩票',
        confirmButton: '@:global.confirmButton'
      },
      editDialog: {
        title: '修改主播信息',
        authenticationNameLabel: '真实姓名',
        contactLabel: '手机号',
        identifyNumberLabel: '身份证号码',
        coinLabel: '身份证号码',
        weixinPriceLabel: '开播时长任务',
        weiboMoneyLabel: '收礼礼物',
        xpointLabel: '彩票抽成',
        ypointLabel: '礼物抽成',
        identifyHoldImageLabel: '手持身份证照片',
        identifyPositiveImageLabel: '身份证正面',
        identifyNagativeImageLabel: '身份证反面',
        isAuthenticationLabel: '类型',
        vExplainLabel: '认证说明',
        investorSendInfoLabel: '拒绝理由',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        validation: {
          vExplain: '认证说明不能为空',
          investorSendInfo: '拒绝理由不能为空'
        }
      },
      confirmBanPrompt: {
        title: '@:global.promptTitle',
        message: '主播禁播备注',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmSubmitFormType0: {
        title: '@:global.dialogTitle',
        message: '是否确认{not}通过审核此主播?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmKickOutDialog: {
        title: '@:global.dialogTitle',
        message: '确定踢出主播昵称:[{nickName}]?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmKickOutFamilyBulkDialog: {
        title: '@:global.dialogTitle',
        message: '确定批量踢出家族吗?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmJoinFamilyBulkPrompt: {
        message: '批量加入家族',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        inputErrorMessage: '请输入数字类型'
      }
    },
    liveUserMore: {
      tab1: {
        title: '聊天室记录',
        queryForm: {
          selectDateLabel: '@:global.selectDateLabel',
          selectDateStartPlaceholder: '@:global.dateTimePickerStartTimePlaceholder',
          selectDateEndPlaceholder: '@:global.dateTimePickerEndTimePlaceholder',
          selectDateRangeSeparator: '@:global.dateTimePickerRangeSeparator',
          searchButton: '@:global.searchButton',
          resetButton: '@:global.resetButton'
        },
        table: {
          postcatId: '主播ID',
          poscatNickname: '主播昵称',
          fromPlatform: '发送者',
          userNickName: '发送者昵称',
          type: '消息类型',
          type0: '普通消息',
          type1: '未知',
          msg: '消息内容',
          createTime: '发送时间'
        },
        cancelButton: '@:global.cancelButton'
      },
      tab3: {
        title: '收礼物日志',
        queryForm: {
          selectDateLabel: '@:global.selectDateLabel',
          selectDateStartPlaceholder: '@:global.dateTimePickerStartTimePlaceholder',
          selectDateEndPlaceholder: '@:global.dateTimePickerEndTimePlaceholder',
          selectDateRangeSeparator: '@:global.dateTimePickerRangeSeparator',
          giftNameLabel: '礼物名称',
          giftNamePlaceholder: '请输入礼物名称',
          searchButton: '@:global.searchButton',
          resetButton: '@:global.resetButton'
        },
        table: {
          propId: '礼物ID',
          propName: '礼物名称',
          perUserId: '会员平台ID',
          totalDiamonds: '钻石',
          createDate: '创建时间',
          num: '发送数量'
        },
        cancelButton: '@:global.cancelButton'
      },
      tab5: {
        title: '提现比例',
        coinLabel: '时薪',
        weixinPriceLabel: '开播时长任务',
        weiboMoneyLabel: '收礼任务',
        xpointLabel: '彩票抽成',
        ypointLabel: '礼物抽成',
        qqIdLabel: '每日开播任务时间（开始）',
        qqIdPlaceholder: '任意时间点',
        qqTokenLabel: '每日开播任务时间（结束）',
        qqTokenPlaceholder: '任意时间点',
        confirmButton: '确定修改',
        cancelButton: '@:global.cancelButton',
        validations: {
          coin: '时薪不能为空',
          weixinPrice: '开播时长任务不能为空',
          weiboMoney: '收礼任务不能为空',
          qqId: '每日开播任务时间（开始）',
          qqToken: '每日开播任务时间（结束）',
          xpoint: '彩票抽成不能为空',
          ypoint: '礼物抽成不能为空'
        }
      },
      tab6: {
        title: '重置手机号',
        mobileLabel: '旧手机号',
        mobilePlaceholder: '请输入旧手机号',
        viewMobileButton: '查看完整手机号',
        newMobileLabel: '新手机号',
        newMobilePlaceholder: '请输入新手机号',
        googleAuthCodeLabel: 'google验证码',
        googleAuthCodePlaceholder: '请输入google验证码',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        validations: {
          mobile: '旧手机号码不能为空',
          newMobile: '新手机号码不能为空',
          googleAuthCode: '谷歌验证码不能为空'
        }
      },
      tab7: {
        title: '银行卡',
        realName: '真实姓名',
        bankAccount: '银行卡号',
        bankName: '银行名称',
        operation: '@:global.operationColumn',
        editButton: '@:global.editButton',
        deleteButton: '@:global.deleteButton',
        cancelButton: '@:global.cancelButton',
        confirmUpdateDialog: {
          title: '@:global.dialogTitle',
          message: '是否修改银行卡信息?',
          confirmButton: '@:global.confirmButton',
          cancelButton: '@:global.cancelButton'
        },
        confirmDeleteDialog: {
          title: '@:global.dialogTitle',
          message: '是否确认删除银行卡号为"{bankAccount}"的数据项?',
          confirmButton: '@:global.confirmButton',
          cancelButton: '@:global.cancelButton'
        }
      },
      tab8: {
        title: '修改印票'
      },
      tab9: {
        title: '重置提现密码',
        passwordLabel: '重置提现密码',
        passwordPlaceholder: '请输入新提现密码',
        googleAuthCodeLabel: 'google验证码',
        googleAuthCodePlaceholder: '请输入google验证码',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        validations: {
          payPassword: '重置提现密码不能为空',
          payPasswordMax: '重置提现密码长度不能超过30个字符'
        }
      },
      inputPrompt: {
        title: '@:global.promptTitle',
        familyIdMessage: '请输入家族ID',
        printedTicketMessage: '请输入印票',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        inputErrorMessage: '请输入数字类型'
      },
      messageBox: {
        updateMobileSuccess: '手机号修改成功',
        liveUserFullMobileSuccess: '完整手机号码已展示',
        liveUserFullMobileError: '手机号码不可用',
        updateTicketError: '修改印票失败',
        cancelInput: '取消输入',
        chatPageError: '获取聊天记录列表失败',
        receiveProplistError: '获取聊天记录列表失败',
        editRateError: '开始时间不能大于结束时间',
        updateLiveUserSuccess: '修改成功',
        updateLiveUserError: '修改失败',
        updateLiveUserBankSuccess: '修改成功',
        updateLiveUserBankError1: '网络异常',
        updateLiveUserBankError2: '已取消',
        deleteSuccess: '删除成功',
        deleteError: '取消删除',
        logPageError: '获取账户日志失败'
      }
    },
    liveUserMount: {
      queryForm: {
        selectDateLabel: '过期时间',
        selectDateStartPlaceholder: '@:global.datePickerStartDatePlaceholder',
        selectDateEndPlaceholder: '@:global.datePickerEndDatePlaceholder',
        userIdLabel: '会员ID',
        userIdPlaceholder: '请输入会员ID',
        mountIdPlaceholder: '请选择坐骑名称',
        isUsePlaceholder: '请选择状态',
        searchButton: '@:global.searchButton'
      },
      table: {
        userId: '会员ID',
        effectiveTime: '过期时间',
        mountName: '坐骑名称',
        isUse: '状态',
        isUse0: '禁用',
        isUse1: '启用'
      }
    },
    liveUserWithdrawNewlog: {
      statistics: {
        countNumberButton: '交易笔数',
        countWithdrawMoneyButton: '总金额',
      },
      queryForm: {
        searchTimeStartPlaceholder: '@:global.datePickerStartDatePlaceholder',
        searchTimeEndPlaceholder: '@:global.datePickerEndDatePlaceholder',
        userIdPlaceholder: '主播ID',
        nickNamePlaceholder: '主播昵称',
        orderNo: '订单号',
        bankAccount: '提现银行账号',
        wstatusPlaceholder: '全部状态',
        wstatus0: '申请中',
        wstatus1: '提交申请',
        wstatus2: '审核不通过',
        wstatus3: '终极审核通过',
        wstatus4: '出款中',
        wstatus5: '出款成功',
        typePlaceholder: '提现类型',
        type1: '家族',
        type2: '个人',
        SearchCardBlackPlaceholder: '银行归属地黑名单',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        export: '@:global.exportButton',
        fixIds: '合并订单'
      },
      table: {
        clone: '复制',
        cloneButton: '复制',
        userId: '主播ID',
        familyId: '家族ID',
        nickName: '主播昵称',
        withdrawMoney: '提现金额',
        bankUserName: '提现真实姓名',
        bankAccount: '提现银行账号',
        bankName: '银行',
        cardBlack: '银行归属地',
        wstatus: '状态',
        createTime: '创建时间',
        updateTime: '最后修改时间',
        opName: '审核员',
        remark: '审核备注',
        orderNo: '订单号',
        type: '提现类型',
        operation: '@:global.operationColumn',
        finalAuditButton: '审核通过',
        recoverAuditButton: '恢复',
        unlockButton: '解锁',
        artificialWithdrawButton: '出款',
        refusedButton: '拒绝',
        withdrawSuccButton: '出款成功',
        updateOrderButton: '重置订单',
        withdrawRefusedButton: '出款拒绝',
        withdrawMoneyButton: '修改提现金额'
      },
      addEditHostsWithdrawalManagementDialog: {
        addTitle: '添加主播提现管理',
        editTitle: '修改主播提现管理',
        userIdLabel: '主播ID',
        userIdPlaceholder: '请输入主播ID',
        nickNameLabel: '主播昵称',
        nickNamePlaceholder: '请输入主播昵称',
        orderNoLabel: '订单号',
        orderNoPlaceholder: '请输入订单号',
        orderExpressionLabel: '订单表达式',
        orderExpressionPlaceholder: '请输入订单表达式',
        withdrawMoneyLabel: '提现金额',
        withdrawMoneyPlaceholder: '请输入提现金额',
        bankUserNameLabel: '提现收款人真实姓名',
        bankUserNamePlaceholder: '请输入提现收款人真实姓名',
        bankAccountLabel: '提现银行账号',
        bankAccountPlaceholder: '请输入提现银行账号',
        bankAddressLabel: '提现银行账号开户行',
        bankAddressPlaceholder: '请输入提现银行账号开户行',
        bankTypeIdLabel: '提现银行类型ID',
        bankTypeIdPlaceholder: '请输入提现银行类型ID',
        wstatusLabel: '状态(0申请中1初级审核通过2审核不通过3终极审核通过)',
        wstatusValuePlaceholder: '请选择字典生成',
        typeLabel: '提现类型(1提现到银行卡,2提现到支付宝)',
        typePlaceholder: '请选择提现类型(1提现到银行卡,2提现到支付宝)',
        typeValuePlaceholder: '请选择字典生成',
        opNameLabel: '审核员',
        opNamePlaceholder: '请输入审核员',
        remarkLabel: '审核备注',
        remarkPlaceholder: '请输入审核备注',
        livetimeLabel: '主播时长',
        livetimePlaceholder: '请输入主播时长',
        liveticketLabel: '主播礼物',
        liveticketPlaceholder: '请输入主播礼物',
        livepaijiangLabel: '主播派奖',
        livepaijiangPlaceholder: '请输入主播派奖',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        validations: {
          userId: '主播ID不能为空',
          orderNo: '订单号不能为空',
          orderExpression: '订单表达式不能为空',
          withdrawMoney: '提现金额不能为空',
          googleAuthCode: 'google验证码不能为空',
          bankUserName: '提现收款人真实姓名不能为空',
          bankAccount: '提现银行账号不能为空',
          bankTypeId: '提现银行类型ID不能为空',
          wstatus: '状态不能为空',
          type: '提现类型(1提现到银行卡,2提现到支付宝)不能为空'
        }
      },
      editCashWithdrawalAmountDialog: {
        title: '修改提现金额',
        withdrawMoneyLabel: '提现金额',
        withdrawMoneyPlaceholder: '请输入提现金额',
        googleAuthCodeLabel: '谷歌验证码',
        googleAuthCodePlaceholder: '请输入google验证码',
        submitButton: '立即提交',
        validations: {
          withdrawMoney: '提现金额不能为空',
          googleAuthCode: 'google验证码不能为空'
        }
      },
      confirmFixIdsDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认合并的订单?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmRefusedPrompt: {
        title: '请输入拒绝出款原因',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmWithdrawRefusedPrompt: {
        title: '请输入拒绝出款原因',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmDeleteDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认删除主播提现管理编号为"{ids}"的数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        fixIdsError: '请选择要合并的订单',
        fixIdsSuccess: '合并订单成功',
        copySuccess: '复制成功',
        submitDepositSuccess: '修改提现金额成功',
        updateLiveUserWithdrawNewlogSuccees: '修改成功',
        addLiveUserWithdrawNewlogSuccess: '新增成功',
        deleteSuccess: '删除成功'
      }
    },
    liveVideo: {
      queryForm: {
        typeLabel: '直播类型:',
        idPlaceholder: '主播ID',
        hostNamePlaceholder: '主播昵称/直播标题',
        paiIdPlaceholder: '直播线路',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        closeIds: '批量关播',
        synchronizeOrder: '同步主台排序'
      },
      table: {
        id: '主播ID',
        hostName: '主播昵称',
        title: '直播间标题',
        cateId: '直播类型',
        cateId2: '性感主播',
        cateId3: '大秀直播',
        cateId4: '收费直播',
        cateIdOthers: '彩票直播',
        voteNumber: '热度',
        watchNumber: '在线人数',
        lineName: '线路名称',
        lineStatus: '直播性质',
        liveStatus: '直播状态',
        liveStatusEmpty: '检测中...',
        openPay: '禁收费',
        isLivePay: '收费',
        isLivePayTrue: '是',
        isLivePayFalse: '否',
        beginTime: '开始时间',
        lotteryName: '彩种',
        operation: '@:global.operationColumn',
        closeButton: '关播',
        setSortButton: '固定定位',
        closeSortButton: '取消固定定位',
        recommendButton: '推荐',
        closeRecommendButton: '取消推荐',
        stickButton: '置底',
        closeStickButton: '取消置底',
        toLivePayButton: '收费'
      },
      addToLivePayDialog: {
        addTitle: '添加直播',
        toLivePayTitle: '付费设置',
        idLabel: '主播ID',
        idPlaceholder: '主播ID',
        hostNameLabel: '主播昵称',
        hostNamePlaceholder: '主播昵称',
        titleLabel: '直播间标题',
        titlePlaceholder: '直播间标题',
        liveFeeLabel: '观看费用',
        liveFeePlaceholder: '观看费用',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      effectDialog: {
        title: '是否立即生效',
        effect1: '是',
        effect2: '否',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmCloseIdsDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认批量关闭直播?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmCloseDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认关闭直播编号为"{id}"的数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认导出所有直播数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmChangeOpenPayDialog: {
        title: '@:global.dialogTitle',
        message: '是否{openPay}用主播收费权限?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmSetSortPrompt: {
        title: '固定定位',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        inputPlaceholder: '请输入大于0小于100的整数值',
        inputErrorMessage: '固定位数据格式不正确，请输入大于0小于100的整数值'
      },
      synchronizeOrderDialog: {
        message: '确认同步主台主播排序吗?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        closeIdsError: '请选择关闭直播间',
        closeIdsSuccess: '关播成功',
        closeSuccess: '关播成功',
        submitFormError: '付费金额必须大于0!',
      }
    },
    liveVideoChat: {
      queryForm: {
        poscatIdLabel: '主播ID',
        poscatIdPlaceholder: '请输入主播ID',
        groupLabel: '消息所在聊天组',
        groupPlaceholder: '请输入消息所在聊天组',
        userIdLabel: '发送者id',
        userIdPlaceholder: '请输入发送者id',
        typeLabel: '消息类型 0 普通消息 1 弹幕消息',
        typePlaceholder: '请选择消息类型 0 普通消息 1 弹幕消息',
        typeValuePlaceholder: '请选择字典生成',
        poscatNickNameLabel: '主播昵称',
        poscatNickNamePlaceholder: '请输入主播昵称',
        userNickNameLabel: '发送者昵称',
        userNickNamePlaceholder: '请输入发送者昵称',
        fromPlatformLabel: '平台会员ID',
        fromPlatformPlaceholder: '请输入平台会员ID',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: '@:global.addButton',
        edit: '@:global.editButton',
        delete: '@:global.deleteButton',
        export: '@:global.exportButton'
      },
      table: {
        id: '平台会员ID',
        poscatId: '主播ID',
        group: '消息所在聊天组',
        userId: '发送者id',
        msg: '消息内容',
        type: '消息类型',
        poscatNickName: '主播昵称',
        userNickName: '发送者昵称',
        fromPlatform: '平台会员ID',
        operation: '@:global.operationColumn',
        editButton: '@:global.editButton',
        deleteButton: '@:global.deleteButton'
      },
      addEditDialog: {
        addTitle: '添加会员发言',
        editTitle: '封停会员',
        poscatIdLabel: '主播ID',
        poscatIdPlaceholder: '请输入主播ID',
        groupLabel: '消息所在聊天组',
        groupPlaceholder: '请输入消息所在聊天组',
        userIdLabel: '发送者id',
        userIdPlaceholder: '请输入发送者id',
        msgLabel: '消息内容',
        msgPlaceholder: '请输入内容',
        typeLabel: '消息类型 0 普通消息 1 弹幕消息',
        typePlaceholder: '请选择消息类型 0 普通消息 1 弹幕消息',
        typeValuePlaceholder: '请选择字典生成',
        poscatNickNameLabel: '主播昵称',
        poscatNickNamePlaceholder: '请输入主播昵称',
        userNickNameLabel: '发送者昵称',
        userNickNamePlaceholder: '请输入发送者昵称',
        fromPlatformLabel: '平台会员ID',
        fromPlatformPlaceholder: '请输入平台会员ID',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        validations: {
          poscatId: '主播ID不能为空'
        }
      },
      confirmDeleteDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认删除会员发言编号为"{ids}"的数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        updateLiveVideoChatSuccess: '修改成功',
        addLiveVideoChatSuccess: '新增成功',
        deleteSuccess: '删除成功'
      }
    },
    liveVideoClassified: {
      queryForm: {
        titleLabel: '分类名称',
        titlePlaceholder: '请输入分类名称',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: '@:global.addButton',
        edit: '@:global.editButton',
        delete: '@:global.deleteButton',
      },
      table: {
        title: '分类名称',
        isEffect: '状态',
        isEffect0: '停用',
        isEffect1: '启用',
        sort: '排序(客服端倒序)',
        classfy: '分类代号',
        isHostShow: '主播端显示',
        isHostShow0: '停用',
        isHostShow1: '启用',
        operation: '@:global.operationColumn',
        editButton: '@:global.editButton',
        deleteButton: '@:global.deleteButton'
      },
      addEditDialog: {
        addTitle: '添加分类',
        editTitle: '修改分类',
        titleLabel: '分类名称',
        titlePlaceholder: '请输入分类名称',
        isEffectLabel: '状态',
        isHostShowLabel: '主播端显示',
        sortLabel: '排序',
        sortPlaceholder: '请输入排序',
        classfyLabel: '分类代号',
        classfyPlaceholder: '请输入分类id',
        imgLabel: '分类图标',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        validations: {
          title: '分类名称不能为空',
          isEffect: '是否有效 1-有效 0-无效不能为空',
          sort: '从大到小排不能为空',
          img: '分类图标不能为空',
          isHostShow: '是否主播端显示不能为空'
        }
      },
      confirmDeleteDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认删除分类编号为"{ids}"的数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmStatusChangeDialog: {
        title: '@:global.dialogTitle',
        message: '确认要{text}"{title}"吗?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmShowStatusChangeDialog: {
        title: '@:global.dialogTitle',
        message: '确认要{text}"{title}"吗?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        updateLiveVideoClassifiedSuccess: '修改成功',
        addLiveVideoClassifiedSuccess: '新增成功',
        deleteSuccess: '删除成功',
        statusChangeSuccess: '{text}成功',
        showStatusChangeSuccess: '{text}成功',
      }
    },
    officerManage: {
      queryForm: {
        hostIdLabel: '主播ID',
        hostIdPlaceholder: '请输入主播ID',
        puserIdLabel: '用户ID',
        puserIdPlaceholder: '请输入用户ID',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: '@:global.addButton',
        delete: '@:global.deleteButton',
        export: '@:global.exportButton'
      },
      table: {
        hostId: '主播ID',
        hostName: '主播昵称',
        puserId: '用户ID',
        puserName: '用户昵称',
        ctime: '创建时间',
        operation: '@:global.operationColumn',
        deleteButton: '@:global.deleteButton'
      },
      addDialog: {
        title: '添加房管管理',
        hostIdLabel: '主播ID',
        hostIdPlaceholder: '请输入主播ID',
        puserIdLabel: '用户ID',
        puserIdPlaceholder: '请输入用户ID',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmDeleteDialog: {
        title: '@:global.dialogTitle',
        message: '是否确认删除房管管理编号为"{ids}"的数据项?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        submitFormSuccess: '新增成功',
        deleteSuccess: '删除成功',
      }
    },
    pushChat: {
      queryForm: {
        fromPlatformPlaceholder: '会员ID',
        userNickNamePlaceholder: '会员昵称',
        poscatIdPlaceholder: '主播ID',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      refresh: {
        title: '记录刷新',
        placeholder: '时间间隔',
        description: '{secs}秒后开始刷新',
        interval: '{secs}秒',
        startButton: '开始刷新',
        stopButton: '停止刷新'
      },
      table: {
        poscatId: '主播ID',
        poscatNickName: '主播昵称',
        fromPlatform: '平台会员ID',
        userNickName: '用户昵称',
        msg: '消息内容',
        createTimes: '发送时间'
      },
      messageBox: {
        queryError: '会员ID只能输入数字及下划线'
      }
    },
    report: {
      queryForm: {
        typeLabel: '主播排行榜',
        typePlaceholder: '请选择榜类型',
        type0: '日榜',
        type1: '周榜',
        type2: '月榜',
        reptimeLabel: '更新日期',
        reptimePlaceholder: '选择更新日期',
        nicknameLabel: '主播昵称',
        nicknamePlaceholder: '请输入主播昵称',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        export: '@:global.exportButton'
      },
      table: {
        anchorid: '主播ID',
        nickname: '主播昵称',
        dayTicket: '每日热度',
        sort: '热度排名',
        dayTicketUpdiff: '距离上一次差值',
        repdate: '日榜',
        num: '榜单',
        reptime: '更新日期'
      }
    }
  },

  lottery: {
    //TODO: lotteryBet -> Luis
    lotteryBet: {
      totalCostButton: '投注金额',
      totalPrizeButton: '中奖金额',
      totalCountButton: '统计查询',
      form: {
        lotteryFormLabel: '下注时间',
        puserIdPlaceholder: '会员ID',
        issuePlaceholder: '下注期数',
        lotteryNamePlaceholder: '请选择彩票名称',
        priceMinPlaceholder: '投注￥',
        priceMaxPlaceholder: '金额￥',
      },
      tableColumns: {
        puserId: '用户ID',
        lotteryName: '彩票名称',
        issue: '下注期数',
        code: '开奖号码',
        chip: '投注筹码',
        cost: '投注金额',
        betSelect: '下注选择',
        status: '中奖状态',
        prize: '中奖金额',
        betTime: '下注时间',
        anchor: '主播Id',
      },
      responseMessages: {
        memberIdFormatError: '会员ID只能输入数字及下划线',
        priceLimitWarning: '请输入正确的投注金额区间值',
        abnormalQueryError: '查询异常投注核对记录必须传入会员ID',
        repairLotteryBetSuccess: '补单成功'

      },
      confirmExportDialog: {
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
      },
    },

    //TODO: lotteryCount -> Luis
    lotteryCount: {
      form: {
        puserIdLabel: '会员ID',
        puserIdPlaceholder: '请输入会员ID',
        betInfoLabel: '下注内容',
        betInfoPlaceholder: '下注内容',
        issueLabel: '期数',
        issuePlaceholder: '期数',
        lotteryNamePlaceholder: '请选择彩票名称',
      },
      tableColumns: {
        id: '主键',
        lotteryName: '彩票名称',
        puserId: '会员ID',
        issue: '期数',
        betInfo: '下注内容',
        chip: '下注金额',
        ip: '下注IP',
      }
    },

    //TODO: lotteryDice -> Luis
    lotteryDice: {
      form: {
        nameLabel: '名称',
      },
      tableColumns: {
        id: '编号',
        prize: {
          label: '奖励',
          spanName: '奖励',
          tooltipContent: '返现金额或坐骑ID',
        },
        type: '类型',
        description: {
          label: '描述',
          spanName: '描述',
          tooltipContent: '坐骑天数或是打码倍数',
        },
        weight: '权重',
        sort: '排序',
      },
      dialogForm: {
        nameLabel: '奖项名称',
        namePlaceholder: '请输入名称',
        prizeLabel: '奖励',
        prizePlaceholder: '请输入奖励',
        weightLabel: '权重',
        weightPlaceholder: '请输入权重',
        typeLabel: '奖励类型',
        typePlaceholder: '请选择类型',
        descriptionLabel: '描述',
        descriptionPlaceholder: '请输入坐骑天数或是打码倍数',
        diceValueLabel: '奖励对应的图示',
        diceValuePlaceholder: '请输入奖励对应的图示',
      },
      validationMessages: {
        emptyName: '奖项名称不能为空',
        emptyPrize: '奖励不能为空',
        emptyWeight: '权重不能为空',
        emptySort: '排序不能为空',
        emptyDescription: '描述不能为空',
        emptyDiceValue: '骰子数值不能为空',
        emptyType: '类型不能为空',
      },
      popUpTitle: {
        addTitle: '添加中秋博饼',
        editTitle: '修改中秋博饼',
      },
      responseMessages: {
        editSuccess: '修改成功',
        addedSuccess: '新增成功',
        deleteSuccess: '删除成功',
      },
      confirmDeleteDialog: {
        message: '是否确认删除中秋博饼编号为{ids}的数据项?',
      },
      confirmExportDialog: {
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
      }
    },

    //TODO: lotteryDiceHistory  -> Luis
    lotteryDiceHistory: {
      form: {
        datePickerPlaceholder: '选择日期',
        pUserIdPlaceholder: '请输入会员ID',
        namePlaceholder: '请输入昵称',
        diceNamePlaceholder: '请输入奖项',
        diceIdPlaceholder: '请输入奖项id'
      },
      tableColumns: {
        id: 'id',
        pUserId: '会员ID',
        name: '昵称',
        diceName: '奖项',
        diceValue: '骰数值',
        diceId: '奖项id',
        cTime: '时间',
      },
      dialogForm: {
        pUserIdLabel: '会员ID',
        pUserIdPlaceholder: '请输入会员ID',
        nameLabel: '昵称',
        namePlaceholder: '请输入昵称',
        diceNameLabel: '奖项',
        diceNamePlaceholder: '请输入奖项',
        cTimeLabel: '时间',
        datePickerPlaceholder: '选择时间',
        diceValueLabel: '骰数值',
        diceValuePlaceholder: '请输入骰数值',
        diceIdLabel: '奖项id',
        diceIdPlaceholder: '请输入奖项id'
      },
      responseMessages: {
        pUserIdFormatError: '会员ID只能输入数字及下划线',
        updateWheelHistoryDiceSuccess: '修改成功',
        addWheelHistoryDiceSuccess: '新增成功',
        deleteWheelHistoryDiceSuccess: '删除成功'
      },
      titleMessages: {
        add: '添加博饼中奖记录',
        update: '修改博饼中奖记录'
      },
      confirmDeleteDialog: {
        message: '是否确认删除博饼中奖记录编号为"{ids}"的数据项?'
      },
      confirmExportDialog: {
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...'
      }
    },

    //TODO: lotteryGame         -> Luis
    lotteryGame: {
      form: {
        methodIdLabel: '菜单id',
        methodIdPlaceholder: '请输入菜单id',
        typeLabel: '类型',
        typePlaceholder: '请选择所属彩种类型',
        infoLabel: '简介',
        infoPlaceholder: '请输入简介',
        victoryRuleLabel: '获奖规则',
        victoryRulePlaceholder: '请输入获奖规则',
      },
      tableColumns: {
        methodId: '菜单id',
        type: '类型',
        info: '简介',
        odds: '赔率',
        victoryRule: '获奖规则',
        ind: '唯一编号',
        operationLabel: '操作',
        editButton: '修改赔率',
      },
      dialogForm: {
        oddsLabel: '赔率',
        oddsPlaceholder: '请输入赔率',
      },
      lotteryType: {
        timeShareLabel: '时时彩',
        timeShareValue: '时时彩',
        '11select5Label': '11选5',
        '11select5Value': '11选5',
        fastThreeLabel: '快三',
        fastThreeValue: '快三',
        racingLabel: '赛车',
        racingValue: '赛车',
        markSixLabel: '六合彩',
        markSixValue: '六合彩',
        baccaratLabel: '百家乐',
        baccaratValue: 'baccarat',
        hundredBullsLabel: '百人牛牛',
        hundredBullsValue: '百人牛牛'
      },
      updateOddsTitle: '修改赔率',
      updateSuccessMessage: '修改成功',
    },

    //TODO: lotteryHistory      -> Luis
    lotteryHistory: {
      form: {
        namePlaceholder: '请选择彩种',
        statusPlaceholder: '全部状态',
        issuePlaceholder: '请输入期数',
        addIssueButton: '补期'
      },
      tableColumns: {
        name: '彩票名称',
        issue: '期数',
        code: '开奖号码',
        ktime: '开奖时间',
        totalBet: '总投注',
        killRate: '杀率',
        totalPrize: '派奖',
        repaymentButton: '重新派奖',
      },
      dialogForm: {
        gameStartTimeLabel: '开始期数',
        startIssuePlaceholder: '请输入开始期数',
        gameEndTimeLabel: '结束期数',
        endIssuePlaceholder: '请输入结束期数',
        nameLabel: '彩票名称',
        namePlaceholder: '请选择彩种'
      },

      rulesMessage: {
        ktime: '开奖时间不能为空',
        name: '彩种不能为空',
        startIssue: '开始期数不能为空',
        endIssue: '结束期数不能为空',
      },
      status: {
        bettingIn: '投注中',
        prizeDrawn: '已开奖',
        prizePaid: '已派奖',
        lotteryFailure: '开奖失败'
      },
      rePayoutSuccessMessage: '重新派奖成功',
      addIssueSuccessMessage: '新增成功',
      issueTitle: '补开奖'
    },

    //TODO: lotteryInfo         -> Luis
    lotteryInfo: {
      form: {
        nameLabel: '彩种名称',
        namePlaceholder: '请输入彩种名称',
        statusLabel: '状态',
        statusPlaceholder: '请选择状态',
        typeLabel: '所属彩种类型',
        typePlaceholder: '请选择所属彩种类型',
      },
      tableColumns: {
        name: '彩票名称',
        type: '所属彩种类型',
        icon: '图标',
        status: '状态',
        killRate: '杀率',
        cycle: '周期',
        minCost: '最小投注金额',
        order: '排序',
        operationLabel: '操作',
      },

      officialLabel: {
        official: '官方',
        selfOpeningDatabase: '自开(数据库)',
        selfOpeningProgram: '自开(程序)'
      },
      type: {
        timeShareValue: '时时彩',
        timeShareLabel: '时时彩',
        '11select5Value': '11选5',
        '11select5Label': '11选5',
        fastThreeValue: '快三',
        fastThreeLabel: '快三',
        racingValue: '赛车',
        racingLabel: '赛车',
        markSixValue: '六合彩',
        markSixLabel: '六合彩'
      },
      rulesNameMessage: '彩种名称不能为空',
      updateSuccessMessage: '修改成功',
      updateBanErrorMessage: '修改禁播状态失败',
    },

    //TODO: lotteryMethod       -> Luis
    lotteryMethod: {
      form: {
        lotteryTypeLabel: '所属彩种类型',
        lotteryTypePlaceholder: '请选择所属彩种类型',
        nameLabel: '投注名称',
        namePlaceholder: '请输入投注名称',
      },
      tableColumns: {
        lotteryType: '所属彩种类型',
        name: '投注名称',
        order: '排序键order',
      },
      lotteryType: {
        timeShareValue: '时时彩',
        timeShareLabel: '时时彩',
        '11select5Value': '11选5',
        '11select5Label': '11选5',
        fastThreeValue: '快三',
        fastThreeLabel: '快三',
        racingValue: '赛车',
        racingLabel: '赛车',
        markSixValue: '六合彩',
        markSixLabel: '六合彩',
        baccaratValue: 'baccarat',
        baccaratLabel: '百家乐',
        hundredBullsValue: '百人牛牛',
        hundredBullsLabel: '百人牛牛'
      },
      lotteryTypeRuleMessage: '所属彩种类型不能为空'
    },

    //TODO: lotteryPrizeConfig  -> Luis
    lotteryPrizeConfig: {
      form: {
        lotteryNamePlaceholder: '请选择彩种',
        newButton: '新增',
      },
      tableColumns: {
        lotteryId: '彩种ID',
        lotteryName: '彩种名称',
        lotteryKillrate: '杀率阀值',
        lotteryNokillratehour: '杀率禁用时间点',
        lotteryRandom: '随机开启不杀概率',
      },
      AddConfigDialogForm: {
        lotteryIdLabel: '彩种编号',
        lotteryIdPlaceholder: '请输入彩种编号',
        lotteryNameLabel: '彩种名称',
        lotteryNamePlaceholder: '请输入彩种名称',
        lotteryKillrateLabel: '杀率阀值',
        lotteryKillratePlaceholder: '请输入杀率阀值',
        lotteryRandomLabel: '随机开启不杀概率',
        lotteryRandomPlaceholder: '请输入随机开启不杀概率',
        lotteryNokillratehourLabel: '杀率禁用时间点',
        lotteryNokillratehourPlaceholder: '请选择杀率禁用时间点(可多选)',
      },
      updateConfigDialogForm: {
        lotteryIdLabel: '彩种编号',
        lotteryIdPlaceholder: '请输入彩种编号',
        lotteryNameLabel: '彩种名称',
        lotteryNamePlaceholder: '请输入彩种名称',
        lotteryKillrateLabel: '杀率阀值',
        lotteryKillratePlaceholder: '请输入杀率阀值',
        lotteryRandomLabel: '随机开启不杀概率',
        lotteryRandomPlaceholder: '请输入随机开启不杀概率',
        lotteryNokillratehourLabel: '杀率禁用时间点',
        lotteryNokillratehourPlaceholder: '请选择杀率禁用时间点(可多选)',
      },
      optionUnit: '点',
      lotteryIdRuleMessage: '彩种编号不能为空',
      addTitle: '添加开奖配置',
      updateTitle: '修改开奖配置',
      updateSuccessMessage: '修改成功',
      addedSuccessMessage: '新增成功',
      deleteSuccessMessage: '删除成功',
      confirmDeleteDialog: {
        message: '是否确认删除开奖配置编号为"{lotteryIds}"的数据项?',
      },
      confirmExportDialog: {
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
      }
    },

    //TODO: lotteryPrizepool    -> Luis
    lotteryPrizepool: {
      form: {
        lotteryIdLabel: '彩种编号',
        lotteryIdPlaceholder: '请输入彩种编号',
      },
      tableColumns: {
        lotteryName: '彩种名称',
        lotteryId: '彩种编号',
        lotteryDate: '奖池日期',
        lotteryHour: '奖池日期小时',
        ptzTotal: '奖池投注日累积',
        ppjTotal: '奖池派奖日累积',
        psyTotal: '奖池剩余金额日累积',
        pkillrate: '累积杀率',
        poolUsemoney: '游戏奖池使用金额',
      },
      addTitle: '添加奖池配置',
      updateTitle: '修改奖池配置',
      updateSuccessMessage: '修改成功',
      addSuccessMessage: '新增成功',
      deleteSuccessMessage: '删除成功',
      confirmDeleteMessage: '是否确认删除奖池配置编号为"{ids}"的数据项?',
      confirmExportMessage: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
    },

    //TODO: lotteryRule         -> Luis
    lotteryRule: {
      form: {
        kindLabel: '所属彩种类型',
        kindPlaceholder: '请选择所属彩种类型',
        nameLabel: '彩票类型名称',
        namePlaceholder: '请输入彩票类型名称',
      },
      tableColumns: {
        kind: '所属彩种类型',
        name: '彩票类型名称',
        des: '开奖说明',
        ind: '排序号',
      },
      dialogForm: {
        kindLabel: '所属彩种类型',
        kindPlaceholder: '请选择所属彩种类型',
        nameLabel: '彩票类型名称',
        namePlaceholder: '请输入彩票类型名称',
        indLabel: '排序号',
        indPlaceholder: '请输入排序号',
        desLabel: '开奖说明',
        desPlaceholder: '请输入开奖说明'
      },
      addTitle: '添加开奖规则说明',
      updateTitle: '修改开奖规则说明',
      updateSuccessMessage: '修改成功',
      addSuccessMessage: '新增成功',
      confirmDeleteMessage: '是否确认删除开奖规则说明编号为"{ids}"的数据项?',
      confirmExportMessage: '是否确认导出所有开奖规则说明数据项?',

    },

    //TODO: lotteryTemp         -> Luis
    lotteryTemp: {
      form: {
        ktimeLabel: '开奖时间',
        ktimePlaceholder: '选择开奖时间',
        issueLabel: '当前期数',
        issuePlaceholder: '请输入当前期数',
        issueJustLabel: '上期期号',
        issueJustPlaceholder: '请输入上期期号',
        codeJustLabel: '上期开奖',
        codeJustPlaceholder: '请输入上期开奖',
      },
      tableColumns: {
        id: '彩种id',
        issue: '当前期数',
        issueJust: '上期期号',
        codeJust: '上期开奖',
        ktime: '开奖时间',
      },
      sealOptions: {
        open: '开启中',
        close: '封盘中'
      }
    },

    //TODO: wheelHistory        -> Luis
    wheelHistory: {
      form: {
        pUserIdLabel: '会员ID',
        pUserIdPlaceholder: '请输入会员ID',
        prizeLabel: '奖励',
        prizePlaceholder: '请输入奖励',
        wheelTypeLabel: '转盘类型',
        wheelTypePlaceholder: '请选择转盘类型',
      },
      tableColumns: {
        pUserId: '会员ID',
        prize: '奖励',
        cTime: '时间',
        wheelType: '转盘类型',
      },
      dialogForm: {
        pUserIdLabel: '会员ID',
        pUserIdPlaceholder: '请输入会员ID',
        prizeLabel: '奖励',
        prizePlaceholder: '请输入奖励',
        cTimeLabel: '时间',
        cTimePlaceholder: '选择时间',
        wheelTypeLabel: 'type为0是抽奖转盘,1是皮肤转盘',
        wheelTypePlaceholder: '请选择type为0是抽奖转盘,1是皮肤转盘',
        optionLabel: '请选择字典生成'
      },
      queryErrorMessage: '会员ID只能输入数字及下划线',
      addTitle: '添加转盘中奖历史',
      updateTitle: '添加转盘中奖历史',
      updateSuccessMessage: '修改成功',
      addSuccessMessage: '新增成功',
      deleteSuccessMessage: '删除成功',
      confirmDeleteMessage: '是否确认删除转盘中奖历史编号为"{ids}"的数据项?',
      confirmExportMessage: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...'
    },

    //TODO: wheelLottery        -> Luis
    wheelLottery: {
      form: {
        namePlaceholder: '请输入名称',
      },
      tableColumns: {
        lotteryId: '彩票ID',
        minBet: '最小投注',
        prePrize: '预备派奖金额',
        actPrize: '实际派奖金额',
      },
      dialogForm: {
        nameLabel: '彩票名称',
        namePlaceholder: '请选择彩票名称',
        minBetLabel: '最小投注',
        minBetPlaceholder: '请输入最小投注',
        prePrizeLabel: '预备派奖金额',
        prePrizePlaceholder: '请输入预备派奖金额',
        startPlaceholder: '选择开始时间',
        endPlaceholder: '选择结束时间',
      },
      lotteryIdRuleMessage: '彩票ID不能为空',
      addTitle: '添加转盘彩票',
      updateTitle: '修改转盘彩票',
      updateSuccessMessage: '修改成功',
      addSuccessMessage: '新增成功',
      deleteSuccessMessage: '删除成功',
      confirmDeleteMessage: '是否确认删除转盘彩票编号为"{ids}"的数据项?',
      confirmExportMessage: '是否确认导出所有转盘彩票数据项?',
    },

    //TODO: wheelPool           -> Luis
    wheelPool: {
      tableColumns: {
        id: '主键',
        secMoney: '每秒增加奖池金额',
        limitMoney: '上限金额',
        weight: '中奖比例',
      },
      dialogForm: {
        namePlaceholder: '请输入名称',
        secMoneyLabel: '每秒金额',
        secMoneyPlaceholder: '请输入每秒增加奖池金额',
        limitMoneyLabel: '上限金额',
        limitMoneyPlaceholder: '请输入上限金额',
        weightLabel: '中奖比例',
        weightPlaceholder: '请输入中奖比例',
      },
      updateTitle: '修改 wheelPool',
      updateSuccessMessage: '修改成功'
    },

    //TODO: wheelPoolHistory    -> Luis
    wheelPoolHistory: {
      totalPeopleCount: '总抽奖人数',
      totalCountMoney: '总抽奖金额',
      testTotalPeoples: '测试抽奖人数',
      testTotalMoney: '测试抽奖金额',
      listCount: '统计查询',
      form: {
        memberIdLabel: '会员ID',
        memberIdPlaceholder: '请输入会员ID',
      },
      showTableButton: '抽奖资格记录',
      tableColumns: {
        id: '主键',
        memberId: '会员ID',
        winTimes: '中奖次数',
        winId: '中奖ID',
        memberStatus: '会员类型',
        prize: '中奖金额',
        first: '是否首次中奖',
        status: '状态',
        medalType: '中奖牌型',
        drawType: '抽奖排序',
        position: '已抽位置',
        createTime: '创建时间',
        updateTime: '更新时间',
      },
      dialogForm: {
        userId: '会员ID',
        nickName: '会员昵称',
        status: '会员类型',
        vip: '会员vip',
        time: '开奖时间',
      },
      popUpTitle: '抽奖资格记录',
      confirmExportMessage: '是否确认导出大奖池历史列表数据项?',
    },

    //TODO: wheelPrize          -> Luis
    wheelPrize: {
      form: {
        namePlaceholder: '请输入名称',
        prizeLabel: '奖励',
        prizePlaceholder: '请输入奖励',
        weightLabel: '权重',
        weightPlaceholder: '请输入权重',
        wheelTypeLabel: '转盘类型',
        wheelTypePlaceholder: '请选择转盘类型'
      },
      tableColumns: {
        id: '编号',
        prize: '奖励',
        weight: '权重',
        wheelType: '转盘类型',
      },
      dialogForm: {
        namePlaceholder: '请输入名称',
        prizeLabel: '奖励',
        prizePlaceholder: '请输入奖励',
        weightLabel: '权重',
        weightPlaceholder: '请输入权重',
        wheelTypeLabel: '转盘类型',
        wheelTypePlaceholder: '请选择转盘类型'
      },
      addTitle: '添加转盘奖励',
      updateTitle: '修改转盘奖励',
      confirmDeleteMessage: '是否确认删除转盘奖励编号为"{ids}"的数据项?',
      confirmExportMessage: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
    },

    //TODO: wheelSkin           -> Luis
    wheelSkin: {},

    //TODO: wheelSkinReceived   -> Luis
    wheelSkinReceived: {},


  }


}
