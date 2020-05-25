var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var WeightedGraph = require('./models/weightedGraph');
// var weightedGraph = new WeightedGraph(6);
// console.log(weightedGraph);
// console.log(weightedGraph.addWeightedEdge(0, 8, 2))
// console.log(weightedGraph.addWeightedEdge(0, 10, 1));
// console.log(weightedGraph.addWeightedEdge(1, 5, 2));
// console.log(weightedGraph.addWeightedEdge(1, 5, 3));
// console.log(weightedGraph.addWeightedEdge(4, 10, 3));
// console.log(weightedGraph.addWeightedEdge(4, 14, 5));
// console.log(weightedGraph.addWeightedEdge(2, 4, 1));
// console.log(weightedGraph.addWeightedEdge(2, 10, 4));
// console.log(weightedGraph.addWeightedEdge(3, 3, 5));
// console.log(weightedGraph.addWeightedEdge(3, 7, 2));
// console.log(weightedGraph.addWeightedEdge(3, 6, 4));
// // weightedGraph.printWeightedGraph(weightedGraph.linkedAdjacencyList);
// var result=weightedGraph.findMaxFlow();
// console.log(result);
// weightedGraph.printWeightedGraph(weightedGraph.resultLinkedList);
var indexRouter = require('./routes/index.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
