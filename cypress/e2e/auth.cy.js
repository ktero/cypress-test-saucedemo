describe('Authentication Tests', () => {
  
  beforeEach(function () {
    // Prepare fixture data
    cy.fixture('auth').then((data) => {
      this.data = data  
    })

    // Navigate to https://www.saucedemo.com/
    cy.visit('https://www.saucedemo.com/')
  })
  
  it('should successfully login', function () {
    cy.get('[data-test=username]').type(this.data.Valid.Username)
    cy.get('[data-test=password]').type(this.data.Valid.Password)
    cy.get('[data-test=login-button]').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('have.text', 'Products')
  })

  it('should display an error message due to invalid credentials', function () {
    cy.get('[data-test=username]').type(this.data.Invalid.Username)
    cy.get('[data-test=password]').type(this.data.Invalid.Password)
    cy.get('[data-test=login-button]').click()
    cy.get('[data-test=error]').should('be.visible')
    cy.get('[data-test=error]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
  })

  it('should display an error message due to no credentials entered', function () {
    cy.get('[data-test=login-button]').click()
    cy.get('[data-test=error]').should('be.visible')
    cy.get('[data-test=error]').should('have.text', 'Epic sadface: Username is required')
  })
})