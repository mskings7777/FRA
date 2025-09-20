import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

import ForestDataStorage from "./Schema/ForestDataStorage.js"; // import the model
import ClaimsManagement from "./Schema/ClaimsManagement.js"; // import the model
import User from "./Schema/User.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
let dobRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
let socialMediaRegex = /^(https?:\/\/)?(www\.)?(instagram\.com|twitter\.com|x\.com|youtube\.com\/(c|channel|user))\/[a-zA-Z0-9._-]+\/?$/;

mongoose.connect(process.env.DB_LOCATION, { autoIndex: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


const generateUsername = async (email) => {
 let username = email.split("@")[0];

 let usernameExists = await User.exists({"personal_info.username" : username})
 .then((result) => result)

  usernameExists ? username+= nanoid().substring(0,5) : "";

  return username

}

const formatDataToSend = (user) => {

    const access_token = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_KEY)

    return {
        access_token,
        fullname: user.personal_info.fullname,
        email: user.personal_info.email,
        username: user.personal_info.username,
        profile_img: user.personal_info.profile_img,
    }
}

const formatAllDataToSend = (user) => {

    const access_token = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_KEY)

    return {
        access_token,
        fullname: user.personal_info.fullname,
        email: user.personal_info.email,
        username: user.personal_info.username,
        profile_img: user.personal_info.profile_img,
        dob: user.personal_info.dob,
        mobile_no: user.personal_info.mobile_no,
        role: user.personal_info.role,
        state: user.personal_info.state,
        district: user.personal_info.district,
    }
}
  
app.post("/signup", async (req, res) => {
    try {
        const { fullname, email, password} = req.body;

    if (fullname.length < 3) {
        return res.status(403).json({"error" : "Fullname must be atleast 3 letters long"})
    }

    if (!email.length) {
        return res.status(403).json({"error" : "Enter Email"})
    }

    if (!emailRegex.test(email)) {
        return res.status(403).json({"error" : "Email is invalid"})
    }

    if (!passwordRegex.test(password)) {
        return res.status(403).json({"error" : "password should be 6 to 20 letters long with atleast 1 numerical, 1 uppercase, 1 lowercase letters"})
    }

    if (password.length < 6) {      
        password != "" &&
        res.status(403).json({"error" : "Password must be atleast 6 letters long"})
    }



    bcrypt.hash(password, 10, async(err, hashed_password)=>{
        let e = await generateUsername(email);
        let username = email.split("@")[0];

        let user = new User({
            personal_info: {fullname, email, password: hashed_password, username}
        });

        user.save().then((u)=>{
            return res.status(200).json(formatDataToSend(u))
        })
        .catch((err) =>{
            if (err.code === 11000) {
                return res.status(500).json({"error" : "email already exists"})
            }
            return res.status(500).json({"error" : err.message})
        })

    })

    } catch (error) {
        console.log(error);
    }
});

app.post("/signin", async (req, res) => {
    try {
        const { email, password} = req.body;

    if (!email.length) {
        return res.status(403).json({"error" : "Enter Email"})
    }

    if (!emailRegex.test(email)) {
        return res.status(403).json({"error" : "Email is invalid"})
    }

    if (!password.length) {
        return res.status(403).json({"error" : "Enter Password"})
    }

    let user = await User.findOne({"personal_info.email" : email})
    .then((result) => result)
    .catch((err) => null)

    if (!user) {
        return res.status(403).json({"error" : "Email not registered"})
    }

    bcrypt.compare(password, user.personal_info.password, (err, result) => {
        if (err) {
            return res.status(500).json({"error" : err.message})
        }

        if (!result) {
            return res.status(403).json({"error" : "Incorrect Password"})
        }

        return res.status(200).json(formatAllDataToSend(user))
    })

    } catch (error) {
        console.log(error);
    }
});

app.post("/updateAllUserData", async (req, res) => {
    try {

        const { email, mobile_no, dob, role, state, district, profile_img } = req.body;
        await User.updateOne(
            { "personal_info.email": email },
            {
                $set: {
                    "personal_info.dob": dob,
                    "personal_info.mobile_no": mobile_no,
                    "personal_info.role": role,
                    "personal_info.state": state,
                    "personal_info.district": district,
                    "personal_info.profile_img": profile_img,
                }
            }
        );

        let updatedUser = await User.findOne({ "personal_info.email": email });
        console.log(email);
        console.log(updatedUser);

        return res.status(200).json(formatAllDataToSend(updatedUser));

    } catch (error) {
        console.log(error);
    }
});    




app.post("/forestData", async (req, res) => {
  try {
    const { state, Reserved_forests, National_parks, Protected_forests, Unclassified_forests } = req.body;

    const newData = new ForestDataStorage({
      state,
      Reserved_forests,
      National_parks,
      Protected_forests,
      Unclassified_forests
    });

    await newData.save();
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.post("/claims-management", async (req, res) => {
  try {
    const { state, ir1, cr1, total1, ir2, cr2, total2, rejectedCliams, disposedOffCliams, pendingClaims} = req.body;

    const newData = new ClaimsManagement({
      state,
      receivedClaims: {ir1, cr1, total1},
      titlesDistributed: {ir2, cr2, total2},
      rejectedCliams,
      disposedOffCliams,
      pendingClaims
    });

    await newData.save();
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.post("/claimsManagement", async(req, res) => {

});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
