export default {

  global:{
    export: 'Export',
    cancelButton: 'Cancel',
    confirmButton: 'Confirm',
    refresh: 'Refresh',
    close: 'Close',
    searchButton: 'Search',
    resetButton: 'Reset',
    addButton: 'Add',
    editButton: 'Edit',
    deleteButton: 'Delete',
    exportButton: 'Export',
    submitButton: 'Submit',
    newButton: 'New',
    moreButton: 'More',
    statusEnable: 'Enable',
    statusDisable: 'Disable',
    sort: 'Sort',
    qq: 'qq',
    selectDateRangeSeparator: 'to',
    icon: 'Icon',
    userName: 'Username',
    realName: 'Real Name',
    edit: 'Edit',
    delete: 'Delete',
    id: 'ID',
    selectDate: 'Select Date',
    exportMessage: 'Cashback Results Export',
    dialogTitle: 'Warning',
    promptTitle: 'Tips',
    name: 'Name',
    nickname: 'Nickname',
    status: 'Status',
    ctTime: 'Release Time',
    sortPlaceholder: 'Please enter sort',
    statusPlaceholder: 'Please select status',
    nickNamePlaceholder: 'Please enter a Nickname',
    userNamePlaceholder: 'Please enter UserName',
    dateTimePickerStartTimePlaceholder: 'Start Time',
    dateTimePickerEndTimePlaceholder: 'End Time',
    dateTimePickerRangeSeparator: '至',
    namePlaceholder:'Please Enter Name',
    selectDatePlaceholder: 'Date Range',
    datePickerStartDate: 'Start Date',
    datePickerEndDate: 'End Date',
    operationColumn: 'Operation',
  },

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
    noLongerThanSevenDaysWarning: 'The selected time cannot be longer than seven days',
    exportPrompt: 'Export Confirm',
    startDatePlaceholder: 'Start Date',
    endDatePlaceholder: 'End Date',
    rangeSeparator: 'to',
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
    closeOthers: 'Close Other',
    closeAll: 'Close All'
  },

  activity: {
    startDatePlaceholder: 'Start Date',
    endDatePlaceholder: 'End Date',
    rangeSeparator: 'to',
    cancelConfirmButton: 'Cancel',
    editSuccessMsg: 'Edit Successful',
    editFailMsg: '',
    addSuccessMsg: 'Add Successful',
    addFailMsg: '',
    submitSuccess: '',
    submitFail: '',
    deleteSuccessMsg: 'Delete Successful',
    submitSuccessful: '',
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
    ipDuplicateCheckButton: 'IP Duplicate Check',
    mobilePhoneSerialNumberCheckButton: 'Mobile Phone Serial Number Check',
    displayMobilePhoneNumberButton: 'Display Mobile Phone Number',
    selectDate: 'Select Date',
    wechat: 'WeChat',
    tableDialog: {
      name: 'Name',
      namePlaceholder: 'Please enter Name',
      status: 'Status',
      statusPlaceholder: 'Please enter Status',
    },
    validation: {
      name: 'Name must not be empty',
      sort: 'Index must not be empty',
      coverImg: 'Image must not be empty',
    },
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
          sortPlaceholder: 'Please enter sort.',
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
          index: 'Index',
          indexPlaceholder: 'Please enter Index',
          typeId: 'Task type',
          typeIdPlaceholder: 'Please enter task type',
          gameId: 'Game',
          gameIdPlaceholder: 'Please enter game ID',
          target: 'Target task quantity',
          targetPlaceholder: 'Please enter Target task quantity',
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
        },
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
      activityType: {
        addTitle: 'Add Activity Type',
        editTitle: 'Update Activity Type',
        tableDialog: {
          name: 'Name',
          namePlaceholder: 'Please Enter Name',
          oder: 'Order',
          oderPlaceholder: 'Please enter Order',
        },
        validation: {
          name: 'Name must not be empty',
          oder: 'Order must not be empty'
        }
      },
      wheelDiceConfig: {
        addTitle: "Add Lottery Allocation",
        editTitle: "Edit Lottery Allocation",
        tableDialog: {
          idPlaceholder: '',
          depositTotalMin: 'Daily Minimum Deposit',
          depositTotalMinPlaceholder: 'Please Enter Daily Minimum Deposit',
          depositTotalMax: 'Daily Maximum Deposit',
          depositTotalMaxPlaceholder: 'Please Enter Daily Maximum Deposit',
          lotteryTimes: 'Number of Lotteries',
          lotteryTimesPlaceholder: 'Please enter the Number of Lotteries',
        },
        validation: {
          depositTotalMin: 'Daily Minimum Deposit must not be empty',
          depositTotalMax: 'Daily Maximum Deposit must not be empty',
          lotteryTimes: 'Lottery draws must not be empty'
        }
      },
    },
    activityMemberInfo: {
      addTitle: 'Add Member Information',
      editTitle: 'Update Member Information',
      tableDialog: {
        duplicateIpHeader: 'Duplicate IPs',
        inviterCode: 'Inviter Code',
        inviterCodePlaceholder: 'Please enter Inviter Code',
        loginIp: 'Login IP',
        loginIpPlaceholder: 'Please enter Login IP',
        regTime: 'Registration Time',
        regTimePlaceholder: 'Please enter Registration Time',
        loginTime: 'Login Time',
        loginTimePlaceholder: 'Please enter Login Time',
        phone: 'Mobile Phone',
        phonePlaceholder: 'Please enter Mobile Phone',
        vip: 'Member VIP',
        vipPlaceholder: 'Please enter Member VIP',
        count: 'Count',
        memberCode: 'Member Code',
        memberCodePlaceholder: 'Please enter Member Code',
        cxAgent: 'Agent Number',
        cxAgentPlaceholder: 'Please enter Agent Number',
        realNamePlaceholder: 'Please enter Real Name',
        status: 'Status (0 = Disabled 1 = Normal 2 = Test User 3 = Super User)',
        statusRadio: 'Please select Status',
        totalAccount: 'Account Balance',
        totalAccountPlaceholder: 'Please enter Account Balance',
        email: 'Email',
        emailPlaceholder: 'Please enter Email',
        isOnline: 'Online (1 = Yes or 0 = No)',
        isOnlinePlaceholder: 'Please enter Online (1 = Yes or 0 = No)',
        sex: 'Gender (1 male 0 female)',
        sexPlaceholder: 'Select Gender (1 male 0 female)',
        sexSelect: 'Please select Gender',
        registIp: 'Registration IP',
        registIpPlaceholder: 'Please enter Registration IP',
        loginAddress: 'Login Address',
        loginAddressPlaceholder: 'Please enter Login Address',
        loginDev: 'Device (1 = IOS or 2 = Android)',
        loginDevPlceholder: 'Please enter Device (1 = IOS or 2 = Android)',
        nickName: 'Nickname',
        nickNamePlaceholder: 'Please enter Nickname',
        birthDay: 'Birth Date',
        birthDayPlaceholder: 'Please enter Birth Date',
        qqPlaceholder: 'Please enter qq',
        wechat: 'WeChat',
        wechatPlaceholder: 'Please enter WeChat',
        headImg: 'Display Photo',
        headImgPlaceholder: 'Please enter Display Photo',
        onlineTime: 'Online Duration',
        onlineTimePlaceholder: 'Please enter Online Duration',
        linkUrl: 'URL',
        linkUrlPlaceholder: 'Please enter URL',
        boxAccount: 'Safety Deposit Box Balance',
        boxAccountPlaceholder: 'Please enter Safety Deposit Box Balance',
        boxPass: 'Safety Deposit Box Password',
        boxPassPlaceholder: 'Please enter Safety Deposit Box Password',
        cleanTime: 'Clean Time',
        cleanTimePlaceholder: 'Please enter Clean Time',
        levelIntegral: 'Top Up Amount',
        levelIntegralPlaceholder: 'Please enter Top Up Amount',
        inviteMoney: 'Commission',
        inviteMoneyPlaceholder: 'Please enter Commission',
        codeAccount: 'Coding Account',
        codeAccountPlaceholder: 'Please enter Coding Account',
        pid: 'Player\'s Game Platform',
        pidPlaceholder: 'Please enter Player\'s Game Platform',
        codeTotal: 'Total Bets',
        codeTotalPlaceholder: 'Please enter Total Bets',
        channelcode: 'Channel Code',
        channelcodePlaceholder: 'Please enter Channel Code',
        speak: '0 = Normal 1 = Banned',
        speakPlaceholder: 'Please enter 0 = Normal 1 = Ban',
        loginNum: 'Number of Logins',
        loginNumPlaceholder: 'Please enter Number of Logins',
        version: 'Client version number',
        versionPlaceholder: 'Please enter Client version number',
        withdrawalPass: 'Withdrawal Password (md5 encryption)',
        withdrawalPassPlaceholder: 'Please enter Withdrawal Password (md5 encryption)',
        deviceId: 'Device ID',
        deviceIdPlaceholder: 'Please enter Device ID',
      },
      validation: {
        memberCode: 'Member number cannot be empty',
        cxAgent: 'Agent number cannot be empty',
        userName: 'Account cannot be empty',
        loginNum: 'The number of Logins cannot be empty',
      },
    },
    chatComplaint: {
      addTitle: 'Add customer service complaint',
      editTitle: '',
      exportResponse: 'Customer Service Complaint',
      updateChatComplaintSuccess: 'Complaint Processed Successfully',
      updateChatComplaintError: 'Cancel Complaint',
      updateChatComplaintPrompt: 'Please enter comments for review.',

      tableDialog: {
        remark: 'Complaint',
        remarkPlaceholder: 'Please enter Complaint',
        userId: 'User ID',
        userIdPlaceholder: 'Please enter  User ID',
        kfId: 'Customer Service ID',
        kfIdPlaceholder: 'Please enter Customer Service ID',
        processingTime: 'Processing Time',
        processingTimePlaceholder: 'Please enter Processing Time',
        accountPlaceholder: 'Please enter Customer Service Account Number',
        approver: 'Approver',
        approverPlaceholder: 'Please enter  Approver',
        statusPlaceholder: 'Please enter  Status',
        createTime: 'Create Time',
        comments: 'Comments',
        commentsPlaceholder: 'Please enter  Comments',
        status: 'Status',
        statusOptions: 'Processing status (0 = unprocessed 1 = Processed 2 = rejected)',
      },
      statusOptions: {
        unprocessed: '未处理',
        processed: '已处理',
        rejected: '驳回',
      },
    },
    commonProblem: {
      addTitle: 'Add FAQs',
      editTitle: 'Update FAQs',
      tableDialog: {
        title: 'Title',
        titlePlaceholder: 'Please enter Title',
        status: 'Status',
        statusPlaceholder: 'Please enter Status',
        content: 'Content',
        contentPlaceholder: 'Please enter Content',
        index: 'Index',
        indexPlaceholder: 'Please enter Index',
      },
    },
    configWaiter: {
      addTitle: 'Add Customer Service Management',
      editTitle: 'Update Customer Service Management',
      tableDialog: {
        status: 'Status',
        name: 'Nickname',
        namePlaceholder: 'Please enter Nickname',
        type: 'Type',
        typePlaceholder: 'Please enter Type',
        code: 'WeChat or QQ number',
        codePlaceholder: 'Please enter your WeChat or QQ number',
        iconPlaceholder: 'Please enter Icon',
        remark: 'Remarks',
        remarkPlaceholder: 'Please enter Remarks',
        updateBy: 'Updated By',
        updateTime: 'Last Update Time',
        index: 'Index',
      }
    },
    homeBanner: {
      addTitle: 'Add Home Page Image',
      editTitle: 'Update Home Page Image',
      tableDialog: {
        sort: 'Index',
        sortPlaceholder: 'Please enter Index',
        coverImg: 'Display Photo',
        coverImgPlaceholder: '',
      },
    }
  },

  members: {
    configVip: {
      home: '',
      table: {
        vipLvl: 'VIP Level',
        demandCodingValue: 'Demand Coding Value',
        advancementJackpot: 'Advancement Jackpot',
        weeklySalary: 'Weekly Salary',
        monthlySalary: 'Monthly Salary',
        creationTime: 'Creation Time',
        lastUpdateBy: 'Last Updated by',
        lastUpdateAt: 'Last Updated at',
        submit: 'Submit',
        cancel: 'Cancel',
      },
      dialog: {
        vipLvlreq: 'Please enter VIP level',
        demCodereq: 'Please enter the amount of demand coding',
        advJackpotreq: 'Please enter the promotion bonus',
        weeklySalreq: 'Please enter the weekly salary',
        monthlySalreq: 'Please enter monthly salary'
      },
      rules: {
        vipRule: 'The vip level cannot be empty and can only be a number',
        demandRule: 'Requirement coding cannot be empty and can only be a number',
        promoteRule: 'The promotion bonus cannot be empty and can only be a number',
        weekSalaryRule: 'Weekly salary can not be empty and can only be a number',
        monthSalaryRule: 'Monthly salary cannot be empty and can only be a number'
      },
      queries: {
        addQuery: 'Add VIP configuration',
        updateQuery: 'Modify vip level settings',
        delQuery: 'Are you sure to delete vip',
        delQuery2: 'data item',
        warning: 'Warning',
        sure: 'Sure',
        cancel: 'Cancel',
        delSuccess: 'Deleted Successfully',
        confExcel: 'Confirm processing Excel and downloading, it will be delayed when the amount of data is large, please wait patiently...',
        confirm: 'Confirm',
        function: 'Please fill in the function name'
      }
    },
    liveVideoProp: {
      form: {
        giftAmt: 'Gift Amount',
        date: {
          label: 'Date Range',
          sep: 'To',
          sel: 'Date Selection',
          sel2: 'Please select a date selection'
        },
        memId: 'Member ID',
        memNn: 'Member Nickname',
        hostId: 'Host ID',
        search: 'Search',
        reset: 'Reset',
        export: 'Export',
        testGift: 'Test account gift details',
        status: 'Status',
        giftName: 'Gift Name',
        hostNn: 'Host Nickname',
        giftDate: 'Gift Date',
        testAcct: 'Test account gift details',
        netErr: 'Network Anomaly',
        memIdErr: 'Member ID can only enter numbers and underscores',
        excelErr: 'Confirm processing Excel and download, there will be a delay when there is a large amount of data, please be patient...',
        warning: 'Warning',
        confirm: 'Confirmation',
        cancel: 'Cancel',
        giftLog: 'User Gift Log',

      }
    },
    logGameOrder: {
      analyze: {
        date: {
          range: 'Date Range',
          start: 'Start',
          end: 'End Date'
        },
        memIdAcc: 'Member ID / Member Account Number',
        plat: 'Please select a platform',
        types: 'All Types',
        search: 'Search',
        reset: 'Reset',
        batch: 'Batch processing up and down',
        memId: 'Member ID',
        orderId: 'Order ID',
        gamePlat: 'Game Platform',
        amt: 'Amount',
        type: 'Type',
        opt: 'Operation',
        bckUp: 'Back up',
        nxtPoint: 'Reissue the next point',
        fHall: 'Failed to enter the hall',
        eHall: 'Entrance hall start',
        regFail: 'Registration Failed',
        scoreSuc: 'Score Success',
        credEx: 'Credit deduction exception',
        scoreDec: 'Score deduction failure',
        failScr: 'Failed to score',
        tmoutScr: 'Timeout on score',
        blncInq: 'Balance inquiry failed',
        failUpscr: 'Failure to check the details of the upper score',
        tmoutUpscr: 'Timeout for up-score query details',
        upScrnotex: 'Up-score transactions do not exist',
        getGfail: 'Get Game Failed',
        unkAnom: 'Unknown anomalies',
        bckScr: 'Back on the score',
        fexHall: 'Failure to exit the hall',
        sNextscr: 'Start of the next score',
        dScoresucc: 'Down score success',
        fScore: 'Failed to place a score',
        dTime: 'Down timeout',
        bInqf: 'Balance inquiry failed',
        fQuery: 'Failure to query the details of the next score',
        tmoutQuery: 'Timeout for down-sub query details',
        lScore: 'Lower score transactions do not exist',
        tScore: 'Top Score',
        lDiv: 'Lower Division',
        unk: 'Unknown',
        enHall: 'Entrance Hall',
        exHall: 'Exit Hall',
        start: 'Start',
        success: 'Success',
        anom: 'Anomalies',
        failure: 'Failure',
        tmOut: 'Timeout',
        fChk: 'Failed to check details',
        tmoutQueryDetails: 'Timeout for querying details',
        trnsctNot: 'Transactions do not exist',
        getGame: 'Get Game Failed',
        rollback: 'Rollback',
        slctMem: 'Please select members',
        tips: 'Tips',
        determine: 'Determine',
        succFund: 'Successful refund of funds',
      },
      index: {
        allStat: 'All Status',
        analysis: 'Analysis',
        stTime: 'Start Time',
        endTime: 'Ending Time',
        status: 'Status',
        numRet: 'Number of Retries',
        plsMemId: 'Please enter your Member ID',
        plsPlat: 'Please select a platform',
        determ: 'Determine',
        cancel: 'Cancel',
        retFunds: 'Return of Funds',
        conf: 'Only numbers and underscores can be entered for member ID/member account',
        confEx: 'Confirm processing Excel and download, there will be a delay when there is a large amount of data, please be patient...',
        warn: 'Warning',
        confirm: 'Confirmation',
        cancellation: 'Cancellation',
        mUpdown: 'Member up/down points',
        confStat: 'Confirm that you want to change the status to',
        modSuc: 'Modified Succesfully',
        addScore: 'Add members on the score missing',
        addSucc: 'Add Success',
        expo: 'Export',
        addMem: 'Add members on the score missing',
      }
    },
    memberBcode: {
      index: {
        totalRech: 'Total Recharge',
        totalCode: 'Total Coding',
        codReq: 'Coding is also Required',
        datRange: 'Select Date',
        sDate: 'Start Date',
        eDate: 'End Date',
        to: 'To',
        memId: 'Member ID',
        search: 'Search',
        reset: 'Reset',
        export: 'Export',
        rev: 'Revenue',
        desc: 'Description',
        wCode: 'Whether to code',
        ccVol: 'Current coding volume',
        cTime: 'Creation Time',
        opt: 'Operation',
        mod: 'Modification',
        pccVol: 'Please enter the current coding volume',
        gCaptcha: 'Google Captcha',
        pGverifcode: 'Please enter Google verification code',
        det: 'Determine',
        canc: 'Cancellation',
        codingEmpty: 'The current coding amount cannot be empty, and the value is greater than or equal to 0',
        gCaptchaEmpt: 'Google captcha cannot be empty',
        netAnom: 'Network Anomaly',
        unc: 'Uncoded',
        coded: 'Coded',
        unk: 'Unknown',
        memNum: 'Member IDs can only be entered as numbers and underscores',
        modCod: 'Modify member coding data',
        codingNotGreater: 'The current coding volume value cannot be greater than the income',
        modSuc: 'Modified Successfully',
        confEx: 'Confirm processing Excel and download, there will be a delay when there is a large amount of data, please be patient...',
        warn: 'Warning',
        confirmation: 'Confrimation',
        memData: 'Member coding data'
      }
    },
    memberCard: {
      index: {
        name: 'Name',
        pName: 'Please enter your name',
        bName: 'Bank Name',
        pbName: 'Please enter the name of your bank',
        bCode: 'Bank Code',
        pbCode: 'Please enter the bank code',
        bAccnum: 'Bank Account Number',
        pbAccnum: 'Please enter your bank account number',
        bAdd: 'Bank Address',
        pbAdd: 'Please enter your bank address',
        memId: 'Member ID',
        pmemId: 'Please enter your member ID',
        cType: 'Card type 1=Bank card 2=Paypal',
        scType: 'Please select card type 1=Bank Card 2=Paypal',
        pDict: 'Please select dictionary generation',
        default: 'Default or not',
        pdef: 'Please enter if default or not',
        search: 'Search',
        reset: 'Reset',
        new: 'New',
        mod: 'Edit',
        del: 'Delete',
        exp: 'Export',
        sysNum: 'System Number',
        opt: 'Operation',
        det: 'Determine',
        cnc: 'Cancel',
        addFnc: 'Add [Please fill in the function name]',
        modFnc: 'Modify [please fill in the function name]',
        modSucc: 'Modified Successfully',
        addSucc: 'Add Success',
        conDel: 'Whether to confirm the deletion of [please fill in the function name] number',
        datItem: 'The Data Item?',
        warn: 'Warning',
        cancellation: 'Cancellation',
        delSucc: 'Deleted Successfully',
        exDown: 'Confirm processing Excel and download, there will be a delay when there is a large amount of data, please be patient...',
        confirmation: 'Confirmation',
        memBank: 'Member Bank Card'
      }
    },
    memberGameData: {
      agRecord: {
        buttons: {
          more: 'More',
        },
        table: {
          titles: 'Note Data Details',
          ordNum: 'Order Number',
          buNum: 'Bureau Number',
          payAmt: 'Payment Amount',
          plBets: 'Place your bets at',
          gType: 'Game Type',
          gTypes: {
            bacc: 'Baccarat',
            dt: 'Dragon and Tiger',
          },
          tBet: 'Total Bet',
          vBet: 'Valid Bets',
          oStat: 'Order Status',
          anom: 'Anomalies',
          pOut: 'Paid Out',
          canc: 'Cancelled',
          howTo: 'How to Play',
          howtos: {
            banker: 'Banker',
            casual: 'Casual',
            sum: 'Sum',
            dragon: 'Dragon',
            tiger: 'Tiger'
          },
          tNum: 'Table Number',
          pTime: 'Payout Time',
          bal: 'Balance',
          betIp: 'Betting on IP',
          det: 'Details'

        },
        data: {
          title: 'Game Match List',
          vipLvl: 'The vip level can only be greater than the previous level',

        }
      },
      detail: {
        title: 'Game Match Details',
        vipLvl: 'The vip level can only be greater than the previous level',
      },
      index: {
        button: {
          vBets: 'Valid Bets',
          tBets: 'Total Bets',
          profit: 'Profit',
          search: 'Search',
          reset: 'Reset',
          exp: 'Export',

        },
        pName: 'Platform Name',
        sel: 'Select All/Select None',
        date: {
          datRange: 'Select Date',
          sTime: 'Start Time',
          eTime: 'End Time',
          to: 'To'
        },
        entMemid: 'Please enter your member ID',
        entbNum: 'Please enter the game bureau number',
        memId: 'Member ID',
        subId: 'Subplatform ID',
        gameId: 'Game ID',
        gbNum: 'Game Bureau Number',
        gName: 'Game Name',
        subName: 'Sub-Platform Name',
        vBets: 'Valid Bets',
        tBets: 'Total Bets',
        profit: 'Profit',
        setTime: 'Settlement Time',
        gLog: 'Game Match Log',
        nData: 'Note Data Details',
        proName: 'Project Name',
        proVal: 'Project Value',
        gbNotemp: 'The Game Bureau number cannot be empty',
        script: {
          uCode: 'Unwashed Code',
          wCode: 'Washed Code',
          unk: 'Unknown',
          memNum: 'Member IDs can only be entered as numbers and underscores',
          conEx: 'Confirm processing Excel and download, there will be a delay when there is a large amount of data, please be patient...',
          warn: 'Warning',
          canc: 'Cancellation',
          mNote: 'Member Note Data',
          mPlat: 'Member Platform ID',
          nPer: 'Number of Periods',
          lAm: 'Lottery Amount',
          amt: 'Amount',
          won: '  Won',
          unwin: '  Unwinned',
          lName: 'Lottery Name',
          pBet: 'Place your bets at',
          lCode: 'Lottery Code',
          cNote: 'Content of the following note',
          nData: 'Note List Data'
        },
      },
      record: {
        div: {
          button: {
            more: 'More',

          },
          gbNum: 'Game Bureau Number',
          pAcc: 'Player Account',
          rId: 'Room ID',
          gId: 'Game ID',
          tNum: 'Table Number',
          cNo: 'Chair No.',
          nPlayers: 'Number of Players',
          hPub: 'Hand Public',
          vBets: 'Valid Bets',
          tBets: 'Total Bets',
          prof: 'Profit',
          wPump: 'Water Pumping',
          setTime: 'Settlement Time',
          proxy: 'Proxy ID',
          affState: 'Affiliated States',
          det: 'Details',
          gMatch: 'Game Match Log',
          cMatch: 'Click to open match details'
        },
        data: {
          gList: 'Game Match List',
          vipLvl: 'The vip level can only be greater than the previous level'
        }
      }
    },
    memberGameDataMin: {
      index: {
        div: {
          date: {
            dRange: 'Select Date',
            sTime: 'Start Time',
            eTime: 'End Time',
            to: 'To'
          },
          button: {
            search: 'Search',
            reset: 'Reset',
          },
          entMemid: 'Please enter your Member ID',
          entbNum: 'Please enter the Game Bureau Number',
          sBet: 'Please select a betting status',
          memId: 'Member ID',
          proxyId: 'Proxy ID',
          trnsctNum: 'Transaction Order Number',
          gbNum: 'Game Bureau Number',
          bStat: 'Bet Status',
          pName: 'Platform Name',
          vBets: 'Valid Bets',
          tBets: 'Total Bets',
          profit: 'Profit',
          pBets: 'Betting time',
          sportBet: 'Sports Betting Details'
        },
        data: {
          gbNum: 'The Game Bureau number cannot be empty',
          entMemid: 'Member IDs can only be entered as numbers and underscores',
        }
      }
    },
    memberGameTransfer: {
      index: {
        div: {
          btn: {
            search: 'Search',
            reset: 'Reset'
          },
          date: {
            dRange: 'Date Range',
            sDate: 'Start Date',
            eDate: 'End Date',
          },
          template: {
            kChess: 'Kaiyuan Chess',
            ppFish: 'PP Fishing',
            lot77: '77 Lottery',
            agPlat: 'AG Platform',
            mgPlat: 'MG Platform',
            ngElec: 'NG Electronics',
            bbinV: 'BBIN Video',
            bbinS: 'BBIN Sports',
            bbinE: 'BBIN Electronics',
            bbinF: 'BBIN Fishing',
            sabS: 'Sabah Sports',
            mChess: 'Meitian Chess',
            tChess: 'Triumph Chess',
            lChess: 'Leyou Chess',
            nwChess: 'New World Chess',
            afbEl: 'AFB Electronics',
            panSport: 'Pan-Asian E-Sports',
            bgVid: 'BG Video',
            bgFish: 'BG Fishing',
            bgGame: 'BG E-Gaming',
            tChessx: 'Triumph Chess X'
          },
          entPid: 'Please enter the player ID',
          entPod: 'Please enter the order ID',
          selTstat: 'Please select transaction status',
          selTtype: 'Please select the transaction type',
          tId: 'Transaction ID',
          pId: 'Player ID',
          proxy: 'Proxy ID',
          plat: 'Platform ID',
          ordId: 'Order ID',
          pType: 'Product Type',
          tStat: 'Transaction Status',
          succ: 'Success',
          tobe: 'To be processed',
          nConf: 'Not confirmed',
          fail: 'Failure',
          unk: 'Unknown',
          tType: 'Transaction Type',
          tQuota: 'Transfer of Quota',
          cTrans: 'Credit Transfer',
          tAmt: 'Transaction Amount',
          tHours: 'Trading Hours',

        }
      }
    },
    memberInfo: {
      index: {
        button: {
          numMem: 'Number of Members',
          totBal: 'Total Balance',
          totDep: 'Total Safe Deposit box balance',
          statQ: 'Statistical Queries',
          ip: 'View blocked IP',
          bBlock: 'Batch blocking',
          sDepo: 'Safe deposit box balance raised',
          det: 'Determine',
          normal: 'Normal',
          fden: 'Forbidden',

        },
        date: {
          range: 'Date Range',
          sTime: 'Start Time',
          eTime: 'End Time',
          to: 'to'
        },
        invCode: 'Invitation Code',
        aState: 'All States',
        nick: 'Nickname',
        lIp: 'Login IP',
        bName: 'Bank Card Number / Real Name',
        logRem: 'Login Remarks',
        aType: 'All Types',
        cvNum: 'Client version number',
        lDev: 'Login Device',
        memId: 'Member ID',
        uName: 'Username',
        nName: 'Nickname',
        mVip: 'Member VIP',
        points: 'Points',
        sDeposit: 'Deposit-Box-Amount',
        status: 'Status',
        selStat: 'Please select the status',
        memSearch: 'Member ID/account number/mobile phone number , comma-separated member search',
        regTime: 'Registration Time',
        logTime: 'Login Time',
        numLog: 'Number of logins',
        logIp: 'Login IP',
        regIp: 'Registered IP',
        restArea: 'Restricted Area',
        wRest: 'Withdrawal Restriction',
        ban: 'Banned or Not',
        codeAcc: 'Coding Account',
        valBets: 'Cumulative valid bets',
        uType: 'User Type',
        loginMark: 'loginMark',
        mem: 'Membership',
        none: 'None',
        other: 'Other',
        lRem: 'Login Remarks',
        opt: 'Operation',
        nBan: 'Note the reason for the ban',
        selDis: 'Please select the reason for disabling',
        entDis: 'Please enter the reason for disabling',
        cnc: 'Cancellation',
        sbmt: 'Submit Now',
        remBan: 'Remark ban season',
        selBan: 'Please select the reason for the ban',
        resBan: 'Please enter the reason for the ban',
        submit: 'Submit Now',
        cellNum: 'Cellphone Number',
        entCell: 'Please enter your cellphone number',
        recom: 'Recommendation:',
        lastDig: 'Please unify the test account format, the default format has been generated, please enter only the last four digits',
        pass: 'Password',
        entPass: 'Please enter your password',
        tips: 'Tips',
        passDig: 'Password is automatically assigned to the last six digits of the phone number',
        memIp: 'Member IP',
        search: 'Search',
        bRem: 'Blocking Remarks',
        cTime: 'Closing Time',
        rName: 'Real Name',
        sMod: 'Status modified successfully',
        sModfail: 'Status modification failed',
        netAnom: 'Network Anomaly',
        vbIp: 'View blocked IP',
        confirmUp: 'Determine to {row} unblock?',
        warn: 'Warning',
        det: 'Determine',
        unbSucc: 'Unblocked Successfully',
        addUinf: 'Add test user information',
        modInf: 'Modify user information',
        modSucc: 'Modified successfully',
        addSucc: 'Add Success',
        confExp: 'Do you confirm to export all member list data items',
        nData: 'No Data',
        memList: 'Member List',
        succUnb: 'Successful Unbanning',
        banSucc: 'Banned Successfully',
        vMem: 'View Members',
        uipInc: 'Username or IP is incorrect!',
        statSet: 'Status setting 0 successful',
        netEx: 'Network exception error',
        statNorm: 'Status setting normal and successful',
        pStat: '- Personal Statement',
        repSucc: 'Replication Success',
        pGverifcode: 'Please enter your Google Verification Code',

      }
    }
  },

  common: {
    titleDialog: 'Warning',
    titlePrompt: 'Tips',
    removeButton: 'Remove',
    searchButton: 'Search',
    resetButton: 'Rename',
    confirmButton: 'Confirm',
    cancelButton: 'Cancel',
    operationColumn: 'Operation'
  },

  liveWeb: {
    anchorAward: {
      queryForm: {
        updateTimeLabel: 'Date range',
        updateTimePlaceholder: 'Please select a date range',
        idPlaceholder: 'Anchor ID',
        nickNamePlaceholder: 'Anchor nickname',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        exportButton: '@:global.exportButton'
      },
      table: {
        anchor: 'Anchor ID',
        nickName: 'Anchor nickname',
        cost: 'Bet',
        prize: 'Prize',
        prizeSixThousand: 'Prize six thousand',
        updateTime: 'Update time'
      },
      exportDialog: {
        title: 'Warning',
        message: 'Confirm processing excel and download, there will be a delay when there is a large amount of data, please be patient...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      }
    },
    chat: {
      queryForm: {
        fromPlatformPlaceholder: 'Member ID',
        userNicknamePlaceholder: 'Member nickname',
        poscatIdPlaceholder: 'Anchor ID',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        viewBlackListButton: 'View blocked IPs'
      },
      refresh: {
        title: 'Record refresh',
        placeholder: 'Time interval',
        description: 'Refresh after {secs} seconds',
        interval: '{secs} seconds',
        startButton: 'Start refreshing',
        stopButton: 'Stop refreshing'
      },
      table: {
        fromPlatform: 'Platform member ID',
        userNickName: 'User nickname',
        type: 'Message type',
        type0: 'General message',
        type1: 'Pop-up message',
        msg: 'Message content',
        poscatId: 'Anchor ID',
        poscatNickName: 'Anchor nickname',
        noSpeaking: 'Is blocked',
        noSpeakingTrue: 'Blocked',
        noSpeakingFalse: 'Normal',
        forbid: 'Is banned',
        forbidTrue: 'Banned',
        forbidFalse: 'Normal',
        userIp: 'User IP',
        createTimes: 'Send time',
        operation: '@:global.operationColumn',
        muteButton: 'Block',
        unmuteButton: 'Unblock',
        forbidButton: 'Ban'
      },
      confirmUpdateDialog: {
        title: 'Warning',
        message: 'Sure you want {fromPlatform} unblocked?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        fromPlatformError: 'Member IDs can only be entered as numbers and underscores',
        unblockSuccess: 'Unblocked successfully'
      },
      suspendUserDialog: {
        titleAdd: 'Add member statement',
        titleUpdate: 'Blocking users',
        fromPlatformLabel: 'Platform member ID',
        fromPlatformPlaceholder: 'Please enter the platform member ID',
        userNickNameLabel: 'User\'s nickname',
        userNickNamePlaceholder: 'Please enter the user\'s nickname',
        msgLabel: 'Message content',
        userIpLabel: 'Blocking IP',
        confirmButton: 'Confirm',
        cancelButton: 'Cancel',
        validation: {
          postcatId: 'Anchor ID cannot be empty'
        },
        messageBox: {
          suspendSuccess: 'Blocked successfully'
        }
      },
      banRemarksDialog: {
        title: 'Remark ban reason',
        remarkPlaceholder: 'Please select the reason for the ban',
        remarkedPlaceholder: 'Please enter the reason for the ban',
        messageBox: {
          forbidSuccess: 'Banned successfully'
        }
      },
      viewBlackListDialog: {
        title1: 'View blocked ip',
        title2: 'View blocked ip',
        queryForm: {
          userIdLabel: 'Member ID',
          userIdPlaceholder: 'Member ID',
          userIpLabel: 'Member IP',
          userIpPlaceholder: 'Member IP',
          searchButton: '@:global.searchButton'
        },
        table: {
          userId: 'Member ID',
          userIp: 'Member IP',
          msg: 'Blocking remarks',
          createTime: 'Closing time',
          operation: '@:global.operationColumn',
          unblockButton: 'Unblock'
        },
        confirmUpdateDialog: {
          title: 'Warning',
          message: 'Sure you want {userId} unblocked?',
          confirmButton: '@:global.confirmButton',
          cancelButton: '@:global.cancelButton'
        },
        messageBox: {
          unblockSuccess: 'Unblocked successfully'
        }
      }
    },
    family: {
      queryForm: {
        namePlaceholder: 'Name',
        userIdPlaceholder: 'Leader ID',
        idPlaceholder: 'Family ID',
        statusPlaceholder: 'Status',
        status0: 'Not audited',
        status1: 'Audited',
        status2: 'Rejected',
        status3: 'Closed',
        status4: 'Dismissed',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: 'Add family'
      },
      table: {
        name: 'Family name',
        notice: 'Announcement',
        manifesto: 'Family declaration',
        nickName: 'Clan referral number',
        userId: 'Leader ID',
        userCount: 'Number of members',
        createTimes: 'Create time',
        status: 'Status',
        status0: 'Not audited',
        status1: 'Audited',
        status2: 'Rejected',
        status3: 'Closed',
        status4: 'Dismissed',
        contribution: 'Contribution of family members',
        videoTime: 'Live broadcast time',
        memo: 'Remarks',
        operation: '@:global.operationColumn',
        updateFamilyButton: 'Modify',
        removeButton: 'Remove',
        updateFlag0Button: 'No pass',
        updateFlag1Button: 'Pass',
        updateFlag2Button: 'Block',
        updateFlag3Button: 'Unblock'
      },
      addUpdateDialog: {
        titleAdd: 'Add family',
        titleUpdate: 'Update family',
        nameLabel: 'Family name',
        namePlaceholder: 'Please enter the family name',
        userIdLabel: 'Leader ID',
        userIdPlaceholder: 'Please enter the family leader ID',
        nickNameLabel: 'Leader nickname',
        nickNamePlaceholder: 'Please enter the nickname of the leader',
        logoLabel: 'Family logo',
        manifestoLabel: 'Family declaration',
        manifestoPlaceholder: 'Please enter a family declaration',
        noticeLabel: 'Announcement',
        noticePlaceholder: 'Please enter content',
        memoLabel: 'Remarks',
        memoPlaceholder: 'Please enter content',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        validation: {
          logo: 'Please upload the family logo',
          name: 'Please enter the family name',
          userId: 'Please enter the leader ID',
          nickName: 'Please enter the nickname of the leader',
          manifesto: 'Please enter a family declaration',
          notice: 'Please enter an announcement',
          memo: 'Please enter a memo'
        }
      },
      confirmUpdateFlag0Dialog: {
        title: '@:global.dialogTitle',
        message: 'Is it confirmed that the data item with the family name "{name}" is rejected?',
        confirmButton: '@:global:confirmButton',
        cancelButton: '@:global:cancelButton'
      },
      confirmUpdateFlag1Dialog: {
        title: '@:global.dialogTitle',
        message: 'Is it confirmed that the data item with the family name "{name}" is approved?',
        confirmButton: '@:global:confirmButton',
        cancelButton: '@:global:cancelButton'
      },
      confirmUpdateFlag2Prompt: {
        title: '@:global.promptTitle',
        message: 'Please enter the reason for blocking',
        confirmButton: '@:global:confirmButton',
        cancelButton: '@:global:cancelButton',
        inputErrorMessage: 'The reason for blocking cannot be empty'
      },
      confirmUpdateFlag3Prompt: {
        title: '@:global.promptTitle',
        message: 'Please enter the reason for unblocking',
        confirmButton: '@:global:confirmButton',
        cancelButton: '@:global:cancelButton',
        inputErrorMessage: 'Reason for unblock cannot be empty'
      },
      confirmRemoveDialog: {
        title: '@:global.dialogTitle',
        message: 'Is it confirmed that the "{name}" family is disbanded?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: 'Is it confirmed that all family data items are exported?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        updateFlag0Success: 'Audit rejection successful',
        updateFlag1Success: 'Audit approved',
        updateFlag2Success: 'Blocked successfully',
        updateFlag2Cancel: 'Cancel input',
        updateFlag3Success: 'Unblocked successfully',
        updateFlag3Cancel: 'Cancel input',
        removeSuccess: 'Deleted successfully'
      }
    },
    guard: {
      queryForm: {
        specificationsLabel: 'Specification',
        specificationsPlaceholder: 'Please enter specifications',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: '@:global.addButton',
        edit: '@:global.editButton',
        remove: '@:global.removeButton'
      },
      table: {
        specifications: 'Specification',
        month: 'Months of guardianship',
        price: 'Price',
        type: 'Guardian type',
        type1: 'Guardian of silver',
        typeOthers: 'Guardian of the stars',
        propId: 'Gift id',
        discountPrice: 'Discounted price',
        giveday: 'Number of complimentary days',
        operation: '@:global.operationColumn',
        removeButton: 'Remove'
      },
      addUpdateDialog: {
        titleAdd: 'Add',
        titleUpdate: 'Update',
        specificationsLabel: 'Specification',
        specificationsPlaceholder: 'Please select specifications',
        monthLabel: 'Months of guardianship',
        monthPlaceholder: 'Please enter the number of months of guardianship',
        priceLabel: 'Price',
        pricePlaceholder: 'Please enter the price',
        typeLabel: 'Guardian type',
        typePlaceholder: 'Please select',
        propIdLabel: 'Associated gifts',
        propIdPlaceholder: 'Please select',
        discountPriceLabel: 'Discounted price',
        discountPricePlaceholder: 'Please enter the discounted price',
        givedayLabel: '赠送天数',
        givedayPlaceholder: 'Please enter the number of days of gift',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmRemoveDialog: {
        title: '@:global.dialogTitle',
        message: 'Is it confirmed that the data item with the number "{ids}" is deleted?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: 'Is it confirmed that all data items are exported?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        editLiveGuardConfigSuccess: 'Updated successfully',
        addLiveGuardConfigSuccess: 'Added successfully',
        removeLiveGuardConfigSuccess: 'Removed successfully'
      }
    },
    h5: {
      queryForm: {
        nameLabel: 'Name',
        namePlaceholder: 'Please enter a name',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        add: '@:global.addButton',
        edit: '@:global.editButton',
        remove: '@:global.removeButton'
      },
      table: {
        name: 'Plugin name',
        status0: 'Disabled',
        status1: 'Enabled',
        conUrl: 'Address',
        iconUrl: 'Icon',
        operation: '@:global.operationColumn',
        removeButton: 'Remove'
      },
      validations: {
        name: 'Name cannot be empty',
        id: 'ID cannot be empty'
      },
      addDialog: {
        title: 'Add h5 plugin',
        idLabel: 'ID',
        idPlaceholder: 'Please enter the ID',
        nameLabel: 'Plugin name',
        namePlaceholder: 'Please enter a name',
        conUrlLabel: 'Content address',
        conUrlPlaceholder: 'Please enter the content address',
        iconUrlLabel: 'Icon address',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      editDialog: {
        title: 'Modify h5 plugin',
        nameLabel: 'Plugin name',
        namePlaceholder: 'Please enter a name',
        conUrlLabel: 'Content address',
        conUrlPlaceholder: 'Please enter the content address',
        iconUrlLabel: 'Icon address',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmRemoveDialog: {
        title: '@:global.dialogTitle',
        message: 'Is it confirmed that the data item with the h5 plugin number "{ids}" is deleted?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmStatusChangeDialog: {
        title: '@:global.dialogTitle',
        message: 'Confirm you want {text} "{name}"?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: 'Confirm processing excel and download, there will be a delay when there is a large amount of data, please be patient...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        addSuccess: 'Added successfully',
        editSuccess: 'Edited successfully',
        removeSuccess: 'Deleted successfully',
        statusChangeSuccess: '{text} successfully'
      }
    },
    imMute: {
      queryForm: {
        userIdLabel: 'Member ID',
        userIdPlaceholder: 'Please enter your member ID',
        nickNameLabel: 'Member nickname',
        nickNamePlaceholder: 'Please enter member nickname',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      table: {
        memberAccount: 'User Id',
        nickName: 'User nickname',
        shuttedUntil: 'Cutoff time',
        shuttedUntilNegative1: 'Permanent',
        shuttedUntil0: 'Not closed'
      },
      messageBox: {
        userIdAndNickNameEmptyWarning: 'The host Id and host nickname cannot be empty at the same time',
        userIdFormatError: 'Member IDs can only be entered as numbers and underscores'
      }
    },
    liveBlack: {
      queryForm: {
        hostIdLabel: 'Anchor ID',
        hostIdPlaceholder: 'Please enter the anchor ID',
        blackUserIdLabel: 'Member ID',
        blackUserIdPlaceholder: 'Please enter the user ID to be set',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      table: {
        blackUserId: 'Member ID',
        nickName: 'Member nickname',
        hostId: 'Anchor ID',
        hostName: 'Anchor nickname',
        remark: 'Blocking remarks',
        createTime: 'Closing time',
        operation: '@:global.operationColumn',
        removeButton: 'Remove blacklist ban'
      },
      messageBox: {
        memberIdFormatError: 'Member IDs can only be entered as numbers and underscores',
        removeSuccess: 'Removed successfully'
      },
      confirmRemoveDialog: {
        title: '@:global.dialogTitle',
        message: 'Do you want to confirm the deletion of the data item with the number "{ids}"?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      }
    },
    liveComplaint: {
      queryForm: {
        selectDateLabel: 'Creation time',
        selectDateStartPlaceholder: 'Starting date',
        selectDateEndPlaceholder: 'End date',
        userIdPlaceholder: 'Please enter your member ID',
        anchorPlaceholder: 'Please enter the anchor ID',
        statusPlaceholder: 'Please select the processing status',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        export: '@:global.exportButton'
      },
      table: {
        content: 'Complaint content',
        mobile: 'Member cell phone number',
        roomName: 'Room name',
        userId: 'Member ID',
        anchor: 'Anchor',
        createTime: 'Creation time',
        approver: 'Approver',
        remark: 'Approval remarks',
        processingTime: 'Approval time',
        status: 'Processing status',
        status0: 'Pending',
        status1: 'Reviewed',
        status2: 'Rejected',
        operation: '@:global.operationColumn',
        processButton: 'Process',
        rejectButton: 'Reject'
      },
      addDialog: {
        title: 'Add anchor complaint record',
        remarkLabel: 'Complaint content',
        remarkPlaceholder: 'Please enter content',
        userIdLabel: 'Member ID',
        userIdPlaceholder: 'Please enter your member ID',
        anchorLabel: 'Anchor',
        anchorPlaceholder: 'Please enter anchor',
        approverLabel: 'Approver',
        approverPlaceholder: 'Please enter the approver',
        processingTimeLabel: 'Approval time',
        processingTimePlaceholder: 'Select approval time',
        statusLabel: 'Status (0 Pending 1 Reviewed 2 Rejected)',
        statusPlaceholder: 'Please select dictionary generation',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmEditConfirmationPrompt: {
        title: '@:global.promptTitle',
        message: 'Please enter a note for review',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: 'Confirm processing excel and download, there will be a delay when there is a large amount of data, please be patient...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        userIdFormatError: 'Member IDs can only be entered as numbers and underscores',
        editSuccess: 'Audit processing successful',
        editCancel: 'Cancel input',
        updateLiveComplaintSuccess: 'Edited successfully',
        addLiveComplaintSuccess: 'Added successfully'
      }
    },
    liveHostPre: {
      queryForm: {
        dateDayPlaceholder: 'Select date',
        livePlaceholder: 'Appointment time (multiple options available)',
        liveLabel: '{num} points',
        familyIdPlaceholder: 'Please enter the family ID',
        hostId: 'Please enter the anchor ID',
        hostName: 'Please enter a live nickname',
        statusPlaceholder: 'All states',
        searchButton: '@:global.searchButton'
      },
      actions: {
        export: '@:global.exportButton'
      },
      table: {
        id: 'Date + Anchor ID',
        familyId: 'Family ID',
        hostId: 'Anchor ID',
        hostName: 'Anchor nickname',
        live: '{num} points',
        remark: 'Remarks',
        createTime: 'Creation time',
        operation: '@:global.operationColumn',
        passButton: 'Pass',
        rejectButton: 'Reject'
      },
      addDialog: {
        title: 'Add anchor start time reservation',
        familyIdLabel: 'Family ID',
        familyIdPlaceholder: 'Please enter the family ID',
        hostIdLabel: 'Anchor ID',
        hostIdPlaceholder: 'Please enter the anchor ID',
        hostNameLabel: 'Anchor nickname',
        hostNamePlaceholder: 'Please enter an anchor nickname',
        statusLabel: '0=Pending 1=Reviewed 2=Rejected',
        statusPlaceholder: 'Please select dictionary generation',
        liveLabel: 'Live broadcast time',
        livePlaceholder: 'Please enter the live time',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmUpdateStatusFlag1Dialog: {
        title: '@:global.dialogTitle',
        message: 'Is the application for "{hostName}" confirmed?',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      confirmUpdateStatusFlag2Prompt: {
        title: '@:global.promptTitle',
        message: 'Please enter the reason for rejection',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton',
        inputErrorMessage: 'Reason for rejection cannot be empty'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: 'Confirm processing excel and download, there will be a delay when there is a large amount of data, please be patient...',
        confirmButton: '@:global.confirmButton',
        cancelButton: '@:global.cancelButton'
      },
      messageBox: {
        updateStatusFlag1Success: 'Audit approved',
        updateStatusFlag2Success: 'Successful rejection',
        updateStatusFlag2Cancel: 'Cancel input',
        updateLiveHostPreSuccess: 'Modified successfully',
        addLiveHostPreSuccess: 'Added successfully'
      }
    },
    liveHostWageNote: {
      queryForm: {
        dateDayPlaceholder: 'Select date',
        settlementRateLabel: 'Retail settlement rate',
        settlementRatePlaceholder: 'Please enter the retail settlement rate',
        familyIdPlaceholder: 'Family ID',
        familyNamePlaceholder: 'Family name',
        familyNickNamePlaceholder: 'Leader nickname',
        searchButton: '@:global.searchButton',
        resetButton: '@:global.resetButton'
      },
      actions: {
        export: '@:global.exportButton',
        familyShow: 'All anchors'
      },
      table: {
        familyId: 'Family ID',
        familyName: 'Family name',
        familyId0Name: 'Retailer',
        familyUserId: 'Leader ID',
        familyNickName: 'Leader nickname',
        livetime: 'Length of live broadcast',
        livetimejiesuan: 'Hourly billing',
        liwu: 'Gift amount',
        liwujiesuan: 'Gift settlement',
        lotteryCost: 'Lottery betting',
        costQianliu: 'Lottery settlement',
        times: 'Number of starts',
        totalsettle: 'Total settlement'
      },
      confirmExportDialog: {
        title: '@:global.dialogTitle',
        message: 'Confirm processing excel and download, there will be a delay when there is a large amount of data, please be patient...',
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        export: '@:common.exportButton'
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
        title: '@:common.titleDialog',
        message: '是否确认导出所有主播时长数据项?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        export: '@:common.exportButton'
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
        title: '@:common.titleDialog',
        message: '是否确认导出所有主播时长数据项?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      }
    },
    liveMount: {
      queryForm: {
        gvipLabel: 'VIP等级',
        gvipPlaceholder: 'VIP等级',
        nameLabel: '坐骑名',
        namePlaceholder: '请输入坐骑名',
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        add: '@:common.addButton',
        edit: '@:common.editButton',
        remove: '@:common.removeButton'
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
        operation: '@:common.operationColumn',
        editButton: '@:common.editButton',
        removeButton: '@:common.removeButton'
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2',
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
        title: '@:common.titleDialog',
        message: '是否确认删除礼物列编号为"{ids}"的数据项?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmStatusChangeDialog: {
        title: '@:common.titleDialog',
        message: '确认要{text}"{name}"吗?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        add: '@:common.addButton'
      },
      table: {
        msg: '互动信息',
        operation: '@:common.operationColumn',
        editButton: '@:common.editButton',
        removeButton: '@:common.removeButton'
      },
      addEditDialog: {
        titleAdd: '添加主播互动消息',
        titleEdit: '修改主播互动消息',
        msgLabel: '互动消息',
        msgPlaceholder: '请输入互动信息',
        confirmButton: '@:common.confirmButton2',
        validations: {
          id: 'id不能为空只能是数字',
          msg: '互动消息不能为空'
        }
      },
      confirmRemoveDialog: {
        title: '@:common.titleDialog',
        message: '是否确认删除消息为为"{msg}"的数据项?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        add: '@:common.addButton',
        edit: '@:common.editButton',
        remove: '@:common.removeButton'
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
        operation: '@:common.operationColumn',
        editButton: '@:common.editButton',
        removeButton: '@:common.removeButton'
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2'
      },
      confirmRemoveDialog: {
        title: '@:common.titleDialog',
        message: '是否确认删除礼物列编号为"{ids}"的数据项?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmStatusChangeDialog: {
        title: '@:common.titleDialog',
        message: '确认要{text}"{name}"吗?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        add: '@:common.addButton',
        export: '@:common.exportButton',
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
        operation: '@:common.operationColumn',
        kickOutButton: '踢出家族',
        auditButton: '审核',
        starBroadcastButton: '开播',
        endBroadcastButton: '关播',
        moreButton: '更多'
      },
      addDialog: {
        title: '添加虚拟主播',
        mobileLabel: '手机号',
        nickNameLabel: '昵称',
        headImageLabel: '用户头像',
        isAuthenticationLabel: '类型',
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2'
      },
      liveRoomAssistantDialog: {
        title: '直播间小助手',
        infoLabel: '小助手消息',
        infoPlaceholder: '请输入发送小助手消息',
        confirmButton: '@:common.confirmButton2'
      },
      liveBroadcastDialog: {
        title: '开播信息',
        titleLabel: '标题',
        flvLabel: '视频流地址',
        liveImageLabel: '开播背景',
        lotteryLabel: '彩票',
        confirmButton: '@:common.confirmButton2'
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2',
        validation: {
          vExplain: '认证说明不能为空',
          investorSendInfo: '拒绝理由不能为空'
        }
      }
    },
  },

  lotteryCount: {
    form: {
      puserIdLabel: 'Member Id',
      puserIdPlaceholder: 'Please enter the member ID',
      betInfoLabel: 'Betting content',
      betInfoPlaceholder: 'Enter Betting content',
      issueLabel: 'Number of phases',
      issuePlaceholder: 'Enter Number of phases',
      lotteryNamePlaceholder: 'Please select a lottery name',
      searchButton: '@:global.searchButton',
      resetButton: '@:global.resetButton',
    },
    tableColumns: {
      id: 'ID',
      lotteryName: 'Lottery Name',
      puserId: 'Member ID',
      issue: 'Number of phases',
      betInfo: 'Betting content',
      chip: 'Amount bet',
      ip: 'Bet IP',
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
      confirmDeleteDialog:{
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
    lotteryHistory:{
      form: {
        namePlaceholder: '请选择彩种',
        statusPlaceholder: '全部状态',
        issuePlaceholder: '请输入期数',
        addIssueButton: '补期'
      },
      tableColumns:{
        name: '彩票名称',
        issue: '期数',
        code: '开奖号码',
        ktime: '开奖时间',
        totalBet: '总投注',
        killRate: '杀率',
        totalPrize: '派奖',
        repaymentButton: '重新派奖',
      },
      dialogForm:{
        gameStartTimeLabel: '开始期数',
        startIssuePlaceholder: '请输入开始期数',
        gameEndTimeLabel: '结束期数',
        endIssuePlaceholder: '请输入结束期数',
        nameLabel: '彩票名称',
        namePlaceholder: '请选择彩种'
      },

      rulesMessage:{
        ktime: '开奖时间不能为空',
        name: '彩种不能为空',
        startIssue: '开始期数不能为空',
        endIssue: '结束期数不能为空',
      },
      status:{
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
    lotteryInfo:{
      form: {
        nameLabel: '彩种名称',
        namePlaceholder: '请输入彩种名称',
        statusLabel: '状态',
        statusPlaceholder: '请选择状态',
        typeLabel: '所属彩种类型',
        typePlaceholder: '请选择所属彩种类型',
      },
      tableColumns:{
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

      officialLabel:{
        official: '官方',
        selfOpeningDatabase: '自开(数据库)',
        selfOpeningProgram: '自开(程序)'
      },
      type:{
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
    lotteryMethod:{
      form:{
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
      lotteryType:{
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
    lotteryPrizeConfig:{
      form:{
        lotteryNamePlaceholder: '请选择彩种',
        newButton: '新增',
      },
      tableColumns:{
        lotteryId: '彩种ID',
        lotteryName: '彩种名称',
        lotteryKillrate: '杀率阀值',
        lotteryNokillratehour: '杀率禁用时间点',
        lotteryRandom: '随机开启不杀概率',
      },
      AddConfigDialogForm:{
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
      updateConfigDialogForm:{
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
      confirmDeleteDialog:{
        message: '是否确认删除开奖配置编号为"{lotteryIds}"的数据项?',
      },
      confirmExportDialog:{
        message: '确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...',
      }
    },

    //TODO: lotteryPrizepool    -> Luis
    lotteryPrizepool:{
      form:{
        lotteryIdLabel: '彩种编号',
        lotteryIdPlaceholder: '请输入彩种编号',
      },
      tableColumns:{
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
    lotteryRule:{
      form:{
        kindLabel: '所属彩种类型',
        kindPlaceholder: '请选择所属彩种类型',
        nameLabel: '彩票类型名称',
        namePlaceholder: '请输入彩票类型名称',
      },
      tableColumns:{
        kind: '所属彩种类型',
        name: '彩票类型名称',
        des: '开奖说明',
        ind: '排序号',
      },
      dialogForm:{
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
    lotteryTemp:{

    },

    //TODO: wheelHistory        -> Luis
    wheelHistory:{

    },

    //TODO: wheelLottery        -> Luis
    wheelLottery:{

    },

    //TODO: wheelPool           -> Luis
    wheelPool:{

    },

    //TODO: wheelPoolHistory    -> Luis
    wheelPoolHistory:{

    },

    //TODO: wheelPrize          -> Luis
    wheelPrize:{

    },

    //TODO: wheelSkin           -> Luis
    wheelSkin:{

    },

    //TODO: wheelSkinReceived   -> Luis
    wheelSkinReceived:{

    },


  }
}
