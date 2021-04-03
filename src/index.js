const express = require('express');
const morgan = require('morgan');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/usersRoutes'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'))
});