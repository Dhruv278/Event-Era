const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
    name: {
        require: [true, 'must have a name'],
        type: String

    },
    address:{
        type:String,
    },
    price: {
        require: true,
        type: String
    },

    max_capacity: {
        type: String,
        require: true
    },
    coveImage:String,
    phone:String,
    timing:{
        type:String
    },
    images: [String],
    booking: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Bookings'
    }],
    EnterAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    events:[String],
      
    city: String,


},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// VenueSchema.virtual('events',{
// ref:'Events',
// foreignField:'events',
// localField:'_id'
// })

VenueSchema.pre(/^find/,function(next){
    this.populate({
        path:'booking'
       
    });
    next();
})
// mongoose midleware

// document midleware
// a midleware  .save()  .create() mate j vapray khali bija mate na vapray a midle ware save karva pela exicute thay


// query midle ware
// only see secrete toure


// VenueSchema.pre('aggregate', function (next) {
//     this.pipeline().unshift({
//         $match: { secretTour: { $ne: true } }
//     })
//     next()
// })
// .pre ni jem .post pan ave j apply thai jay query pachi kam kare
const Venue = mongoose.model('Venue', VenueSchema);
module.exports = Venue;