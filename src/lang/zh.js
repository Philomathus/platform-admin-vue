export default {
  lazy: true,
  route: {
    dashboard: '首页',
    documentation: '文档',
    guide: '引导页',
    permission: '权限测试页',
    rolePermission: '角色权限',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON 编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragSelect: '拖拽 Select',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    nested: '路由嵌套',
    menu1: '菜单1',
    'menu1-1': '菜单 1-1',
    'menu1-2': '菜单 1-2',
    'menu1-2-1': '菜单 1-2-1',
    'menu1-2-2': '菜单 1-2-2',
    'menu1-3': '菜单 1-3',
    menu2: '菜单 2',
    Table: 'Table',
    dynamicTable: '动态 Table',
    dragTable: '拖拽 Table',
    inlineEditTable: 'Table 内编辑',
    complexTable: '综合 Table',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: '导出 Excel',
    selectExcel: '导出 已选择项',
    mergeHeader: '导出 多级表头',
    uploadExcel: '上传 Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化',
    externalLink: '外链',
    profile: '个人中心'
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

  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },

  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },

  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },

  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },

  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },

  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },

  example: {
    warning: '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
  },

  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
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
      },
      index: {
        allStat: '全部状态',
        analysis: '分析上下分',
      }
    }
  }
}
