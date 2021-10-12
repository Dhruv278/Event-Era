const User = require('../schema/UserSchema');
const catchAsync = require('../errorHandling/cathError');
const Email = require('./email')
const Venue=require('./../Schema/VenueSchema')
const jwt = require('jsonwebtoken');
const Bookings=require('./../Schema/BookingSchema')
const appError = require('../errorHandling/ErrorFormate')


exports.getVenueById=catchAsync(async(req,res,next)=>{
    const id=req.params.id;
    const venue=await Venue.findById(id);
    res.status(200).render('bookinForm',{
        venue
    })
})

exports.createVenue=catchAsync(async(req,res,next)=>{
    const venue=await Venue.create({
        name:req.body.name,
        timing:req.body.timing,
        address:req.body.address,
        price:req.body.price,
        max_capacity:req.body.max_capacity,
      phone:req.body.phone,
      coveImage:req.body.image,
        events:req.body.events,
        city:req.body.city.toLowerCase(),
        images:req.body.images

    })

    res.status(200).json({
        status:"success",
        venue
    })
})

exports.getVenueByCityAndEvent=catchAsync(async(req,res,next)=>{
    console.log('working')
  const city =req.params.city.toLowerCase();
  const event=req.params.event;
   console.log(city,event)
  const venues=await Venue.find({city:city, events: { "$in" : [`${event}`]}})
  console.log(venues);

  res.status(200).render('bookevent',{venues});
}) 


exports.bookVenue=catchAsync(async(req,res,next)=>{

    const userid=req.user._id;
    const venueid=req.params.venueid;
    const peoples=req.body.people;
    const details=req.body.details;
    const d= new Date(req.body.date)
   
    const venue=await Venue.findByIdAndUpdate(venueid,{})
    const checkbook=await Bookings.find({bookingDate:d,venue:venueid});
    
    if(checkbook.length!=0){
        return next(new appError('Venue is already booked on this day',500))
    }
    const booking=await Bookings.create({
    event_name:req.body.event_name,
    venue:venueid,
    user:userid,
    bookingDate:d,
    peoples,
    details
    })
   req.user.booking.push(booking._id);
   await req.user.save()

   await new Email(req.user,venue,booking).welcomeMail();
    res.status(200).json({
        status:'success',
        booking
    })

})


exports.getVenuesByCity=catchAsync(async(req,res,next)=>{
    const city=req.user.city;
    const venues=await Venue.find({city:city});
    console.log('working')
    res.render('bookevent',{venues});
})