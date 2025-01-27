const Exceljs = require("exceljs");

async function excelTestWrite(searchProduct, writeProduct,priceChange,  filePath){
    const workbook = new Exceljs.Workbook(); // create workboox object
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
// ...........read value , write value, {object} , filepath
excelTestWrite("Iphone", 301, {row: 0, col: 2},"/Users/asad/downloads/download.xlsx"); 
//excelTestWrite("Apple", "Iphone","/Users/asad/downloads/download.xlsx"); > name change
  