const User = require('../schema/UserSchema');
const moment=require('moment')
const catchAsync = require('../errorHandling/cathError');
const Email = require('./email')
const jwt = require('jsonwebtoken');
const appError = require('../errorHandling/ErrorFormate')

exports.getUsersEvents=catchAsync(async(req,res,next)=>{
    console.log('hiiiiiiiiii')
    const userid=req.user._id;
  console.log(userid)
    const UsersEvents=await User.findById(userid).populate('booking')

    res.status(200).json({
        UsersEvents
    })
})

exports.getUserDashboard=async(req,res)=>{
  const id=req.params.id;
  const user=await User.findById(id).populate('booking');

  res.status(200).render('dashBoard',{user,moment})
}