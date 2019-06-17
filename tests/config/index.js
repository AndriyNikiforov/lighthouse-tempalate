module.exports = {
  lighthouseConfig: {
    extends: 'lighthouse:default',
  },
  disableNetworkThrottling: true,
  disableStorageReset: true,
  emulatedFormFactor: 'mobile',
  throttlingMethod: 'provided',
};
