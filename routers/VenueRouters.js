const express=require('express');
const Router=express.Router();
const authcontroller=require('./../Controllers/AuthController')
const venueController=require('./../Controllers/VenueController')
Router.post('/createVenue',authcontroller.checkToken,venueController.createVenue);
Router.get('/booking/:id',authcontroller.checkToken,venueController.getVenueById);
Router.get('/search/:city/:event',authcontroller.checkToken,venueController.getVenueByCityAndEvent);
Router.get('/searchByCity',authcontroller.checkToken,venueController.getVenuesByCity);
Router.post('/book/:venueid',authcontroller.checkToken,venueController.bookVenue);
module.exports=Router;