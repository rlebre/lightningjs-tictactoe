import { Launch } from '@lightningjs/sdk';
import App from './App.js';
import { appData, appSettings, platformSettings } from './settings';

// launch the application with custom settings
const app = Launch(App, appSettings, platformSettings, appData);

// append the canvas to the dom
document.body.appendChild(app.stage.getCanvas());
