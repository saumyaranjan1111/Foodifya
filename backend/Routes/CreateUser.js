const express = require('express')
const router = express.Router()
const User = require('../models/User')

// for validation of data entered
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = "HelloMyNameIsSaumyaRanjanAndILy";

// Route handler with the input validation middleware
router.post("/createuser", 

// on what basis do we want the validator to validate the request body 
[
    // body('email').isEmail(): This part validates the 'email' field in the request body. It uses the isEmail() function from a validation library like express-validator to check if the 'email' field contains a valid email address format.
    body('email').isEmail(),

    // body('name').isLength({ min: 5 }): This part validates the 'name' field in the request body. It uses the isLength() function from the same validation library to check if the length of the 'name' field is at least 5 characters.
    body('name').isLength({ min : 5}),

    // body('password', 'Password should be at least 5 characters').isLength({ min: 5 }): This part validates the 'password' field in the request body. It uses the isLength() function again and includes a custom error message ('Password should be at least 5 characters') that will be displayed if the validation fails.
    body('password', 'Password should be atleast 5 characters').isLength({ min : 5})
],

async(req, res)=>{

    // this will evaluate the request body based on the validation parameters set in the route handler middleware above
    const errors = validationResult(req);


    // The middleware will automatically validate the input data and return an array of errors (if any) that can be sent as a response to the client. If there are no validation errors, the registration logic (or any other logic you have) inside the route handler will be executed.
    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }

    // if the errors array is empty then the below code executes

    // generate a 10 digit salt
    const salt = await bcrypt.genSalt(10);
    // generate a securepassword using this salt
    let securePassword = await bcrypt.hash(req.body.password, salt);
    try {
        // use destructuring to get the details out of the req.body

        const {name , password, email, location} = req.body;
        
        // console.log(name, password, email, location);

        // using the User model, create a document(record) inside the users collection with the values recieved from the POST request made to the /api/createuser/ with the data

        await User.create({
            name : name , 
            password : securePassword, 
            email : email,
            location : location
        })
        
        // if user has been successfully created then execute the code below this part

        res.json({success: true});

    } catch (error) {
        console.log("Could not create user : " + error.message);
        res.json({success: false});
    }
})


router.post("/loginuser",
[
    body('email').isEmail(),
    body('password', 'Password should be atleast 5 characters').isLength({ min : 5})
],
async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }

    // use destructuring to get the details out of the req.body
    const {password, email} = req.body;
    try {
        // if a document with the email === email exists in the collection User, then it will return the whole entry for that user

        let userData = await User.findOne({email});
        if(!userData){
            // if the returned user data is empty, that means no user exists in our database with that email id

            return res.status(400).json({ errors : "try logging in with correct credentials"})
        }
        
        // compare the password currently recieved from the request to the one stored in our database
        // how this works probably : 
        // // the currently recieved password is again encrypted by bcrypt and matched with the encrypted password stored at our end, if they match completely, then the two starting string would have been the same and hence it is the same password
        // so if pwdcompare is not null then the two strings matched, if not then the two strings did not match and the credentials are false
        const pwdCompare = await bcrypt.compare(password, userData.password);
        if(!pwdCompare){
            return res.status(400).json({ errors : "try logging in with correct credentials"})
        }
        
        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret)
        return res.json({success : true, authToken : authToken})

    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

module.exports = router;