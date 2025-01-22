//const cypress = require("cypress")

describe("Api Test suit", function(){
    it("Mock api http request", function(){
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");


        cy.intercept(
            {
                method: 'GET',
                url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
            },
            {
                statusCode: 200,
                body: [
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "LSA",
                        "aisle": "2303"
                    }]
            }
        ).as("bookretrievals");
        cy.contains("button", "Virtual Library").click();
        cy.wait("@bookretrievals").then(function({request, response}){ // then function use two property {request , respons }
            // verify api respons count and web element count  
            cy.get("tr").should("have.length", response.body.length+1 )
            response.body.length
        })
        cy.get('p').should("have.text", "Oops only 1 Book available"); 

        // length of respons array = rows of the table (should match)


    })
})