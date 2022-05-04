import pkg from '../package.json';

const isDevelopment = process.env.NODE_ENV === 'development';

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
