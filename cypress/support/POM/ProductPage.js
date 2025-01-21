class ProductPage{
    
    totalProduct(){
        cy.get(".row app-card").should("have.length",4) // assertion toal product 
    }
    
    addtoCart(productName){
        cy.get(".row .card").each(($el , index , $list )=>{
            const text = $el.find("h4").text();
            cy.log(text);
            if(text.includes(productName)){
                cy.log("pass");
                cy.wrap($el).contains("button", "Add").click();
                
            }
            return false; // use to break the each loop
        })
        cy.get(".row .card").eq(3).contains("button", "Add").click();
    }
    succesfullAddValidation(){
        cy.contains("a", "Checkout").click();
        cy.contains("button", " Continue Shopping").should("be.visible");
    }  
}
export default ProductPage