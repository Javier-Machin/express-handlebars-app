const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

// root route, responds with json
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'Andrew',
    likes: [
      'Biking',
      'Cities'
    ]
  })
});

// new route, /about
app.get('/about', (req, res) => {
  res.send('About Page');
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