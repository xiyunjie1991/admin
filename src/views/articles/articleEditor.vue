<template>
  <div class="app-container">
    <el-form
      ref="articleForm"
      :model="article"
      :rules="articleRule"
      class="articleForm"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="article.title" placeholder="请输入标题" type="text" auto-complete="on"/>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="封面图" prop="picture">
            <div
              v-if="article.picture.length===0"
              style="width: 320px;height: 180px;position: relative"
              @click="openUpAva"
            >
              <div class="uploadOut">
                <i class="el-icon-upload" style="font-size: 60px;color: #707070"/>
              </div>
            </div>
            <div
              v-if="article.picture.length!==0"
              style="width: 320px;height: 180px; position: relative;margin-top: 40px;"
            >
              <img
                :src="picture"
                style="z-index: 4;max-width: 320px;max-height: 180px;position: absolute;left: 50%;top:50%;transform: translateX(-50%) translateY(-50%)"
                @click="openUpAva"
              >
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="视频图片" prop="video" align="center">
            <div
              v-if="article.video.length===0"
              style="width: 320px;height: 180px;position: relative"
              @click="openUlVideo"
            >
              <div class="uploadOut">
                <i class="el-icon-upload" style="font-size: 60px;color: #707070"/>
              </div>
            </div>
            <div
              v-if="article.video.length!==0"
              style="width: 320px;height: 180px; position: relative;margin-top: 40px;"
            >
              <video
                :src="video"
                style="z-index: 4;max-width: 320px;max-height: 180px;position: absolute;left: 50%;top:50%;transform: translateX(-50%) translateY(-50%)"
                controls="controls"
                @click="openUlVideo"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="显示方式2" prop="show_type" align="center">
        <el-select v-model="article.show_type" placeholder="请选择">
          <el-option
            v-for="item in sType"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!--<div >-->

      <!--</div>-->
      <el-form-item label="tinymce编辑器" prop="show_type" align="center">
        <div style=" height: 100%">
          <!-- 组件有两个属性 value 传入内容双向绑定 setting传入配置信息 -->
          <el-row>
            <el-col :span="4">
              <el-button
                v-clipboard:copy="article.content"
                v-clipboard:success="copy"
                size="small"
                type="primary"
                style="font-weight: 700;display: inline"
              >复制文本内容</el-button>
            </el-col>
          </el-row>
          <!--<froala-editor ref="froala" v-model="article.content" @on-change="changeContent"/>-->
          <tinymce-editor
            ref="editor"
            v-model="article.content"
            :disabled="disabled"
            @onClick="onClick"
          />
        </div>
      </el-form-item>
      <el-button
        type="primary"
        style="width:100%;margin-bottom:100px;"
        @click.native.prevent="submit('articleForm')"
      >提交</el-button>
      <!--<el-form-item label="froala编辑器" prop="show_type" align="center">-->
      <!--<div style=" height: 100%">-->
      <!--&lt;!&ndash; 组件有两个属性 value 传入内容双向绑定 setting传入配置信息 &ndash;&gt;-->
      <!--<el-row>-->
      <!--<el-col :span="4">  <el-button v-clipboard:copy="article.content" v-clipboard:success="copy" size="small" type="primary" style="font-weight: 700;display: inline" >复制文本内容</el-button></el-col>-->
      <!--</el-row>-->
      <!--&lt;!&ndash;<froala-editor ref="froala" v-model="article.content" @on-change="changeContent"/>&ndash;&gt;-->
      <!--</div>-->
      <!--</el-form-item>-->
      <!--&lt;!&ndash;<div>{{ article.content }}</div>&ndash;&gt;-->
      <!--<el-button type="primary" style="width:100%;margin-bottom:100px;" @click.native.prevent="submit('articleForm')">提交</el-button>-->
    </el-form>
    <croppaImg ref="croppaAvatar" @uploadImg="upAvatar"/>
    <croppaImg ref="croppaVideo" @uploadImg="upVideo"/>
  </div>
</template>

