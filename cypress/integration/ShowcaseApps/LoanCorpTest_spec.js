/// <reference types="cypress" />

import 'cypress-file-upload';

describe('LoanCorp App',function(){
  let loanIdApprove;
  let loanIdReject;
  let loanIdSiteVisit;
  
  beforeEach(() =>{       
    cy.fixture('loancorp').then(function(data) {            
      this.data = data
    })    
  })  
  
  it('Visits the WaveMaker Showcase Website', function() {
      cy.visit(this.data.showcasewebsite)      
      cy.get('a[href*="loanCorp"]').click()
      cy.url().should('contain', '/loanCorp')
      
      //cy.get('a[href*="PatientDashboard"]').click()
 }) 

  it('LornCorp Approved Scenario',function() {
     //Customer
      cy.customerLoan(this.data.customerwebsite,this.data.propertyaddress,this.data.downpayment,this.data.loantenure,
            this.data.purchasevalue,'w2Form4.png')
      cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1)').then(function($e){
      loanIdApprove=$e.text()
      cy.log('Customer Newly Created LoanId: '+loanIdApprove)
      cy.wait(5000)


      //Loan Processor
      cy.loanProcessor(this.data.loanprocessorwebsite,loanIdApprove,this.data.ssn,this.data.approvewages,this.data.state,this.data.ein,
        this.data.address,this.data.zip) 
      cy.wait(2000)
      cy.get('div > ul > li:nth-child(3) > a[class="app-anchor stl_current"]>span').then(function($span) {
        const status=$span.text()
        expect(status).to.equal(this.data.statusapprove)
      })     
      cy.go('back')
      cy.url().should('contain', '/LoanProcessor')
      cy.wait(2000)      
      cy.get('table > tbody > tr:nth-child(1)').contains(this.data.statusapprove)
    })    
 })  
 
  it('LornCorp Reject Scenario', function() {    
    //customer
      cy.customerLoan(this.data.customerwebsite,this.data.propertyaddress,this.data.downpayment,this.data.loantenure,
      this.data.purchasevalue,'w2Form4.png')
      cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1)').then(function($e) {
          loanIdReject=$e.text()
          cy.log('Customer Newly Created LoanId :'+loanIdReject)
          cy.wait(5000)
          //Loan Processor
          cy.loanProcessor(this.data.loanprocessorwebsite,loanIdReject,this.data.ssn,this.data.rejectwages,this.data.state,this.data.ein,
           this.data.address,this.data.zip)
          cy.wait(2000)
          cy.get('div > ul > li:nth-child(3) > a[class="app-anchor stl_current"]>span').then(function($span) {
              const status=$span.text()
              expect(status).to.equal(this.data.statusreject)
          })
          cy.go('back')
          cy.url().should('contain', '/LoanProcessor')
          cy.wait(1000)
          cy.get('table > tbody > tr:nth-child(1)').contains(this.data.statusreject)
      })
 })  
 
  it('LornCorp SiteVisit Scenario',function()  {
      //customer
      cy.customerLoan(this.data.customerwebsite,this.data.propertyaddress,this.data.downpayment,this.data.loantenure,
      this.data.purchasevalue,'w2Form4.png')
      cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1)').then(function($s) {
          loanIdSiteVisit=$s.text()
          cy.log('Customer Newly Created LoanId: '+loanIdSiteVisit)
          cy.wait(5000)
          cy.loanProcessor(this.data.loanprocessorwebsite,loanIdSiteVisit,this.data.ssn,this.data.sitevisitwages,this.data.state,this.data.ein,
          this.data.address,this.data.zip)
          cy.get('div > ul > li:nth-child(3) > a[class="app-anchor stl_current"]>span').then(function($span) {
            const status=$span.text()
            expect(status).to.equal(this.data.statussitevisit)
          })
          cy.wait(2000)
          cy.visit(this.data.rmapp)
          cy.wait(15000)
          cy.reload()
          cy.wait(2000)
          cy.get('[name="notification"] > img.anchor-image-icon').click({force: true})
          cy.wait(8000)
          cy.get('div[name="NotificationList"] > ul > li:nth-child(1) > div > div > div:nth-child(2)>div:nth-child(2)').then(function($e){
            const loanId=$e.text()
            expect(loanId).to.equal(loanIdSiteVisit)
            cy.get('div[name="NotificationList"] > ul > li:nth-child(1)').find('a[name="loanAnchor"]').click()
          })
          cy.get('wm-textarea[name="commentsArea"] > textarea').scrollIntoView({ duration: 2000 }).type(this.data.rmstatus)
          cy.get('button[name="button1"]>span').click()
          cy.wait(3000)
          cy.visit(this.data.loanprocessorwebsite)
          cy.wait(2000)
          cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1) > div > a > span').contains(loanIdSiteVisit)
          cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1) > div > a').scrollIntoView({ duration: 2000 })
          cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1) > div > a').click({force: true})
          cy.get('a[title="Site Visit"]').click()
          cy.wait(2000)
          cy.get('div.tab-pane.active > div > label:nth-child(2)').then(function($e){
             const comment=$e.text()
             expect(comment).to.equal(this.data.rmstatus)
          })
          cy.get('[name="reviewCompleteBttn"]').click({force: true})
          cy.wait(2000)
          cy.get('div > ul > li:nth-child(4) > a[class="app-anchor stl_current"]>span').then(function($span) {
            const status=$span.text()
            expect(status).to.equal(this.data.statusfinalreview)
          })
          cy.get('[name="loanApproveBtn"]').click({force: true})
          cy.wait(4000)
          cy.get('.table > tbody > tr:nth-child(1)').contains(this.data.statusapprove)
          cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1) > div > a').scrollIntoView({ duration: 2000 })
          cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1) > div > a').click({force: true})
          cy.wait(2000)
          cy.get('div > ul > li:nth-child(5) > a[class="app-anchor stl_current"]>span').then(function($span) {
            const status=$span.text()
            expect(status).to.equal(this.data.statusapprove)
          })
          cy.go('back')
          cy.wait(2000)
          cy.get('table > tbody > tr:nth-child(1)').contains(this.data.statusapprove)
      })    
  })
 
   /*  it('LornCorp docusign',function() {  
    cy.visit(this.data.customerwebsite)    
    cy.url().should('contain', '/myAccount')
    cy.contains('View Product').click()
    cy.get('button[caption="Apply"]').click()    
    cy.get('button[name="nextBtn_wizard1"]').click({force: true})   

    for(var i=0;;i++){
      cy.get('input[name="search1"]').clear()
      cy.get('input[name="search1"]').type(this.data.propertyaddress)    
      cy.wait(2000)   
      cy.get('input[name="search1"]').type('{enter}')
      cy.get('[title="Search"]').click({force: true}) 
      cy.wait(2000)          
      if(cy.get('button[name="nextBtn_wizard1"]').should('be.enabled')){
        cy.get('button[name="nextBtn_wizard1"]').click({force: true})        
        cy.wait(5000)
        break
      }      
    }
    cy.get('select[name="downPayment_formWidget"]').select(this.data.downpayment)
    cy.get('select[name="loanTenure_formWidget"]').select(this.data.loantenure)
    cy.get('input[name="purchaseValue_formWidget"]').type(this.data.purchasevalue)
    cy.get('[title="Loan Amount"]').click()
    cy.get('button[name="nextBtn_wizard1"]').click({force: true})
    const yourFixturePath = 'W2-filledform.pdf';
    cy.get('[data-col-identifier="customField"]>div:nth-child(2)>div').find('[name="files"]').attachFile(yourFixturePath,{ force: true });
    //cy.get('[name="files"]').attachFile(yourFixturePath,{ force: true });
    cy.wait(8000)
     cy.pause()    
    cy.get('.table>tbody>tr>td:nth-child(4)>div>section:nth-child(3)>app-prefab-boxview>div>a').click({force: true})
    cy.pause()
    //cy.get('button[aria-label="Submit button"]').click({force: true})
    //cy.pause() 
    //cy.get('button[name="doneBtn_wizard1"]').click({force: true})    
    //cy.wait(3000)
    //cy.get('[name="dialogactions1"]').find('button').click() 
    
   })  */
})