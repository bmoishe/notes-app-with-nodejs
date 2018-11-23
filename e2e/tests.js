require('../app.js')
require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const driver = new webdriver.Builder().forBrowser('chrome').build();
const expect = chai.expect;

describe('Does the page render', done => {
  before(done => {
    driver.get('http://localhost:3003')
    done();
  });

  it('Page loads', () => {
    console.log('Ready to read welcome message');
    return expect(driver.findElement(By.id('welcome')).getAttribute('innerHTML'))
    .to.eventually.contain('Nodes App');
  })
})

describe('Does the page render', done => {
  before(done => {
    driver.get('http://localhost:3003')
    .then(findElement(By.id('enterNote')).sendKeys('My Note'))
    .then(findElement(By.id('createNote')).click())
    done();
  });

  it('Creates a note', () => {
    console.log('Ready to read welcome message');
    return expect(driver.findElement(By.id('note')).getAttribute('innerHTML'))
    .to.eventually.contain('My Note')
  });

});
