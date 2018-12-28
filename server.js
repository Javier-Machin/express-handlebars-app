const express = require('express');
// add handlebars
const hbs = require('hbs');

const app = express();

// add partials support
hbs.registerPartials(__dirname + '/views/partials')
// set handlebars as view engine
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


// add getCurrentYear view helper method
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// add screamIt view helper method
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// root route, renders home view
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome, traveler.'
  });
});

// new route, /about
app.get('/about', (req, res) => {
  // render about view
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

// route /bad
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});