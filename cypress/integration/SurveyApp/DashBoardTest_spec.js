/// <reference types="cypress" />
describe(' "DashBoard" Page',function(){
    it('Verify "Employee" Dashboard', function(){
      cy.loginSurveyApp("sanjeev.bandari@wavemaker.com","pramati123")
      //cy.get('[name="linkDashboard"]').click()
      cy.get('[name="listAssignedTome"]>div>h3>div:nth-child(2)>div').should('have.text',"Assigned  to me")
      cy.get('[name="listAssignedTome"]>ul>li').its('length').should('be.gt',0)
      cy.get('[name="anchorAssignedSurvey"]').click()
      cy.wait(2000)
      cy.get('[role="tablist"]>li:nth-child(2)>a>div>span').should("have.text","Assigned to Me")

      cy.get('[name="linkDashboard"]').click()
      cy.get('[name="panel1"]>div>h3>a>div:nth-child(2)>div:nth-child(1)').should('have.text',"My Survey")
      cy.get('[name="anchorMySurvey"]').click()
      cy.wait(2000)
      cy.get('[role="tablist"]>li:nth-child(1)>a>div>span').should("have.text","Details")
      cy.wait(2000)

    })
    it('Verify "SuperAdmin" Dashboard', function(){
           cy.loginSurveyApp("harshini.gadige@wavemaker.com","pramati123")
           cy.get('[name="linkDashboard"]').click()
           cy.wait(2000)
           cy.get('[name="listAssignedSurvey"]>div>h3>div:nth-child(2)>div:nth-child(1)').should("have.text","Assigned to me")
           cy.get('[name="listAssignedSurvey"]>ul>li').its('length').should('be.gt',0)
           cy.get('[name="anchorAssigenedSurvey"]').click()
           cy.wait(2000)
           cy.get('[role="tablist"]>li:nth-child(2)>a>div>span').should("have.text","Assigned to Me")

           cy.get('[name="linkDashboard"]').click()
           cy.wait(2000)
           cy.get('[name="listApprovalSurveys"]>div>h3>div:nth-child(2)>div').should('have.text',"Approval List")
           cy.get('[name="listApprovalSurveys"]>ul>li').its('length').should('be.gt',0)
           cy.get('[name="anchorSurveyList"]').click()
           cy.wait(2000)
           cy.get('[name="labelSurveyList"]').should("have.text","Survey List")

            cy.get('[name="linkDashboard"]').click()
            cy.wait(2000)
            cy.get('[name="panel1"]>div>h3>a>div:nth-child(2)>div:nth-child(1)').should('have.text',"My Survey")
            cy.get('[name="anchorMySurvey"]').click()
            cy.wait(2000)
            cy.get('[role="tablist"]>li:nth-child(1)>a>div>span').should("have.text","Details")
            cy.wait(2000)
            
    }) 

})