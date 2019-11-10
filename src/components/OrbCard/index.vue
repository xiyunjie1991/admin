<template>
  <router-link :to="'/orb/orbUpdate/'+data.id">
    <div class="card" :style="style_">
      <div>
        <img :src="getImg(data.avatar,60)" class="icon">
      </div>
      <div class="detail">
        <p class="lTitle">{{ data.name }}</p>
        <p class="lTitle">{{ data.nickname }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { GetOrbInfo } from "@/api/orb.js";
export default {
  components: {},
  props: {
    id: {
      type: Number,
      default: 0
    },
    orb: {
      type: Object,
      default: () => {}
    },
    style_: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: {}
    };
  },
  watch: {
    orb() {
      this.data = this.orb;
    }
  },
  created() {
    if (this.id > 0) {
      GetOrbInfo(this.id).then(r => {
        this.data = r.data.data;
      });
    } else {
      this.data = this.orb;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card {
  padding: 10px 15px;
  margin: 0 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  flex-direction: row;
  display: flex;

  div.detail {
    margin-left: 10px;
    .lTitle {
      color: grey;
      font-weight: 700;
      font-size: 12px;
    }
  }

  img {
    border-radius: 50%;
  }
}
</style>
