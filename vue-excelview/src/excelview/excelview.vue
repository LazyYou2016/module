<template>
  <div>
      <div ref="excel-dom"></div>
      <div class="excel-button-group">
        <button v-for="(item, index) in sheetNames"
          :key="index"
          type="button"
          :class="sheetActive===item?'active':''"
          @click="onTabWorkbook(index)">
          {{item}}
        </button>
      </div>
      <!-- ElementUI -->
      <!-- <el-button-group class="m-t-md">
        <el-button
          v-for="(item, index) in sheetNames"
          :key="index"
          :type="sheetActive===item?'primary':''"
          @click="onTabWorkbook(index)">
          {{item}}
        </el-button>
      </el-button-group> -->
  </div>
</template>
<script>
import XLSX from 'xlsx' // 预览
import canvasDatagrid from 'canvas-datagrid'
export default {
  name: 'excel',
  props: {
    datas: null
  },
  data () {
    return {
      excelGridData: [],
      excelGridDom: null,
      workbook: null,
      sheets: [],
      sheetNames: [],
      sheetActive: ''
    }
  },
  methods: {
    onTabWorkbook (index) {
      var datas = this.sheets[this.sheetNames[index]] // 这里读取第index张sheet
      var csv = XLSX.utils.sheet_to_csv(datas)
      // console.log(csv)
      this.excelGridData = []
      this.$refs['excel-dom'].innerHTML = ''
      var rows = csv.split('\n')
      rows.pop() // 最后一行（空数组）没用的
      rows.forEach((row, idx) => {
        var columns = row.split(',')
        let obj = {}
        this.excelGridData.push(obj)
        for (var i = 0; i < columns.length; i++) {
          let key = String.fromCharCode(65 + i)
          this.excelGridData[idx][key] = columns[i]
        }
      })
      this.excelGridDom = canvasDatagrid({
        editable: false
      })
      this.excelGridDom.data = this.excelGridData
      console.log(this.excelGridData)
      this.$refs['excel-dom'].appendChild(this.excelGridDom)
      this.sheetActive = this.sheetNames[index]
    },
    readWorkbook (workbook) {
      console.log(workbook)
      this.workbook = workbook
      this.sheetNames = workbook.SheetNames
      this.sheets = workbook.Sheets
      this.onTabWorkbook(0)
    }
  },
  watch: {
    datas () {
      this.excelGridData = []
      this.excelGridDom = null
      let data = new Uint8Array(this.datas)
      let workbook = XLSX.read(data, { type: 'array' })
      this.readWorkbook(workbook)
    }
  }
}
</script>

<style scoped>
  .excel-button-group {
    margin-top: 2px;
    text-align: left;
  }
  .excel-button-group button {
    background: #ddd;
    padding: 8px 8px;
    border-radius: 0;
    border: 1px solid #bdbdbd;
    cursor: pointer;
  }

  .excel-button-group button.active {
    background: #f0f0f0;
    cursor: default;
  }

  .excel-button-group button:focus {
    outline: none;
  }
</style>
