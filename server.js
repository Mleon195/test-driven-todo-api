// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.status(200).json({todos:todos});

});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var newTask = req.body.task;
   var newDescription = req.body.description;
   var newId = todos.length+1;
   var newTaskObject = { _id: newId, task: newTask, description: newDescription};
   todos.push(newTaskObject);
   res.status(200).json(newTaskObject);

});

app.get('/api/todos/:id', function show(req, res) {  //id here is an strings
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var id = parseInt(req.params.id);
   var theRightOne;
   // find the object with this id in todos
   for (var i = 0; i < todos.length; i++){
     if(todos[i]._id === id){   //id here is a number ways to solve is use parse() or use "=="
      theRightOne = todos[i];
     }
   }
   res.status(200).json(theRightOne);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */



});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   // get todo id from url params (`req.params`)
    var todoId = parseInt(req.params.id);
    var todoToDelete = todos.filter(function (todos) {
      return todo._id == todoId;
    })[0];
    todos.splice(todos.indexOf(todoToDelete), 1);

    res.status(200).json(todoToDelete);
  });


});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
