const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
    baseUrl: "http://www.automationpractice.pl",
    redirectionLimit: 10,
    retries: {
      "runMode": 1,
      "openMode": 1
    },
    watchForFileChanges: true,
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    waitForAnimations: true,
    testIsolation: false,
    env: {
    "theme": "dark",
    },
  }
})