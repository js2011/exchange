<template>
	<div class="wrap-head">
		<div class="head-box">
			<div class="jx">
				<div class="arrow"></div>
			</div>
			<span class="modify"><i class="iconfont icon-bianjibijishishouxie"></i></span>
			<div class="head-img">
				<img src="../../../assets/img/head.png">
				<p class="username">{{user.phone || 'Admin'}}<span class="vip-box">年度会员</span></p>
				<p class="userdetail">简介：对方很懒什么都没留下</p>
			</div>
		</div>
		<div class="other">
			<!-- <mt-cell class="other-cell" title="给App评论" is-link value=""></mt-cell> -->
			<mt-cell class="other-cell" title="意见反馈" is-link @click.native="feedback" value=""></mt-cell>
			<mt-cell class="other-cell" title="版本号" is-link @click.native="copyRight" value=""></mt-cell>
		</div>
		<div class="exit" @click="exit">{{user.phone ? '退出登录' : '登录'}}</div>
	</div>
</template>

<script>
import crossEvent from "@mfelibs/universal-framework/src/libs/apis/crossEvent";
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    exit: function() {
      let vm = this;
      if (this.user && this.user.phone) {
        this.$snc.setGlobalStorage({
          user: {}
        });
        crossEvent.trigger("exchange.logout", {
          data: {},
          success(res) {
            vm.$snc.pageReload();
          }
        });
      } else {
        this.$snc.URLNavigateTo({
          id: "sign-up",
          actionType: 99,
          title: "登录"
        });
      }
    },
    copyRight: function() {
      var that = this;
      that.$messagebox("版本号", "V1.0.1版本");
    },
    feedback() {
      this.$snc.URLNavigateTo({id: 'feedback', action: 'hybrid', title: '意见反馈'});
    }
  },
  created() {
    let vm = this;
    vm.$snc.on("ready", data => {
      try {
        vm.user = data.data.user || {};
      } catch (error) {
        vm.user = {};
      }
    });
    crossEvent.on("exchange.login", data => {
      vm.$snc.pageReload();
    });
  },
  mounted: function() {},
  watch: {}
};
</script>

<style>
.head-box {
  position: relative;
  background: #fff;
  padding-bottom: 0.533333rem;
  box-shadow: 0 3px 5px 5px rgba(252, 197, 16, 0.1);
  z-index: 5;
  text-align: left;
}
.jx {
  width: 100%;
  height: 2rem;
  padding-top: 2.333333rem;
  background: -webkit-linear-gradient(left, #fcba13, #fce604);
  background: -o-linear-gradient(left, #fcba13, #fce604);
  background: linear-gradient(to right, #fcba13, #fce604);
}
.arrow {
  width: 0px;
  height: 0px;
  border-bottom: 2.013333rem solid #fff;
  border-right: 10rem solid transparent;
}
.head-img {
  margin-top: -2.666667rem;
}
.modify {
  display: block;
  width: 1.333333rem;
  height: 1.333333rem;
  position: absolute;
  top: 3.2rem;
  right: 1.2rem;
  background: #34353a;
  color: #fff;
  text-align: center;
  line-height: 1.333333rem;
  border-radius: 50%;
}
.modify i {
  font-size: 0.9rem;
}
.vip-box {
  background: #72d3fd;
  padding: 0.066667rem 0.206667rem;
  margin-left: 0.333333rem;
  font-size: 0.373333rem;
  color: #fff;
  border-radius: 0.066667rem;
}

.head-box img {
  width: 2.4rem;
  height: 2.4rem;
  margin-left: 0.906667rem;
  border-radius: 50%;
  overflow: hidden;
}

.username {
  font-size: 0.48rem;
  color: #000;
  margin-top: 0.4rem;
  margin-left: 1.6rem;
}

.userdetail {
  margin-top: 1.066667rem;
  margin-left: 1.6rem;
  padding-right: 1rem;
  color: #8f8f8f;
  line-height: 0.68rem;
  font-size: 0.373333rem;
}

.other {
  background: #fff;
  text-align: left;
}

.other-cell {
  padding: 0.3rem 0.4rem;
  border-bottom: #eee solid 1px;
}

.other-cell:last-child {
  border-bottom: none;
}

.other .mint-cell:last-child {
  background-size: 100% 0;
}

.other .mint-cell-wrapper {
  background-size: 120% 0px;
}

.exit {
  height: 1.36rem;
  margin-top: 0.64rem;
  /*margin-bottom: 0.64rem;*/
  background: #fff;
  font-size: 0.373333rem;
  color: #ff4d51;
  line-height: 1.36rem;
}
</style>
