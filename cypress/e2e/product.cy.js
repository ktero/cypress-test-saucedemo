describe('Test product functionality', () => {

  beforeEach(function () {
    // Load fixture data to be used for loggin in the application
    cy.fixture('auth').then((data) => {
      this.data = data

      // Navigate to the value in baseUrl
      cy.visit('/')

      // Login
      cy.get('[data-test=username]').type(this.data.Valid.Username)
      cy.get('[data-test=password]').type(this.data.Valid.Password)
      cy.get('[data-test=login-button]').click()
      cy.url().should('include', '/inventory.html')
      cy.get('.title').should('have.text', 'Products')
    })
  })

  it('should sort products by price and name', () => {
    // Sort by Price - Ascending
    cy.get('[data-test=product_sort_container]').select('Price (low to high)');
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = $prices.map((i, el) => el.innerText).get();
      const sortedPrices = [...prices].sort((a, b) => parseFloat(a.substring(1)) - parseFloat(b.substring(1)));
      expect(prices).to.deep.equal(sortedPrices);
    });

    // Sort by Price - Descending
    cy.get('[data-test=product_sort_container]').select('Price (high to low)');
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = $prices.map((i, el) => el.innerText).get();
      const sortedPrices = [...prices].sort((a, b) => parseFloat(a.substring(1)) - parseFloat(b.substring(1))).reverse();
      expect(prices).to.deep.equal(sortedPrices);
    });

    // Sort by Name - Ascending
    cy.get('[data-test=product_sort_container]').select('Name (A to Z)');
    cy.get('.inventory_item_name').then(($names) => {
      const names = $names.map((i, el) => el.innerText).get();
      const sortedNames = [...names].sort();
      expect(names).to.deep.equal(sortedNames);
    });

     // Sort by Name - Descending
     cy.get('[data-test=product_sort_container]').select('Name (Z to A)');
     cy.get('.inventory_item_name').then(($names) => {
       const names = $names.map((i, el) => el.innerText).get();
       const sortedNames = [...names].sort().reverse();
       expect(names).to.deep.equal(sortedNames);
     });
  });
})