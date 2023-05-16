const userModel = require("../models/userModel")
const validate = require("../validation/validation")
const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
const jwt = require("jsonwebtoken")


//--------------------------------------------------------------------//

const registerUser = async function (req, res) {
    try {
        let data = req.body
        let { Email, Name, Gender, Password } = data

        if (!validate.isValidBody(data)) {
            return res.status(400).send({ status: false, message: "Please provide data for registration " });
        }

        if (!validate.isValid(Email)) {
            return res.status(400).send({ status: false, message: "Please provide title field " });
        }

        if (Gender) {
            if (!(["Male","Female"].includes(Gender))) {
                return res.status(400).send({ Status: false, message: "Please provide valid gender " })
            }
        }

        if (!validate.isValid(Name)) {
            return res.status(400).send({ status: false, message: "Please provide name field " });
        }

    
        if (!validate.isValid(Email)) {
            return res.status(400).send({ status: false, message: "Please provide Email id " });;
        }
        if (!validate.isValidSyntaxOfEmail(Email)) {
            return res.status(404).send({ status: false, message: "Please provide a valid Email Id " });
        }

        if (Email) {
            let checkemail = await userModel.findOne({ email: Email })

            if (checkemail) {
                return res.status(400).send({ Status: false, message: "Please provide another email, this email has been used 🛑" })
            }
        }

        if (!validate.isValid(Password)) {
            return res.status(400).send({ status: false, message: "Please provide password " });;
        }
        let size = Password.length
        if (size < 8 || size > 15) {
            return res.status(400).send({ status: false, message: "Please provide password with minimum or equal to 8 and maximum or equal to 15 characters " });;
        }

        let registration = {Email, Name, Gender, Password }

        const userData = await userModel.create(registration);
        return res.status(201).send({ status: true, message: "Registration Successful ✅", data: userData });

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

//-------------------------------------------------- LOGIN USER --------------------------------------------------------//

// Initialize Passport

const loginUser = async function (req, res) {
    try {
        let data = req.body
        if (!validate.isValidBody(data))
            return res.status(400).send({ status: false, message: " Provide your login credentials " })

        if (!validate.isValid(data.email))
            return res.status(400).send({ status: false, Message: "Please provide your Email " })

        if (!validate.isValid(data.password))
            return res.status(400).send({ status: false, message: "Please provide your Password " })

        const user = await userModel.find({ email: data.email, password: data.password })

        if (!user) 
        return res.status(404).send({ status: false, message: "Invalid login credentials " });

        const token = jwt.sign({
            userId: user._id,
            iat: Math.floor(Date.now() / 900000),
            exp: Math.floor(Date.now() / 900000) + 900000,
        }, "cerol-assignment")

        res.status(200).send({ status: true, message: "Login Sucsessful ✅", token: token });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


//-----------------------------------------------------------USER PROFILE-----------------------------------------------------------//

const getUserProfile = async function (req, res) {
    try {
        let filter= { isDeleted: false }
        if (req.query.userId) {

            if (!(validate.isValid(req.query.userId) && validate.isValidObjectId(req.query.userId))) {
                return res.status(400).send({ status: false, msg: "userId is not valid ⚠️" })
            }
            filter["userId"] = req.query.userId
        }
        
        
        let profile = await userModel.find(filter).select({ Name: 1, Gender: 1}).sort({ Name: 1 })

        if (profile.length > 0) {
            return res.status(200).send({ status: true, message: "profile  list ✅", data: profile })

        } else {
            return res.status(404).send({ status: false, message: "no such profile found !! ⚠️" })

        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}
  


  //-----------------------------------------------------UPDATING USER PROFILE--------------------------------------------------//


  const updateUser = async function (req, res) {
    try {
      const userId = req.params.id; // Assuming the user ID is provided as a URL parameter
      const { Name, Gender, Password } = req.body;
      const profilePic = req.file; // Get the uploaded file from the request
  
      // Find the user in the database based on the provided ID
      let user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).send({ status: false, message: 'User not found' });
      }
  
      // Update the user's name and gender if provided
      if (Name) {
        user.Name = Name;
      }
      if (Gender) {
        user.Gender = Gender;
      }
  
      // Update the user's password if provided
      if (Password) {
        user.Password = Password;
      }
  
      // Update the user's profile picture if provided
      if (profilePic) {
        user.profilePic = profilePic.filename; // Store the filename in the user's profilePic field
      }
  
      // Save the updated user
      user = await user.save();
  
      // Return the updated user object
      return res.status(200).send({ status: true, message: 'User updated successfully', data: user });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };
  
 
  
 
  
module.exports = { registerUser, loginUser, getUserProfile, updateUser}