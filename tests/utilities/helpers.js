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
      '--fast-start',
      '--browser-test',
      '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-icon-ntp',
      '--disable-file-system',
      '--disable-default-apps',
      '--disable-gpu-watchdog',
      '--dom-automation',
      '--disable-bookmark-reordering',
      '--prerender',
      '--disable-zero-copy'
    ],
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1380, height: 780 });
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
