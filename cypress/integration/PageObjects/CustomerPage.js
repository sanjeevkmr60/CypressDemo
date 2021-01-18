

class CustomerPage{
    visit(){
       cy.visit('https://apps.wavemakeronline.com/Herdius/#/myAccount') 
       cy.wait(1000)
    }
    clickOnViewProduct(){
        cy.contains('View Product').click()
        
    }
    clickOnApply(){
        cy.get('button[caption="Apply"]').click({force: true})
        
    }   

}
export default CustomerPage