const app = require('express');
const Router = app.Router();

const AuthController = require('../controllers/authController');

Router.post('/register', AuthController.register);
Router.post('/login', AuthController.login);

module.exports = Router;