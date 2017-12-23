# Chat


## About

The project was created as a school project. The aim of the project is to
design and implement an easy and simple chat application, which can be run in
a browser. The server side of the application is implemented in Node.js and
frontend side in React.js. Socket.io is used for realtime messaging.

## Install

To install dependencies run the following command:

    $ npm install --only=production

To install all dependencies including devDependencies run:

    $ npm install


## Start server

[1.] JSX syntax and ES6, are not supported in all browsers, so they need to be
translated to .js:

    $ npm run build  #will make index.js*

[2.] Start server:

    $ npm start


## Developing front-end:

It would be bothering during developing the front-end, to always run
`npm run build` and restart the server, so you can open `index.html` file in
browser and run development mode - it starts webpack in watchmode so the only
thing you have to do to see your changes in front-end code is refresh the
browser:

    $ npm run dev

Note: the server is not running, so there won't be any interaction with back-end
