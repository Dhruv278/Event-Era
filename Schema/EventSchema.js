// const mongoose=require('mongoose');


// const eventSchema=mongoose.Schema({
//     name:{
//         type:String,
//         require:true
//     },
//     venue:[{
//         type:mongoose.Schema.ObjectId,
//         ref:'Venue',
//         require:[true,'Venue Name is required ']

//     }]

// })

// bookingschema.pre(/^find/,function(next){
//     this.populate('user').populate({
//         path:'venue'
     
//     })
//     next()
// })

// const Bookings=mongoose.model('Bookings',bookingschema);
// module.exports=Bookings