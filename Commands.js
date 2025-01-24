
Cypress.Commands.add("LoginAPI",()=>{
    
    // any api call cy.request()
    cy.request("POST", "https://rahulshettyacademy.com/api/ecom/auth/login", 
        {"userEmail": "asad.jatri@gmail.com", "userPassword": "$Learning1"}).then(function(respons){
            expect(respons.status).to.equal(200);
            Cypress.env("token", respons.body.token)
        })   
})