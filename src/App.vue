<template>
  <div id="app">
    <div class="header">
      <div class="header-avatar">
        <img>
      </div>
      <ul class="user">
        <li class="user-base">
          {{payData.nickName}}
          <span class="user-age">
            <i :class="{'user-sex': true, 'user-sex--male': payData.sex === 'male', 'user-sex--female': payData.sex === 'female' }"></i>21</span>
        </li>
        <li class="user-order">
          <span>￥{{payData.price}}元/半小时×{{payData.count}}</span>
          <span class="user-amount">￥{{payData.total}}</span>
        </li>
      </ul>
    </div>
    <div class="main">
      <h1 class="main-title">
        支付方式
      </h1>
      <ul class="pay">
        <li :class="{'pay-item':true, 'pay-item--active':selectIndex === index}" v-for="(pay,index) in pay_type" :key="pay.key" @click="select(index)">
          <img class="pay-icon" :src="pay.iconUrl"> {{pay.value}}
          <span v-if="pay.key==='overage' " class="pay-overage ">({{payData.overage}}元)
          </span>
        </li>
      </ul>
    </div>
    <div class="footer ">
      <button class="btn-pay " @click="payment ">支付{{payData.total}}元</button>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
import icon_wechat from "./assets/img/icon_wechat.png";
import icon_alipay from "./assets/img/icon_alipay.png";
import icon_money from "./assets/img/icon_money.png";

export default {
  name: "app",
  components: {
    Indicator,
    Toast
  },
  data() {
    return {
      selectIndex: 0,
      pay_type: [
        { key: "wechat", value: "微信", iconUrl: icon_wechat },
        { key: "alipay", value: "支付宝", iconUrl: icon_alipay },
        { key: "overage", value: "余额", iconUrl: icon_money }
      ],

      payData: {
        nickName: "米米酱",
        sex: "male",
        total: "80.0",
        count: 2,
        price: "40.0",
        overage: "1.00"
      }
    };
  },

  methods: {
    select(index) {
      this.selectIndex = index;
    },
    payment() {
      Indicator.open({
        text: "支付中，请稍候...",
        spinnerType: "triple-bounce"
      });

      setTimeout(() => {
        Indicator.close();

        Toast({
          message: "支付成功",
          iconClass: "icon icon-success"
        });
      }, 5000);
      // 生成订单号
    }
  }
};
</script>

<style lang="scss">
html,
body,
ul,
h1 {
  margin: 0;
  padding: 0;
}

html {
  font-size: 10px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgba(242, 242, 242, 1);
}

.header {
  display: flex;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 12rem;
  align-items: center;
  background-color: #fff;
  &-avatar {
    margin-right: 1rem;
    width: 9rem;
    height: 9rem;
    border-radius: 4.58rem;
    background-color: #f2f2f2;
  }
  .user {
    flex:1;
    list-style: none;
    &-base {
      height: 3.75rem;
      line-height: 3.17rem;
      font-size: 2.5rem;
      font-family: SFUIText-Medium;
      color: rgba(51, 51, 51, 1);
    }
    &-age {
      padding: 0.1rem 1rem;
      vertical-align: top;
      background-color: rgba(255, 154, 180, 1);
      border-radius: 1rem;
      color: #fff;
      font-size: 1.5rem;
      font-family: SFUIText-Medium;
    }
    &-sex {
      display: inline-block;
      width: 1.7rem;
      height: 2rem;
      background: transparent no-repeat center left;

      &--male {
        background-image: url(./assets/img/icon_boy.png);
      }
      &--female {
        background-image: url(./assets/img/icon_girl.png);
      }
    }
    &-order {
      display: flex;
      height: 3.33rem;
      line-height: 3.33rem;
      justify-content: space-between;
      font-size: 2rem;
      font-family: PingFangSC-Regular;
      color: rgba(153, 153, 153, 1);
    }
    &-amount {
      font-size: 3rem;
      font-family: SFUIText-Regular;
      color: rgba(255, 72, 72, 1);
    }
  }
}

.main {
  margin-top: 2rem;
  margin-bottom: 3rem;
  background-color: #fff;
  &-title {
    padding: 1rem 0 1rem 2rem;
    height: 3.33rem;
    font: normal 2.33rem SFUIText-Regular;
    color: rgba(153, 153, 153, 1);
  }
}

.pay {
  font-size: 2.67rem;
  font-family: PingFangSC-Regular;
  color: rgba(51, 51, 51, 1);
  &-item {
    padding: 1rem 2rem;
    &:not(:first-child) {
      border-top: 0.08rem solid rgba(234, 234, 234, 1);
    }
    &--active {
      background: transparent url(./assets/img/icon_choise.png) no-repeat center
        right;
      background-origin: content-box;
    }
  }
  &-icon {
    vertical-align: middle;
  }

  &-overage {
    margin-left: 1rem;
  }
}

.footer {
  height: 9rem;
  line-height: 9rem;
  background-color: rgba(255, 255, 255, 1);
  text-align: center;

  .btn-pay {
    width: 50%;
    min-width: 20rem;
    height: 5rem;
    background: linear-gradient(
      -90deg,
      rgba(158, 35, 77, 1),
      rgba(81, 33, 73, 1)
    );
    border-radius: 1rem;
    font-size: 3rem;
    font-family: PingFangSC-Medium;
    color: rgba(255, 255, 255, 1);
    vertical-align: middle;
    outline: none;
    border: none;
  }
}
</style>
