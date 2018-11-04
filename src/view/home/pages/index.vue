<template>
  <div class="index-back">
    <ul class="list">
      <li class="list-pub">
        <div class="main-box">
            <div class="main-text">
              <p class="section">{{state.rataData[0].en}}</p>
              <p class="teacher">{{state.rataData[0].zh}}</p>
            </div>
            <input type="number" v-model="state.rataData[0].value"  placeholder="0.00" :id="state.rataData[0].id" @input="changeCell(state.rataData[0])">
          </div>
      </li>
      <li class="list-pub" v-for="(item, index) in state.rataData" :key="index" v-if="item.isSelect == '已选' && item.en !== 'CNY'">
        <mt-cell-swipe
          :right="[
            {
              content: '删除',
              style: { background: '#ff7900', color: '#fff', width: '80px'},
              handler: () => deleteSection(item.en)
            }
          ]">
          <div class="main-box">
            <div class="main-text">
              <p class="section">{{item.en}}</p>
              <p class="teacher">{{item.zh}}</p>
            </div>
            <input type="number" v-model="item.value"  placeholder="0.00" :id="item.id" @input="changeCell(item)">
          </div>
        </mt-cell-swipe>
      </li>
    </ul>
    <div class="login-btn" @click="addCell">添加</div>
  </div>
</template>

<script>
import crossEvent from "@mfelibs/universal-framework/src/libs/apis/crossEvent";
export default {
  props: { user: Object },
  data() {
    return {
      state: {
        rataData: [
          { zh: "人民币", en: "CNY", isSelect: "已选", rate: "1", value: "" },
          {
            zh: "美元",
            en: "USD",
            isSelect: "已选",
            rate: "0.1439",
            value: ""
          },
          {
            zh: "港元",
            en: "HKD",
            isSelect: "已选",
            rate: "1.1281",
            value: ""
          },
          { zh: "日元", en: "JPY", isSelect: "", rate: "16.0924", value: "" },
          { zh: "英镑", en: "GBP", isSelect: "", rate: "0.1121", value: "" },
          { zh: "欧元", en: "EUR", isSelect: "", rate: "0.1263", value: "" }
        ],
        navData: [
          {
            headtitle: "汇率换算",
            text: "换算",
            icon: "icon-shouzhimingxicaifuhongbaoyue",
            link: "index"
          },
          {
            headtitle: "个人中心",
            text: "我的",
            icon: "icon-user3",
            link: "personal"
          }
        ],
        title: ""
      },
      value: "",
      scroll: ""
    };
  },
  methods: {
    deleteSection: function(key) {
      for (var i = 0; i < this.state.rataData.length; i++) {
        if (key === this.state.rataData[i].en) {
          this.state.rataData[i].isSelect = "";
        }
      }
    },
    addCell: function() {
      let vm = this;
      if (this.user && this.user.phone) {
        this.$snc.URLNavigateTo({
          id: "currency",
          action: "hybrid",
          title: "添加货币",
          ext: { rataData: vm.state.rataData }
        });
        return;
      }
      this.$snc.URLNavigateTo({ id: "sign-up", actionType: 99, title: "登录" });
    },
    changeCell: function(item) {
      for (var i = 0; i < this.state.rataData.length; i++) {
        if (item.rate === this.state.rataData[i].rate) {
          this.state.rataData[i].value = item.value;
        } else {
          this.state.rataData[i].value = (
            (this.state.rataData[i].rate / item.rate) *
            item.value
          ).toFixed(2);
        }
      }
    },
    myTouchMove: function() {
      document.activeElement.blur();
    }
  },
  mounted: function() {
    let vm = this;
    crossEvent.on("exchange.currency.add", key => {
      for (var i = 0; i < vm.state.rataData.length; i++) {
        if (key === vm.state.rataData[i].en) {
          vm.state.rataData[i].isSelect = "已选";
        }
      }
    });
    crossEvent.on("exchange.login", data => {
      vm.$snc.pageReload();
    });
    crossEvent.on("exchange.logout", data => {
      vm.$snc.pageReload();
    });
    window.addEventListener("touchmove", this.myTouchMove);
  },
  watch: {}
};
</script>

<style>
.index-back {
}
.mint-cell {
  background: transparent;
}
.list {
  padding-top: 1.333333rem;
  background: #fdd802;
}
.list-pub {
  border-bottom: #fafafa solid 1px;
  background: #fff;
}
.list-pub:first-child {
  background: #fdd802 url(../../../assets/img/indexback.jpg) no-repeat bottom
    center !important;
  background-size: 100%;
}
.main-box {
  width: 10rem;
  height: 2.4rem;
  position: relative;
  color: #000;
}
.main-text {
  position: absolute;
  left: 0.693333rem;
  top: 0.5rem;
  font-size: 0.4rem;
  line-height: 0.6rem;
  text-align: left;
}
.list-pub:first-child .main-box input {
  font-size: 1.2rem;
}
.main-box input {
  display: block;
  width: 100%;
  padding: 0.5rem 0;
  height: 1.4rem;
  position: absolute;
  right: 0.613333rem;
  top: 0;
  background: transparent;
  text-align: right;
  font-size: 0.8rem;
  color: #000;
}
input::-webkit-input-placeholder {
  color: #000;
}
.mint-cell-wrapper {
  padding: 0;
}
.mint-cell-swipe-button {
  line-height: 2.4rem !important;
}
.index-back .mint-cell-wrapper {
  background-size: 120% 0px;
}
.login-btn {
  width: 60%;
  margin-left: 20%;
  height: 1.013333rem;
  margin-top: 1.066667rem;
  border-radius: 0.68rem;
  background: linear-gradient(to right, #fcba13, #fce604);
  font-size: 0.373333rem;
  color: #fff;
  line-height: 1.013333rem;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
}
.list-pub .mint-cell:last-child {
  background-size: 100% 0;
}
</style>
