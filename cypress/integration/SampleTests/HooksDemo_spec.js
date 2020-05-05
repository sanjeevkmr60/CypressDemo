describe('Hooks Demo', () => {
    
    before(() => {
        // runs once before all tests in the block
        cy.log('******Setup block*******')
      })
    
      after(() => {
        // runs once after all tests in the block
        cy.log('******Tear Down block*******')
      })
    
      beforeEach(() => {
        // runs before each test in the block
        cy.log('******This is login block*******')
      })
    
      afterEach(() => {
        // runs after each test in the block
        cy.log('******This is logout block*******')
      })


    it('Searching', () => {
     cy.log('************* Searching test********')     

    })
    it('Advanced Searching', () => {
        cy.log('************* Advanced Searching test********')  
   
   })
   it('Listing products', () => {
    cy.log('************* Listing products********') 

   })


})