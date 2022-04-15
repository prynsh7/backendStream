import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";
import User from "../models/userSchema.js";
// import jwt from "jsonwebtoken";
import axios from "axios"
import express from 'express';

const router = express.Router();




router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      code: 400,
      success: false,
      message: "Email and Password Both are Required",
    });
    throw new Error("Bad Request");
  }
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      code: 200,
      message: "userloggedin succesfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        libid: user.libid,
        apikey: user.apikey,
        cdn: user.cdn,
        token: generateToken(user._id)
      }
    });
  } else {
    res.status(401).json({
      code: 401,
      success: false,
      message: "Email and Password do not match",
    });
  }
})


router.route('/register').post(async (req, res) => {
  const { name, email, password } = req.body;

  const headers = {
    AccessKey: '10fec3c6-bb8e-44ab-862a-a1c93ee568fe618cd3d1-100d-404f-857b-b893761a5913'
  };


  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(422).json({
      code: 422,
      success: false,
      message: "User already exists",
    });
  }


  await axios
    .post('https://api.bunny.net/videolibrary', { Name: name }, { headers: headers })
    .then(async det => {
      var obj = {
        name: name,
        email: email,
        password: password,
        libid: det.data.Id,
        apikey: det.data.ApiKey,
      }
      await axios
        .post(`https://api.bunny.net/pullzone/${det.data.PullZoneId}`, obj, { headers: headers })
        .then(async data => {

          obj.cdn = data.data.Name

          const user = await new User(obj);

          const createdEntry = await user.save();

          if (user) {
            res.status(200).json({
              code: 200,
              message: "user created successfully",
              data: createdEntry
            });
          } else {
            res.status(200).json({
              code: 500,
              message: "error creating user"
            })
          }

        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))



})




export default router;
