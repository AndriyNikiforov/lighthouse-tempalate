const opts = require('../config');
const launchChromeAndRunLighthouse = require('../utilities/helpers');

const url = 'https://google.com';

let data;
let report;

describe('test2', () => {
  beforeAll(async () => {
    const result = await launchChromeAndRunLighthouse(url, opts,
      opts.lighthouseConfig);

    data = result.lhr;
    report = result.lhr.categories;
  }, 45000);

  test('seo', () => {
    expect(report.seo.score)
      .toBeGreaterThanOrEqual(0.9);
  });

  test('best-practices', () => {
    expect(report['best-practices'].score)
      .toBeGreaterThanOrEqual(0.9);
  });

  test('performance', () => {
    expect(report.performance.score)
      .toBeGreaterThanOrEqual(0.9);
  });

  test('no vulnerable libraries', () => {
    expect(data.audits['no-vulnerable-libraries'].score)
      .toBeGreaterThanOrEqual(0.9);
  });

  test('speed-index', () => {
    expect(data.audits['speed-index'].score)
      .toBeGreaterThanOrEqual(0.9);
  });
});
