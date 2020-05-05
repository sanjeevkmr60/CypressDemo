/// <reference types="cypress" />

describe('Handling UI elemnents', () => { 
 
      it('Verifying Radiobuttons and Chekbox', () => {
        cy.visit('http://www.newtours.demoaut.com/')
        cy.url().should('include','newtours')
        cy.get('[name="userName"]').should('be.visible').should('be.enabled').type("mercury")
        cy.get('[name="password"]').should('be.visible').should('be.enabled').type("mercury")
        cy.get('input[name="login"]').should('be.visible').click()        
        cy.title().should('eq','Find a Flight: Mercury Tours:')         
        cy.get('input[value="roundtrip"]').should('be.visible').should('be.checked')     
        cy.get('input[value="oneway"]').should('be.visible').should('be.not.be.checked').click() 
        cy.get('[name="findFlights"]').should('be.visible').click()
        cy.title().should('eq','Select a Flight: Mercury Tours') 

      })
 })