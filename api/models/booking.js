const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    place:{type: mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkin : {type: Date, required:true},
    checkout : {type: Date, required:true},
    numberOfguests : {type: String, required:true},
    name : {type: String, required:true},
    phonenumber : {type: Number, required:true},
    price : {type: Number, required:true},
})

const Bookingmodel = mongoose.model('Booking', bookingSchema);

module.exports = Bookingmodel;