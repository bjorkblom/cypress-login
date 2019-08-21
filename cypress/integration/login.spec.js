/// <reference types="cypress" />

describe('Logging In - HTML Web Form', () => {
    const username = 'user';
    const password = 'abcd1234'
    
    context('Unauthorized', () => {
        it('is redirected to /', () => {
            cy.request({
                url: '/content',
                followRedirect: false,
            }).then((resp) => {
                expect(resp.status).to.eq(302)
                expect(resp.redirectedToUrl).to.eq('http://localhost:3000/')
                expect(resp.body).to.not.contain('You can only see this after you\'ve logged in.')
            })
        })
    })
    
    context('Reusable "login" custom command', () => {
        Cypress.Commands.add('login', (username, password) => {
            Cypress.log({
                name: 'login',
                message: `${username} | ${password}`,
            })
            
            return cy.request({
                method: 'GET',
                url: '/login',
                form: true,
                body: {
                    username,
                    password,
                },
            })
        })
        
        beforeEach(() => {
            // login before each test
            cy.login(username, password)
        })
        
        it('can visit /content', () => {
            cy.visit('/content')
            cy.get('body').should('contain.text', 'You can only see this after you\'ve logged in.')
        })
    })
})