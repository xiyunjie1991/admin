<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="visible" :modal-append-to-body="false" title="提示" :width="'500px'">
      <span class="title2">
        文章有以下引用，无法
        <span style="color:red">删除</span>。
      </span>
      <ul>
        <li v-for="(item,index) in data" :key="index">
          <div v-if="item.type === 0 && item.data">
            内容频道：
            <!-- <orb-card :orb="item.data.orb" :style_="{width:100}"/> -->
            <router-link :to="'/orb/roomArticleList/'+item.id" target="_blank">
              <span
                style="color:#409EFF"
              >{{ item.data.orb.name }} / {{ item.data.group.name }} / {{item.data.room.name}}</span>
            </router-link>
          </div>
          <!--</router-link>-->
          <div v-if="item.type === 1 ">
            资讯列表：
            <router-link
              :to="{path:'/feature/featureArticleList',query: {name:item.name}}"
              target="_blank"
            >
              <span style="color:#409EFF">前往</span>
            </router-link>
          </div>
          <div v-if="item.type === 2 && item.data">
            游戏百科：
            <router-link
              :to="{path:'/game/pedia/'+item.data.game.id,query: {name:item.data.item.name}}"
              target="_blank"
            >
              <span
                style="color:#409EFF"
              >{{ item.data.game.name }} / {{ item.data.group.name }} / {{ item.data.item.name }}</span>
            </router-link>
          </div>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetOrbInfoByRoomID } from "@/api/orb.js";
import { GetGameInfoByPediaItemID } from "@/api/game.js";
import OrbCard from "@/components/OrbCard/index";
export default {
  components: { OrbCard },
  props: {},

  data() {
    return {
      visible: false,
      data: [],
      name: ""
    };
  },
  created() {},
  methods: {
    show(obj, name) {
      this.name = name;
      this.data = obj;
      this.visible = true;
      for (let i in this.data) {
        const item = this.data[i];
        const index = i;
        if (item.type == 0) {
          GetOrbInfoByRoomID(item.id).then(r => {
            const data = r.data.data;
            item.data = data;
            this.$set(this.data, index, Object.assign({}, item));
          });
        } else if (item.type == 2) {
          GetGameInfoByPediaItemID(item.id).then(r => {
            const data = r.data.data;
            item.data = data;
            this.$set(this.data, index, Object.assign({}, item));
          });
        }
      }
    },
    cancel() {
      this.visible = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  font-size: large;
}
</style>
