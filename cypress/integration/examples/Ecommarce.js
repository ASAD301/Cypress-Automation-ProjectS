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

        
    })
})