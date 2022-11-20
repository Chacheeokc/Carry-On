// import app from "./server.js";
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import('./userDetails.js')
import UserDetailsSchema from './userDetails.js';

const port = process.env.PORT || 8000;
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.RESTREVIEWS_DB_URI, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));

const User = mongoose.model("UserInfo", UserDetailsSchema);
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const oldUser = await User.findOne({ 'username': username })
        if (oldUser) {
            return res.json({ error: "User exists" });
        }
        await User.create({
            username: username,
            password: encryptedPassword,
        });
        res.send({ status: 'ok' });
    } catch (error) {
        res.send({ status: "error" });
    }
});

app.listen(5000, () => {
    console.log("Listening on " + port);
})

// run it by using node index
// currently using sample data with mongodb