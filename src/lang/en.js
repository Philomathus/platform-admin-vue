export default {


  global:{
    export: 'Export',
    cancelButton: 'Cancel',
    confirmButton: 'Confirm',
    refresh: 'refresh',
    close: 'close',
    searchButton: 'Search',
    resetButton: 'Reset',
    addButton: 'Add',
    editButton: 'Edit',
    deleteButton: 'Delete',
    exportButton: 'Export',
    submitButton: 'Submit',
    operation: 'Operation',
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
    titleDialog: 'Warning',
    titlePrompt: 'Tips',
    name: 'Name',
    nickname: 'Nickname',
    status: 'Status',
    ctTime: 'Release Time'
  },

  globalPlaceholder: {
    statusPlaceholder: 'Please select status',
    userNamePlaceholder: 'Please enter UserName',
    selectDateStartPlaceholder: 'Start Time',
    selectDateEndPlaceholder: 'End Time',
    namePlaceholder:'please enter name'
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
          search: 'Search',
          reset: 'Reset',
          new: 'New',
          exp: 'Export',
          ip: 'View blocked IP',
          bBlock: 'Batch blocking',
          more: 'More',
          sDepo: 'Safe deposit box balance raised',
          det: 'Determine',
          cancel: 'Cancel',
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        exportButton: '@:common.exportButton'
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
        confirmButton: '@:common.confirmButton',
        cancelButton: '@:common.cancelButton'
      }
    },
    chat: {
      queryForm: {
        fromPlatformPlaceholder: 'Member ID',
        userNicknamePlaceholder: 'Member nickname',
        poscatIdPlaceholder: 'Anchor ID',
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
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
        operation: '@:common.operationColumn',
        muteButton: 'Block',
        unmuteButton: 'Unblock',
        forbidButton: 'Ban'
      },
      confirmUpdateDialog: {
        title: 'Warning',
        message: 'Sure you want {fromPlatform} unblocked?',
        confirmButton: '@:common.confirmButton',
        cancelButton: '@:common.cancelButton'
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
          searchButton: '@:common.searchButton'
        },
        table: {
          userId: 'Member ID',
          userIp: 'Member IP',
          msg: 'Blocking remarks',
          createTime: 'Closing time',
          operation: '@:common.operationColumn',
          unblockButton: 'Unblock'
        },
        confirmUpdateDialog: {
          title: 'Warning',
          message: 'Sure you want {userId} unblocked?',
          confirmButton: '@:common.confirmButton',
          cancelButton: '@:common.cancelButton'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
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
        operation: '@:common.operationColumn',
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2',
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
        title: '@:common.titleDialog',
        message: 'Is it confirmed that the data item with the family name "{name}" is rejected?',
        confirmButton: '@:common:confirmButton1',
        cancelButton: '@:common:cancelButton1'
      },
      confirmUpdateFlag1Dialog: {
        title: '@:common.titleDialog',
        message: 'Is it confirmed that the data item with the family name "{name}" is approved?',
        confirmButton: '@:common:confirmButton1',
        cancelButton: '@:common:cancelButton1'
      },
      confirmUpdateFlag2Prompt: {
        title: '@:common.titlePrompt',
        message: 'Please enter the reason for blocking',
        confirmButton: '@:common:confirmButton1',
        cancelButton: '@:common:cancelButton1',
        inputErrorMessage: 'The reason for blocking cannot be empty'
      },
      confirmUpdateFlag3Prompt: {
        title: '@:common.titlePrompt',
        message: 'Please enter the reason for unblocking',
        confirmButton: '@:common:confirmButton1',
        cancelButton: '@:common:cancelButton1',
        inputErrorMessage: 'Reason for unblock cannot be empty'
      },
      confirmRemoveDialog: {
        title: '@:common.titleDialog',
        message: 'Is it confirmed that the "{name}" family is disbanded?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmExportDialog: {
        title: '@:common.titleDialog',
        message: 'Is it confirmed that all family data items are exported?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        add: '@:common.addButton',
        edit: '@:common.editButton',
        remove: '@:common.removeButton'
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
        operation: '@:common.operation',
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2'
      },
      confirmRemoveDialog: {
        title: '@:common.titleDialog',
        message: 'Is it confirmed that the data item with the number "{ids}" is deleted?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmExportDialog: {
        title: '@:common.titleDialog',
        message: 'Is it confirmed that all data items are exported?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        add: '@:common.addButton',
        edit: '@:common.editButton',
        remove: '@:common.removeButton'
      },
      table: {
        name: 'Plugin name',
        status0: 'Disabled',
        status1: 'Enabled',
        conUrl: 'Address',
        iconUrl: 'Icon',
        operation: '@:common.operation',
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2'
      },
      editDialog: {
        title: 'Modify h5 plugin',
        nameLabel: 'Plugin name',
        namePlaceholder: 'Please enter a name',
        conUrlLabel: 'Content address',
        conUrlPlaceholder: 'Please enter the content address',
        iconUrlLabel: 'Icon address',
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2'
      },
      confirmRemoveDialog: {
        title: '@:common.titleDialog',
        message: 'Is it confirmed that the data item with the h5 plugin number "{ids}" is deleted?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmStatusChangeDialog: {
        title: '@:common.titleDialog',
        message: 'Confirm you want {text} "{name}"?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmExportDialog: {
        title: '@:common.titleDialog',
        message: 'Confirm processing excel and download, there will be a delay when there is a large amount of data, please be patient...',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      table: {
        blackUserId: 'Member ID',
        nickName: 'Member nickname',
        hostId: 'Anchor ID',
        hostName: 'Anchor nickname',
        remark: 'Blocking remarks',
        createTime: 'Closing time',
        operation: '@:common.operationColumn',
        removeButton: 'Remove blacklist ban'
      },
      messageBox: {
        memberIdFormatError: 'Member IDs can only be entered as numbers and underscores',
        removeSuccess: 'Removed successfully'
      },
      confirmRemoveDialog: {
        title: '@:common.titleDialog',
        message: 'Do you want to confirm the deletion of the data item with the number "{ids}"?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        export: '@:common.exportButton'
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
        operation: '@:common.operationColumn',
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2'
      },
      confirmEditConfirmationPrompt: {
        title: '@:common.titlePrompt',
        message: 'Please enter a note for review',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmExportDialog: {
        title: '@:common.titleDialog',
        message: 'Confirm processing excel and download, there will be a delay when there is a large amount of data, please be patient...',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton'
      },
      actions: {
        export: '@:common.exportButton'
      },
      table: {
        id: 'Date + Anchor ID',
        familyId: 'Family ID',
        hostId: 'Anchor ID',
        hostName: 'Anchor nickname',
        live: '{num} points',
        remark: 'Remarks',
        createTime: 'Creation time',
        operation: '@:common.operationColumn',
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
        confirmButton: '@:common.confirmButton2',
        cancelButton: '@:common.cancelButton2'
      },
      confirmUpdateStatusFlag1Dialog: {
        title: '@:common.titleDialog',
        message: 'Is the application for "{hostName}" confirmed?',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      },
      confirmUpdateStatusFlag2Prompt: {
        title: '@:common.titlePrompt',
        message: 'Please enter the reason for rejection',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1',
        inputErrorMessage: 'Reason for rejection cannot be empty'
      },
      confirmExportDialog: {
        title: '@:common.titleDialog',
        message: 'Confirm processing excel and download, there will be a delay when there is a large amount of data, please be patient...',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
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
        searchButton: '@:common.searchButton',
        resetButton: '@:common.resetButton'
      },
      actions: {
        export: '@:common.exportButton',
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
        title: '@:common.titleDialog',
        message: 'Confirm processing excel and download, there will be a delay when there is a large amount of data, please be patient...',
        confirmButton: '@:common.confirmButton1',
        cancelButton: '@:common.cancelButton1'
      }
    }
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
      searchButton: '@:common.searchButton',
      resetButton: '@:common.resetButton',
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
}
