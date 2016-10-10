#Chat


##About


##Install

To install dependencies run following command:

    $ npm install --only=production

To install all dependencies including devDependencies run:

    $ npm install


##Start server

[1.] JSX syntax and ES6, are not supported in all the browsers, so we need to translate them to .js:

    $ npm run build  #will make bundle.js*

[2.] Start server:

    $ npm start


##Developing front-end:

It would be bothering during developing the front-end, to always run `npm run build` and restart server, so
you can open `index.html` file in browser and run development mode - it starts webpack in watchmode so the only
thing you have to do to see your changes in front-end code is refresh the browser:

    $ npm run dev

Note: the server is not running, so there won't be any interaction with back-end




