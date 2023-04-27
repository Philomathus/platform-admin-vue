export default {

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
    selectDate: '选择日期',
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
    selectDate: '日期范围',
    selectDateStartPlaceholder: '开始时间',
    selectDateEndPlaceholder: '开始时间',
    selectDateRangeSeparator: '至',
    qq: 'qq',
    wechat: '微信',
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
        selectDate: '日期范围',
        selectDateStartPlaceholder: '开始时间',
        selectDateEndPlaceholder: '开始时间',
        selectDateRangeSeparator: '至',
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
      }
    }
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


      }
    }
  },

  common: {
    titleDialog: '警告',
    titlePrompt: '提示',
    searchButton: '搜索',
    resetButton: '重置',
    exportButton: '导出',
    confirmButton1: '确认',
    confirmButton2: '确 定',
    cancelButton1: '取消',
    cancelButton2: '取 消',
    operationColumn: '操作'
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
        operation: '@:common.operationColumn',
        muteButton: '封停',
        unmuteButton: '解封',
        forbidButton: '禁言'
      },
      confirmUpdateDialog: {
        title: '@:common.titleDialog',
        message: '确定要{fromPlatform}解封吗?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2',
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
          searchButton: '@:common.searchButton'
        },
        table: {
          userId: '会员ID',
          userIp: '封停ip',
          msg: '封停备注',
          createTime: '封停时间',
          operation: '@:common.operationColumn',
          unblockButton: '解封'
        },
        confirmUpdateDialog: {
          title: '@:common.titleDialog',
          message: '确定要{userId}解封吗?',
          confirmButton: '@:common.confirmButton1',
          cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
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
        operation: '@:common.operationColumn',
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2',
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
        title: '@:common.titleDialog',
        message: '是否确认拒绝家族名称"{name}"的数据项?',
        confirmButton: '@:common:confirmButton1',
        cancelButton: '@:common:cancelButton1'
      },
      confirmUpdateFlag1Dialog: {
        title: '@:common.titleDialog',
        message: '是否确认通过审核家族名称"{name}"的数据项?',
        confirmButton: '@:common:confirmButton1',
        cancelButton: '@:common:cancelButton1'
      },
      confirmUpdateFlag2Prompt: {
        title: '@:common.titlePrompt',
        message: '请输入封停原因',
        confirmButton: '@:common:confirmButton1',
        cancelButton: '@:common:cancelButton1',
        inputErrorMessage: '封停原因不能为空'
      },
      confirmUpdateFlag3Prompt: {
        title: '@:common.titlePrompt',
        message: '请输入解封原因',
        confirmButton: '@:common:confirmButton1',
        cancelButton: '@:common:cancelButton1',
        inputErrorMessage: '解封原因不能为空'
      },
      confirmRemoveDialog: {
        title: '@:common.titleDialog',
        message: '是否确认解散"{name}"家族?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmExportDialog: {
        title: '@:common.titleDialog',
        message: '是否确认导出所有家族数据项?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        add: '新增',
        edit: '修改',
        remove: '删除'
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
        operation: '@:common.operation',
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2'
      },
      confirmRemoveDialog: {
        title: '@:common.titleDialog',
        message: '是否确认删除编号为"{ids}"的数据项?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmExportDialog: {
        title: '@:common.titleDialog',
        message: '是否确认导出所有数据项?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        add: '新增',
        edit: '修改',
        remove: '删除'
      },
      table: {
        id: '编号',
        name: '插件名称',
        status: '状态',
        status0: '停用',
        status1: '启用',
        conUrl: '地址',
        iconUrl: '图标',
        operation: '@:common.operation',
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2'
      },
      editDialog: {
        title: '修改h5插件',
        nameLabel: '插件名称',
        namePlaceholder: '请输入名称',
        conUrlLabel: '内容地址',
        conUrlPlaceholder: '请输入内容地址',
        iconUrlLabel: '图标地址',
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2'
      },
      confirmRemoveDialog: {
        title: '@:common.titleDialog',
        message: '是否确认删除h5插件编号为"{ids}"的数据项?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmStatusChangeDialog: {
        title: '@:common.titleDialog',
        message: '确认要{text}"{name}"吗?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmExportDialog: {
        title: '@:common.titleDialog',
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      messageBox: {
        addSuccess: '新增成功',
        editSuccess: '修改成功',
        removeSuccess: '删除成功',
        statusChangeSuccess: '{text}成功'
      }
    }
  }
}
