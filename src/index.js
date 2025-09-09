const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes');

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// Middleware to parse JSON bodies (as sent by API clients)
app.use(express.json());

// Template engine
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

// HTTP request logger middleware
app.use(morgan('combined'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
