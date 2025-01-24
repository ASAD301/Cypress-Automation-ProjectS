/// <reference types = "cypress"/>
//const cypress = require("cypress")

describe("Api Session ",()=>{
    it("loged in through local storaage",()=>{
        cy.LoginAPI().then(function()
        {
            cy.visit("https://rahulshettyacademy.com/client/",
                {
                onBeforeLoad : function(window){
                    window.localStorage.setItem("token", Cypress.env("token"))
                }
            })
        })
    })
})