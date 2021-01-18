/// <reference types="cypress" />

import 'cypress-file-upload';
//import * as cs from "D:\\Cypress\\cypress\\support\\commands.js";
describe(' "DashBoard" Page',function(){
  
    beforeEach(() =>{       
        cy.fixture('surveydata').then(function(survey) {            
          this.survey = survey
        })    
      })
      it('Verify "SuperAdmin Draft status:Createsurvey',function(){
        cy.loginSurveyApp(this.survey.url,this.survey.loginAdmin,this.survey.password)
        cy.wait(6000)         
        cy.editSurveyDetails(this.survey.surveyName,this.survey.pSurvey,this.survey.sObj,this.survey.sRollTime,
            this.survey.sRollSession,this.survey.sStartdate,this.survey.sEnddate) 
        cy.wait(4000)
        cy.get('div[name="name"]>div>div>label').then(($e) => {
        var surName = $e.text() 
        cy.log('Survey Name  is   '+surName) 
        cy.editSurveyQuestions(this.survey.landingPage,this.survey.addSection) 
        cy.wait(2000)   
        cy.editReminder(this.survey.iMail,this.survey.attachment,this.survey.rmData,this.survey.rmEmpConfigure)  
        cy.wait(2000)
        cy.editMail(this.survey.dlNames,this.survey.emailIdList,'emailList.xlsx')  
        cy.wait(2000)
        cy.get('[name="linkMySurvey"]').click()
        cy.wait(3000)
        cy.get('input[name="searchMySurvey"]').type(surName)
        cy.wait(2000)
        //cy.verifySearchBy(surName)
        })
        //cy.wait(2000)  
        
        
        cy.get('[name="labelSurveyStatus"]').should('have.text','Draft')

    }) 
 

     it('Verify "Super Admin Approval:Create Survey"', function(){
        cy.loginSurveyApp(this.survey.url,this.survey.loginAdmin,this.survey.password)
        cy.wait(6000)
        cy.editSurveyDetails(this.survey.surveyName,this.survey.pSurvey,this.survey.sObj,this.survey.sRollTime,
            this.survey.sRollSession,this.survey.sStartdate,this.survey.sEnddate) 
        cy.wait(2000)
        cy.get('div[name="name"]>div>div>label').then(($e) => {
            var surName = $e.text() 
            cy.log('Survey Name  is   '+surName)    
         cy.editSurveyQuestions(this.survey.landingPage,this.survey.addSection)    
         cy.editReminder(this.survey.iMail,this.survey.attachment,this.survey.rmData,this.survey.rmEmpConfigure)
    
         cy.editMail(this.survey.dlNames,this.survey.emailIdList,'emailList.xlsx')  
         cy.wait(2000)     
        cy.get('[name="buttonPublish"]').click()
        cy.wait(2000)
        cy.get('.ok-action').click({force: true})
        cy.wait(2000)
        cy.get('input[name="searchMySurvey"]').type(surName)
        cy.wait(2000)
        })
        cy.get('[name="labelSurveyStatus"]').should('have.text','Approved')
    })  
   

     it('Verify "Employee Create Survey  and SuperAdmin approvedStatus ',function(){        
        //cy.loginSurveyApp(this.survey.url,this.survey.loginAdmin,this.survey.password)
        cy.loginSurveyApp(this.survey.url,"alekhya.guttikonda@wavemaker.com ","pramati123")
        cy.wait(6000)
        cy.editSurveyDetails(this.survey.surveyName,this.survey.pSurvey,this.survey.sObj,this.survey.sRollTime,
            this.survey.sRollSession,this.survey.sStartdate,this.survey.sEnddate) 
        cy.wait(2000)
        cy.get('div[name="name"]>div>div>label').then(($e) => {
            var surName = $e.text() 
            cy.log('Survey Name  is   '+surName)    
         cy.editSurveyQuestions(this.survey.landingPage,this.survey.addSection)    
         cy.editReminder(this.survey.iMail,this.survey.attachment,this.survey.rmData,this.survey.rmEmpConfigure)
    
         cy.editMail(this.survey.dlNames,this.survey.emailIdList,'emailList.xlsx')  
         cy.wait(2000)     
        cy.get('[name="buttonPublish"]').click()
        cy.wait(2000)
        cy.get('.ok-action').click({force: true})
        cy.wait(2000)
        cy.get('input[name="searchMySurvey"]').type('surName')
        cy.wait(2000)
        //})
        cy.get('[name="labelSurveyStatus"]').should('have.text','Approval Pending')
        cy.get('a[name="userProfileOptions"]').click()
        cy.get('.btn[caption="Sign Out"]').click()
        cy.wait(2000) 
        cy.loginSurveyApp(this.survey.url,this.survey.loginAdmin,this.survey.password)
        cy.wait(4000)
        cy.get('[name="linkSurveyList"]').click()
        cy.wait(2000)
        cy.get('input[name="searchSurveyList"]').type(surName)
        cy.wait(2000)
        cy.get('[name="buttonAdminAction"]').click()
        cy.wait(3000)
        cy.get('[name="btnApprove"]').click()
        cy.wait(2000)
        cy.get('.ok-action').click({force: true})

        cy.wait(3000)
        cy.get('[name="linkSurveyList"]').click()
        cy.wait(2000)
        cy.get('input[name="searchSurveyList"]').type(surName)
        cy.wait(1000)
        cy.get('[name="labelSurveyStatus"]').should('have.text','Approved')
      })
    }) 

    it('Verify "clone Survey"',function(){
        cy.loginSurveyApp(this.survey.url,this.survey.loginAdmin,this.survey.password)
        cy.wait(6000)
        cy.get('[name="linkMySurvey"]').click()
        cy.wait(2000)
        cy.get('input[name="searchMySurvey"]').type('SampleTest')
        cy.wait(1000)
        cy.get('[name="buttonSurveyAction"]').click()
        cy.wait(2000)
        cy.get('[name="buttonClone"]').click()
        cy.wait(2000)
        cy.get('.ok-action').click({force: true})
        cy.wait(4000) 
        cy.get('[name="linkMySurvey"]').click() 
        cy.wait(1000)      
        cy.get('input[name="searchMySurvey"]').type('SampleTest_Copy')
        cy.wait(1000)
        cy.get('[name="labelSurveyname"]').should('have.text','SampleTest_Copy')

    }) 

    it('Verify "Delete the Survey"',function(){
        cy.loginSurveyApp(this.survey.url,this.survey.loginAdmin,this.survey.password)
        cy.wait(6000)
        cy.get('[name="linkMySurvey"]').click()
        cy.wait(2000)
        cy.get('input[name="searchMySurvey"]').type('SampleTest_Copy')
        cy.wait(1000)
        cy.get('[name="buttonSurveyAction"]').click()
        cy.wait(2000)
        cy.get('[name="buttonDelete"]').click()
        cy.wait(2000)
        cy.get('.ok-action').click({force: true})
        cy.wait(3000)        
        cy.get('input[name="searchMySurvey"]').type('SampleTest_Copy')
        cy.wait(2000)
        cy.get('[name="ListSurveyDetails"]').should('contain.text','No data found')
        
    })  
})