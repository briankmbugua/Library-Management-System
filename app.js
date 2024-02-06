let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let registerlibrarianAndLibrary = require('./routes/usersRoutes/registerLibrarianAndLibrary');
let librarianLogin = require('./routes/usersRoutes/librariansLogin');
let librariesById = require('./routes/libraryRoutes/libraryById');
let updateLibrary = require('./routes/libraryRoutes/updateLibrary');
let deleteLibrary = require('./routes/libraryRoutes/deleteLibrary');
//books
let addBook = require('./routes/booksRoutes/addBook');
let loggedInLibrarianBooks = require('./routes/booksRoutes/loggedInLibrarianBooks');
let updateBook = require('./routes/booksRoutes/updateBook');
let deleteBook = require('./routes/booksRoutes/deleteBook');
//issueBooks
let issueBook = require('./routes/borrowingRoutes/issueBook');
//let returnBook = require('./routes/borrowingRoutes/returnBook');
//members
let librarianRegisterLibraryMember = require('./routes/usersRoutes/librarianRegisterLibraryMember');
let loggedInLibrianMembers = require('./routes/usersRoutes/libraryMembers');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//library
app.use('/', indexRouter);
app.use('/registerlibrarianAndLibrary', registerlibrarianAndLibrary);
app.use('/librarianLogin', librarianLogin);
app.use('/librariesById', librariesById);
app.use('/updateLibrary', updateLibrary);
app.use('/deleteLibrary', deleteLibrary);
// books
app.use('/addBook', addBook);
app.use('/loggedInLibrarianBooks', loggedInLibrarianBooks);
app.use('/updateBook', updateBook);
app.use('/deleteBook', deleteBook);
//issueBooks
app.use('/issueBook', issueBook);
//app.use('/returnBook', returnBook);
//members
app.use('/librarianRegisterLibraryMember', librarianRegisterLibraryMember);
app.use('/loggedInLibrarianMembers', loggedInLibrianMembers);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
