describe('Custom commands Demo',function () { 
   

    it('Login Test',function () {
     cy.login('admin@yourstore.com','admin')
     cy.title().should('be.equal','nopCommerce demo store. Login')
    })

    it('Add customer Test',function () {
        cy.login('admin@yourstore.com','admin')
        cy.title().should('be.equal','nopCommerce demo store. Login')
        //Adding customer Test
        cy.log('Adding customer************')
    })

    it('Edit customer Test',function () {
        cy.login('admin@yourstore.com','admin')
        cy.title().should('be.equal','nopCommerce demo store. Login')
        //Edit customer test
        cy.log('Editing  customer************')
    })


})