const express=require('express');
const Router=express.Router();
const authcontroller=require('./../Controllers/AuthController')
const viewController=require('./../Controllers/ViewController')

// checks before all routes whether user is logged in or not


Router.get('/',authcontroller.isLOGIN,viewController.homePage);
Router.get('/about',viewController.getAboutUsPAge)
Router.get('/contact',viewController.getContact)
Router.post('/contact/sendMail',viewController.sendContactMail)
Router.post('/register',authcontroller.signup);
Router.post('/login',authcontroller.logIN)


// start akash
Router.get('/login',viewController.getLoginForm);
Router.get('/register',viewController.getRegisterForm);
// End akash



module.exports=Router;




