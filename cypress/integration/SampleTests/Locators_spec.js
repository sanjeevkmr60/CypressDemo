/// <reference types="cypress" />

describe('Locating Elements', () => { 
 
      it('Verifying Locating elements', () => {
        cy.visit('https://www.google.com/')
        cy.get('[name="q"]').type("Cypress")
        cy.get('.gLFyf').type(" Cypress Automation")
        cy.get('.gLFyf[type="text"]').type(" Hello World")
        cy.title().should('eq','Google')         
        cy.get('#gb_70').should('have.text', 'Sign in')       
      })

      it('Verifying Locating elements Demo ', () => {
          cy.visit('https://demo.nopcommerce.com/')
          cy.get('#small-searchterms').type('Apple MacBook Pro 13-inch')
          cy.get('[type="submit"]').click()
          cy.get('.product-box-add-to-cart-button[value="Add to cart"]').click()
          cy.get('#addtocart_4_EnteredQuantity').clear().type('2')
          cy.get('#add-to-cart-button-4').click()
          cy.wait(5000)
          cy.get('#topcartlink > a > span.cart-label').click()
          cy.wait(4000)
          cy.get('span.product-unit-price').contains('$1,800.00')

      })

})