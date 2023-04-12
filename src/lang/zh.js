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
        tableDialog: {
        },
        validation: {
          game: '名称不能为空'
        }
      },
      activityQuestTypebak: {
        tableDialog: {
        },
        validation: {

        }
      },
    }
  },
  members: {
    configVip: {
      home: '',
      table: {
        vipLvl: 'vip等级'
      }
    }
  }
}
