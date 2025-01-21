
class CheckoutPage{

    productNameValidation(product1, product2){
        // Checkout page product name validation
    let product_array = [product1, product2];
    cy.get("div h4").each(($el , index , $list)=>{
        let text = $el.text();
        if(product_array[index] === text ){
            cy.log("product matched");
        }
        else{
            cy.log("product not matched")
        }
    })
    }

    productPrice(){
        let sum = 0;
        cy.get("tr td:nth-child(4) strong").each(($el, index , $list)=>{
            let price = $el.text();
            let priceMoney = price.split(" ")[1];
            cy.log(priceMoney);
            sum = sum + Number(priceMoney);
            cy.log("Total price = "+sum);
        })
        return sum;
    }

    pricevaliation(validatePrice){
        expect(this.productPrice()).to.be.lessThan(validatePrice);
       
    }

    checkoutProduct(){
        cy.contains("button", "Checkout").click();
    }

    
}
export default CheckoutPage