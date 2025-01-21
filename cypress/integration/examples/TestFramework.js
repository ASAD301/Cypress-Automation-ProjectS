import LoginPage from "../../support/POM/LoginPage";
import ProductPage from "../../support/POM/ProductPage";
import CheckoutPage from "../../support/POM/CheckoutPage";
import ConfirmOrder from "../../support/POM/ConfirmOrder";
describe("This is Suite", function(){
    it("This is main Test ", function(){
        cy.visit("https://rahulshettyacademy.com/loginpagePractise/");

        // login page 
        const login = new LoginPage();
        login.login("rahulshettyacademy", "learning");
        login.succesfullLogin();

        // product page 
        const productPage = new ProductPage();
        productPage.totalProduct();
        productPage.addtoCart("iphone X");
        productPage.succesfullAddValidation();

        // checkout page 
        const checkoutPage = new CheckoutPage();
        checkoutPage.productNameValidation("iphone X", "Blackberry");
        checkoutPage.pricevaliation(200000); // price should less than it
        checkoutPage.checkoutProduct();

        //Confirm order page 
        const confirmOrder = new ConfirmOrder();
        confirmOrder.orderConfirm("Bangladesh"); // select country to order
        confirmOrder.orderSuccess();



    })
})