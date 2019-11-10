<template>
  <div>
    <div class="cont">
      <div class="title"><h1>{{ article.title }}</h1></div>
      <div class="userInfo">
        <img :src="icon">
        <div class="name">
          <div><h3>{{ orbName }}</h3></div>
          <div><h5>{{ article.author.nickname }}  {{ article.utime | utimeFilter }}</h5></div>

        </div>

      </div>
      <div v-html="content"/>

    </div>
    <div style="height: 100px;width: 100px;"/>
  </div>
</template>
<script>
import { GetArticle } from '@/api/articles'
import msgUtil from '@/utils/msgUtil'
export default {
  name: 'Tuozhuai',
  components: {},
  filters: {
    utimeFilter: function(value) {
      const utime = new Date(value * 1000)
      return utime.getFullYear() + '-' + utime.getMonth() + '-' + utime.getDay()
    }
  },
  data() {
    return {
      id: 0,
      article: {},
      content: '',
      orbName: ''
    }
  },
  computed: {
    icon() {
      return process.env.FILE_ACTION + this.article.author.avatar
    }
  },
  created() {
    const id = this.$route.params.id
    console.info('$router',this.$route)
    const orbName = this.$route.query.orbName
    this.orbName = orbName
    this.id = Number(id)
    this.initData()
  },
  methods: {
    initData() {
      GetArticle(this.id).then(v => {
        console.info(v.data)
        if (v.data.status === 0) {
          this.article = v.data.data
        }
        let content = this.article.content
        content = '<article style="padding:0;color: white; background: #1e2435; width: 100%; min-height: 100%;">' + content + '</article>'
        this.content = content
      }).catch(e => {
        msgUtil.warning('获取文章数据失败' + e)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont{
  margin: 20px auto ;
  width: 700px;
  padding: 25px;
  box-shadow: 4px 4px 10px  #2b3b4e;;
  border-radius: 10px;
  background-color: #1e2435;
  .title{
    margin-top: 15px;
  }
  h1{
    color:white;
  }
  h3{
    color:#00cc5e;
  }
}
  .userInfo{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    img{
      height: 60px;
      width: 60px;
      border-radius: 30px;
    }
    .name{
      margin-left: 12px;
      margin-bottom: 50px;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      h3{
        margin: 3px;
        color:#00cc5e;
      }
      h5{
        margin: 3px;
        color:#5b788c;
      }
    }
  }

</style>
