/// <reference types="cypress" />

describe('Handling Alerts', () => { 
 
    it('Verifying Alert Pops', () => {
      cy.visit('https://www.browserstack.com/users/sign_up')
      cy.get('#user_submit').click() 
  
      cy.on('window:alert',(str) => {          
          expect(str).to.equal('Please check the box to confirm acceptance of our Privacy Policy and Terms of Service')
      })
    })

})