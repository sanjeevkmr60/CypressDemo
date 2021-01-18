
/// <reference types="cypress" />

import CustomerPage from '../PageObjects/CustomerPage'

describe('PageObjectpattern',function(){
  it('Testcase 1',function(){
     var cp=new CustomerPage()
     cp.visit()
     cp.clickOnViewProduct()
     cp.clickOnApply()
     cy.get('label[name="label4_1"]').should('have.text','Tom Brown')
     

  })  

})