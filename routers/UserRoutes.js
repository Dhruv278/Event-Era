const express=require('express');
const Router=express.Router();
const authcontroller=require('./../Controllers/AuthController')
const userController=require('./../Controllers/UserController')
Router.get('/events',authcontroller.checkToken,userController.getUsersEvents);
Router.get('/dashboard/:id',authcontroller.checkToken,userController.getUserDashboard)
module.exports=Router;