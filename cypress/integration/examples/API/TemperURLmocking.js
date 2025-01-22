//const cypress = require("cypress")

describe("Api Test suit", function(){
    it("Mock api http request", function(){
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
        cy.intercept("GET", "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty", (req)=>{
            req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra";
            req.continue(res=>{
                //expect(res.statusCode).to.equal(403);
            })

        }).as("demoUrl");

        cy.contains("button", "Virtual Library").click();
        cy.wait("@demoUrl")


    })
})