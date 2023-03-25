const express = require('express');
const Model = require('../db/model');
const router = express.Router()
const bcrypt = require('bcrypt');
const logger = require("../log/logger");

require('dotenv').config();
var moment = require('moment');

// Post Method to add equipement


router.post('/add/waterresource', async (req, res) => {
    const data = new Model.Waterresource({
        villagename: req.body.villagename,
        capacity: req.body.capacity,
        height: req.body.height,
        location: req.body.location,
    })
    
    try {
        const dataToSave = await data.save();

        result = {
            status: "Success",
            message: "waterresource added Succcessfully",
            data: dataToSave
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    
         result = handleerror(error) 
        res.status(400).json(result)
    }
    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})

router.post('/add/waterrequirement', async (req, res) => {
    const data = new Model.Waterrequirement({
        villagename: req.body.villagename,
        Area: req.body.Area,
        damsource: req.body.damsource,
        stackedwater: req.body.stackedwater,
        cropsdetails: req.body.cropsdetails,
    })
    
    try {
        const dataToSave = await data.save();

        result = {
            status: "Success",
            message: "waterrequirement created Succcessfully",
            data: dataToSave
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    
         result = handleerror(error) 
        res.status(400).json(result)
    }
    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})


router.post('/add/damdetails', async (req, res) => {
    const data = new Model.Damdetails({
        damname: req.body.damname,
        fulldepth: req.body.fulldepth,
        currentdepth: req.body.currentdepth,
        fullcapacity: req.body.fullcapacity,
        currentcapacity: req.body.currentcapacity,
        inflow: req.body.fullcapacity,
        outflow: req.body.currentcapacity,
        requirement: req.body.fullcapacity,
    })
    
    try {
        const dataToSave = await data.save();

        result = {
            status: "Success",
            message: "waterrequirement created Succcessfully",
            data: dataToSave
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    
         result = handleerror(error) 
        res.status(400).json(result)
    }
    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})






// Post Method to add equipement
router.post('/register', async (req, res) => {
    try {
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        const data = new Model.User({
            name: req.body.name,
            aadarnumber: req.body.aadarnumber,
            password: hashedPwd,
            phonenumber: req.body.phonenumber
        })
        const dataToSave = await data.save();
        result = {
            status: "Success",
            message: "User created Successfully",
            data: dataToSave
        }
        res.status(200).json(result)
    } catch (error) {
        result = handleerror(error) 
        res.status(400).json(result)
    }
    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})

router.post('/add/admin', async (req, res) => {
    try {
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        const data = new Model.Admin({
            name: req.body.name,
            email: req.body.email,
            password: hashedPwd,
            city:req.body.city
        })
        const dataToSave = await data.save();
        result = {
            status: "Success",
            message: "Admin User created Successfully",
            data: dataToSave
        }
        res.status(200).json(result)
    } catch (error) {
        result = handleerror(error) 
        res.status(400).json(result)
    }
    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})

router.post('/admin/login', async (req, res) => {
    console.log(req.body)
    try {
        const user = await Model.Admin.findOne({email: req.body.email});
        console.log("user",user)
        if (user) {
            const isauthenticated = await bcrypt.compare(req.body.password, user.password);
            console.log("daata", isauthenticated)
            if (isauthenticated) {
                tokendetails = await issuetoken(user.id,"admin")
                console.log("token",tokendetails)
                result = {
                    status: "Success",
                    message: "Auth Successful",
                    data: tokendetails
                }
                res.status(200).json(result);
            } else {

                result = {
                    status: "Failed",
                    message: "Wrong username or password."
                }
                res.status(404).json(result);
            }
        } else {

            result = {
                status: "Failed",
                message: "Wrong username or password."
            }
            res.status(405).json(result);
        }
    } catch (error) {
        result = handleerror(error) 
        res.status(500).json(result);
    }
    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})


// Authenticate user
router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const user = await Model.User.findOne({aadarnumber: req.body.aadarnumber});

    
        if (user) {
            const isauthenticated = await bcrypt.compare(req.body.password, user.password);
            if (isauthenticated) {
                profile = await issuetoken(user.id)
                console.log("profile", profile)
                result = {
                    status: "Success",
                    message: "Auth Successful",
                    data: profile
                }
                res.status(200).json(result);
            } else {

                result = {
                    status: "Failed",
                    message: "Wrong username or password."
                }
                res.status(404).json(result);
            }
        } else {

            result = {
                status: "Failed",
                message: "Wrong username or password."
            }
            res.status(405).json(result);
        }
    } catch (error) {
        result = handleerror(error) 
        res.status(500).json(result);
    }
    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})


// Get all Method
router.get('/getAll/:database', async (req, res) => {
    console.log(req.params.database)
    try {
        const data = await readall(req.params.database)
        result = {
            status: "Success",
            message: "Data fetched successfully",
            data: data
        }
        res.status(200).json(result)
    } catch (error) {
        result = handleerror(error) 
        res.status(500).json(result)
    }
    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})

// Get by ID Method
router.get('/getuser/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        result = {
            status: "Success",
            message: "User fetched Successfully",
            data: data
        }
        res.status(200).json(result)
    } catch (error) {
        result = handleerror(error) 
        res.status(500).json(result)
    }
    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})
router.get('/getappconfig/testapp', async (req, res) => {
    try {
        
        result = {
            status: "Success",
            message: "Server is listening",       
        }
        res.status(200).json(result)
    } catch (error) {
        result = handleerror(error) 
        res.status(500).json(result)
    }

    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})
