## Using Cypress to automation tests

### Purpose
I do not own the following websites used for testing. I am only using the website to practice and apply my knowledge on automation tools/frameworks.
- SauceDemo: Owned by Sauce Labs

### SauceDemo Tests
Test Set: User checkout
| Test #      | Test description                                                                        |
| :---        | :---                                                                                    |
| 1           | should successfully checkout multiple items                                             |
| 2           | should display an error message in checkout if there are no items                       |
| 3           | should successfully checkout the item after adding it to cart through product item page |

Test Set: Authentication
| Test #      | Test description                                                         |
| :---        | :---                                                                     |
| 1           | should successfully login                                                |
| 2           | should display an error message due to invalid credentials               |
| 3           | should display an error message due to no credentials entered            |
| 4           | should be able to successfully login and logout                          |

Test Set: Product Inventory
| Test #      | Test description                                                         |
| :---        | :---                                                                     |
| 1           | should sort products by price and name                                   |
