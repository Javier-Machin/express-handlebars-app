const express = require('express');
// add handlebars
const hbs = require('hbs');
// add fs
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

// add partials support
hbs.registerPartials(__dirname + '/views/partials')
// set handlebars as view engine
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('Unable to append to server.log.');
    }
  });

  // If we don't call next() the app will hang here.
  next();
});

// maintenance mode
// app.use((req, res, next) => {
//   res.render('maintenance');
// })

// add express static middleware
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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});