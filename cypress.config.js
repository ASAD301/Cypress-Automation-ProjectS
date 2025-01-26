const { defineConfig } = require("cypress");
// *** excel file convert json 
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const { on } = require("events");

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
   
}

module.exports = defineConfig({
  
  e2e: {
    setupNodeEvents,
    specPattern:"cypress/integration/examples/API/*.js"
  },
});
