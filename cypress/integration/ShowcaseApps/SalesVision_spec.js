/// <reference types="cypress" />

describe('SalesVision App',function(){
    let rowdata;

    it('Visits the Sales head Website', function() {
        cy.visit('https://apps.wavemakeronline.com/DemoSalesVision/#/Dashboard?role=salesHead') 
        cy.url().should('contain', '/DemoSalesVision')
        cy.wait(2000)
        //cy.get('[name="welcomeLable"]').should('contain.text','Welcome Sally Jones!')
        cy.get('[name="salesTrendChart"]').should('contain.text','Sales Trend')
        cy.get('[name="TopSellingSalesTable"]').should('contain.text','Top Selling Policies')
        cy.get('[name="panel_goals"]').should('contain.text','Goals')
        cy.get('[name="panelDealStatus"]').should('contain.text','Your Deals')
        cy.get('[name="leadsPanel"]').should('contain.text','Your Leads Overview')     
        cy.get('[name="wm-switch-My View"]').should('have.attr', 'class', 'btn btn-default selected')

        cy.get('[name="wm-switch-Team View"]').click()
        //cy.get('[name="welcomeLable"]').should('contain.text','Welcome Sally Jones!')
        cy.get('[name="salesTrendChart"]').should('contain.text','Sales Trend')
        cy.get('[name="TopSellingSalesTable"]').should('contain.text','Top Selling Policies')
        cy.get('[name="panel_goals"]').should('contain.text','Goals')
        cy.get('[name="topPerformersTable"]').should('contain.text','Top Performers')
        cy.get('[name="leadsPanel"]').should('contain.text','Your Leads Overview')

        //Sales pipeline nav
        cy.get('[name="salesHeadSalePipeline"]').click()
        cy.wait(2000)
        //verify with customer
        cy.get('.form-control[type="text"]').type('Perry')
        cy.get('.app-select').select('Customer')
        cy.get('.app-search-button').click()
        cy.wait(2000)
        cy.get('.table > tbody >tr:nth-child(1)').should('contain', 'Perry')

         //Customer nav
        cy.get('[name="customerLink"]').click()
        cy.wait(2000)
        cy.get('.form-control[type="text"]').type('3000')
        cy.get('.app-select[name="wm-datatable"]').select('Deal Size')
        cy.get('.app-search-button').click()
        cy.wait(2000)
        cy.get('[name="customersTable"]>div:nth-child(2)>div>div:nth-child(2)>table > tbody >tr:nth-child(1)').should
          ('contain','$3,000')

        cy.get('.app-select[name="products_formWidget"]').select('Home insurance')
        cy.get('.noUi-handle-lower').type('{rightarrow}{rightarrow}')
        cy.get('.noUi-handle-upper').type('{leftarrow}{leftarrow}{leftarrow}')
        cy.wait(4000)
        cy.get('[name="upcomingPoliciesTable"]').find('.table>tbody>tr').should('have.length', 1)

         //MyTeam nav
         cy.get('[name="myTeamLink"]').click()
         cy.wait(2000)
         cy.get('input[name="search_employee"]').type('Amanda')
         cy.wait(2000)
         cy.get('[name="repsName"]').should('have.text', 'Amanda Brown')
        
   })

    it('Visits the Sales Representative Website', function() {
            cy.visit('https://apps.wavemakeronline.com/DemoSalesVision/#/Dashboard?role=salesRep')
            cy.url().should('contain', '/Dashboard?role=salesRep')
            cy.wait(2000)
            cy.get('[name="welcomeLable"]').should('contain.text','Welcome Amanda Brown!')
            cy.get('[name="salesTrendChart"]').should('contain.text','Sales Trend')
            cy.get('[name="TopSellingSalesTable"]').should('contain.text','Top Selling Policies')
            cy.get('[name="panel_goals"]').should('contain.text','Goals')
            cy.get('[name="upcomingPolicyRenewalsTable"]').should('contain.text','Your Upcoming Policy Renewals')
            cy.get('[name="leadsPanel"]').should('contain.text','Your Leads Overview')


            /*cy.get('[name="salesRepSalePipeline"]').click({force: true})
            cy.wait(3000)

            //verify with customer
            cy.get('.form-control[type="text"]').type('Ruiz')
            cy.get('.app-select').select('Customer')
            cy.get('.app-search-button').click()
            cy.wait(2000)
            cy.get('.table > tbody >tr:nth-child(1)').should('contain', 'Ruiz')
            cy.get('.table > tbody >tr:nth-child(1) >td:nth-child(5)').click()
            cy.get('[name="save"]').click()
            cy.wait(2000)
            cy.get('[name="button1"]').click()
            cy.get('.form-control[type="text"]').type('Ruiz')
            cy.get('.app-select').select('Customer')
            cy.get('.app-search-button').click()
            cy.wait(2000)
            cy.get('.status>span').should('have.text', 'No data found.')

*/
              cy.get('[name="customerLink"]').click()
              cy.wait(2000)
              cy.get('[name="customersTable"]>div:nth-child(2)>div>div:nth-child(2)>table > tbody >tr>td')
                .then(function($e,index,$list){
                  const cName=$e.text()
                  cy.log("Customer name is present "+cName)
                  expect(cName).to.contain('Ruiz')
              })
              cy.get('.form-control[type="text"]').type('1800')
              cy.get('.app-select[name="wm-datatable"]').select('Deal Size')
              cy.get('.app-search-button').click()
              cy.wait(2000)
              cy.get('[name="customersTable"]>div:nth-child(2)>div>div:nth-child(2)>table > tbody >tr:nth-child(1)').should
              ('contain','1,800')

              cy.get('.app-select[name="products_formWidget"]').select('Home insurance')
              cy.get('.noUi-handle-lower').type('{rightarrow}{rightarrow}')
              cy.get('.noUi-handle-upper').type('{leftarrow}{leftarrow}{leftarrow}')
              cy.wait(4000)
              cy.get('[name="upcomingPoliciesTable"]').find('.table>tbody>tr').should('have.length', 2)
       })
})