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
  let ordersByX = {};
  let monthNumb = 0;
  let maxMonths = tables.length;
  let newJSON = [];
  /**Phase 1 - Gather information 
   *  Collecting the maximum number of months, number of months
   *  to be used to properly format
  */
  //Access each month
  $(tables).each((a)=>{
    //Access values
    $(tables[a]).each((b)=>{
      let id = tables[a][b].ACCID;
      // if client is new, init
      if(typeof ordersByX[id] === 'undefined'){
        ordersByX[id] = []
        for(let i = 0; i < maxMonths;i++){
          ordersByX[id][i] = 0;
        }
        ordersByX[id][monthNumb] = 1;
      }else{
        //if client has no orders this month yet, init
        if(typeof ordersByX[id][monthNumb] === 'undefined'){
          ordersByX[id][monthNumb] = 1;
        } else {
          ordersByX[id][monthNumb] ++;

        }
      }
    })
    monthNumb++;
  });
  //Find the most orders by each client
  let maxOrderNumb = {}
  for(let i in ordersByX){
    ordersByX[i] = ordersByX[i].sort();
    maxOrderNumb[i] = ordersByX[i][ordersByX[i].length-1];
  }
  console.log(ordersByX)
  console.log(maxOrderNumb)

  /**
   * Phase 2 - Creating a template. 
   *  By creating a template that will be used across all the months,
   *  we can ensure consistant formatting/styling/"better" by "reserving"
   *  lines
   */
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