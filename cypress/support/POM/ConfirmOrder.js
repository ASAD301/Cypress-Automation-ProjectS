
class ConfirmOrder{
    orderConfirm(countryName){
        //Order Confirm page 
    cy.get(".input-field input").type("Ban");
    cy.wait(6000)
    cy.get(".suggestions a").contains(countryName).click({force:true});
    cy.get(".checkbox  input").click({force:true});
    cy.get(".checkbox  input").should("be.checked");
    cy.contains("input", "Purchase").click();
    }

    orderSuccess(){
        cy.get(".alert").should("contain.html", "Your order will be delivered") // should contain.html
    }
}
export default ConfirmOrder