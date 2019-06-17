'use strict';

const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

async function launchChromeAndRunLighthouse(url, opts, config) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      '--enable-tcp-fast-open',
      '--prerender',
      '--fast',
      '--browser-test',
    ],
  });

  const page = await browser.newPage();

  await page.goto(url);

  opts.port = (new URL(browser.wsEndpoint())).port;

  return lighthouse(url, opts, config)
    .then(result => {
      return browser.close()
        .then(() => result);
    })
    .catch(err => {
      return browser.close().then(() => {
        throw err;
      }, console.error);
    });
}

module.exports = launchChromeAndRunLighthouse;
