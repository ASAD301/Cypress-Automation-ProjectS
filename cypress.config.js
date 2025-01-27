const { defineConfig } = require("cypress");
// *** excel file convert json 
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const { on } = require("events");
const Exceljs = require("exceljs");

async function setupNodeEvents(on, config) {
  on('task', {   //excell task create on("task", { })
    //excel file convert
    excelToJsonConverter(filePath){
        const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
      })
      return result;
    }
  })

  on("task", {
    // user carly bracket for multiple parameter
    async excelTestWrite({searchProduct, writeProduct,priceChange,  filePath}){ 
      await workbook.xlsx.readFile(filePath); // promis  
      const workSheet = workbook.getWorksheet("Sheet1") //read target Sheet1
  
      const output = await excelRead(workSheet, searchProduct);
      console.log(output.row+ " "+ output.col);
  
     // const cell =  workSheet.getCell(output.row, output.col) // access cell value to change name
      const cell =  workSheet.getCell(output.row, output.col+priceChange.col); // access cell value to change price
      cell.value = writeProduct ;
      await workbook.xlsx.writeFile(filePath);
      console.log("Product Change to:"+ cell.value); // write product name
  }
  })
   
}
async function excelRead(workSheet, searchProduct) {
  let output = {row:-1, col:-1} // out put object create 
  workSheet.eachRow((row, rowNumber)=>{ //outer loop work on row 
      row.eachCell((cell, colNumber )=>{ // inner loop work on cellcolumn 
          if(cell.value === searchProduct){
              console.log("Search Product : "+cell.value);
              output.row = rowNumber;
              output.col = colNumber;
              console.log("row no: "+output.row+ " column no = "+ output.col);
          }

      })
  })
  return output;
}

module.exports = defineConfig({
  
  e2e: {
    setupNodeEvents,
    specPattern:"cypress/integration/examples/API/*.js"
  },
});
