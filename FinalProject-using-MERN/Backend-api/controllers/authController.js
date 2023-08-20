
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User ALready exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Registerd Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

//login call back
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // check role
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "role dosent match",
      });
    }

    //compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};

//GET CURRENT USER
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };




// const userModel = require('../models/userModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const registerController = async (req,res)=>{
//     try{
//         const existingUser = await userModel.findOne({email:req.body.email})
//         //validation
//         if(existingUser){
//             return res.status(200).send({
//                 success:false,
//                 message:'User Already exists'
//             })
//         }
//         //hash password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(req.body.password,salt)
//         req.body.password = hashedPassword

//         //rest data
//         const user = new userModel(req.body)
//         await user.save()
//         return res.status(201).send({
//             success:true,
//             message:'User Registered Successfully',
//             user,
//         })

//     } catch(error){
//        console.log(error)
//        res.status(500).send({
//         success:false,
//         message:'Error In Register API',
//         error
//        })
//     }
// };

// //login call back
// const loginController = async (req, res) => {
//     try {
//       const user = await userModel.findOne({ email: req.body.email });
//       if (!user) {
//         return res.status(404).send({
//           success: false,
//           message: "Invalid Credentials",
//         });
//       }
//       //check Role
//       if (user.role !== req.body.role) {
//         return res.status(500).send({
//           success: false,
//           message: "role dosent match",
//         });
//       }
  
//       //compare password
//       const comparePassword = await bcrypt.compare(req.body.password,user.password);
//       if (!comparePassword) {
//         return res.status(500).send({
//           success: false,
//           message: "Invalid Credentials",
//         });
//       }
//       //here token created and encrypted with sign() method
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: "1d"});
      
//       return res.status(200).send({
//         success: true,
//         message: "Login Successfully",
//         token,
//         user
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Error In Login API",
//         error,
//       });
//     }
//   };

//   //GET CURRENT USER
//   const currentUserController = async (req,res) => {
//     try {
//       const user = await userModel.findOne({_id:req.body.userId})
//       return res.status(200).send({
//         success:true,
//         message:'User fetched successfully',
//         user,
//       })
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send({
//         success:false,
//         message:'Unable to get current user',
//         error,
//       })
//     }
//   };



// module.exports = {registerController, loginController, currentUserController}



//JSON Web Token (JWT) is a standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

//The compact size makes the tokens easy to transfer through an URL, POST parameter, or inside an HTTP header. The information in a JWT is digitally signed using a secret or public/private key pair.

//JWTs can be signed using a secret or a public/private key pair.

//JWTs are mainly used for authentication. After a user signs in to an application, the application then assigns JWT to that user. Subsequent requests by the user will include the assigned JWT. This token tells the server what routes, services, and resources the user is allowed to access. 