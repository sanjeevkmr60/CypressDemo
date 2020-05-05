
import 'cypress-wait-until';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login',function(email, pw) {
    cy.visit('https://demo.nopcommerce.com/login?returnUrl=%2Flogin')     
    cy.get('[name="Email"]').type(email)     
    cy.get('[name="Password"]').type(pw)     
    cy.get('[type="submit"]').click({multiple: true})
})

Cypress.Commands.add('customerLoan', function(customerWebsite,propertyAddress,dPayment,loanTenure,purchaseValue,filename) {
    cy.visit(customerWebsite)    
    cy.url().should('contain', '/myAccount')
    cy.contains('View Product').click()
    cy.get('button[caption="Apply"]').click()    
    cy.get('button[name="nextBtn_wizard1"]').click({force: true})
    cy.get('input[name="search1"]').type(propertyAddress)    
    cy.wait(2000)   
    cy.get('input[name="search1"]').type('{enter}')
    cy.get('[name="mapContainer"]').should('be.visible')  
    cy.wait(5000) 
    cy.get('button[name="nextBtn_wizard1"]').click({force: true})
    cy.wait(3000)
    cy.get('select[name="downPayment_formWidget"]').select(dPayment)
    cy.get('select[name="loanTenure_formWidget"]').select(loanTenure)
    cy.get('input[name="purchaseValue_formWidget"]').type(purchaseValue)
    cy.get('[title="Loan Amount"]').click()
    cy.get('button[name="nextBtn_wizard1"]').click({force: true})
    const yourFixturePath = filename;
    cy.get('[name="files"]').attachFile(yourFixturePath);
    cy.wait(4000)
    /* cy.pause()    
    cy.get('.table>tbody>tr>td:nth-child(4)>div>section:nth-child(3)>app-prefab-boxview>div>a').click({force: true})
    cy.pause()
    cy.get('button[aria-label="Submit button"]').click({force: true})
    cy.pause() */
    cy.get('button[name="doneBtn_wizard1"]').click({force: true})    
    cy.wait(2000)
    cy.get('[name="dialogactions1"]').find('button').click()    
    cy.url().should('contain', '/myAccount')
})

Cypress.Commands.add('loanProcessor', function(loanProcessorWebsite,cLoanId,ssn,wages,state,ein,address,zip) {
    cy.visit(loanProcessorWebsite)
    cy.url().should('contain', '/LoanProcessor')
    cy.wait(2000)
    cy.get('a[caption="Loan Pipeline"]').click()   
    cy.location('href').should('contain', '/Loans')  
    cy.wait(3000)   
    let pLoanId
      cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1) > div > a >span').then(function($a) {
       pLoanId=$a.text()
       cy.log('LoanId created by Customer :'+cLoanId)
       cy.log('LoanId created in visible in LoanProcessor :' +pLoanId) 
       expect(cLoanId).to.eq(pLoanId) 
       cy.get('tr[data-row-id="0"]').find('a').click()
       cy.wait(2000) 
       cy.get('[name="startProcessingBttn"]').click()
       cy.wait(2000)
       cy.location('href').should('contain', '/LoanDetails')
       cy.get('a[title="W2"]').click()
       cy.get('form').within(($form) => {     
         cy.get('input[name="ssn_formWidget"]').type(ssn)
         cy.get('input[name="wages_formWidget"]').type(wages)
         cy.get('input[name="state_formWidget"]').type(state)
         cy.get('input[name="ein_formWidget"]').type(ein)
         cy.get('input[name="address_formWidget"]').type(address)
         cy.get('input[name="zip_formWidget"]').type(zip) 
         cy.get('[name="save"]').click()     
       })
   })    
})

