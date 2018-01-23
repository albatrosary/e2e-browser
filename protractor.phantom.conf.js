// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  onPrepare: function() {
    // Disable animations so e2e tests run more quickly
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(function($animate) {
        $animate.enabled(false);
      });
    };

    browser.addMockModule('disableNgAnimate', disableNgAnimate);

    require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('xmloutput', true, true));
  },
  seleniumServerJar:'./node_modules/webdriver-manager/selenium/selenium-server-standalone-3.8.1.jar',
  capabilities: {
    browserName: 'phantomjs',
    version: '',
    platform: 'ANY'
  },
  directConnect: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
