const app = require('express');
const Router = app.Router();

const AuthController = require('../controllers/authController');

const UserController = require('../controllers/userController');

const VerifyToken = require('../middlewares/authMiddleware');

Router.post('/register', AuthController.register);
Router.post('/login', AuthController.login);
/* Router.post('/logout', VerifyToken, AuthController.logout); */

Router.get('/user', VerifyToken, UserController.User);

module.exports = Router;