router.post('/getappconfig/appname', async (req, res) => {
    console.log("appp", req.params.appname)

    console.log("appp", req.params.appname)

    try {
        data = Model.AppConfig.findOne({"Appname": req.params.appname}).then(async function (result) {
            console.log("id", result.id)
            await Model.User.findByIdAndUpdate(data.id, data)
        })
        result = {
            status: "Success",
            message: "User fetched Successfully",
            data: data
        }
        res.status(200).json(result)
    } catch (error) {
        result = handleerror(error) 
        res.status(500).json(result)
    }


    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})
// Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = {
            new: true
        };

        const moresult = await Model.findByIdAndUpdate(id, updatedData, options)
        result = {
            status: "Success",
            message: "Data updated Successfully",
            data: moresult
        }
        res.status(200).json(result)
    } catch (error) {
        result = handleerror(error) 
        res.status(400).json(result)
    }
    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})

// Delete by ID Method
router.delete('/delete/:option/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (req.params.option == "admin") {
            const data = await Model.Admin.findByIdAndDelete(id)
            result = {
                status: "Success",
                message: `user ${
                    data.name
                } has been deleted successfully..`
            }
            res.status(200).json(result)
        } else if (req.params.option == "user") {
            const data = await Model.User.findByIdAndDelete(id)
            result = {
                status: "Success",
                message: `user ${
                    data.name
                } has been deleted successfully..`
            }
            res.status(200).json(result)

        } else if (req.params.option == "equpement") {
            const data = await Model.Equipement.findByIdAndDelete(id)
            result = {
                status: "Success",
                message: `Equipement has been removed successfully..`
            }
            res.status(200).json(result)

        } else {
            result = {
                status: "Failed",
                message: `Kindly plese check the request you have sent no match found`
            }
            res.status(408).json(result)
        }
    } catch (error) {
        result = {
            status: "Failed",
            errorType: error.name,
            errorType: error.name,
            message: error.message
        }
        res.status(400).json(result)
    }
    logger.info({"API": req.originalUrl, "Method": req.method, "Response": result});
})

async function readall(database) {
    console.log(typeof(database))
    if (database === "user" || database === "User") {
        var data = await Model.User.find();
    } else if (database === "admin" || database === "Admin") {
        var data = await Model.Admin.find();
    } else if (database === "damdetails" || database === "Equipements") {
        var data = await Model.Damdetails.find();
    } else if (database === "Waterresource" || database === "waterresource") {
        var data = await Model.Waterresource.find();
    } 
    else if (database === "waterrequirements" || database === "Waterrequirements") {
        var data = await Model.Waterrequirement.find();
    } else {
        var data = {
            messsage: "No database found"
        }
    }

    return data
}

async function profiledata(id) {
    const data = await Model.userschema.findById(id);
    return data;
}

async function updateprofile(id, data) {
    const result = await Model.User.findByIdAndUpdate(id, data)
    console.log(result)
    return result
}

async function issuetoken(id, usertype = "farmer") {
    var token = Date.now() + id
    if (usertype == "farmer"){
        console.log("Issue toke for farmer")
        var result =await Model.User.findByIdAndUpdate(id, {
            token: {
                accesstoken: token,
                expires: moment().add(15, 'm').format()
            }
        },{returnDocument: "after",returnNewDocument: true})
    }
    else if (usertype == "admin") {
        console.log("Issue toke for admin")
        var result = await Model.Admin.findByIdAndUpdate(id, {
            token:{accesstoken: token,
            expires: moment().add(15, 'm').format()
        }
        },{returnDocument: "after",returnNewDocument: true})
    }
    console.log("re",result)
    if (result) {
        options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            returnNewDocument: true,
        };
        Model.Sessiondetails.findOneAndUpdate({
            id: result.id
        }, {
            id: result.id,
            token: token,
            expires: result.token.expires,
            usertype: result.usertype
        }, options, function (error, tokenresultdata) {
            if (error) {
                console.log(error)
            } else {
                console.log("result1", tokenresultdata)
            }
        });  
    }
    console.log("result", result)
    return result
}
async function validatetoken(token, expiry) {
    moment().isBefore(expiry)

}
async function adddatasets(appname, dataf) {
    try {
        Model.AppConfig.findOne({"Appname": appname}).then(async function (result) {
            console.log("id", dataf.subequipemt)

            if (action === "equpement") {
                data = await Model.AppConfig.findByIdAndUpdate(result.id, {equipements: dataf.equipements})
            } else if (action === "subequipement") {
                data = await Model.AppConfig.findByIdAndUpdate(result.id, {subequipemt: dataf.subequipemt})
            }
            console.log(datasr)
        })
        result = {
            status: "Success",
            message: "User fetched Successfully",
            data: data
        }

    } catch (error) {
        console.log("error", error)
        result = handleerror(error) 

    }
}
router.post('/admin/Add/:equpementtype/:appname', async (req, res) => {
    equipementtype = req.params.equpementtype
    if (validatetoken("admin", req.query.tokem)) {
        try {
            Model.AppConfig.findOne({"Appname": appname}).then(async function (result) {
                console.log("id", dataf.subequipemt)

                if (equipementtype === "equpement") {
                    data = await Model.AppConfig.findByIdAndUpdate(result.id, {equipements: req.body.equipements})
                } else if (equipementtype === "subequipement") {
                    data = await Model.AppConfig.findByIdAndUpdate(result.id, {subequipemt: req.body.subequipemt})
                }
                console.log(datasr)
            })
            result = {
                status: "Success",
                message: "data Updated successfully",
                data: data
            }

        } catch (error) {
            console.log("error", error)
            result = {
                status: "Failed",
                errorType: error.name,
                message: error.message
            }

        }
    }
})



function handleerror(error) {
    return {
        status: "Failed",
        errorType: error.name,
        message: error.message
    }
}
module.exports = router;
