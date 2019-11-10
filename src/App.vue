<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {

  }
}
</script>
<style>
  .fr-wrapper > div[style*="z-index: 9999"] {
    position: absolute;
    top: -10000px;
    opacity: 0;
  }
  /*.fr-element.fr-view {*/
    /*position: absolute;*/
    /*top: 0;*/
  /*}*/
  .fr-placeholder {
    margin-top: 0 !important;
  }

</style>
