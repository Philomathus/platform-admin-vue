<template>

  <div>
    <el-dropdown @click.native.stop>
      <span class="el-dropdown-link">通知<i class="el-icon-arrow-down el-icon--right"></i></span>
      <el-dropdown-menu>

        <el-dropdown-item v-if="this.onlineRecharge.hasPermission">
          <div class = "switch-container">
            <span class="switch-label">线上充值信息</span>
            <el-switch @click.native.stop v-model="onlineRecharge.switchValue"
                       @change="scheduleReminder(onlineRecharge)"></el-switch>
          </div>
        </el-dropdown-item>

        <el-dropdown-item v-if="this.memberWithdrawal.hasPermission">
          <div class = "switch-container">
            <span class="switch-label">会员提现信息</span>
           <el-switch @click.native.stop v-model="memberWithdrawal.switchValue"
                      @change="scheduleReminder(memberWithdrawal)"></el-switch>
          </div>
        </el-dropdown-item>

        <el-dropdown-item v-if="this.companyDeposit.hasPermission">
          <div class = "switch-container">
            <span class="switch-label">公司入款信息</span>
           <el-switch @click.native.stop v-model="companyDeposit.switchValue"
                      @change="scheduleReminder(companyDeposit)"></el-switch>
          </div>
        </el-dropdown-item>

        <el-dropdown-item v-if="this.usdtTopUp.hasPermission">
          <div class = "switch-container">
           <span class="switch-label" style="margin-right: 5px">USDT充值信息</span>
           <el-switch @click.native.stop v-model="usdtTopUp.switchValue"
                      @change="scheduleReminder(usdtTopUp)"></el-switch>
          </div>
        </el-dropdown-item>

      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>
//COUNTER
import { listCount   as memberPayJourListCount     } from '@/api/platform-web/pay/memberPayJour';
import { getCountAll as memberWithdrawLogListCount } from '@/api/platform-web/pay/memberWithdrawLog';
import { listCount   as memberRechargeLogListCount } from '@/api/platform-web/pay/memberRechargeLog';
import { listCount   as payUsdtRechargeListCount   } from '@/api/platform-web/pay/payUsdtRecharge';

//CACHING & LOOP
import { startInterval, killInterval } from "@/utils/scheduledTask";
import { checkPath                   } from "@/api/platform-web/system/login";
import { getToken                    } from '@/utils/auth';

//AUDIOS
import onlineRecharge   from '@i/audio/online_deposit_zh.mp3';
import memberWithdrawal from '@i/audio/withdraw_zh.mp3';
import companyDeposit   from '@i/audio/company_deposit_zh.mp3';
import usdtDeposit      from '@i/audio/usdt_deposit_zh.mp3';

//PATH
const path_onlineRecharge   = 'memberPayJour';
const path_memberWithdrawal = 'memberWithdrawLog';
const path_companyDeposit   = 'memberRechargeLog';
const path_usdtDeposit      = 'payUsdtRecharge';

//STORAGE KEY
const key_onlineRecharge    = 'onlineRecharge';
const key_memberWithdrawal  = 'memberWithdrawal';
const key_companyDeposit    = 'companyDeposit';
const key_usdtDeposit       = 'usdtTopUp';


class NotificationType {
  constructor(ringtone, countMethod, path, storageKey, hasPermission,  switchValue,interval, totalCount ) {
    this.ringtone      = ringtone;
    this.countMethod   = countMethod;
    this.path          = path;
    this.storageKey    = storageKey;
    this.switchValue   = switchValue;
    this.hasPermission = hasPermission;
    this.totalCount    = totalCount;
    this.interval      = interval;
  }
}
const IntervalMillis = 5000;
export default {
  data() {
    return {
      onlineRecharge: new NotificationType(
        new Audio (onlineRecharge),
        memberPayJourListCount,
        path_onlineRecharge,
        key_onlineRecharge,
        true,
        true,
        null,
        0
      ),
      memberWithdrawal: new NotificationType(
        new Audio (memberWithdrawal),
        memberWithdrawLogListCount,
        path_memberWithdrawal,
        key_memberWithdrawal,
        true,
        true,
        null,
        0
      ),
      companyDeposit: new NotificationType(
        new Audio (companyDeposit),
        memberRechargeLogListCount,
        path_companyDeposit,
        key_companyDeposit,
        true,
        true,
        null,
        0
      ),
      usdtTopUp: new NotificationType(
        new Audio (usdtDeposit),
        payUsdtRechargeListCount,
        path_usdtDeposit,
        key_usdtDeposit,
        true,
        true,
        null,
        0
      ),
      query: {
        selectDate: [ this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime()) ]
      },
    };
  },
  mounted() {
    this.getCurrentCount( this.onlineRecharge, this.memberWithdrawal, this.companyDeposit, this.usdtTopUp);
  },
  methods: {
    getCurrentCount(...types) {
      for ( let type of types){
        checkPath(type.path).then(hasPermission => {
          if (!hasPermission) {
            type.hasPermission = false;
            return;
          }
          if (!type.switchValue) {
            return;
          }
          let storedSwitchValue = localStorage.getItem(type.storageKey)
          if (storedSwitchValue !== null){
            type.switchValue = storedSwitchValue === "true";
          }
          type.countMethod(this.query).then(res => {
            type.totalCount = type !== this.memberWithdrawal ? res.total : res.data;
          });
          this.scheduleReminder(type);
        });
      }
    },

    scheduleReminder(type) {
      localStorage.setItem(type.storageKey, type.switchValue);
      if (type.switchValue) {
        type.interval = startInterval(() => {
          if(!getToken()) {
            return;
          }
          type.countMethod(this.query).then(res => {
            let total = type !== this.memberWithdrawal ? res.total : res.data;
              if(total > type.totalCount) {
                type.totalCount = total;
                type.ringtone.play();
              }
            }
          );

        }, IntervalMillis);
      } else {
        killInterval(type.interval);
      }
    }
  }
}
</script>

<style scoped>
.switch-label {
  display: inline-block;
  vertical-align: middle;
  flex-grow: 1;
  margin-right: 5px;

}
.switch-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
