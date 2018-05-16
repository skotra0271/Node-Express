const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('server');
const path = require('path');
const sql = require('mssql');

const app = express();

const config = {
  user: 'klibrary',
  password: 'Sree420@',
  server: 'klibrary.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'Library',

  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};

sql.connect(config).catch(err => debug(err));
const nav = [{ link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }];

const bookRouter = require('./src/routes/bookRoutes')(nav);


app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);

// app.get('/books',(req, res) => {
//     res.send('books route');
// });

// app.get('/books/single',(req, res) => {
//   res.send('books single router');
// });


app.get('/', (req, res) => {
  //  res.sendFile(path.join(__dirname, 'views', 'index.html'));
  //  res.render('sampleEJS', { Pagetitle: 'My Library', list: ['books', 'Author'] });
  res.render(
    'index',
    {
      nav,
      PageTitle: 'Library',
      //  books: books
    },
  );
});

app.listen(process.env.PORT, () => {
  //  console.log('server started on port: '+ chalk.green('3000'));
  debug(`started on port:${chalk.green(process.env.PORT)}`);
});

