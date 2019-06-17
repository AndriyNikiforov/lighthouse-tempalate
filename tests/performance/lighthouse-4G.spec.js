const opts = require('../config');
const launchChromeAndRunLighthouse = require('../utilities/helpers');

const url = 'https://google.com';
let data;

describe('4G performance audit via Lighthouse', () => {
  beforeAll(async () => {
    const result = await launchChromeAndRunLighthouse(url, opts,
      opts.lighthouseConfig);

    data = result.lhr;
  }, 45000);

  test('first contentful paint should score 90+', () => {
    expect(data.audits['first-contentful-paint'].score)
      .toBeGreaterThanOrEqual(0.9);
  });

  test('bootup-time', () => {
    expect(data.audits['bootup-time'].score)
      .toBeGreaterThanOrEqual(0.9);
  });

  test('interactive', () => {
    expect(data.audits['interactive'].score)
      .toBeGreaterThanOrEqual(0.9);
  });
});
