var sheetsData = {}
function onTabWorkbook (index) {
  // console.log(index);
  var datas = sheetsData.sheets[sheetsData.sheetNames[index]] // 这里读取第index张sheet
  var csv = XLSX.utils.sheet_to_csv(datas)
  var excelGridData = []
  sheetsData.sheetDom.innerHTML = ''
  var rows = csv.split('\n')
  rows.pop() // 最后一行（空数组）没用的
  rows.forEach((row, idx) => {
    var columns = row.split(',')
    let obj = {}
    excelGridData.push(obj)
    for (var i = 0; i < columns.length; i++) {
      let key = String.fromCharCode(65 + i)
      excelGridData[idx][key  ] = columns[i]
    }
  })
  var excelGridDom = canvasDatagrid();
  sheetsData.sheetDom.appendChild(excelGridDom);
  excelGridDom.data = excelGridData
}
function readWorkbook (data, dom, btn) {
  sheetsData.sheetDom = document.querySelector(dom);
  sheetsData.sheetBtn = document.querySelector(btn);
  
  let datas = new Uint8Array(data)
  console.log(datas);
  let workbook = XLSX.read(datas, { type: 'array' })  
  console.log(workbook)
  sheetsData.sheetNames = workbook.SheetNames
  sheetsData.sheets = workbook.Sheets
  onTabWorkbook(0)

  for (var i = 0; i < sheetsData.sheetNames.length; i++) {
    var e = sheetsData.sheetNames[i];
    var _index = i
    var btn = document.createElement("button");
    btn.innerHTML = e; 
    btn.setAttribute("onclick", 'onTabWorkbook('+_index+')')
    sheetsData.sheetBtn.appendChild(btn);       
  }  
  return sheetsData
}
