const app = require('./server-config.js');
const routes = require('./server-routes.js');
const userRoutes = require('./routes/route.user.js');

const port = process.env.PORT || 5000;

// app.get('/', routes.getAllTodos);
// app.get('/:id', routes.getTodo);

// app.post('/', routes.postTodo);
// app.patch('/:id', routes.patchTodo);

// app.delete('/', routes.deleteAllTodos);
// app.delete('/:id', routes.deleteTodo);


//User Routes
const userRoutes = require('./routes/route.user.js');
const enums = require('./lib/enums/index.js');
app.use('api/users', userRoutes);






// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`${enums.CURRENT_TIME_STAMP}, [ERROR]: ${message}`); 
  return res.status(statusCode).json({
    status: 'error',
    message,
    code: statusCode,
  });
});






if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;