<template>
  <div class="app-container" >
    <div class="rowLayOut">
      <div>
        <el-form ref="gameForm" :model="orb" :rules="orbRule" size="mini" class="orbForm" auto-complete="on" >
          <el-row type="flex" justify="space-between">
            <el-col :span="16">
              <el-form-item label="选择游戏" prop="gameName">
                <el-select
                  v-model="orb.game_id"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  size="mini"
                  clearable
                  no-match-text="没有当前结果"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  @change="gameSelect">
                  <el-option
                    v-for="item in games"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
                <!--<p class="tipText">如果选择一个游戏会自动绑定该游戏内的图片和基本信息,如果不需要可不选择</p>-->
                <router-link :to="{path:'/game/gameUpdate/0',query: {orbNeed:1}}" target="_blank">
                  <el-button v-if="id === 0" size="mini" type="primary" style="margin-left: 10px;">点击创建游戏</el-button>
                </router-link>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否官方" >
                <el-switch v-model="orb.is_official" disabled/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-between">
            <el-col :span="12">
              <el-form-item label-suffix="a" label="猩球名字" prop="name" >
                <el-input
                  v-model="orb.name"
                  style="width: 200px;"
                  placeholder="输入猩球名字"
                  show-word-limit
                  maxlength="64"
                  type="text"
                  size="mini"
                  auto-complete="on"
                />
                <!--<p class="tipText">输入一个不超过64字符的猩球名称</p>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="猩球昵称" prop="nickname">
                <el-input
                  v-model="orb.nickname"
                  placeholder="输入猩球昵称"
                  type="text"
                  size="mini"
                  maxlength="64"
                  show-word-limit
                  style="width: 200px;"
                  auto-complete="on"
                />
                <!--<p class="tipText">输入一个不超过64字符的猩球昵称</p>-->
              </el-form-item>

            </el-col>
          </el-row>

          <el-row type="flex" >
            <el-col :span="12">
              <el-form-item label="猩球图标" prop="pictures">
                <div v-if="orb.avatar.length===0" style="width: 100px;height: 100px; position: relative; margin-top: 20px;" @click="cImgIcon">
                  <div class="uploadOut">
                    <i class="el-icon-upload" style="font-size: 60px;color: #707070"/>
                  </div>
                </div>
                <div v-if="orb.avatar.length!==0" style="width: 100px;height: 100px; position: relative">
                  <img
                    :src="getImg(orb.avatar,100)"
                    width="100px"
                    style="z-index: 4;max-width: 100px;max-height: 100px;"
                    @click="cImgIcon"
                ></div>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="猩球背景图" prop="pictures">
                <div>
                  <div v-if="orb.picture.length===0" style="width: 100px;height: 100px;  position: relative; margin-top: 20px;" @click="cOrbPicture">
                    <div class="uploadOut">
                      <i class="el-icon-upload" style="font-size: 60px;color: #707070"/>
                    </div>
                  </div>
                  <div v-if="orb.picture.length!==0" style="width: 240px;height: 135px;  position: relative;">
                    <img
                      :src="getImg(orb.picture,320)"
                      width="320px"
                      style="z-index: 4;max-width: 240px;max-height: 135px;"
                      @click="cOrbPicture"
                  ></div>
                </div>
                <!--<p class="tipText">点击上传猩球背景图可按照区域剪裁</p>-->
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="猩球介绍" prop="intro">
            <el-input
              v-model="orb.intro"
              :rows="5"
              size="mini"
              placeholder="输入猩球简介"
              type="textarea"
              style="margin-top: 30px; width:500px;"
              auto-complete="on"
            />
            <!--<p class="tipText">猩球介绍将展示在猩球详情页面，建议填写简洁明确、有信息量的内容</p>-->
          </el-form-item>

          <el-form-item label="猩球图片" prop="pictures">
            <!--<p class="tipText">上传猩球介绍中的视频与图片 上传视频时请同时上传封面图</p>-->
            <picture-list
              :pic-list="pictures"
              @upIndex="upIndex"
              @downIndex="downIndex"
              @deleteGameImg="deleteGameImg"
              @pictureAndVideoDialog="pictureAndVideoDialog"
              @updatePictureItem = "updatePictureItem"
            />
          </el-form-item>

          <el-button size="mini" type="primary" style=" width:60px;margin-top:30px;" @click.native.prevent="submitForm('orbForm')">提交</el-button>
        </el-form>
        <ensure-dialog ref="ensure" :title="'确认修改'" :tip-msg="'确认需要修改私人猩球的信息吗'" @ensure="ensureUpdate"/>
      </div>
      <div class="rowMiddle"/>
      <div>
        <div><p class="label">猩球创建人</p></div>
        <div class="owner">
          <img :src="baseUrl + user.avatar" style="height: 60px;width: 60px;border-radius: 30px;">
          <p class="tipText" style="margin-left: 20px;">    {{ user.nickname }}</p>
        </div>
      </div>

    </div>

    <div style="height: 200px; width: 400px;"/>
    <croppaImg ref="croppaImgIcon" @uploadImg="gameIcon"/>
    <croppaImg ref="croppaOrbPicture" @uploadImg="orbPicture"/>
    <div v-if="false">{{ orbNeedId }}</div>

  </div>
