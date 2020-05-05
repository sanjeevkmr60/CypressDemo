/// <reference types="cypress" />

describe('Handling UI elemnents', () => { 
 
    it('Verifying Chekboxes and dropdowns', () => {
      cy.visit('http://demo.automationtesting.in/Register.html')
      cy.get('#checkbox1').check().should('be.checked').and('have.value','Cricket')
      cy.get('#checkbox2').check().should('be.checked').and('have.value','Movies')
      cy.get('#checkbox3').check().should('be.checked').and('have.value','Hockey')
      cy.get('#checkbox1').uncheck().should('not.be.checked')
      cy.get('#checkbox2').uncheck().should('not.be.checked')
      cy.get('#checkbox3').uncheck().should('not.be.checked')

      cy.get('input[type="checkbox"]').check(['Hockey','Movies'])
      cy.get('#Skills').select('Android').should('have.value','Android')
    })

    it('Verifying Multiselect in dropdowns', () => {
       
        cy.get('#msdd').click()
        cy.get('.ui-corner-all').contains('English').click()
        cy.get('.ui-corner-all').contains('Catalan').click()
       
      })

      it('Verifying search and select value from dropdown ', () => {
       
        cy.get('[role="combobox"]').click({force: true})
        cy.get('[type="search"]').type("India")
        cy.get('[type="search"]').type('{enter}')      
       
      })
})