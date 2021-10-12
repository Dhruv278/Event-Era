const User = require('../schema/UserSchema');
const crypto = require('crypto');
const { promisify } = require('util')
const catchAsync = require('../errorHandling/cathError');
const Email = require('./email')
const jwt = require('jsonwebtoken');
const appError = require('../errorHandling/ErrorFormate');

const SignupToken = id => {

    return jwt.sign({ id }, process.env.JWTSECRET, {
        expiresIn: process.env.EXPIRE_TIME
    })
};


const sendToken = (user, statusCode,req,res,) => {
    
    const token = SignupToken(user._id)
    
   
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000)
        // httpOnly: true,
        // secure: req.secure || req.headers['x-forwarded-photo'] ==='https'
    });

   
 
    res.status(statusCode).json({
        status:'success',
        token
    })

}

exports.signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        phone:req.body.phone,
        city:req.body.city.toLowerCase()
    });
    // await  new Email(newUser,`${req.protocol}://${req.get('host')}/`).welcomeMail()
 
    sendToken(newUser, 201,req,res)
    
})


exports.logIN = catchAsync(async (req, res, next) => {
    console.log('post success')

    console.log(req.body);

    const { email, password } = req.body;
   
    //1 check email or passsword is empty or not
    if (!email || !password) { return next(new appError('please enter email or password', 400)) };

    // // start akash
    // if (!email || !password) { return next() };
    // // end akash

    const user = await User.findOne({ email:email }).select('+password')
    

    // 2 check the email or passwor is coreect or not 
  
    if (
        !user ||
        !(await user.CheckedPassword(password, user.password))
    ) return next(new appError('you enter wrong email or password', 401));
    console.log(user);
    sendToken(user, 200,req,res)
    
})

exports.isLOGIN = async (req, res, next) => {
try{
    // 1 to check token is inserted or not
    if(req.cookies.jwt){
        let token=req.cookies.jwt;
        if(!token)return next()
        const decoded = await promisify(jwt.verify)(token, process.env.JWTSECRET);
        // find the data of customer whose id in payload
        let currentUser = await User.findById(decoded.id);
        //check the current user is exixst or not and check the token is right or not
        if (!currentUser) return next()
        // checked that the password is changed or not
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next();
        }
        res.locals.user=currentUser;
        req.user=currentUser;

        return next()
    }
}catch(err){
    return next()
}
 
next()

};

 exports.logout=(req,res)=>{
    //  console.log('inside logout')
     res.cookie('jwt','logouttoken',{
         expires:new Date(Date.now()+0.1),
         httpOnly:true
     })
     res.status(200).json({
         status:'success'
     })
 }

exports.checkToken = catchAsync(async (req, res, next) => {
    let token;
    // 1 to check token is insertet or not
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }else if(req.cookies.jwt){
        console.log('hello')
        token=req.cookies.jwt;
    }
    // console.log(token);

    if (!token) {
       return res.redirect('/login');
    }
    // console.log('end');
    // 2 check the token with secret string

    const decoded = await promisify(jwt.verify)(token, process.env.JWTSECRET);
    // console.log(decoded)
    // find the data of customer whose id in payload
    let currentUser = await User.findById(decoded.id)
    //check the current user is exixst or not and check the token is right or not

    // console.log(currentUser)
    if (!currentUser) {
      return  res.redirect('/login');
    }
    // checked that the password is changed or not
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        console.log('hi')
      return  res.redirect('/login');
    }
    console.log(currentUser)
    req.user = currentUser;
    next()
});


// exports.allowToSpecialRole = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return next(new appError('you have no permission to perform this action', 403))
//         }
//         next();
//     }
// };

exports.forgotPassword = catchAsync(async (req, res, next) => {

    //  check the email is exists or not
  
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (!user) {
        return next(new appError('please enter proper email '), 404);
    }

    // to genrate rendom token for user
    const resetToken = await user.sendTokenForForgottenPsaaword();

    
    
    try {
        const restUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`
    //    console.log(restUrl)
    await  new Email(user,restUrl).passwordEmail()

res.status(200).json({
    status:'success'
})
    }catch (err) {
    //    console.log(err)
        user.passwordResetToken = undefined;
        user.resetPasswordTokenExpireAT = undefined;
        user.save({ validateBeforeSave: false });
        return next(new appError('something is wrong please try again later', 500))
    }
})


exports.resetPassword = catchAsync(async (req, res, next) => {
    // convert token to cripted form
    const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ passwordResetToken: hashToken, resetPasswordTokenExpireAT: { $gt: Date.now() } });
    // console.log(user)
    if (!user) return next(new appError('your token is invalid or has expire please aply again for forgot password', 400))

    user.password = req.body.password;
    user.confirm_password = req.body.confirm_password;
    
    user.passwordResetToken = undefined;
    user.resetPasswordTokenExpireAT = undefined;
    await user.save({ validateBeforeSave: false });

    sendToken(user, 200,req,res)
   
});

exports.upadatePassword = catchAsync(async (req, res, next) => {
   
    // 1 find the user 
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.CheckedPassword(req.body.currentPassword, user.password))) return next(new appError('you enter wrong password', 400));
    user.password = req.body.Password;
    user.passwordChangedAt = Date.now();
    user.confirm_password = req.body.confirm_password;

    await user.save();
    sendToken(user, 200,req,res)

})

