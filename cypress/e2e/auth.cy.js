describe('Test authentication functionality', () => {
  
  beforeEach(function () {
    // Prepare fixture data
    cy.fixture('auth').then((data) => {
      this.data = data  
    })

    // Navigate to the value in baseUrl
    cy.visit('/')
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

  it('should be able to successfully login and logout', function () {
    // Login
    cy.get('[data-test=username]').type(this.data.Valid.Username)
    cy.get('[data-test=password]').type(this.data.Valid.Password)
    cy.get('[data-test=login-button]').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('have.text', 'Products')

    // Open hamburger menu
    cy.get('#react-burger-menu-btn').click()

    // Logout
    cy.get('#logout_sidebar_link').click()

    // Check that the user is redirected to the login page
    cy.url().should('equal', 'https://www.saucedemo.com/')
  })

  it('should not login locked out user', function () {
    cy.get('[data-test=username]').type(this.data.LockedUser.Username)
    cy.get('[data-test=password]').type(this.data.LockedUser.Password)
    cy.get('[data-test=login-button]').click()
    cy.get('[data-test=error]').should('be.visible')
    cy.get('[data-test=error]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
  })
})