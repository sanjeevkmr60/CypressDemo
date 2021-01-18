/// <reference types="cypress" />
describe(' "User Management" Page',function(){
    it('Verify User management tab,Assign,Delete the SuperAdmin', function() {
        cy.loginSurveyApp("sanjeev.bandari@wavemaker.com","pramati123")
        cy.click('a[name="linkUserManagement"]').click()
        cy.wait(8000)
        cy.get('[name="tabsUserManagement"]').should('contain.text','Super Admin')
        cy.get('[name="tabsUserManagement"]').should('contain.text','Distribution List')
        //Assign the SuperAdmin
        cy.get('input[name="employee_formWidget"]').type('abhilash.kaparthi').type('{downarrow}{enter}',{ force: true })
        cy.wait(2000)
        cy.get('button[name="save"]').click()
        cy.wait(2000)
        //verify List of Super Admins which is Assigned.
        cy.get('input[name="searchSuperAdmin"]').type('abhilash.kaparthi').type('abhilash').type('{downarrow}{enter}',{ force: true })
        cy.wait(4000)        
        cy.get('label[name="Name"]').should('contain.text','Abhilash Kaparthi')
        cy.wait(3000)

        //verify Assign user is deleted or not
         cy.get('button[name="buttonDeleteSuperAdmin"]').click()
         cy.wait(3000)
         cy.get('div[name="listSuperAdmins"]').should('contain.text','No data found')

    })

    it('Verify Distribution List tab', function() {
       cy.get('a[title="Distribution List"]').click()
       cy.wait(2000)
       //verify search in Distribution List
       cy.get('input[name="searchDL"]').type('Survey Team').type('abhilash').type('{downarrow}{enter}',{ force: true })
       cy.wait(3000)
       cy.get('div[name="tableDistributionList"]').should('contain.text','Survey Team')

       //Add the Dustribution List
       cy.get('button[title="New"]').click()
       cy.wait(3000)


    })


})