const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false, // вимикає автовідкриття тесту після зміни символів. 
  e2e: {
    baseUrl: 'https://petstore.swagger.io/v2',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});