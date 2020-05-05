/// <reference types="cypress" />
describe('Nurse Website',function(){
    beforeEach(() =>{       
        cy.fixture('medquest').then(function(data) {            
          this.data = data
        })    
      })
      it('MedQuest App ', function() {  
       cy.visit('https://pkmlzgh01qhs.cloud.wavemakeronline.com/Medical2')       
       cy.get('[name="button3"]').click()
       cy.wait(2000)
       cy.get('input[name="username"]').type('peter@gmail.com')
       cy.get('input[name="password"]').type('peter123')
       cy.get('input[name="password"]').type('{enter}')
       cy.get('a[href*="Refill"]').click()
       cy.get('button[name="button3"]').click()
       cy.get('.app-list-item').contains('Paracetamol').click()
       cy.get('[name="requestrefill"]').click()
       //cy.get('.app-label').contains('Thank You For Refilling Your Medicines')      
       cy.wait(2000) 
       let mail="peter@gmail.com"
       let patientName=[mail.split('@')]
       cy.log(patientName[0])
       
       cy.refillRequests(this.data.patientdashboard,this.data.accept,patientName[0],this.data.acceptcomment)
    }) 
      
    /*  it('Nurse Accept the Appointment Requests ', function() {         
        cy.appointmentRequests(this.data.patientdashboard,this.data.accept,this.data.pName,this.data.acceptcomment)
    }) */
    /*
    it('Nurse Rejects the Appointment Requests ', function() {
      cy.appointmentRequests(this.data.patientdashboard,this.data.reject,this.data.pName,this.data.rejectcomment)
    }) 
  
    it('Nurse Accept the Refill Requests ', function() {         
      cy.refillRequests(this.data.patientdashboard,this.data.accept,this.data.pName,this.data.acceptcomment)
  })
  
  it('Nurse Rejects the Refill Requests ', function() {
    cy.refillRequests(this.data.patientdashboard,this.data.reject,this.data.pName,this.data.rejectcomment)
  }) 
 */
 /*  it('Verify the doctors present ', function() {
    cy.visit(this.data.patientdashboard)
    cy.url().should('include','PatientDashboard')
    cy.get('[name="tile4"]').trigger('mouseover').click()
    cy.wait(2000)   
    cy.get('div[name="getDoctorDetailsList1"]> ul:nth-child(1)>li>').each(function($e,index) {      
      cy.get('div[name="getDoctorDetailsList1"]> ul:nth-child(1)>li>div>div:nth-child(2)>div>div>label:nth-child(1)').eq(index).then(function($bname){
         if(index=="12") 
         return false;
        
        const pName=$bname.text()
          cy.log(pName)
          
        })
     })
  }) */
  
})