</template>

<script>
import ensureDialog from '@/components/ensureDialog'
import { FindGames, GetGameInfo } from '@/api/game'
import { GetUserInfo } from '@/api/user'
import { UpdateOrb, GetOrbInfo } from '@/api/orb'
import msgUtil from '@/utils/msgUtil'
import uploadImg from '@/components/upload/uploadImg'
import uploadVideo from '@/components/upload/uploadVideo'
import croppaImg from '@/components/upload/croppaImg'
import coverPicture from '@/views/orb/components/coverPicture'
import pictureList from '@/views/orb/components/pictureList'
export default {
  name: 'GameUpdate',
  components: { uploadImg, uploadVideo, croppaImg, ensureDialog, coverPicture, pictureList },
  filters: {
    statusFilter(status) {
      return status + 'asdasdasd'
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      console.info('validateName', validateName)
      if (value.length > 64 || value.length === 0) {
        callback(new Error('游戏名称不能超过64个字符'))
      } else {
        callback()
      }
    }
    const validateNickName = (rule, value, callback) => {
      if (value.length > 64) {
        callback(new Error('游戏英文不能超过64个字符'))
      } else {
        callback()
      }
    }
    return {
      orbRule: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        nickname: [{ required: true, trigger: 'blur', validator: validateNickName }]
      },
      orb: {
        id: 0,
        name: '',
        nickname: '',
        avatar: '',
        img: '',
        icon: '',
        intro: '',
        game_id: null,
        pictures: [],
        is_official: true,
        picture: '',
        showPicture: '',
        game: []
      },
      user: {

      },
      pictures: [],
      games: [],
      showDown: false,
      selectedGame: {},
      id: 0,
      baseUrl: ''
    }
  },
  created() {
    console.info('getImg', this.getImg)
    this.baseUrl = process.env.FILE_ACTION
    const id = this.$route.params.id
    this.id = Number(id)

    this.initData()
  },
  methods: {

    downIndex(index) {
      console.info('downIndex ', index)
      const oldItem = this.pictures[index]
      this.pictures.splice(index, 1)
      console.info('this.orb pictures', this.pictures)
      console.info('index', index)
      this.pictures.splice(index + 1, 0, oldItem)
      console.info('this.orb pictures', this.pictures)
    },
    upIndex(index) {
      console.info('downIndex ', index)
      const oldItem = this.pictures[index]
      this.pictures.splice(index, 1)
      this.pictures.splice(index - 1, 0, oldItem)
    },
    updatePictureItem(obj) {
      console.info('updatePictureItem obj', obj)
      this.$set(this.pictures, obj.index, obj)
      console.info('this.pictures', this.pictures)
    },

    pictureAndVideoDialog(obj) {
      console.info('pictureAndVideoDialog obj', obj)
      if (obj.flag === 'add') {
        this.pictures.push(obj)
      } else {
        this.$set(this.pictures, obj.index, obj)
      }
    },

    deleteGameImg(obj) {
      console.info('befor this.pictures', this.pictures.slice())
      console.info('deleteGameImg', obj.index)
      this.pictures.splice(obj.index, 1)
      // this.$set(this.pictures, index, 0)
      console.info('after this.pictures', this.pictures)
    },
    cOrbPicture() {
      const size = {
        height: 300,
        width: 400,
        mode: 'onlyImg'
      }
      this.$refs.croppaOrbPicture.show(size)
    },
    cImgIcon() {
      const size = {
        height: 200,
        width: 200,
        mode: 'onlyImg'
      }
      this.$refs.croppaImgIcon.show(size)
    },

    // uploadPictures(video) {
    //   video.value = video.fileid
    //   this.pictures.push(video)
    // },
    uploadImg(img) {
      img.value = img.fileid
      const newPic = {
        type: 0,
        picture: img.fileid,
        video: ''
      }
      this.pictures.push(newPic)
    },
    initData() {
      this.remoteMethod('')
      console.info(this.id)
      if (this.id !== 0) {
        GetOrbInfo(this.id).then(v => {
          if (v.data.status === 0) {
            const oList = v.data.data

            if (this.id !== 0) {
              GetUserInfo(v.data.data.creator_id).then(v => {
                if (v.data.status === 0) {
                  this.user = v.data.data
                }
              })
            }

            this.pictures = oList.pictures
            console.info('v.data.data', v.data.data.pictures)
            if (v.data.data.game) {
              this.games.push(v.data.data.game)
            }
            if (oList.game === null) {
              oList.game = []
            }
            if (oList.game_id === 0) {
              oList.game_id = null
            }
            this.orb = oList

            document.title = document.title + '-' + this.orb.name
            this.remoteMethod('')
          }
        }).catch(e => {
          msgUtil.warning('获取猩球信息失败' + e)
        })
      }
    },
    ensureUpdate() {
      UpdateOrb(this.orb.id, this.orb.name, this.orb.nickname, this.orb.avatar,
        this.orb.intro, this.pictures, this.orb.game_id, this.orb.picture, this.orb.is_official).then(v => {
        if (v.data.status === 0) {
          msgUtil.nitifySuccess('保存成功')
          const vid = v.data.data.id
          this.orb.id = Number(vid)
          history.replaceState(null, '', '/orb/orbUpdate/' + vid)
        }
      }).catch(e => {
        msgUtil.warning('更新猩球信息失败' + e)
      })
    },
    submitForm() {
      console.info('submitForm', this.orb.game_id)
      if (this.orb.is_official) {
        if (this.orb.game_id === '' || this.orb.game_id === null) {
          msgUtil.warning('请选择游戏')
        } else {
          this.ensureUpdate()
        }
      } else {
        if (this.orb.is_official) {
          this.$refs.ensure.show()
        } else {
          this.ensureUpdate()
        }
      }
    },
    gameIcon(img) {
      console.info('gameIcon', img)
      this.orb.icon = img.url
      this.orb.avatar = img.fileid
    },
    orbPicture(img) {
      console.info('orbPicture', img)
      this.orb.picture = img.fileid
    },

    gameSelect(game_id) {
      GetGameInfo({ id: Number(game_id) }).then(v => {
        if (v.data.status === 0) {
          console.info('GetGameInfo', v.data.data)
          const seGame = v.data.data
          seGame.pictures.forEach(v => {
          })
          this.orb.game_id = seGame.id

          if (this.pictures.length === 0) {
            this.pictures = seGame.pictures
          }
          if (this.orb.picture.length === 0) {
            this.orb.picture = seGame.picture
            this.orb.showPicture = process.env.FILE_ACTION + seGame.picture
          }
          if (this.orb.avatar.length === 0) {
            this.orb.avatar = seGame.avatar
            this.orb.icon = process.env.FILE_ACTION + seGame.avatar
          }

          if (this.orb.name === '') {
            this.orb.name = seGame.name
          }

          if (this.orb.nickname === '') {
            this.orb.nickname = seGame.ename
          }

          if (this.orb.intro === '') {
            this.orb.intro = seGame.intro
          }

          this.selectedGame = seGame
          this.showDown = true
        }
      })
    },
    remoteMethod(query) {
      this.loading = true
      FindGames({ query: query }).then(v => {
        if (v.data.status === 0) {
          this.games = v.data.data.games
        }
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .out_container{
    position: relative;
  }
  .orbForm{
    width: 800px;
  }

  .platFormCard{
    box-sizing: border-box;
    box-shadow: 10px 10px 5px #888888;
    border-radius: 20px;
    border: 1px solid #7A7D82;
    margin-top: 20px;
    padding: 20px;
  }
  .uploadOut{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translateX(-50%) translateY(-40%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 80%;
    border: #707070 2px dashed;
  }
  .tipText{
    color: #9a9a9a;
    font-size: 14px;
    font-weight: 700;
  }
  .rowMiddle{
    flex:4
  }
  .rowLayOut{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .owner{
    display: flex;
    flex-direction: row;
  }
 .label{
   color:#60627a;
   font-size: 14px;
   font-weight: 700;
 }
</style>
