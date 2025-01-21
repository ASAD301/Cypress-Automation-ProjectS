class LoginPage{
    
    login(username , password){
        cy.get("#username").type(username);
        cy.get("#password").type(password);
        cy.get("select").select("Student");
        cy.get("input[value='user']").click(); // user click
        cy.wait(4000);
        cy.on("window:alert",function(text){ // alart function 
            expect(text).to.equal("You will be limited to only fewer functionalities of the app. Proceed?")
        })
        cy.get("button#okayBtn").click();
        cy.get("input[id='signInBtn']").click();
    }

    succesfullLogin(){
        cy.contains("Shop Name").should("be.visible"); // txt visible assertion
        cy.url().should("include", "/shop"); // url validation 
    }
}
export default LoginPage