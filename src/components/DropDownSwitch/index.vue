<template>

  <div>
    <el-dropdown @click.native.stop>
      <span class="el-dropdown-link">通知<i class="el-icon-arrow-down el-icon--right"></i></span>
      <el-dropdown-menu>

        <el-dropdown-item>
          <div class = "switch-container">
            <span class="switch-label">线上充值信息</span>
            <el-switch @click.native.stop v-model="onlineRecharge.switchValue"
                       @change="scheduleReminder(onlineRecharge)"></el-switch>
          </div>
        </el-dropdown-item>

        <el-dropdown-item>
          <div class = "switch-container">
            <span class="switch-label">会员提现信息</span>
           <el-switch @click.native.stop v-model="memberWithdrawal.switchValue"
                      @change="scheduleReminder(memberWithdrawal)"></el-switch>
          </div>
        </el-dropdown-item>

        <el-dropdown-item>
          <div class = "switch-container">
            <span class="switch-label">公司入款信息</span>
           <el-switch @click.native.stop v-model="companyDeposit.switchValue"
                      @change="scheduleReminder(companyDeposit)"></el-switch>
          </div>
        </el-dropdown-item>

        <el-dropdown-item>
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
//AUDIOS
import onlineRecharge   from '@i/audio/online_deposit_zh.mp3';
import memberWithdrawal from '@i/audio/withdraw_zh.mp3';
import companyDeposit   from '@i/audio/company_deposit_zh.mp3';
import usdtDeposit      from '@i/audio/usdt_deposit_zh.mp3';

//COUNTER
import { listCount   as memberPayJourListCount     } from '@/api/platform-web/pay/memberPayJour';
import { getCountAll as memberWithdrawLogListCount } from '@/api/platform-web/pay/memberWithdrawLog';
import { listCount   as memberRechargeLogListCount } from '@/api/platform-web/pay/memberRechargeLog';
import { listCount   as payUsdtRechargeListCount   } from '@/api/platform-web/pay/payUsdtRecharge';

//CACHING & LOOP
import { getToken                    } from '@/utils/auth';
import { checkPermissions            } from "@/api/platform-web/system/login";
import { startInterval, killInterval } from "@/utils/scheduledTask";

class NotificationType {
  constructor(countMethod, ringtone, permission, storageKey, switchValue, totalCount, interval) {
    this.countMethod = countMethod;
    this.ringtone    = ringtone;
    this.permission  = permission;
    this.storageKey  = storageKey;
    this.switchValue = switchValue;
    this.totalCount  = totalCount;
    this.interval    = interval;
  }
}

const IntervalMillis = 5000;

export default {
  data() {
    return {
      onlineRecharge: new NotificationType(
        memberPayJourListCount,
        new Audio (onlineRecharge),
        'pay:memberPayJour:list',
        'key_onlineRecharge',
        true,
        0,
        null
      ),
      memberWithdrawal: new NotificationType(
        memberWithdrawLogListCount,
        new Audio (memberWithdrawal),
        'pay:memberWithdrawLog:list',
        'key_memberWithdrawal',
        true,
        0,
        null
      ),
      companyDeposit: new NotificationType(
        memberRechargeLogListCount,
        new Audio (companyDeposit),
        'pay:memberRechargeLog:list',
        'key_companyDeposit',
        true,
        0,
        null

      ),
      usdtTopUp: new NotificationType(
        payUsdtRechargeListCount,
        new Audio (usdtDeposit),
        'admin:payUsdtRecharge:list',
        'key_usdtTopUp',
        true,
        0,
        null
      ),
      query: {
        selectDate: [ this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime()) ]
      },
    };
  },
  mounted() {
    this.getCurrentCount( this.onlineRecharge   );
    this.getCurrentCount( this.memberWithdrawal );
    this.getCurrentCount( this.companyDeposit   );
    this.getCurrentCount( this.usdtTopUp        );
  },
  methods: {
    getCurrentCount(type) {
      checkPermissions(type.permission).then(hasPermission => {
        if (!hasPermission) {
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
    },

    scheduleReminder(type) {
      localStorage.setItem(type.storageKey, type.switchValue)
      if (type.switchValue) {
        type.interval = startInterval(() => {
          if(!getToken()) {
            return;
          }
          type.countMethod(this.query).then(res => {
              let total = type !== this.memberWithdrawal ? res.total : res.data;
              total += type.totalCount + 1;
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

}
.switch-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
