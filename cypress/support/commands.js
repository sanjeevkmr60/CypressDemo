
//import 'cypress-wait-until';
import 'cypress-file-upload';

///require('cypress-plugin-tab')


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
// Cypress.Commands.add("", login(email, password) => { ... })
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
/* Cypress.Commands.add('login',function(email, pw) {
    cy.visit('https://demo.nopcommerce.com/login?returnUrl=%2Flogin')     
    cy.get('[name="Email"]').type(email)     
    cy.get('[name="Password"]').type(pw)     
    cy.get('[type="submit"]').click({multiple: true})    
}) */

Cypress.Commands.add('customerLoan', function(customerWebsite,propertyAddress,dPayment,loanTenure,purchaseValue,filename) {
    cy.visit(customerWebsite)    
    cy.url().should('contain', '/myAccount')
    cy.contains('View Product').click()
    cy.get('button[caption="Apply"]').click()    
    cy.get('button[name="nextBtn_wizard1"]').click({force: true})   

    for(var i=0;;i++){
      cy.get('input[name="search1"]').clear()
      cy.get('input[name="search1"]').type(propertyAddress)    
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
    cy.get('select[name="downPayment_formWidget"]').select(dPayment)
    cy.get('select[name="loanTenure_formWidget"]').select(loanTenure)
    cy.get('input[name="purchaseValue_formWidget"]').type(purchaseValue)
    cy.get('[title="Loan Amount"]').click()
    cy.get('button[name="nextBtn_wizard1"]').click({force: true})
    const yourFixturePath = filename;
    cy.get('[data-col-identifier="customField"]>div:nth-child(2)>div').find('[name="files"]').attachFile
    (yourFixturePath,{ force: true });
    cy.wait(10000)
    /* cy.pause()    
    cy.get('.table>tbody>tr>td:nth-child(4)>div>section:nth-child(3)>app-prefab-boxview>div>a').click({force: true})
    cy.pause()
    cy.get('button[aria-label="Submit button"]').click({force: true})
    cy.pause() */
    cy.get('button[name="doneBtn_wizard1"]').click({force: true})    
    cy.wait(3000)
    cy.get('[name="dialogactions1"]').find('button').click()  
    cy.wait(2000)  
    cy.url().should('contain', '/myAccount')
    //cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1)>div>a>span').scrollIntoView({ duration: 2000 })
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
        cy.wait(2000)
        pLoanId=$a.text()
        cy.log('LoanId created by Customer :'+cLoanId)
        cy.log('LoanId created in visible in LoanProcessor :' +pLoanId)
        expect(cLoanId).to.eq(pLoanId)
        //cy.get('tr[data-row-id="0"]').find('a').click()
        cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1) > div > a').click()
        cy.wait(6000)
       //cy.get('[name="startProcessingBttn"]').should('be.visible')
        cy.get('[name="startProcessingBttn"]').click()
        cy.wait(4000)
        cy.location('href').should('contain', '/LoanDetails')
        cy.get('a[title="W2"]').click()
        cy.wait(4000)
        cy.get('form').within(($form) => {
              //cy.get('input[name="ssn_formWidget"]').type(ssn)
              cy.get('input[name="wages_formWidget"]').clear()
              cy.get('input[name="wages_formWidget"]').type(wages)
              cy.get('input[name="state_formWidget"]').clear()
              cy.get('input[name="state_formWidget"]').type(state)
              //cy.get('input[name="ein_formWidget"]').type(ein)
              cy.get('input[name="address_formWidget"]').clear()
              cy.get('input[name="address_formWidget"]').type(address)
              cy.get('input[name="zip_formWidget"]').clear()
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

Cypress.Commands.add('appointmentRequests', function(nursewebsite,acceptRejectmark,patientName,comments) {
    cy.log(acceptRejectmark)
    cy.visit(nursewebsite)
    cy.url().should('include','PatientDashboard')
    cy.get('[name="tile2"]').trigger('mouseover').click()  
    cy.wait(5000)
    //cy.get('div[name="container1"]').should('not.exist');  
    cy.get('div[name="container13"]>div:nth-child(2)>div:nth-child(1)').each(function($e,index,$list) {
        cy.get('div[name="container13"]>div:nth-child(2)>div:nth-child(1)').eq(index).then(function($e){
            cy.wait(2000)
            const pName=$e.text().substring(0,3).toLowerCase()
            cy.log('RequestedPatient Name :'+pName) 
            const patient=patientName.substring(0,3).toLowerCase()
            cy.log('Requested Patient Name given is  :'+patient) 
             
            if(patientName.includes(pName)){
              cy.log(acceptRejectmark)
              //expect(acceptRejectmark).to.be.equal(true)
              if(acceptRejectmark=="true"){
                   cy.log('RequestedPatient if Name :'+pName)
                   cy.get('[name="accept_button"]').eq(index).click()
                   cy.wait(2000)
                   cy.get('textarea[name="acceptcomments_textarea"]').type(comments)
                   cy.get('[name="button3"]').click()
                   cy.wait(2000)
                   cy.get('[title="Confirmed"]').click()
                   cy.wait(3000)
                   let pConfirmed="";
                   cy.get('div[name="container19"]>div:nth-child(2)>div:nth-child(1)').each(function($e,index){
                     cy.get('div[name="container19"]>div:nth-child(2)>div:nth-child(1)>label').eq(index).then(function($bname){
                      cy.wait(2000)
                        pConfirmed=$bname.text().substring(0,3).toLowerCase()
                        if(patientName.substring(0,3).toLowerCase().includes(pConfirmed)){
                          if(expect(pConfirmed).to.equal(patientName.substring(0,3).toLowerCase())){
                            cy.log('Requested Patient confirmed :'+patientName)
                          }
                        }
                     })
                     if(patientName.substring(0,3).toLowerCase()==pConfirmed){
                       return false
                     }
                   })
              }            
              else{
                cy.log('RequestedPatient  else Name :'+pName)
                cy.pause()
                cy.get('[name="reject_button"]').eq(index).click() 
                cy.wait(2000)
                cy.get('[name="reject_comments_textarea"]').eq(index).type(comments)
                cy.get('[name="button4"]').click()
                cy.wait(2000)
                cy.get('[title="Cancelled"]').click()
                cy.wait(2000)
                cy.get('div[name="container23"]>div:nth-child(2)>div:nth-child(1)').each(function($e,index){

                 cy.get('div[name="container23"]>div:nth-child(2)>div:nth-child(1)>label').eq(index).then(function($bname){
                   cy.wait(2000)
                   const pCancelled=$bname.text().substring(0,3).toLowerCase()
                   cy.log('Cancelled '  +pCancelled)
                   if(patientName.substring(0,3).toLowerCase().includes(pCancelled)){
                      //if(patientName.toLowerCase().includes(pCancelled)){
                      if(expect(pCancelled).to.equal(patientName.substring(0,3).toLowerCase()))
                       cy.log('Requested Patient Rejected   :'+patientName)
                   }
                    
                 })
               })                         
              }              
            }
       })
    })
  })  

Cypress.Commands.add('refillRequests', function(nursewebsite,acceptRejectmark,patientName,comments) {
      cy.log(acceptRejectmark)
      cy.visit(nursewebsite)
      cy.url().should('include','PatientDashboard')
      cy.get('[name="tile3"]').trigger('mouseover').click()
      cy.wait(5000)
      //cy.get('div[name="container1"]').should('not.exist');
      cy.get('div[name="container12"]>div:nth-child(2)').each(function($e,index,$list){
         cy.get('div[name="container12"]>div:nth-child(2)>label:nth-child(1)').eq(index).then(function($bname){
          cy.wait(2000)  
          const pName=$bname.text().substring(0,3).toLowerCase()
          cy.log(pName) 
          const patient=patientName.substring(0,3).toLowerCase() 
          cy.log(patient)                   
          if(patientName.includes(pName)){
             if(acceptRejectmark=="true"){
                 cy.log('Refill Patient Name :'+pName)
                 cy.get('[name="accept_button"]').eq(index).click()
                 cy.wait(4000)
                 cy.get('[role="input"]').select('APPOLO')
                 cy.wait(2000)
                 cy.get('[name="accept_request_button"]').click()
                 cy.wait(2000)
                 cy.get('[title="Confirmed"]').click()
                 cy.wait(2000)
                 cy.get('div[name="container12"]>div:nth-child(2)').each(function($e,index){
                   cy.get('div[name="container12"]>div:nth-child(2)>label:nth-child(1)').eq(index).then(function($bname){
                      cy.wait(2000)
                      const pConfirmed=$bname.text().substring(0,3).toLowerCase()
                      if(pConfirmed.includes(patientName.substring(0,3).toLowerCase())){
                          if(expect(pConfirmed).to.equal(patientName.substring(0,3).toLowerCase()))
                          cy.log('Requested Patient confirmed'+patientName)
                      }
                   })
                 })
             }
             else{
              cy.log('RequestedPatient Name :'+pName)
              cy.get('[name="reject_button"]').eq(index).click() 
              cy.wait(2000)
              cy.get('.form-control').type(comments)
              cy.get('[name="reject_request_button"]').click()                
              cy.wait(2000)
              cy.get('[title="Cancelled"]').click()
              cy.get('div[name="container22"]>div:nth-child(2)').each(function($e,index){
                cy.get('div[name="container22"]>div:nth-child(2)>label:nth-child(1)').eq(index).then(function($bname){
                  cy.wait(2000)
                  const pCancelled=$bname.text().substring(0,3).toLowerCase()                                    
                  if(pCancelled.includes(patientName.substring(0,3).toLowerCase())) {
                      if(expect(pCancelled).to.equal(patientName.substring(0,3).toLowerCase()))
                      cy.log('Refill Patient Rejected :::'+patientName)
                   }
               })
              })
            }
          }

      })
  
      })
  })
  

Cypress.Commands.add('pharamcistRefillRequests', function(pharmcywebsite,acceptRejectmark,patientName,comments) {
  cy.log(acceptRejectmark)
  cy.visit(pharmcywebsite)
  cy.url().should('include','pharma_refill_requests')
  ///cy.get('[name="tile3"]').trigger('mouseover').click()
  cy.wait(5000)  
  //cy.get('div[name="container1"]').should('not.exist');   
  cy.get('div[name="container12"]>div:nth-child(2)>div').each(function($e,index,$list) {
    cy.get('div[name="container12"]>div:nth-child(2)>div>label').eq(index).then(function($bname){
          cy.wait(2000)  
          const pName=$bname.text().substring(0,3).toLowerCase()
          cy.log(pName) 
          const patient=patientName.substring(0,3).toLowerCase() 
          cy.log(patient)                   
          if(patientName.includes(pName)){
            if(acceptRejectmark=="true"){
                 cy.log('Refill Patient Name :'+pName)
                 cy.wait(2000)
                 cy.get('[name="accept_button"]').eq(index).click()
                 cy.wait(4000)
                 cy.get('[name="accept_request_button"]').click()
                 cy.wait(2000)
                 cy.get('[title="Confirmed"]').click()
                 cy.wait(2000)
                 cy.get('div[name="container19"]>div:nth-child(1)').each(function($e,index){
                   cy.get('div[name="container19"]>div:nth-child(1)>label:nth-child(1)').eq(index).then(function($bname){
                      cy.wait(2000)
                      const phConfirmed=$bname.text().substring(0,3).toLowerCase()
                      if(phConfirmed.includes(patientName.substring(0,3).toLowerCase())){
                        if(expect(phConfirmed).to.equal(patientName.substring(0,3).toLowerCase()))
                          cy.log('Pharamacy Requested Patient confirmed'+patientName)
                      }
                   })
                 })
            }
            else{
              cy.log('RequestedPatient Name :'+pName)
              cy.get('[name="reject_button"]').eq(index).click() 
              cy.wait(2000)
              cy.get('.form-control').type(comments)
              cy.get('[name="reject_request_button"]').click()                
              cy.wait(2000)
              cy.get('[title="Cancelled"]').click()
              cy.get('div[name="container23"]>div:nth-child(1)').each(function($e,index){
               cy.get('div[name="container23"]>div:nth-child(1)>label:nth-child(1)').eq(index).then(function($bname){
                  cy.wait(2000)
                  const phCancelled=$bname.text().substring(0,3).toLowerCase()                                    
                   if(phCancelled.includes(patientName.substring(0,3).toLowerCase())) {                      
                      if(expect(phCancelled).to.equal(patientName.substring(0,3).toLowerCase()))
                      cy.log('Pharamacy Refill Patient Rejected :::'+patientName)
                   }
               })
             })
            }
          } 
      })
  })
})
/* cy.get('div[name="container1"]>div > div[class="no-data-msg"]').then(function($ele){
  const text=$ele.text()      
 if(Boolean(expect(text).to.be.equal('No data found'))){
   cy.log("No data found")
   throw new Error("No data found")
 } */
Cypress.Commands.add('loginSurveyApp',function(url,email,pw) {
    //cy.visit(" https://wavemaker-apps.pramati.com/wm_survey/#/EmployeeDashboard ")
    //cy.visit(" https://wavemaker-apps.pramati.com/survey_uat/#/")
    //cy.visit('https://wavemaker-apps.pramati.com/survey_uat/#/ManageSurvey?surveyCode=SUR0001160')
    cy.visit(url)
    cy.wait(2000)
     cy.get('[name="username"]').type(email)
     cy.get('[name="password"]').type(pw)
     cy.get('input[type="submit"]').click()
     cy.wait(2000)
    cy.get('div[name="page_content1"]').should('contain.text','Dashboard')
})
 Cypress.Commands.add("verifySearchBy",function(searchItem){
      cy.get('input[name="searchMySurvey"]').type(searchItem)
      cy.wait(3000)
      cy.get('[name="card_content1"]>div>div:nth-child(1)').find('div>label').each(function($e,index,$list){
      const sName=$e.text()
      //cy.log("Survey name is"+sName)
      if(sName.includes(searchItem))
      {
        expect(sName).to.contain(searchItem)
        return false;
      }

    })
    cy.wait(2000)
    cy.get('input[name="searchMySurvey"]').clear()
 })
 /*Cypress.Commands.add("verifySurveyList",function(searchItem){
       cy.get('[name="card_content1"]>div>div:nth-child(1)').find('div>label').each(function($e,index,$list){
       const sName=$e.text()
       //cy.log("Survey name is"+sName)
       if(sName.includes(searchItem))
       {
         expect(sName).to.contain(searchItem)
         return false;
       }
       *//*else
       throw Error("SearchedItem is not present in the List")*//*
     })

  })*/
 Cypress.Commands.add("clickSurveyStatus",function(searchItem){

         cy.wait(2000)
         cy.get('[name="card_content1"]>div').find('label').each(function($e,index,$list){
         const sName=$e.text()
         //cy.log("Survey name is"+sName)
         if(sName.includes(searchItem) )
         {
           expect(sName).to.contain(searchItem)
           return false
         }
         cy.get('[name="card_content1"]').find('.app-grid-column>button[name="buttonSurveyAction"]').eq(index).click
                                            ({force: true})

       })



    })

Cypress.Commands.add("verifySurveyList",function(searchItem,tabName){
  let cardName="";
  if(tabName==="Created by me"){    
      cardName="card_content1"
  }else
      cardName="assigned_card_content1"

       cy.get('[name="'+cardName+'"]>div>div:nth-child(1)').find('div>label').each(function($e,index,$list){
       const sName=$e.text()
       //cy.log(sName)
       //cy.log(searchItem)
       var str_array=searchItem.split(',')
        for(var i = 0; i < str_array.length; i++)
        {
                    
            if(sName.includes(str_array[i]))
              {
                 expect(sName).to.contain(str_array[i])
                     //return false;
               }               
        }
       
     })

  })

  Cypress.Commands.add("clickOnFilters",function(tabName,filterItems){
    //cy.log(filterItems)
    //cy.pause()
  let val=""
  let buttonVal=""
  if(tabName==="Created by me"){
       val="tabpaneMySurvey"
       buttonVal="buttonMySurveyFilterApply"
    }
    else{
       val="tabpaneAssignedTo"
       buttonVal="buttonAssignedApply"
    }
    cy.get('[name="'+val+'"]>div>div>div>div:nth-child(2)>button').click()
    cy.wait(4000)
     cy.get('.app-checkbox').find('span').each(function($e,index,$list){
       const fName=$e.text()
       //cy.log(fName)
       //cy.pause()
       var strVal=filterItems.split(',')
       for(var i = 0; i < filterItems.length; i++)
       {
          if(fName.includes(strVal[i]) ){
          cy.get('[type="checkbox"]').eq(index).click({force: true})
          cy.wait(1000)}
       }
     })
     cy.wait(2000)
     //cy.get('[name="'+buttonVal+'"]').should('be.visible')
     cy.get('[name="'+buttonVal+'"]').click()     
   })

   Cypress.Commands.add("editSurveyDetails",function(sName,sPurpose,sObj,sRolt,sRols,sStartDate,sEndDate){
    cy.get('button[name="newVisaRequestBtn"]> span').click()
    cy.wait(6000)
    cy.get('.page-title').should('have.text','Create Survey')
    var r = Math.random().toString(36).substring(11);
    var nameSurvey=sName + r
    cy.get('input[name="name_formWidget"]').type(nameSurvey)
    //sn=nameSurvey
    cy.get('input[name="reasonForSurvey_formWidget"]').type(sPurpose)
    cy.get('textarea[name="description_formWidget"]').type(sObj)
    cy.get('select[name="timecustomfield_formWidget"]').select(sRolt)
    cy.get('select[name="timeofday_formWidget"]').select(sRols)        
    cy.tab()
    cy.get('input[name="startDate_formWidget"]').type(sStartDate)   
    cy.wait(1000)
    cy.tab().tab()        
    cy.get('input[name="endDate_formWidget"]').type(sEndDate).tab()
    cy.get('[name="SurveyLiveForm"]>div>div:nth-child(3)>button').click()
    cy.wait(2000)
    cy.get('.ok-action').click({force: true})
    cy.wait(4000)    
   })

   Cypress.Commands.add("editSurveyQuestions",function(lPage,sSurveyList){
    cy.get('[title="Questions"]').click({ multiple: true })
    cy.wait(6000)
    cy.get('div[name="panelLandingPage"]').should('contain.text','Landing Page')   
    var lpList=lPage.split(',')
    if(lpList[0]!==''){      
      const fileAttachPath = lpList[0];
      cy.get('div[name="fileuploadSelectImage"]').find('[name="files"]').attachFile(lpList[0],{ force: true })
      cy.wait(3000)
    }
    if(lpList[1]!==''){
     cy.get('input[name="textActionButtonText"]').clear().focus().type(lpList[1]).blur()
     cy.wait(2000)    
    }
    cy.wait(3000)    
    if(sSurveyList.length > 0){
    var j=2
    var qs=0; 
    var ansType;
    var k=0 
    var opt=0     
     for(var i in sSurveyList){
      if(i>=2){ cy.get('button[name="buttonAddSection"]').click() }

      if(sSurveyList[i].section[0]!=''){
      const fileAttachPath = sSurveyList[i].section[0]
      cy.wait(3000)      
      cy.get('div[name="fileupload3"]').find('[name="files"]').eq(i).attachFile(fileAttachPath,{ multiple: true });
      }
      cy.wait(3000) 
      if(sSurveyList[i].section[1]!=''){
      cy.get('button[title="'+sSurveyList[i].section[1]+'"]').eq(i).click( {multiple: true})
      cy.wait(4000)
      }
      
      if(sSurveyList[i].section[2]!=null){
      var k=0       
      while(j < sSurveyList[i].section.length){
              
        if(qs >= 1 )       
          cy.get('button[name="buttonAddButton"]').eq(i).click({force: true})                             
          cy.wait(6000) 
          var qType= sSurveyList[i].section[j].questions[0].split(';')            
          cy.get('input[name="questionName_formWidget"]').eq(qs).clear().focus().type(qType[0]).blur()
          cy.wait(4000)          
          ansType=sSurveyList[i].section[j].questions[1].split(':')

          cy.get('select[name="widgetType_formWidget"]').eq(qs).select(ansType[0])                   
          cy.wait(3000)                     
          if(ansType[0].includes('Radioset') || ansType[0].includes('Checkboxset')){                        
            cy.wait(6000)                     
            var optVal=ansType[1].split(',')
            cy.log('option value Length'+optVal.length)
            //cy.get('button[caption="Add Option"]').eq(0).click({force: true})
            cy.wait(2000)           
            while(k < optVal.length){                         
              //cy.get('button[caption="Add Option"]').eq(k).click({force: true})
              cy.wait(5000)
              cy.pause()
              cy.get('input[name="option_formWidget"]').eq(opt).clear().focus().type(optVal[k]).blur()
              k++
              opt++
            }
            k=0
            cy.wait(3000)            
          } 
          cy.wait(3000) 
          if(qType[1]=="optionalYes"){
            cy.get('input[name="isOptional_formWidget"]').eq(qs).click({force: true})
            cy.wait(3000) 
           }                    
          qs++ 
          j++
          
       }                    
           
      j=2
      
       cy.wait(4000)
      }
      else
        cy.log('There are no questions given in testdata')
     }
    }
  })

  Cypress.Commands.add("editReminder",function(iMailBody,addAttachment,rmDataList,rmConfigure){
    cy.get('[title="Reminder"]').click()
    cy.wait(2000)
    cy.get('[name="liveFormSurveyEmail"]').should('contain.text','Mail Scheduling')
    cy.get('textarea[name="initimationMailBody_formWidget"]').type(iMailBody)
    if(addAttachment!==''){      
      const fileAttachPath = addAttachment;
      cy.get('[name="addatttachment"]').find('[name="files"]').attachFile(fileAttachPath,{ force: true });
      cy.wait(2000)
    }
      cy.wait(2000)       
      if(rmDataList!==''){
      var empRole= rmDataList[0].role[0]
      var mRole= rmDataList[0].role[1]
      var empDate=rmDataList[1].sDate[0]
      var mDate=rmDataList[1].sDate[1]
      var empInterval=rmDataList[2].rmInteval[0]
      var mInterval=rmDataList[2].rmInteval[1]
      var empCustomConfg=rmDataList[3].rmCustomConfig[0]
      var mCustomConfg=rmDataList[3].rmCustomConfig[1]     
      if(empRole.includes('Employee'))
    {
      cy.get('div[name="checkboxRemainder_formWidget"]>label>input').click({force: true})
      cy.wait(2000)
      cy.get('input[name="remainderStartDateEmployee_formWidget"]').click().clear().type(empDate).tab()  
      cy.wait(2000)
      //Every 2 days     
      cy.get('select[name="selectInterval_formWidget"]').select(empInterval)
      cy.wait(2000)
      if(empInterval.includes('Custom')){
        cy.get('input[name="textCustomInterval_formWidget"]').type(empCustomConfg)
      }
      if(rmConfigure!==''){
        cy.get('textarea[name="employeeReminderMailBody_formWidget"]').type(rmConfigure).tab()
      }
      }    
      if(mRole.includes('Manager')){
      cy.pause()
    cy.get('div[name="checkboxReminderManager_formWidget"]>label>input').click({force: true})
    cy.wait(2000)
    cy.get('input[name="remainderStartDateManager_formWidget"]').click().clear().type(mDate).tab()  
    cy.wait(2000)
    //Every 2 days    
    cy.get('select[name="selectIntervalManager_formWidget"]').select(mInterval)
    cy.wait(2000)
    if(mInterval.includes('Custom'))
      cy.get('input[name="textCustomIntervalManager_formWidget"]').type(mCustomConfg)
    
    if(rmConfigure!==''){
      cy.get('textarea[name="managerReminderMailBody_formWidget"]').type(rmConfigure).tab()
    }
      }
    }
    cy.get('[name="liveFormSurveyEmail"]>div>div:nth-child(3)>button').click()
    cy.wait(2000) 
 })

   Cypress.Commands.add("editMail",function(dlListItem,emailIds,uplaodFile){
    cy.get('a[title="Mail"]').click()
    cy.wait(2000)
    cy.get('[name="getMailingListForm"]').should('contain.text','Mailing Lists')
    cy.get('[name="buttonViewAllDL"]').click()
    cy.wait(4000) 
    cy.get('[name="dialogViewAllDL"]').should('contain.text','Distribution List')  
    cy.get('[name="allDLTable"]>div>div>div:nth-child(2)>table>tbody>tr').each(function($e,index,$list){      
        const dLName=$e.text()        
        var str_array=dlListItem.split(',')        
        for(var i = 0; i < dlListItem.length; i++)
        {
            if(dLName.includes(str_array[i]))
              {
                $e.click()
                cy.wait(1000)                 
               }               
        } 
     })
    cy.wait(2000)
    cy.get('[name="buttonAddDL"]').click() 
    cy.wait(2000) 
     if(emailIds!==''){  
      for(var j = 0; j < emailIds.length; j++)
      {       
      cy.get('input[name="app-chip-search"]').type(emailIds[j]).type('{downarrow}{enter}',{ force: true })
      cy.wait(1000)      
      }    
     
    } 
    if(uplaodFile!==''){      
      const filePath = uplaodFile;
      cy.get('[name="fileupload_ImportList"]').find('[name="files"]').attachFile(filePath,{ force: true });
      cy.wait(2000)  

    }
    cy.get('[name="getMailingListForm"]>div>div:nth-child(3)>button').click()
    cy.wait(3000)      
  })