<script>
import TinymceEditor from "@/components/editor/tinymce-editor";
import croppaImg from "@/components/upload/croppaImg";
import uploadVideo from "@/components/upload/uploadVideo";
import msgUtil from "@/utils/msgUtil";
import { UpdateArticle, GetArticle } from "@/api/articles";
import UploadVideo from "../../components/upload/uploadVideo";
import froalaEditor from "@/components/editor/froalaEditor";
export default {
  name: "EditorDemo",
  components: {
    UploadVideo,
    TinymceEditor,
    croppaImg,
    uploadVideo,
    froalaEditor
  },
  data() {
    const validateTitle = (rule, value, callback) => {
      if (value.length > 64 || value.length === 0) {
        callback(new Error("标题请输入1~64个字符"));
      } else {
        callback();
      }
    };
    return {
      id: 0,
      articleRule: {
        title: [{ required: true, trigger: "blur", validator: validateTitle }]
      },
      editorSetting: {
        width: 960,
        height: 960
      },
      article: {
        content: "",
        title: "",
        picture: "",
        video: "",
        show_type: 0,
        pictureUrl: ""
      },
      pictureUrl: "",
      videoUrl: "",
      sType: [
        {
          name: "纯文本标题",
          value: 0
        },
        {
          name: "小图",
          value: 1
        },
        {
          name: "大图",
          value: 2
        },
        {
          name: "视频标题",
          value: 3
        }
      ]
    };
  },
  computed: {
    picture() {
      const url = process.env.FILE_ACTION + this.article.picture;
      return url;
    },
    video() {
      return process.env.FILE_ACTION + this.article.video;
    }
  },
  watch: {
    picture: function(newValue, oldValue) {},
    video: function(newValue, oldValue) {}
  },

  created() {
    const id = this.$route.params.id;
    console.info("this.$route", this.$route);
    this.id = Number(id);
    this.initData();
  },
  methods: {
    changeContent(content) {
      this.article.content = content;
      console.info("content", content);
    },
    subContent(cont) {
      this.article.content = cont;
    },
    openUlVideo() {
      const size = {
        height: 300,
        width: 400,
        mode: "onlyVideo"
      };
      this.$refs.croppaVideo.show(size);
    },
    upVideo(img) {
      this.article.video = img.fileid;
      console.info(img);
    },
    upAvatar(img) {
      this.article.picture = img.fileid;
      console.info(img);
    },
    openUpAva() {
      const size = {
        height: 180,
        width: 320,
        mode: "onlyImg"
      };
      this.$refs.croppaAvatar.show(size);
    },
    uploadImg(img) {
      this.article.picture = img.fileid;
    },
    uploadVideoArticle(video) {
      console.info("uploadVideo");
      this.msg = "asdasd";
      this.$refs.editor.addVideo(video.url);
    },

    uploadVideo(video) {
      this.article.video = video.fileid;
    },
    initData() {
      if (this.id !== 0) {
        GetArticle(this.id)
          .then(v => {
            if (v.data.status === 0) {
              this.article = v.data.data;
              console.info("this.article", v.data.data);
              document.title = document.title + "-" + this.article.title;
            }
          })
          .catch(e => {
            msgUtil.warning("获取文章失败" + e);
          });
      }
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const articleForm = Object.assign({}, this.article);
          if (articleForm.show_type !== 0 && this.article.picture === "") {
            msgUtil.nitifyWarning("非纯文字类帖子必须上传封面图");
            return;
          }
          if (articleForm.show_type === 3 && this.article.video === "") {
            msgUtil.nitifyWarning("视频类文章必须展示封面视频");
            return;
          }
          const con = this.article.content;
          const cons2 = con.replace(
            '<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            ""
          );
          UpdateArticle(
            this.id,
            this.article.title,
            this.article.picture,
            this.article.video,
            this.article.show_type,
            cons2
          ).then(v => {
            if (v.data.status === 0) {
              const vid = v.data.data.id;
              history.replaceState(null, "", "/article/articleEditor/" + vid);
              this.$notify({
                title: "更新完成",
                type: "success"
              });
            }
          });
        } else {
          this.$notify({
            title: "警告",
            message: "提交错误",
            type: "warning"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.articleForm {
  position: relative;
  width: 600px;
  top: 20px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.uploadOut {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-40%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 80%;
  border: #707070 2px dashed;
}
</style>
