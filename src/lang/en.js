export default {
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    size: 'Maximize',
    layOutSetting: 'Lay Out Setting',
    homepage: 'Home Page'

  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  logout: {
    confirm: 'Are you sure to log out and exit the system?',
    prompt: 'Confirm'
  },

  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)',
    selectDate: 'Select Date',
    noLongerThanSevenDaysWarning: 'The selected time cannot be longer than seven days',
    exportPrompt: 'Export Confirm',
    startDatePlaceholder: 'Start Date',
    endDatePlaceholder: 'End Date',
    rangeSeparator: 'to',
    cancelButton: 'Cancel',
    submitButton: 'Confirm'
  },
  settings: {
    title: 'Theme Style Settings',
    themeColor: 'Theme Color',
    systemLayoutConfig: 'Theme Configuration',
    openTagsView: 'Open Tags-Views',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Display Logo'
  },
  tagsView: {
    closeOthersTags: 'Close Other',
    closeAllTags: 'Close All',
    refresh: '刷新',
    close: '关闭',
    closeOthers: 'Close Other',
    closeAll: 'Close All'
  },
  activity: {
    startDatePlaceholder: 'Start Date',
    endDatePlaceholder: 'End Date',
    rangeSeparator: 'to',
    searchButton: 'Search',
    resetButton: 'Reset',
    addButton: 'Add',
    editButton: 'Edit',
    deleteButton: 'Delete',
    exportButton: 'Export',
    submitButton: 'Submit',
    confirmButton: 'Confirm',
    cancelButton: 'Cancel',
    operation: 'Operation',
    cancelConfirmButton: 'Cancel',
    editSuccessMsg: 'Edit Successful',
    editFailMsg: '',
    addSuccessMsg: 'Add Successful',
    addFailMsg: '',
    submitSuccess: '',
    submitFail: '',
    deleteSuccessMsg: 'Delete Successful',
    submitSuccessful: '',
    statusEnable: 'Enable',
    statusDisable: 'Disable',
    statusConfirm: 'Confirm to "',
    statusConfirmTitle: 'Confirm',
    statusConfirmQuestion: '"?',
    statusEditSuccess: 'Status Updated',
    confirmExport: 'Are you sure you want to export into excel file?, there might be a short delay depending on the volume of data, please wait patiently...',
    confirmExportTitle: 'Confirm',
    exportResponse: '【Top Up and Cash Back】',
    selectStatus: 'Please Select Status',
    deleteConfirm1: 'Do you want to delete "',
    deleteConfirm2: '',
    deleteConfirmTitle: 'Confirm',
    releaseTime: 'Release Time',
    activityManage: {
      activityCashBack: {
        title: 'Top Up and Rebates',
        cashBackResultTime: 'Rebate Result Time',
        rebateAmount: 'Rebate Amount',
        addCashbackTitle: 'Add 【Top up and Rebate】 ',
        editCashbackTitle: 'Edit 【Top up and Rebate】',
        tableDialog: {
          tableId: 'id',
          minDeposit: 'Daily Minimum Deposit',
          maxDeposit: 'Daily Maximum Deposit',
          minDepositPlaceholder: 'Please Enter Daily Minimum Deposit',
          maxDepositPlaceholder: 'Please Enter Daily Maximum Deposit',
          status: 'Status',
        },
        validation: {
          depositTotalMin: 'Daily Minimum Deposit must not be empty',
          depositTotalMax: 'Daily Maximum Deposit must not be empty',
          rebate: 'Cash Rebate must not be empty'
        },
      },
      activityInfo: {
        title: 'Please enter Activity Title',
        addActivityTitle: 'Add Activity Information',
        editActivityTitle: 'Edit Activity Information',
        exportResponse: 'Activity Information',
        tableDialog: {
          title: 'Activity Title',
          titlePlaceholder: 'Please enter Activity Title',
          typeId: 'Activity Type',
          typeIdPlaceholder: 'Please enter Activity Type',
          sort: 'Sort',
          sortPlaceholder: 'Please enter sort.',
          icon: 'Icon',
          jumpType: 'URL type',
          activityDetails: 'Activity Details',
          jumpLink: 'URL',
          jumpLinkPlaceholder: 'Please Enter Icon URL',
          releaseTime: 'Release Time',
          url: 'URL',
          urlPlaceholder: 'Please enter Icon URL.',
          iconUrl: 'Icon URL',
          status: 'Status',
        },
        validation: {
          title: 'Title cannot be empty',
          icon: 'Icon cannot be empty',
          typeId: 'The Activity Type must not be empty',
          type: 'URL must not be empty'
        }
      },
      activityQuestInfo: {
        dailyTask: 'Daily Task',
        permanentTask: 'Permanent task',
        addTitle: 'Add Quest Information',
        editTitle: 'Edit Quest Information',
        tableDialog: {
          title: 'Title',
          titlePlaceholder: 'Please enter Title',
          icon: 'Icon',
          index: 'Index',
          indexPlaceholder: 'Please enter Index',
          typeId: 'Task type',
          typeIdPlaceholder: 'Please enter task type',
          gameId: 'Game',
          gameIdPlaceholder: 'Please enter game ID',
          target: 'Target task quantity',
          reward: 'Reward',
          rewardPlaceholder: 'Please enter reward',
          content: 'Content',
          contentPlaceholder: 'Please enter content',
          detail: 'description',
          detailPlaceholder: 'Please enter description',
          kindId: 'Platform',
          kindIdPlaceholder: 'Platform must not be empty',
          platformId: 'Platform',
          platformIdPlaceholder: 'Please enter Platform',
          taskMode: 'Task Mode',
          taskModePlaceholder: 'Please enter Task Mode',
          ctime: 'Creation Time',
          operation: 'Operation',
          edit: 'Edit',
          delete: 'Delete',
        },
        validation: {
          icon: 'Icon must not be empty',
          title: 'Title must not be empty',
          index: 'Index must not be empty',
          typeId: 'Task type must not be empty',
          target: 'Task quantity must not be empty',
          reward: 'Rewards must not be empty',
          detail: 'Task validity period must not be null',
          gameId: 'Game Id must not be null',
          kindId: 'Kind Id must not be null',
          platformId: 'Platform type must not be null',
          taskMode: 'Task Mode must not be null',
        }
      },
      activityQuestType: {
        game: 'Game',
        gamePlaceholder: 'Please enter Game',
        gameId: 'Game ID',
        gameIdPlaceholder: 'Please enter Game Id',
        addTitle: 'Add Game Type',
        editTitle: 'Edit Game Type',
        tableDialog: {},
        validation: {
          game: 'Game must not be empty.'
        }
      },
    },
  }
  ,
  members: {
    configVip: {
      home: ''
    }
  }
}

// this.$t('activity.activityManage.activityInfo.tableDialog.title')
// this.$t('activity.exportResponse')
// $t('activity.activityManage.activityCashBack.title')
// label="$t('activity.activityManage.activityInfo.tableDialog.title')"
