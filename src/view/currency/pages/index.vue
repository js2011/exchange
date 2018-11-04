<template>
  <div>
    <div class="cell-box">
      <div :index="item.index" v-for="(item, index) in rataData" :key="index">
        <mt-cell @click.native="selected(item)" class="cell" :title="item.zh + '   ' + item.en" :value="item.isSelect"></mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
import crossEvent from "@mfelibs/universal-framework/src/libs/apis/crossEvent";
export default {
  data() {
    return {
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
      ]
    };
  },
  methods: {
    selected: function(item) {
      let vm = this;
      crossEvent.trigger("exchange.currency.add", {
        data: item.en,
        success(res) {
          vm.$snc.navigateBack();
        }
      });
    }
  },
  created() {
    let vm = this;
    vm.$snc.on("ready", data => {
      try {
        if (data.data.ext.rataData) {
          vm.rataData = data.data.ext.rataData;
        }
      } catch (error) {
        vm.user = {};
      }
    });
  },
  mounted: function() {}
};
</script>

<style scoped>
.header2 {
  height: 1.333333rem;
  font-size: 0.4rem;
}
.cell-box {
  /* margin-top: 1.333333rem; */
  text-align: left;
  background: #fff;
}
.cell {
  border-bottom: #fafafa solid 1px;
  margin-left: 0.233333rem;
  padding-right: 0.2rem;
}
.cell:last-child {
  background-size: 100% 0;
}
</style>
