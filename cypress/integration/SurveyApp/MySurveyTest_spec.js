/// <reference types="cypress" />
describe(' "My Survey" Page',function(){
     
      beforeEach(() =>{       
            cy.fixture('surveydata').then(function(survey) {            
              this.survey = survey
            })    
          })


  /*  it('Verify "My Survey" Tab', function() {
      //cy.loginSurveyApp("sanjeev.bandari@wavemaker.com","pramati123")
      cy.loginSurveyApp(this.survey.url,this.survey.loginAdmin,this.survey.password)
        cy.wait(6000) 
      cy.get('[name="linkMySurvey"]').click()
      cy.get('[role="tablist"]>li:nth-child(1)>a>div>span').should("have.text","Created by me")
      cy.get('[role="tablist"]>li:nth-child(2)>a>div>span').should("have.text","Assigned to Me")
      cy.get('[name="searchMySurvey"]').should('be.visible')
      cy.get('[name="tabpaneMySurvey"]>div>div>div>div:nth-child(2)>button').should('be.visible')
      //Filter popup
      cy.get('[name="tabpaneMySurvey"]>div>div>div>div:nth-child(2)>button').click()
      cy.wait(1000)
      cy.get('button[caption="Cancel"]').click({force: true})
 
      //Verify the records are there in the List
      cy.get('[name="ListSurveyDetails"]>ul>li').its('length').should('be.gt', 0) // calls 'length' property returning that value
      cy.wait(1000)
      //SearchBy status and verify the record is present in the List
       cy.verifySearchBy('Draft')

      //SearchBy SurveyId and verify the record is present in the List
       cy.verifySearchBy('SUR0000738')

       //SearchBy SurveyName and verify the record is present in the List
       cy.verifySearchBy('Testing abc')

       //Verify record is present in the List without searching done,verfiy with content in rectangulat tile
       cy.wait(2000)
       cy.verifySurveyList('Draft','Created by me')

      //if we can to click on any status ,just provide the Survey name ,it will click on that status
       cy.clickSurveyStatus('Testing abc')

   })
 */
   it('verify "My Survey" Tab Filter pop',function(){
     //Filter popup
           //cy.loginSurveyApp("sanjeev.bandari@wavemaker.com","pramati123")
           cy.loginSurveyApp(this.survey.url,this.survey.loginAdmin,this.survey.password)
           cy.wait(6000) 
           cy.get('[name="linkMySurvey"]').click()
           cy.wait(1000)
           cy.clickOnFilters('Created by me','Approval Pending,Approved')
           cy.wait(2000)
           //cy.pause()
           cy.verifySurveyList("Approved",'Created by me')
           cy.wait(2000)
           //cy.pause()
           //Verify cancel popup
           cy.get('[name="tabpaneMySurvey"]>div>div>div>div:nth-child(2)>button').click()
           cy.wait(2000)
           cy.get('button[caption="Cancel"]').click({force: true})
           cy.wait(2000)
           cy.get('div[name="dialogMySurveyFilter"]').should('not.be.visible')




   })

   /* it('verify "Assign To Me" Tab',function(){
       //cy.loginSurveyApp("sanjeev.bandari@wavemaker.com","pramati123")
       cy.loginSurveyApp(this.survey.url,this.survey.loginAdmin,this.survey.password)
        cy.wait(6000) 
       cy.get('[name="linkMySurvey"]').click()
       cy.wait(2000)
       cy.get('a[title="Assigned to Me"]').click()
       cy.wait(3000)
       cy.get('[name="searchAssignedToSurvey"]').should('be.visible')
        //Filter popup
             cy.get('[name="tabpaneAssignedTo"]>div>div>div>div:nth-child(2)>button').click()
             cy.wait(3000)
             cy.get('button[caption="Cancel"]').click({force: true})
             cy.wait(2000)
       //Verify the records are there in the List
       cy.get('[name="ListAssignedTo"]>ul>li').its('length').should('be.gt', 0)

    })*/
   it('verify "Asigned To Me Tab" Filter pop ',function(){
         //Filter popup
               //cy.loginSurveyApp("sanjeev.bandari@wavemaker.com","pramati123")
               cy.loginSurveyApp(this.survey.url,this.survey.loginAdmin,this.survey.password)
               cy.wait(6000) 
               cy.get('[name="linkMySurvey"]').click()
               cy.wait(2000)
               cy.get('a[title="Assigned to Me"]').click()
               cy.get('[name="searchAssignedToSurvey"]').should('be.visible')
               cy.clickOnFilters('Assigned To Me','New Survey,Completed')
               cy.verifySurveyList('Completed',"Assigned To Me")
               //Verify cancel popup
               cy.get('[name="tabpaneAssignedTo"]>div>div>div>div:nth-child(2)>button').click()
               cy.wait(3000)
               cy.get('button[caption="Cancel"]').click({force: true})
               cy.wait(2000)
               cy.get('div[name="dialogMySurveyFilter"]').should('not.be.visible')
    
   })


   it('verify Date Filter pop ',function(){
      cy.loginSurveyApp(this.survey.url,this.survey.loginAdmin,this.survey.password)
      cy.wait(6000) 
      cy.get('[name="linkMySurvey"]').click()

      cy.get('[name="tabpaneMySurvey"]>div>div>div>div:nth-child(2)>button').click()
      cy.wait(2000)
     const todaysDate = Cypress.moment().format('MMM DD,YYYY')
     cy.log("todays date"+todaysDate)


    cy.get('input[name="dateFrom"]').click()
    cy.get('input[name="dateFrom"]').type('Sep 20,2020')
    cy.wait(2000)
    cy.get('input[name="dateTo"]').click()
    cy.get('input[name="dateTo"]').type('Sep 29,2020')
    cy.wait(3000)
    cy.get('button[caption="Cancel"]').click({force: true})
    cy.wait(2000)
    cy.get('div[name="dialogMySurveyFilter"]').should('not.be.visible')

   })
 
  })