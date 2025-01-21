//const cypress = require("cypress")
describe("This is Suite", function(){
    it("This is main Test ", function(){
        // visit web url
        cy.visit("https://rahulshettyacademy.com/loginpagePractise/");

        // login function work 
        cy.get("#username").type("rahulshettyacademy");
        cy.get("#password").type("learning");
        cy.get("select").select("Student");
        cy.get("input[value='user']").click(); // user click
        cy.wait(4000);
        cy.on("window:alert",function(text){ // alart function 
            expect(text).to.equal("You will be limited to only fewer functionalities of the app. Proceed?")
        })
        cy.get("button#okayBtn").click();
        cy.get("input[id='signInBtn']").click();

        // Add to card product 
        cy.contains("Shop Name").should("be.visible"); // txt visible assertion
        
        cy.get(".row app-card").should("have.length",4) // assertion toal product 

        cy.get(".row .card").each(($el , index , $list )=>{
            const text = $el.find("h4").text();
            cy.log(text);
            if(text.includes("iphone X")){
                cy.log("pass");
                cy.wrap($el).contains("button", "Add").click();
                
            }
            return false; // use to break the each loop
        })
        cy.get(".row .card").eq(3).contains("button", "Add").click();
        cy.contains("a", "Checkout").click();

        // Checkout page product name validation
        let product_array = ["iphone X", "Blackberry"];
        cy.get("div h4").each(($el , index , $list)=>{
            let text = $el.text();
            if(product_array[index] === text ){
                cy.log("product matched");
            }
            else{
                cy.log("product not matched")
            }
        })
        //checkout product price validation 
        let sum = 0;
        cy.get("tr td:nth-child(4) strong").each(($el, index , $list)=>{
            let price = $el.text();
            let priceMoney = price.split(" ")[1];
            cy.log(priceMoney);
            sum = sum + Number(priceMoney);
            cy.log("Total price = "+sum);
        })
        expect(sum).to.be.lessThan(200000);
        cy.contains("button", "Checkout").click();

        //Order Confirm page 
        cy.get(".input-field input").type("Ban");
        cy.wait(6000)
        cy.get(".suggestions a").contains("Bangladesh").click({force:true});
        cy.get(".checkbox  input").click({force:true});
        cy.get(".checkbox  input").should("be.checked");
        cy.contains("input", "Purchase").click();
        cy.get(".alert").should("contain.html", "Your order will be delivered") // should contain.html
        
    })
})