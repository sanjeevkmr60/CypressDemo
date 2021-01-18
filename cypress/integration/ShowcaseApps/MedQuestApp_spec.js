/// <reference types="cypress" />

describe('MedQuest App',function(){

    beforeEach(() =>{       
        cy.fixture('medquest').then(function(data) {            
          this.data = data
        })    
    })

     /* it('MedQuest App Appointments ', function() {  
        cy.visit('https://pkmlzgh01qhs.cloud.wavemakeronline.com/Medical2') 
        cy.wait(3000)          
       cy.get('[name="button3"]').click()
       cy.wait(3000)
       cy.get('input[name="username"]').type('shamanth@gmail.com')
       cy.get('input[name="password"]').type('shamanth123')
       cy.get('input[name="password"]').type('{enter}')
       cy.visit('https://pkmlzgh01qhs.cloud.wavemakeronline.com/Medical2')
       cy.wait(2000) 
       cy.get('[name="button2"]').click()
       cy.wait(2000) 
       //cy.get('input[name="form_field4_formWidget"]').type(" Dentistry").type('{enter}')
       //cy.wait(1000)
       //cy.get('input[name="form_field4_formWidget"]').type('{enter}')

       cy.get('[name="DepartmentList1"]> ul > li:nth-child(1)').click()
       cy.get('[name="nextBtn_wizard1"]').click()          
       cy.wait(2000) 
       cy.get('#widget-id216').type('Tooth ache')
       const todaysDate = Cypress.moment().format('YYYY-MM-DD')
       cy.log(todaysDate)
       cy.get('input[type="date"]').type(todaysDate)  
       cy.wait(3000)
       //cy.get('input[type="date"]').type('2020-05-21')
       cy.pause()
       cy.get('[title="04:00 PM"]').click()
       cy.get('[name="save"]').click()
       cy.visit(this.data.patientdashboard)
       cy.url().should('include','PatientDashboard')
       cy.get('[name="tile2"]').trigger('mouseover').click() 
       cy.wait(2000) 
       cy.get('div[name="container13"]>div:nth-child(2)>div:nth-child(1)').each(function($e,index) {        
        cy.get('div[name="container13"]>div:nth-child(2)>div:nth-child(1)>label').eq(index).then(function($e){
          cy.wait(2000)
          const pName=$e.text().substring(0,3).toLowerCase()
          cy.log('RequestedPatient Name :'+pName) 
          let mail="shamanth@gmail.com"
          patientName=mail.split('@')
          cy.log(patientName[0])    
          if(patientName[0].substring(0,3).toLowerCase().includes(pName)){
            if(expect(pConfirmed).to.equal(patientName[0].substring(0,3).toLowerCase()))
            cy.log('Requested Patient Refilled'+patientName) 
          }
        })
       })    

      
    })   */
    
     it('MedQuest App Refill ', function() {  
        cy.visit('https://pkmlzgh01qhs.cloud.wavemakeronline.com/Medical2') 
        cy.wait(3000)            
       cy.get('[name="button3"]').click()
       cy.wait(3000)
       cy.get('input[name="username"]').type('peter@gmail.com')
       cy.get('input[name="password"]').type('peter123')
       cy.get('input[name="password"]').type('{enter}')
       cy.visit('https://pkmlzgh01qhs.cloud.wavemakeronline.com/Medical2') 
       cy.wait(2000)
       cy.get('a[href*="Refill"]').click()
       cy.wait(2000)
       cy.get('button[name="button3"]').click()
       cy.wait(2000)
       cy.get('.app-list-item').contains('Paracetamol').click()
       cy.get('[name="requestrefill"]').click()
       cy.contains('Thank You For Refilling Your Medicines')      
       cy.wait(2000) 
       cy.visit(this.data.patientdashboard)
       cy.url().should('include','PatientDashboard')
       cy.get('[name="tile3"]').trigger('mouseover').click() 
       cy.wait(5000)
       let count=0
       cy.get('div[name="container12"]>div:nth-child(2)').each(function($e,index) {        
        return cy.get('div[name="container12"]>div:nth-child(2)>label:nth-child(1)').eq(index).then(function($e){
          cy.wait(2000)
          const pName=$e.text().substring(0,3).toLowerCase()
          //cy.log('RequestedPatient Name :'+pName) 
          let mail="Divya@gmail.com"
          let patientName=mail.split('@')
          //cy.log(patientName[0])  
           if(pName.includes(patientName[0].substring(0,3).toLowerCase())) {          
            if(expect(pName).to.equal(patientName[0].substring(0,3).toLowerCase())){
              cy.log('Requested Patient Refilled is verified : '+patientName[0]) 
                
            }             
           } 
          
        })
        
       })
       
       
    })  
     
     

    /*  it('Nurse Accept the Appointment Requests ', function() {
      let mail="fehn@gmail.com"
      let patientName=mail.split('@')
      cy.log(patientName[0])        
      cy.appointmentRequests(this.data.patientdashboard,this.data.accept,patientName[0],this.data.acceptcomment)
    })   */
/*
       it('Nurse Rejects the Appointment Requests ', function() {
      let mail="divya@gmail.com"
      let patientName=mail.split('@')
      cy.log(patientName[0])  
      cy.appointmentRequests(this.data.patientdashboard,this.data.reject,patientName[0],this.data.rejectcomment)
    }) 
    
    it('Nurse Accept the Refill Requests ', function() { 
      //working fine
      let mail="keleigh@gmail.com"
      let patientName=mail.split('@')
      cy.log(patientName[0])          
      cy.refillRequests(this.data.patientdashboard,this.data.accept,patientName[0],this.data.acceptcomment)
    }) 
    
    it('Nurse Rejects the Refill Requests ', function() {
    let mail="peter@gmail.com"
    let patientName=mail.split('@')
    cy.log(patientName[0]) 
    cy.refillRequests(this.data.patientdashboard,this.data.reject,patientName[0],this.data.rejectcomment)
    }) 

    it('Verify the doctors present ', function() {
    cy.visit(this.data.patientdashboard)
    cy.url().should('include','PatientDashboard')
    cy.get('[name="tile4"]').trigger('mouseover').click()
    cy.wait(2000)   
    cy.get('div[name="getDoctorDetailsList1"]> ul:nth-child(1)>li').each(function($e,index) { 
      cy.get('div[name="getDoctorDetailsList1"]> ul:nth-child(1)>li>div>div:nth-child(2)>div>div>label:nth-child(1)')
      .eq(index).then(function($bname){            
        const pName=$bname.text()
          cy.log(pName)    
        })
      })
    })  
    
    */
 
   /* 
    it('Pharamacist Accept the Refill Requests ', function() { 
      //working fine
      let mail="david@gmail.com"
      let patientName=mail.split('@')
      cy.log(patientName[0])          
      cy.refillRequests(this.data.patientdashboard,this.data.accept,patientName[0],this.data.acceptcomment)
      cy.log('**********Completed***********')
      cy.wait(2000)
      cy.pharamcistRefillRequests(this.data.pharmcistwebsite,this.data.accept,patientName[0],this.data.acceptcomment)
      cy.log('********** Final Completed***********')
    }) 
    
    it('Pharamacist Rejects the Refill Requests ', function() {
    let mail="divya@gmail.com"
    let patientName=mail.split('@')
    cy.log(patientName[0]) 
    cy.refillRequests(this.data.patientdashboard,this.data.accept,patientName[0],this.data.acceptcomment)
    cy.log('**********Completed***********')
    cy.wait(2000)
    cy.pharamcistRefillRequests(this.data.pharmcistwebsite,this.data.reject,patientName[0],this.data.rejectcomment)
    cy.log('********** Final Completed***********')
    })  
*/
  
  
})