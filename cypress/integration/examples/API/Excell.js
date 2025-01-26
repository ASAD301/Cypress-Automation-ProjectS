/// <reference types = "cypress"/>
//const cypress = require("cypress")
// *** excel file convert json 
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
let pname; // product name 
let orderNumbr;

describe("Api Session ",()=>{
    it("loged in through local storaage",async ()=>{
        cy.LoginAPI().then(function()
        {
            cy.visit("https://rahulshettyacademy.com/client/",
                {
                onBeforeLoad : function(window){
                    window.localStorage.setItem("token", Cypress.env("token"))
                }
            })
        })
        cy.get(".card-body b").eq(1).then((element)=>{
            pname = element.text();
            cy.log(pname)
        })
        cy.get(".card-body ").eq(1).contains("Add To Cart").click();
        cy.get("button[routerlink*='cart']").click();
        cy.get("button").contains("Checkout").click();
        cy.get(".user__name .user__address").type("Ban")
        cy.get(".ta-results button").each(($el, index , $list)=>{
            const country = $el.text();
            cy.log(country);
            if(country === " Bangladesh"){
                cy.wrap($el).click();
                return false; 
            }
        })
        cy.get(".action__submit").click();
        cy.wait(3000);
        cy.get("tr button").contains("Excel").click();
        
        //excel file convert json
        const result = excelToJson({
            source: fs.readFileSync('SOME-EXCEL-FILE.xlsx') // fs.readFileSync return a Buffer
            });
        
    })
})