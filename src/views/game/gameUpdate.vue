<template>
  <div class="app-container" >
    <el-form ref="gameForm" :model="game" :rules="gameRule" size="mini" auto-complete="on" label-position="left">
      <el-card>

        <div style="width: 600px">
          <el-row type="flex" justify="space-between" >
            <el-col :span="10">
              <el-form-item label="游戏名称" prop="name">
                <el-input
                  v-model="game.name"
                  placeholder="输入游戏名称"
                  type="text"
                  size="mini"
                  auto-complete="on"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="游戏英文名" prop="ename">
                <el-input
                  v-model="game.ename"
                  placeholder="输入游戏英文名"
                  type="text"
                  size="mini"
                  auto-complete="on"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div style="width: 600px">
          <el-row type="flex" justify="space-between" >
            <el-col :span="10">

              <el-form-item label="游戏发行商" prop="publisher">
                <el-input
                  v-model="game.publisher"
                  placeholder="输入游戏发行商"
                  type="text"
                  size="mini"
                  auto-complete="on"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="游戏开发商" prop="developer">
                <el-input
                  v-model="game.developer"
                  placeholder="输入游戏开发商"
                  type="text"
                  size="mini"
                  auto-complete="on"
                />

              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div style="width: 600px">
          <el-row type="flex" justify="space-between" >
            <el-col :span="10">

              <el-form-item label="游戏图标" prop="picture">
                <div v-if="game.avatar.length===0" style="width: 100px;height: 100px; position: relative;margin-top: 20px;box-shadow:4px 4px 10px  #2b3b4e;" @click="cGameAvatar">
                  <div class="uploadOut">
                    <i class="el-icon-upload" style="font-size: 60px;color: #707070"/>
                  </div>
                </div>
                <div v-if="game.avatar.length!==0" style="width: 100px;height: 100px; position: relative;margin-top: 40px;">
                  <img
                    :src="baseUrl+game.avatar+'?width=100'"
                    style="z-index: 4;max-width: 100px;max-height: 100px;position: absolute;left: 50%;top:50%;transform: translateX(-50%) translateY(-50%);box-shadow:4px 4px 10px  #2b3b4e;"
                    @click="cGameAvatar"
                ></div>
              </el-form-item>cGameAvatar
            </el-col>
            <el-col :span="10">
              <el-form-item label="游戏背景图" prop="picture">
                <div v-if="game.picture.length===0" style="width: 320px;height: 180px;position: relative;margin-top: 20px;box-shadow:4px 4px 10px  #2b3b4e; " @click="cGamePicture">
                  <div class="uploadOut">
                    <i class="el-icon-upload" style="font-size: 60px;color: #707070"/>
                  </div>
                </div>
                <div v-if="game.picture.length!==0" style="width: 320px;height: 180px; position: relative;margin-top: 40px;">
                  <img
                    :src="baseUrl+game.picture+'?width=320'"
                    style="z-index: 4;max-width: 320px;max-height: 180px;position: absolute;left: 50%;top:50%;transform: translateX(-50%) translateY(-50%);box-shadow:4px 4px 10px  #2b3b4e;"
                    @click="cGamePicture"
                ></div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-form-item label="游戏图片" prop="ename">
          <picture-list
            :pic-list="picturesList"
            @upIndex="upIndex"
            @downIndex="downIndex"
            @deleteGameImg="deleteGameImg"
            @pictureAndVideoDialog="pictureAndVideoDialog"
            @updatePictureItem = "updatePictureItem"
          />
        </el-form-item>

        <el-form-item label="游戏简介" prop="intro" >
          <el-input
            v-model="game.intro"
            :rows="5"
            size="mini"
            style="max-width: 600px;"
            placeholder="输入游戏简介"
            type="textarea"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item label="游戏类型标签" prop="types">
          <el-select placeholder="请选择" @change="addGameType">
            <el-option
              v-for="item in defaultGameTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
          <div style="margin-top: 10px; ">
            <el-tag
              v-for="(item,index) in game.types"
              :key="index"
              :disable-transitions="false"
              closable
              type="success"
              style="margin: 5px;"
              @close="closeGameType(index)">
              {{ item.ename }}  {{ item.name }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="游戏模式标签" prop="modes">
          <!--<el-tag v-for="(item,index) in defaultGameModes" :key="index" style="margin: 5px;" size="medium" @click.native="addGameMode(item)">{{ item.name }}</el-tag>-->

          <span><el-select placeholder="请选择" @change="addGameMode">
            <el-option
              v-for="item in defaultGameModes"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>

          <div style="margin-top: 10px; ">
            <el-tag
              v-for="(item,index) in game.modes"
              :key="index"
              :disable-transitions="false"
              closable
              type="success"
              style="margin: 5px;"
              @close="closeGameMode(index)">
              {{ item.name }}
            </el-tag>
          </div>
            </span>
        </el-form-item>

        <el-form-item label="游戏评分" prop="score">
          <el-input
            v-model="game.score"
            :rows="5"
            size="mini"
            placeholder="游戏评分"
            max="10"
            min="0"
            type="number"
            style="width: 100px;"
            step="0.1"
            auto-complete="on"
          />
        </el-form-item>
        <el-button type="primary" style="max-width:100px;margin-bottom:30px;" @click.native.prevent="handleLogin('gameForm')">提交</el-button>
      </el-card>
    </el-form>

    <el-card v-if="id>0" class="plagItem">
      <span style="font-size: 20px;font-weight: 700">游戏平台编辑</span>
      <span style="margin-left: 60px;">
        <el-select v-model="platFromsSelect" size="mini" placeholder="请选择平台">
        <el-option
          v-for="item in defaultGanmePlatforms"
          :key="item.id"

          :label="item.name"
          :value="item.id"/>
      </el-select> <el-button size="mini" @click="addPlatFroms">添加</el-button></span>

      <el-form v-for="(item,index) in platforms" :key="item.id" size="mini" class="platFormCard" auto-complete="on" label-position="left">
        <el-card>
          <el-form-item label="平台名称" prop="platform_name">
            <span class="label">{{ item.platform_name }}</span>
          </el-form-item>
          <el-form-item label="游戏售价" prop="price">
            <span class="label">{{ item.price }}</span>
          </el-form-item>
          <el-form-item label="发售时间" prop="release_time" >
            <span class="label">{{ item.release_time }}</span>
          </el-form-item>
          <el-form-item label="是否有中文" prop="official_chs">
            <span v-if="item.official_chs" class="label">是</span>
            <span v-if="!item.official_chs" class="label">否</span>
          </el-form-item>
          <span>
            <el-button type="primary" size="mini" style="width:100px;margin-bottom:30px;" @click.native.prevent="updatePlat(item)">修改</el-button>
            <el-button type="danger" size="mini" style="width:100px;margin-bottom:30px;" @click.native.prevent="openPlatDelete(item,index)">删除</el-button>
          </span>
        </el-card>
      </el-form>
    </el-card>
    <div style="height: 200px; width: 400px;"/>
    <show-img ref="showImg"/>
    <croppaImg ref="croppaImgPictures" @uploadImg="uploadImg" />
    <croppaImg ref="croppaGamePicture" @uploadImg="gamePicture"/>
    <croppaImg ref="croppaGameAvatar" @uploadImg="gameAvatar"/>
    <updatePlat ref="updatePlat" @success="initData"/>
    <ensure-dialog ref="ensure" :title="'删除平台信息'" :tip-msg="'确定要删除平台信息吗'" @ensure="platDelete"/>
    <pictureAndVideoDialog ref="pictureAndVideoDialog" @pictureAndVideoDialog="pictureAndVideoDialog"/>
  </div>
</template>

<script>
import { FindGameTypes, FindGameModes, FindGamePlatforms, UpdateGamePlatformInfo, GetGameInfo, UpdateGame, DeleteGamePlatformInfo } from '@/api/game'
import msgUtil from '@/utils/msgUtil'
import ensureDialog from '@/components/ensureDialog'
import showImg from '@/components/showImg'
import coverPicture from '@/views/orb/components/coverPicture'
import pictureList from '@/views/orb/components/pictureList'
import croppaImg from '@/components/upload/croppaImg'
import updatePlat from '@/views/game/plat/updatePlat'
import pictureAndVideoDialog from '@/components/upload/pictureAndVideoDialog'
export default {
  name: 'GameUpdate',
  components: { showImg, croppaImg, updatePlat, ensureDialog, coverPicture, pictureAndVideoDialog, pictureList },
  filters: {
    statusFilter(status) {
      return status + 'asdasdasd'
    }
  },
  data() {
    const validateRate = (rule, value, callback) => {
      if (!this.rateRule(value)) {
        callback(new Error('请输入1~10的评分'))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      if (value.length > 64 || value.length === 0) {
        callback(new Error('游戏名称不能超过64个字符'))
      } else {
        callback()
      }
    }
    const validateIntroduction = (rule, value, callback) => {
      if (value.length > 200) {
        callback(new Error('游戏简介不能超过200个字符'))
      } else {
        callback()
      }
    }
    const validateEname = (rule, value, callback) => {
      if (value.length > 64) {
        callback(new Error('游戏英文不能超过64个字符'))
      } else {
        callback()
      }
    }
    return {

      gameRule: {
        score: [{ required: true, trigger: 'blur', validator: validateRate }],
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        ename: [{ required: true, trigger: 'blur', validator: validateEname }],
        intro: [{ required: true, trigger: 'blur', validator: validateIntroduction }]
      },
      maxRate: 10,
      id: '',
      platforms: [],
      defaultGameModes: [],
      defaultGameTypeList: [],
      defaultGanmePlatforms: [],
      game: {
        name: '',
        ename: '',
        publisher: '',
        developer: '',
        intro: '',
        score: 0,
        modes: [],
        types: [],
        pictures: [],
        picture: '',
        avatar: '',
        baseUrl: ''

      },
      picturesList: [],
      platFromsSelect: '',
      orbNeed: 0
    }
  },
  computed: {

  },
  mounted() {
    // 拖拽后 排序接口
    this.$dragging.$on('dragged', ({ value }) => {
    })
  },
  created() {
    this.baseUrl = process.env.FILE_ACTION
    // id = 游戏 id
    const orbNeed = this.$route.query.orbNeed
    this.orbNeed = orbNeed
    const id = this.$route.params.id
    this.id = Number(id)
    this.initData()
  },
  methods: {
    downIndex(index) {
      const oldItem = this.picturesList[index]
      this.picturesList.splice(index, 1)
      this.picturesList.splice(index + 1, 0, oldItem)
    },
    upIndex(index) {
      const oldItem = this.picturesList[index]
      this.picturesList.splice(index, 1)
      this.picturesList.splice(index - 1, 0, oldItem)
    },
    updatePictureItem(obj) {
      this.$set(this.picturesList, obj.index, obj)
    },
    cImgPicture() {
      const size = {
        height: 400,
        width: 600,
        mode: 'both'
      }
      this.$refs.croppaImgPictures.show(size)
    },
    cGameAvatar() {
      const size = {
        height: 200,
        width: 200,
        mode: 'onlyImg'
      }
      this.$refs.croppaGameAvatar.show(size)
    },
    cGamePicture() {
      const size = {
        height: 400,
        width: 600,
        mode: 'onlyImg'
      }
      this.$refs.croppaGamePicture.show(size)
    },
    pictureAndVideoDialog(obj) {
      this.picturesList.push(obj)
    },
    openUploadVideo() {
      this.$refs.pictureAndVideoDialog.show()
    },
    deleteGameImg(obj) {
      this.picturesList.splice(obj.index, 1)
    },
    // uploadVideo(video) {
    //   video.type = 1
    //   video.value = video.fileid
    //   this.picturesList.push(video)
    // },
    gameAvatar(img) {
      this.game.avatar = img.fileid
    },
    gamePicture(img) {
      this.game.picture = img.fileid
    },
    uploadImg(img) {
      img.value = img.fileid
      this.picturesList.push(img)
    },

    // platSubmit
    updatePlat(item) {
      const a = Object.assign({}, item)
      a.price = Number(a.price)
      a.release_time = Number(a.release_time)
      this.$refs.updatePlat.show(a)
    },

    addPlatFroms() {
      const s = this.platFromsSelect
      let flag = true
      this.platforms.forEach(v => {
        if (v.platform_id === s) {
          flag = false
        }
      })
      if (flag) {
        this.defaultGanmePlatforms.forEach(v => {
          if (v.id === s) {
            const item = {}
            item.platform_id = Number(s)
            item.game_id = Number(this.id)
            item.price = 0
            item.platform_name = v.name
            item.release_time = Date.parse(new Date())
            item.official_chs = false
            this.$refs.updatePlat.show(item)
            // this.platforms.push(item)
          }
        })
      } else {
        msgUtil.warning('已经添加过该平台的信息')
      }
    },
    platDelete(item) {
      DeleteGamePlatformInfo(item.game_id, item.platform_id).then(v => {
        msgUtil.nitifySuccess('删除成功')
        this.initData()
      }).catch(e => {
        msgUtil.warning('删除游戏平台失败' + e)
      })
    },
    openPlatDelete(item) {
      this.$refs.ensure.show(item)
    },

    rateRule(value) {
      let flag = true
      const a = Number(value)
      if (a < 0 || a > 10) {
        flag = false
      }
      return flag
    },
    initOthers() {
      FindGameModes().then(v => {
        if (v.data.status === 0) {
          const data = v.data.data
          this.defaultGameModes = data
        }
      }).catch(e => {
        msgUtil.warning('获取游戏模式失败' + e)
      })

      FindGameTypes().then(v => {
        if (v.data.status === 0) {
          const data = v.data.data
          this.defaultGameTypeList = data
        }
      }).catch(e => {
        msgUtil.warning('获取游戏类型失败' + e)
      })

      FindGamePlatforms().then(v => {
        if (v.data.status === 0) {
          const data = v.data.data
          this.defaultGanmePlatforms = data
        }
      })
    },
    initData() {
      if (this.id !== 0) {
        GetGameInfo({ id: this.id }).then(v => {
          if (v.data.status === 0) {
            this.game = v.data.data
            const pf = Object.assign([], this.game.platforms)
            pf.forEach(v => {
              v.release_time = v.release_time * 1000
            })
            console.info('game', v.data.data)
            this.platforms = pf
            this.picturesList = this.game.pictures
            document.title = document.title + '-' + this.game.name
          }
        }).catch(e => {
          msgUtil.warning('获取游戏信息失败' + e)
        })
      }

      this.initOthers()
    },
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {}
          const pictures = []
          obj = JSON.parse(JSON.stringify(this.game))
          if (obj.picture.length === 0 || obj.avatar.length === 0) {
            this.$notify({
              title: '必须上传游戏图标和游戏背景图',
              type: 'warning'
            })
            return
          }
          const modes = []
          const types = []
          obj.pictures = this.picturesList
          obj.modes.forEach(v => {
            modes.push(Number(v.id))
          })
          obj.types.forEach(v => {
            types.push(Number(v.id))
          })
          obj.modes = modes
          obj.types = types
          obj.score = Number(obj.score)
          obj.id = this.id
          UpdateGame(JSON.stringify(obj)).then(v => {
            if (v.data.status === 0) {
              const vid = v.data.data.id
              this.id = Number(vid)
              history.replaceState(null, '', '/game/gameUpdate/' + vid + '?orbNeed=' + this.orbNeed)
              // if (this.orbNeed === 1) {
              //   // this.$store.dispatch('insert_orbNeedGame', v.data.data)
              //   const bc = new BroadcastChannel('test_channel')
              //   bc.postMessage(Number(vid)) /* send */
              // }
              this.$notify({
                title: '更新完成',
                type: 'success'
              })
            }
          })
        } else {
          this.$notify({
            title: '警告',
            message: '提交错误',
            type: 'warning'
          })
          return false
        }
      })
    },
    onratechange() {
    },
    closeGameType(index) {
      this.game.types.splice(index, 1)
    },
    addGameType(item) {
      let flag = true
      this.game.types.forEach(v => {
        if (v.id === item) {
          flag = false
        }
      })
      if (flag) {
        this.defaultGameTypeList.forEach(v => {
          if (v.id === item) {
            this.game.types.push(v)
          }
        })
      }
    },

    closeGameMode(index) {
      this.game.modes.splice(index, 1)
    },
    addGameMode(item) {
      let flag = true
      this.game.modes.forEach(v => {
        if (v.id === item) {
          flag = false
        }
      })
      if (flag) {
        this.defaultGameModes.forEach(v => {
          if (v.id === item) {
            this.game.modes.push(v)
          }
        })
      }
    },

    oninput(e) {
      // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .out_container{
    position: relative;
  }
  .gameForm{
    padding: 20px;
    box-shadow:4px 4px 10px  #2b3b4e;
    border-radius: 20px;
  }
  .platFormCard{
    margin: 10px;
    padding: 20px;

  }
  .plagItem{
    margin-top: 20px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
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
  }
  .label{
    font-size: 14px;
    font-weight: 700;
    color: #707070;
  }
</style>
