// grab the packages we need
var express = require('express');
var app = express();
var await = require('await')
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
var fs=require('fs');

// routes will go here
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(bodyParser.json());
// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

// routes will go here
app.post('/add', function(req, res) {
  var task = req.param('body');

  var tasklist=readTodoList();
  tasklist.push(task);
  var json = JSON.stringify(tasklist);
  fs.writeFile('./data/todos.json', json, 'utf8', function(err) {
    if (err) throw err;
      console.log('complete');
    });

  res.send(tasklist);
});

app.post('/delete', function(req, res) {
  var taskId = req.param('taskId');
  var allTask = readTodoList();
  var taskindex = allTask.findIndex(x => x.id === taskId);

  allTask.splice(taskindex, 1);

  var json = JSON.stringify(allTask);
  fs.writeFile('./data/todos.json', json, 'utf8', function(err) {
    if (err) throw err;
      console.log('complete');
    });

  res.send(allTask);
});

app.post('/getById', function(req, res) {
  var taskId = req.param('taskId');
  var allTask = readTodoList();
  if(taskId !== '')
  {
    allTask = allTask.find(o => o.id === taskId);
  }

  res.send(allTask);
});

app.post('/update', function(req, res) {
  var task = req.param('body');
  var allTask = readTodoList();
  var taskindex = allTask.findIndex(x => x.id === task.id);
  allTask[taskindex] = task;
  var json = JSON.stringify(allTask);
  fs.writeFile('./data/todos.json', json, 'utf8', function(err) {
    if (err) throw err;
      console.log('complete');
    });

  res.send(allTask);

});

app.post('/dateList', function(req, res) {
  res.send({});
});

app.post('/statusList', function(req, res) {
  res.send([
    { text: 'waitting', value: 'waitting' },
    { text: 'do', value: 'do'},
    { text: 'done', value: 'done' }]
  );
});

function readTodoList()
{
  var result = [];
  try
  {
    var data = fs.readFileSync('./data/todos.json');
    result = JSON.parse(data);
  }
  catch(err){}
    return result;
}
