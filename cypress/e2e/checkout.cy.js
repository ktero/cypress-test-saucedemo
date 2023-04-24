describe('Saucedemo App', () => {

  beforeEach(function () {
     // Load fixture data to be used for loggin in the application
    cy.fixture('auth').then((data) => {
      this.data = data
      cy.log("Auth fixture data: ", this.data)

      // Navigate to https://www.saucedemo.com/
      cy.visit('https://www.saucedemo.com/')

      // Login
      cy.get('[data-test=username]').type(this.data.Valid.Username)
      cy.get('[data-test=password]').type(this.data.Valid.Password)
      cy.get('[data-test=login-button]').click()
      cy.url().should('include', '/inventory.html')
      cy.get('.title').should('have.text', 'Products')
    })

    // Load fixture data to be used in Checkout test
    cy.fixture('checkout').then((data) => {
      this.data = data
      cy.log("Checkout fixture data: ", this.data)
    })
  })

  it('should successfully checkout multiple items', function () {
    // Select item 'Sauce Labs Backpack'
    cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click()
    cy.get('[data-test=remove-sauce-labs-backpack]').should('have.text', 'Remove')

    // Select item 'Sauce Labs Bolt T-Shirt'
    cy.get('[data-test=add-to-cart-sauce-labs-bolt-t-shirt]').click()
    cy.get('[data-test=remove-sauce-labs-bolt-t-shirt]').should('have.text', 'Remove')
    
    // Select item 'Sauce Labs Onesie'
    cy.get('[data-test=add-to-cart-sauce-labs-onesie]').click()
    cy.get('[data-test=remove-sauce-labs-onesie]').should('have.text', 'Remove')

    // Click shopping cart link on the top right of the page
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')
    cy.get('.title').should('have.text', 'Your Cart')
    cy.get('.cart_item').should('have.length', 3)

    // Click Checkout button
    cy.get('[data-test=checkout]').click()
    cy.url().should('include', '/checkout-step-one.html')
    cy.get('.title').should('have.text', 'Checkout: Your Information')

    // Enter checkout information
    cy.get('[data-test=firstName]').type(this.data.Firstname)
    cy.get('[data-test=lastName]').type(this.data.Lastname)
    cy.get('[data-test=postalCode]').type(this.data.Postal)

     // Click Continue button
    cy.get('[data-test=continue]').click()
    cy.get('.title').should('have.text', 'Checkout: Overview')
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('.cart_item').should('have.length', 3)

    // Click Finish button
    cy.get('[data-test=finish]').click()
    cy.url().should('include', '/checkout-complete.html')
    cy.get('.title').should('have.text', 'Checkout: Complete!')
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
  })

  it('should display an error message in checkout if there are no items', function () {
    // Click shopping cart link on the top right of the page
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')
    cy.get('.title').should('have.text', 'Your Cart')

    // Click Checkout button
    cy.get('[data-test=checkout]').click()
    cy.url().should('include', '/checkout-step-one.html')
    cy.get('.title').should('have.text', 'Checkout: Your Information')

     // Click Continue button
    cy.get('[data-test=continue]').click()
    cy.get('[data-test=error]').should('have.text', 'Error: First Name is required')
  })
})
