const app = require('./server-config.js');
// const routes = require('./server-routes.js');
const enums = require('./lib/enums/index.js');

const port = process.env.PORT || 5000;





//User Routes
const userRoutes = require('./routes/route.user.js');
app.use('/api/users', userRoutes);

//Organization Routes
const organizationRoutes = require('./routes/route.organization.js');
app.use('/api/organizations', organizationRoutes);

//Project Routes
const projectRoutes = require('./routes/route.project.js');
app.use('/api/projects', projectRoutes);

//Task Routes
const taskRoutes = require('./routes/route.task.js');
app.use('/api/tasks', taskRoutes);






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