//const cypress = require("cypress");

describe("upload download suit", function(){
    it("Verify Excel upload-download ", function(){

        
        const Filepath = Cypress.config('fileServerFolder') + "/cypress/downloads/download.xlsx";
        cy.visit("https://rahulshettyacademy.com/upload-download-test/index.html");
        cy.contains("Download").click();
        cy.task("excelTestWrite",{searchProduct:"Apple", writeProduct:101,priceChange:{row: 0, col: 2},filePath:Filepath});
        cy.get("#fileinput").selectFile(Filepath); // upload selectFile > no need click
        // price assertion 
        // find value under a row // next right cell value taking 
        cy.contains("Apple").parent().parent().find("#cell-4-undefined").should("have.text", 101) 

    })
})