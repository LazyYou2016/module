<template>
  <div id="app">
    <excel-view :datas="excelData"/>
  </div>
</template>

<script>
import excelview from '../src/excelview/excelview.vue'
export default {
  name: 'app',
  components:{ //注册插件
    'excel-view': excelview
  },
  data () {
    return {
      excelData: null
    }
  },
  created() {
    this.onExcel()
  },
  methods: {
    onExcel (url) {
      // this.axios.get(url, {
      //   responseType: 'arraybuffer'
      // })
      this.$axios.get('http://demo.haoji.me/2017/02/08-js-xlsx/sample/sample.xlsx', {
        responseType: 'arraybuffer'
      })
        .then((res) => {
          this.excelData = res.data
        })
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
