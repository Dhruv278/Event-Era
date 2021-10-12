// const User=require('./../Schema/UserSchema');
// 
// const { use } = require('../routers/authrouter');
const User = require('../schema/UserSchema');
const Bookings =require('./../Schema/BookingSchema');
const Venue=require('./../Schema/VenueSchema');
const Email = require('./email');


// exports.homePage=async(req,res)=>{
//    const result= await User.find()
//     res.render('main.ejs');
// }

// start akash
exports.homePage=async(req,res,next)=>{
    
    if(req.user){

     const user=req.user
      res.render('finalindex',{user});

    }else{
      res.render('finalindex',{user:null});
    }
 }

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
      title: 'Log into your account'
    });
}

exports.getRegisterForm = (req, res) => {
    res.status(200).render('register', {
      title: 'Create Your Account'
    });
}

exports.getAboutUsPAge=(req,res)=>{
  res.status(200).render('aboutus')
}

// end akash

exports.getContact=(req,res)=>{
  res.status(200).render('contact')
}

exports.sendContactMail=async(req,res)=>{
  const user={};
   user.name=req.body.name;
   user.email=req.body.email;
  user.city=req.body.city;
   user.phone=req.body.phone;
   user.message=req.body.message;
    await new Email().contact(user);

    res.status(200).json({
      status:'success'
    })

}