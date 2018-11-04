<template>
  <div class="wrap-login-box">
    <img class="logo" src="../../../assets/img/logo.png">
    <div class="login-box">
      <div class="input-box">
        <input type="number" placeholder="请输入手机号码" v-model="phone">
      </div>
      <div class="input-box">
        <input type="number" placeholder="请输入验证码" v-model="code">
        <span class="send-code" @click="senCode">{{coded ? '剩余(' + time + ')秒' : codeText}}</span>
      </div>
      <div class="login-btn" @click="Login">立即登录</div>
    </div>
  </div>
</template>

<script>
import crossEvent from  "@mfelibs/universal-framework/src/libs/apis/crossEvent";
export default {
  data() {
    return {
      time: 120,
      phone: "",
      code: "",
      coded: false,
      codeText: "发送验证码"
    };
  },
  methods: {
    senCode() {
      var that = this;
      if (that.coded) return;
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (that.phone === "") {
        that.$toast("请输入手机号码");
        return false;
      } else if (!myreg.test(that.phone)) {
        that.$toast("请输入有效的手机号码");
        return false;
      }
      that.$snc.fetch({
        url: "http://res.txingdai.com/account/code",
        method: "GET",
        data: {
          phone: that.phone,
          develop: false
        },
        success(res) {
          if (res.code === 10200) {
            that.coded = true;
            that.$messagebox("提示", "验证码已发送到手机");
            let timer = setInterval(() => {
              that.time--;
              if (that.time === 0) {
                clearInterval(timer);
                that.coded = false;
                that.time = 120;
              }
            }, 1000);
          } else {
            that.coded = false;
          }
        }
      });
      // that.$messagebox("提示", "验证码已发送到手机");
    },
    Login() {
      var that = this;
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (that.phone === "") {
        that.$toast("请输入手机号码");
        return false;
      } else if (!myreg.test(that.phone)) {
        that.$toast("请输入有效的手机号码");
        return false;
      }
      if (that.code === "") {
        that.$toast("请输入验证码");
        return false;
      }
      that.$snc.fetch({
        url: "http://res.txingdai.com/account/login",
        method: "POST",
        data: {
          phone: that.phone,
          code: that.code
        },
        success(res) {
          if (res.code === 10200) {
            that.$snc.setGlobalStorage({
              user: { phone: that.phone }
            });
            crossEvent.trigger("exchange.login", {
              data: {},
              success(res) {
                that.$snc.URLNavigateTo({
                  id: "exchange",
                  actionType: 100,
                  title: "汇率计算"
                });
              }
            });
          }
        }
      });
    }
  },
  mounted: function() {}
};
</script>

<style>
.wrap-login-box {
  width: 10rem;
  background: #f3f4f4 url(../../../assets/img/loginback.jpg) no-repeat top center;
  background-size: 100%;
}
.logo {
  width: 3.133333rem;
  height: 3.133333rem;
  margin-top: 1.44rem;
}
.login-box {
  margin: 0.8rem 0.4rem;
  padding: 0.986667rem 0.453333rem 0.586667rem 0.453333rem;
  background: #fff;
  border-radius: 0.24rem;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
}
.input-box {
  position: relative;
  height: 1.36rem;
  margin-bottom: 0.4rem;
  padding-left: 0.4rem;
  border-radius: 0.68rem;
  background: #f5f5f5;
  overflow: hidden;
}
.input-box input {
  display: block;
  width: 100%;
  padding: 0.4rem 0;
  font-size: 0.4rem;
  background: transparent;
}
.send-code {
  display: block;
  height: 1rem;
  padding-left: 0.48rem;
  margin-top: 0.18rem;
  position: absolute;
  right: 0.633333rem;
  top: 0;
  border-left: #fcbb12 solid 1px;
  font-size: 0.4rem;
  line-height: 1rem;
  color: #fcbb12;
}
.login-btn {
  height: 1.36rem;
  margin-top: 1.066667rem;
  border-radius: 0.68rem;
  background: linear-gradient(to right, #fcba13, #fce604);
  font-size: 0.533333rem;
  color: #fff;
  line-height: 1.36rem;
}
</style>
