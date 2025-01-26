/// <reference types = "cypress"/>
const neatCSV = require("neat-csv")

let pname; // product name 
let orderNumbr;

describe("Api Session ",()=>{
    it("loged in through local storaage", async ()=>{
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
        cy.get("tr button").contains("CSV").click();
        
        //Cypress.config("fileServerFolder")  to create download file global path
        // cy.readfile > read file from path 
        cy.readFile(Cypress.config('fileServerFolder') + "/cypress/downloads/order-invoice_asad.jatri.csv")
        .then(async (text)=>{
            const csv = await neatCSV(text);
            console.log(csv);
            const purchaseName = csv[0]["Product Name"];
            const purchseID = csv[0]["Invoice Number"]
            expect(pname).to.equal(purchaseName);
        })
        
    })
})