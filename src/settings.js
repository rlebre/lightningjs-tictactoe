import pkg from '../package.json';

export const appData = {};

export const appSettings = {
  version: pkg.version,
  stage: {
    clearColor: '0x000000'
  },
  debug: false
};

export const platformSettings = {
  log: true,
  path: './',
  showVersion: false
};
