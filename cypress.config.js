const { defineConfig } = require("cypress");

module.exports = defineConfig({

  defaultCommandTimeout: 5000,

  retries: {
    runMode: 2,
    openMode: 2,
  },

  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}"
  },
});
