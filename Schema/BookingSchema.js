const mongoose=require('mongoose');


const bookingschema=mongoose.Schema({
    event_name:{
        type:String,
        require:true
    },
    venue:{
        type:mongoose.Schema.ObjectId,
        ref:'Venue',
        require:[true,'Venue Name is required ']

    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        require:[true,'user name is must require ']
    },
    peoples:String,
    details:String,
    paid:{
        type:Boolean,
        default:true
    },
    bookingDate:{
        type:Date
    },
    bookedAt:{
        type:Date,
        default:Date.now()
    },
    

})

bookingschema.pre(/^find/,function(next){
    this.populate('venue');
    next()
})

const Bookings=mongoose.model('Bookings',bookingschema);
module.exports=Bookings