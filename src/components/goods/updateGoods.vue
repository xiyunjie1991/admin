<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="visible"
      :modal-append-to-body="false"
      :show-close="true"
      width="450px"
      center
      title="添加或更新商品"
    >

      <el-row type="flex" justify="center">
        <el-col :span="12" ><p class="title2">{{ tipMsg }}</p></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" ><p >名称</p></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" ><el-input v-model="goods.name" size="mini"/></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" ><p >图片</p></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" >
          <div style="width: 220px; height: 180px">
            <img v-if="goods.imgUrl !== null" :src="getImgUrl(goods.imgUrl)" style="width: 240px;" @click="cGoodsAvatar">
            <el-button v-if="goods.imgUrl === null" type="primary" size="mini" @click="cGoodsAvatar">上传</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" ><p >价格-日元</p></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" ><el-input v-model="goods.costPrice" size="mini"/></el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="12" ><p >类型1</p></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" >

          <el-select v-model="goods.bigTypeId" size="mini" >
            <el-option
              v-for="item in bigTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="12" ><p >类型2</p></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" >
          <el-select v-model="goods.miniTypeId" size="mini" >
            <el-option
              v-for="item in miniTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="12" ><p >类型3</p></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" >
          <el-select v-model="goods.tinyTypeId" size="mini" >
            <el-option
              v-for="item in tinyTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="12" ><p >描述</p></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" >
          <el-input v-model="goods.content" :rows="4" type="textarea"/>
        </el-col>
      </el-row>

      <el-row :gutter="30" style="margin-top:20px " type="flex" align="middle" justify="center" >
        <el-button size="small" type="primary" style="font-weight: 700 " @click="ensure">确定</el-button>
        <el-button size="small" type="warning" style="font-weight: 700" @click="cancel">取消</el-button>
      </el-row>
    </el-dialog>
    <croppaImg ref="GoodsAvatar" @uploadImg="goodsImg"/>
  </div>
</template>

<script>
import croppaImg from '@/components/upload/croppaImg'
import { selectByPrimaryKey, updateGoods, getBigType, getMiniType, getTinyType } from '@/api/goods'
export default {
  components: { croppaImg },
  data() {
    return {
      visible: false,
      tinyTypeList: [],
      miniTypeList: [],
      bigTypeList: [],
      goods: {
        id: 0,
        name: '',
        tinyTypeId: 1,
        miniTypeId: 3,
        content: '',
        bigTypeId: 1,
        costPrice: 0,
        showPrice: 0,
        imgUrl: null
      }

    }
  },
  created() {

  },
  methods: {
    cGoodsAvatar() {
      const size = {
        height: 400,
        width: 600,
        mode: 'onlyImg'
      }
      this.$refs.GoodsAvatar.show(size)
    },
    getImgUrl(img) {
      return process.env.FILE_ACTION + img
    },
    goodsImg(img) {
      console.info('goodsImg', img)
      this.goods.imgUrl = img
    },
    initFirst() {
      getTinyType().then(v => {
        this.tinyTypeList = v.data.list
      })
      getBigType().then(v => {
        this.bigTypeList = v.data.list
      })
      getMiniType().then(v => {
        this.miniTypeList = v.data.list
      })
    },
    show(id) {
      console.info('show id', id)
      this.initFirst()
      this.goods.id = id
      if (id === 0) {

      } else {
        selectByPrimaryKey(id).then(v => {
          console.info('selectByPrimaryKey', v.data)
          this.goods = v.data.goods
        })
      }
      this.visible = true
    },
    cancel() {
      this.visible = true
    },
    ensure() {
      updateGoods(this.goods).then(v => {
        console.info('updateGoods success ', v)
        this.visible = false
        console.info('ensureDialog', this.obj)
        this.$emit('success', this.obj)
      })
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .title{
    font-size: large;
  }
</style>
