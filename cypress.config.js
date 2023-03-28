const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  reporter:'cypress-mochawesome-reporter',
  reporterOptions:{
    charts: true,
    reportPageTitle: 'Pet Store API',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAtempts: false
  },
  e2e: {
    baseUrl: 'https://petstore.swagger.io/v2/',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      allureWriter(on,config);
      return config;
    },
  },
});