Cypress.Commands.add('forceVisit', function(url)  {
    cy.get('body').then($body => {    
      const appWindow = $body[0].ownerDocument.defaultView;
      const appIframe = appWindow.parent.document.querySelector('iframe');       
      cy.log(appWindow)
      cy.log(appIframe)
      // We return a promise here because we don't want to
      // continue from this command until the new page is
      // loaded.      
      return new Promise(resolve => {   
        cy.wait(8000)          
        appIframe.onload = () => resolve(); 
        appWindow.location = url;        
      });
    });
  });


  /* it('Cypress.Promise - instantiate a bluebird promise', () => {
    // https://on.cypress.io/promise
    let waited = false  
    function waitOneSecond () {    
      return new Cypress.Promise((resolve, reject) => {
        setTimeout(() => {        
          waited = true         
          resolve('foo')
        }, 1000)
      })
    }
    cy.then(() =>   
      waitOneSecond().then((str) => {
        expect(str).to.eq('foo')
        expect(waited).to.be.true
      }))
  }) */

  Cypress.Commands.add('appointmentRequests', function(nursewebsite,acceptRejectmark,patientName,comments) {
    cy.visit(nursewebsite)
    cy.url().should('include','PatientDashboard')
    cy.get('[name="tile2"]').trigger('mouseover').click()
    cy.get('div[name="container13"]>div:nth-child(2)>label:nth-child(1)').each(function($e,index,$list) {
        cy.wait(2000)
        cy.get('div[name="container13"]>div:nth-child(2)>label:nth-child(1)').eq(index).then(function($bname){
            const pName=$bname.text()      
            if(pName.includes(patientName)){
              if(acceptRejectmark){
               cy.log('RequestedPatient Name :'+pName)
               cy.get('[name="accept_button"]').eq(index).click()
               cy.wait(2000)
               cy.get('[name="acceptcomments_textarea"]').eq(index).type(comments)
               cy.get('[name="button3"]').click()
               cy.wait(2000)
               cy.get('[title="Confirmed"]').click()
               cy.wait(3000)
               cy.get('div[name="container19"]>div:nth-child(2)>label:nth-child(1)').each(function($e,index,$list){
                 cy.wait(2000)
                 cy.get('div[name="container19"]>div:nth-child(2)>label:nth-child(1)').eq(index).then(function($bname){
                    const pConfirmed=$bname.text()
                    if(pConfirmed.includes(patientName)){
                      if(expect(pConfirmed).to.equal(patientName)){
                        cy.log('Requested Patient confirmed'+pConfirmed)
                      }                      
                    }                                    
                 })
               })                     
              }
              else{
                cy.log('RequestedPatient Name :'+pName)
                cy.get('[name="reject_button"]').eq(index).click() 
                cy.wait(2000)
                cy.get('[name="reject_comments_textarea"]').eq(index).type(comments)
                cy.get('[name="button4"]').click()                
                cy.wait(2000)
               cy.get('[title="Cancelled"]').click()
               cy.get('div[name="container25"]>div:nth-child(2)>label:nth-child(1)').each(function($e,index,$list){
                 cy.wait(2000)
                 cy.get('div[name="container25"]>div:nth-child(2)>label:nth-child(1)').eq(index).then(function($bname){
                    const pCancelled=$bname.text() 
                    if(pCancelled.includes(patientName)){
                      expect(pCancelled).to.equal(patientName)
                      cy.log('Requested Patient Rejected'+pCancelled)
                    }
                    else
                     throw new Error('Requested Patient is not rejected:'+pCancelled)
                    
                 })
               })                         
              }
            }         
        
    })
  })
})

Cypress.Commands.add('refillRequests', function(nursewebsite,acceptRejectmark,patientName,comments) {
  cy.visit(nursewebsite)
  cy.url().should('include','PatientDashboard')
  cy.get('[name="tile3"]').trigger('mouseover').click()
  cy.wait(5000)
  cy.get('div[name="container12"]>div:nth-child(2)').each(function($e,index,$list) {    
      
      cy.get('div[name="container12"]>div:nth-child(2)>label:nth-child(1)').eq(index).then(function($bname){
          cy.wait(2000)  
          const pName=$bname.text().substring(0,4) 
          cy.log(pName)                    
          if((patientName.toLowerCase).includes(pName.toLowerCase)){
            if(acceptRejectmark){
             cy.log('Refill Patient Name :'+pName)
             cy.get('[name="accept_button"]').eq(index).click()
             cy.wait(2000)
             cy.get('[name="acceptcomments_textarea"]').eq(index).type(comments)
             cy.get('[name="button3"]').click()
             cy.wait(2000)
             cy.get('[title="Confirmed"]').click()
             cy.wait(2000)
             cy.get('div[name="getRefillRequestsList1"]>div:nth-child(2)>label:nth-child(1)').each(function($e,index,$list){
               cy.wait(2000)
               cy.get('div[name="getRefillRequestsList1"]>div:nth-child(2)>label:nth-child(1)').eq(index).then(function($bname){
                  const pConfirmed=$bname.text()
                  if(pConfirmed.includes(patientName)){
                    expect(pConfirmed).to.equal(patientName)
                    cy.log('Refill Patient confirmed'+pConfirmed)
                  } 
                  else
                   throw new Error('Refill Patient is not confirmed:'+pconfirmed)                  
               })
             })                     
            }
            else{
              cy.log('RequestedPatient Name :'+pName)
              cy.get('[name="reject_button"]').eq(index).click() 
              cy.wait(2000)
              cy.get('[name="reject_comments_textarea"]').eq(index).type(comments)
              cy.get('[name="button4"]').click()                
              cy.wait(2000)
             cy.get('[title="Cancelled"]').click()
             cy.get('div[name="getPrescriptionRefillsList1_1"]>div:nth-child(2)>label:nth-child(1)').each(function($e,index,$list){
               cy.wait(2000)
               cy.get('div[name="getPrescriptionRefillsList1_1"]>div:nth-child(2)>label:nth-child(1)').eq(index).then(function($bname){
                  const pCancelled=$bname.text() 
                  if(pCancelled.includes(patientName)){
                    expect(pCancelled).to.equal(patientName)
                    cy.log('Refill Patient Rejected'+pCancelled)
                  }
                  else
                   throw new Error('Refill Patient is not rejected:'+pCancelled)
                  
               })
             })                         
            }
          }                     
      })
      
  })
})
  
