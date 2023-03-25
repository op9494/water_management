// Requiring module
var moment = require('moment'); // require

const { Timestamp, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
console.log("current", moment())

console.log("current", typeof (moment().add(5, 'm')))

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const damdetails = new mongoose.Schema({
    damname: {
        type: String,
        required: "Village name is an required Parameter"
    },
    fulldepth: {
        type: Number,
        required: true
    },
    currentdepth: {
        type: Number,
      
    },
    fullcapacity: {
        type: Number,
        required: true
    },
    currentcapacity: {
        type: Number,
     
    },
    
    inflow: {
        type: Number,
        required: true
    },
    outflow: {
        type: Number,
    },
    requirement: {
        type: String,
        
    },
    dischargingdate: {
        type: Date,
        default: Date.now
    },
    requirement: {
        type: String,
        
    },
   creationDate: {
    type: Date,
    default: Date.now
}
})


const waterresource = new mongoose.Schema({
    villagename: {
        type: String,
        required: "Village name is an required Parameter"
    },
    capacity: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    location:
    {
        type: String,
        required: "location is an required Parameter"
    },
   availablity: {
        type: Boolean,
        default: true,
   },
   creationDate: {
    type: Date,
    default: Date.now
}
})

const waterrequirement = new mongoose.Schema({
    villagename: {
        type: String,
        required: "Village name is an required Parameter"
    },
    Area: {
        type: Number,
        required: true
    },
    damsource: {
        type: String,
        required: true
    },
    stackedwater: {
        type: Number,
        required: true
    },
    cropsdetails:
    {
        type: String,
        required: "location is an required Parameter"
    },
  
   creationDate: {
    type: Date,
    default: Date.now
}
})





const sessiondetails = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    usertype: {
        type: String,
        default: "farmer"
    },
    token: {
        type: String,
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    expires: {
        type: Date,
        expires: 90000

    }
})
// Course Modal Schema
const userschema = new mongoose.Schema({
    name: {
        type: String,
        require: 'Name address is required'
    },
    aadarnumber: {
        type: Number,
        unique: true,
        require: 'AAdar Number is required'
    },
    password: {
        type: String,
        required: "password is an required parameter"
    },
    phonenumber: {
        type: Number,
        required: "Pnorumer number is an reqired parameter"
    },

    usertype: {
        type: String,
        default: "farmer"
    },
 
    creationDate: {
        type: Date,
        default: Date.now
    },
  
    token: {
        accesstoken:{
            type: String
        },
        expires: {
            type: Date
        }
    }

});

// Student Modal Schema
const adminuserschema = new mongoose.Schema({
    name: {
        type: String,
        require: 'Name address is required'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [
            validateEmail, 'Please fill a valid email address'
        ],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    usertype: {
        type: String,
        default: "admin"
    },
    token: {
        accesstoken:{
            type: String
        },
        expires: {
            type: Date
        }
    }
});






// Creating model objects
const User = mongoose.model('users', userschema);
const Admin = mongoose.model('admin', adminuserschema);
const Waterrequirement = mongoose.model('waterrequirement', waterrequirement);
const Waterresource = mongoose.model('waterresource', waterresource);
const Damdetails=mongoose.model('damdetails', damdetails);

const Sessiondetails = mongoose.model("sessiondetails", sessiondetails)

// Exporting our model objects
module.exports = {
    User,
    Admin,
    Waterresource,
    Waterrequirement,
    Sessiondetails,
    Damdetails

}
