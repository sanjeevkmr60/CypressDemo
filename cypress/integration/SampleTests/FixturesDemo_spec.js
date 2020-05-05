/// <reference types="cypress" />

describe('Fixtures Demo',function () { 
 
 
    before(function () {       
        cy.fixture('sample').then(function(data) {            
            this.data = data
          })
    })  
   

    it('Verifying Fixtures Demo',function () {
     cy.visit('https://demo.nopcommerce.com/login?returnUrl=%2Flogin')
     
     //cy.get('[name="Email"]').type('admin@yourstore.com')
     cy.get('input[name="Email"]').type(this.data.email)
     //cy.get('[name="Password"]').type('admin')
     cy.get('input[name="Password"]').type(this.data.password)
     cy.get('[type="submit"]').click({multiple: true})

    })

})