/**
 * https://www.aconvert.com/document/xlsx-to-json/
 */
let tableTest = document.getElementById("sortByTest");

function sortJSON(a){
  a.sort(function(a, b){
    return a.ACCID - b.ACCID;
  });
}
function gatherInfo(tables){
  /**Info to gather on each individual, 102eachhhhhhhhhhhhhhhhh+
   * Max amt of orders in a month
   * That's it
   */
  let ordersByX = {};
  let monthNumb = 1;
  $(tables).each((a)=>{
    $(tables[a]).each((b)=>{
      let id = tables[a][b].ACCID;
      if(!(id in ordersByX)){
        ordersByX[id]={};
        ordersByX[id][monthNumb] = 1;
        console.log("new ind found:", id)
      }else{
        ordersByX[id][monthNumb]++;
        console.log("added order to ind:", id, ordersByX[id] )
      }

    })
    console.log("---new month")
    monthNumb++;
  });
  console.log(monthNumb)
  console.log(ordersByX)
}
function createTableFromJSON (json, pushTo){
  let rows = json.length + 1;
  let build = "";
  //Create header first
  build+="<tr>"
  for(let j in json[0]){
    build+=`<th>${j}</th>`
  }
  build+="</tr>"

  $(json).each((i)=>{
    //console.log(json[i])
    build+="<tr>"
    for(let j in json[i]){
      //console.log(json[i][j], j)
      build+=`<td>${json[i][j]}</td>`
    }
    build+="</tr>"
  })
  $(pushTo).html(build)
} 
sortJSON(month1)
createTableFromJSON(month1, tableTest)
gatherInfo(months)