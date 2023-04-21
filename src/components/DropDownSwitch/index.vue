<template>

  <div>
    <el-dropdown>
      <span class="el-dropdown-link">通知<i class="el-icon-arrow-down el-icon--right"></i></span>
      <el-dropdown-menu>

        <el-dropdown-item>
          <label>线上充值信息</label>
          <el-switch v-model="switches.onlineRecharge"></el-switch>
        </el-dropdown-item>

        <el-dropdown-item>
          <label>会员提现信息</label>
          <el-switch v-model="switches.memberWithdrawal"></el-switch>
        </el-dropdown-item>

        <el-dropdown-item>
          <label>公司入款信息</label>
          <el-switch v-model="switches.companyDeposit"></el-switch>
        </el-dropdown-item>

        <el-dropdown-item>
          <label>USDT充值信息</label>
          <el-switch v-model="switches.usdtTopUp"></el-switch>
        </el-dropdown-item>

      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>
//AUDIOS
import onlineRecharge   from '@i/audio/online_deposit_zh.mp3';
import memberWithdrawal from '@i/audio/withdraw_zh.mp3';
import companyDeposit   from '@i/audio/company_deposit_zh.mp3';
import usdtDeposit      from '@i/audio/usdt_deposit_zh.mp3';

//ITEM COUNTER
import { listCount   as memberPayJourListCount }       from '@/api/platform-web/pay/memberPayJour';
import { getCountAll as memberWithdrawLogListCount }   from '@/api/platform-web/pay/memberWithdrawLog';
import { listCount   as memberRechargeLogListCount }   from '@/api/platform-web/pay/memberRechargeLog';
import { listCount   as payUsdtRechargeListCount }     from '@/api/platform-web/pay/payUsdtRecharge';

//ETC
import { getToken }                    from '@/utils/auth';
import { checkPermissions }            from "@/api/platform-web/system/login";
import { startInterval, killInterval } from "@/utils/scheduledTask";
import withdrawAudio                   from "@i/audio/withdraw_zh.mp3";

const key_onlineRecharge    = 'onlineRecharge';
const key_memberWithdrawal  = 'memberWithdrawal';
const key_companyDeposit    = 'companyDeposit';
const key_usdtDeposit       = 'usdtDeposit';
const IntervalMillis        = 5000;


export default {
  data() {
    return {
      switches: {
        onlineRecharge: true,
        memberWithdrawal: true,
        companyDeposit: true,
        usdtTopUp: true
      },
      totals: {
        memberPayJourListCount: 0,
        memberWithdrawLogListCount: 0,
        memberRechargeLogListCount: 0,
        payUsdtRechargeListCount: 0,
      },
      audios: {
        online_recharge:   new Audio ( onlineRecharge ),
        member_withdrawal: new Audio ( withdrawAudio ),
        company_deposit:   new Audio ( companyDeposit ),
        usdt_deposit:      new Audio ( usdtDeposit )
      },
      query: {
        selectDate: [ this.parseTime( this.getTodayStartTime() ), this.parseTime( this.getTodayEndTime() ) ]
      },
      reminderInterval: null
    };
  },
  mounted() {
    checkPermissions( 'pay:memberPayJour:list','pay:memberWithdrawLog:list','pay:memberRechargeLog:list','admin:payUsdtRecharge:list' )
      .then( hasPermissions => {
        if(!hasPermissions) {
          return;
        }

        let storedNotifyOnlineRecharge   = localStorage.getItem( key_onlineRecharge );
        let storedNotifyMemberWithdrawal = localStorage.getItem( key_memberWithdrawal );
        let storedNotifyCompanyDeposit   = localStorage.getItem( key_companyDeposit );
        let storedNotifyUsdtTopUp        = localStorage.getItem( key_usdtDeposit );

        if ( storedNotifyOnlineRecharge !== null ){
          this.switches.onlineRecharge = storedNotifyOnlineRecharge === "true";
        }

        if ( storedNotifyMemberWithdrawal !== null ){
          this.switches.memberWithdrawal = storedNotifyMemberWithdrawal === "true";
        }

        if ( storedNotifyCompanyDeposit !== null ){
          this.switches.companyDeposit = storedNotifyCompanyDeposit === "true";
        }

        if ( storedNotifyUsdtTopUp !== null ){
          this.switches.usdtTopUp = storedNotifyUsdtTopUp === "true";
        }

        memberPayJourListCount( this.query ).then( res => {
          this.totals.memberPayJourListCount = res.total;
        });
        memberWithdrawLogListCount().then(res => {
          this.totals.memberWithdrawLogListCount = res.data;
        }).then(this.scheduleReminder);
        memberRechargeLogListCount( this.query ).then( res => {
          this.totals.memberRechargeLogListCount = res.total;
        });
        payUsdtRechargeListCount( this.query ).then( res => {
          this.totals.payUsdtRechargeListCount = res.total;
        });

        this.scheduleReminder();
      } );
  },
  methods: {
    scheduleReminder() {
      localStorage.setItem( key_onlineRecharge,   this.switches.onlineRecharge.toString() );
      localStorage.setItem( key_memberWithdrawal, this.switches.memberWithdrawal.toString() );
      localStorage.setItem( key_companyDeposit,   this.switches.companyDeposit.toString() );
      localStorage.setItem( key_usdtDeposit,      this.switches.usdtTopUp.toString() );

      if ( this.switches.onlineRecharge ) {
        this.reminderInterval = startInterval(() => {
          if( !getToken()  ) {
            return;
          }
          memberPayJourListCount( this.query ).then( res => {
              if( res.total > this.totals.memberPayJourListCount ) {
                this.totals.memberPayJourListCount = res.total;
                this.audios.online_recharge.play();
              }
            }
          );
        }, IntervalMillis );
      } else {
        killInterval( this.reminderInterval );
      }

      if ( this.switches.memberWithdrawal ) {
        this.reminderInterval = startInterval(() => {
          if( !getToken()  ) {
            return;
          }
          memberPayJourListCount( this.query ).then( res => {
              if( res.data > this.totals.memberWithdrawLogListCount ) {
                this.totals.memberWithdrawLogListCount = res.data;
                this.audios.member_withdrawal.play();
              }
            }
          );
        }, IntervalMillis );
      } else {
        killInterval( this.reminderInterval );
      }

      if ( this.switches.companyDeposit ) {
        this.reminderInterval = startInterval(() => {
          if( !getToken()  ) {
            return;
          }
          memberPayJourListCount( this.query ).then( res => {
              if( res.data > this.totals.memberRechargeLogListCount ) {
                this.totals.memberRechargeLogListCount = res.data;
                this.audios.company_deposit.play();
              }
            }
          );
        }, IntervalMillis );
      } else {
        killInterval( this.reminderInterval );
      }

      if ( this.switches.usdtTopUp ) {
        this.reminderInterval = startInterval(() => {
          if( !getToken()  ) {
            return;
          }
          memberPayJourListCount( this.query ).then( res => {
              if( res.data > this.totals.payUsdtRechargeListCount ) {
                this.totals.payUsdtRechargeListCount = res.data;
                this.audios.usdt_deposit.play();
              }
            }
          );
        }, IntervalMillis );
      } else {
        killInterval( this.reminderInterval );
      }
    }
  }
}
</script>

<style scoped>

</style>
