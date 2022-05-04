<img src="https://github.com/rlebre/lightningjs-tictactoe/blob/main/public/logo.png" alt="logo" width="300"/>

# Tic Tac Toe

This app was created using LightningJS. You may play the Tic Tac Toe game ([Wikipedia](https://en.wikipedia.org/wiki/Tic-tac-toe)) in your browser using the arrow keys and return key. Additionally, you may also compile is to your SmartTV and play with the remote.

Special thanks to @rdkcentral for providing this tutorial - available at https://rdkcentral.github.io/Lightning/docs/gettingStarted/development-tictactoe.

### Getting started

> Before you follow the steps below, make sure you have the
[Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/) installed _globally_ only your system

```
npm install -g @lightningjs/cli
```

#### Running the App

1. Install the NPM dependencies by running `npm install`

2. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project

3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

#### Developing the App

During development you can use the **watcher** functionality of the _Lightning-CLI_.

- use `lng watch` to automatically _rebuild_ your App whenever you make a change in the `src` or  `static` folder
- use `lng dev` to start the watcher and run a local webserver / open the App in a browser _at the same time_

#### Documentation

Use `lng docs` to open up the Lightning-SDK documentation.
