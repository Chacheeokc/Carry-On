// import app from "./server.js";
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import('./userDetails.js')
import UserDetailsSchema from './userDetails.js';
import jwt from "jsonwebtoken";

const JWT_SECRET = "jlfkdsFDSIO()fwejiojfsjfdslkfjwoieJKLDFJifopdsf";
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

// Create a user
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
            packingItems: [],
        });
        res.send({ status: 'ok' });
    } catch (error) {
        res.send({ status: "error" });
    }
});

//login user
app.post("/login-user", async (req, res) => {
    const { username, password } = req.body;

    // check if email exists
    const user = await User.findOne({ username });
    if (!user) {
        return res.json({ error: "User Not found" });
    }

    //compare password
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Password" });
})

//logout user
app.post("/logout-user", async (req, res) => {
    res.send({status: "ok"});
})

// add a packing item
app.put("/add-packing-item/", async (req, res) => {
    const { item, username } = req.body;
    try{
        await User.updateOne(
            {username: username},
            {$push: {packingItems : item}}
        )
        res.send({status: 'ok'});
    }catch(error){
        return res.json({error: "user's packing list was not updated"})
    }
})

// get packing items
app.get("/get-packing-items", async (req,res) =>{
    const username = req.headers['username'];
    try{
        const user = await User.findOne(
            {username: username}
        )
        return res.json(user.packingItems);
    }catch(error){
        return res.json({error: "user not gotten"})
    }
})

// delete a packing item
app.delete("/delete-packing-item", async (req,res) => {
    const { item, username } = req.body;
    try{
        await User.updateOne(
            {username: username},
            {$pull: {packingItems : item}}
        )
        res.send({status: 'ok'});
    }catch(error){
        return res.json({error: "item was not deleted from user's packingList"})
    }
})

// add an expense
app.put("/add-expense-item/", async (req, res) => {
    const { expenseItem, username, price, date } = req.body;
    try{
        await User.updateOne(
            {username: username},
            {$push: {expenseItems : {
                $each: [{expenseItem : expenseItem, price : price, date : date}]
            } }}
        )
        res.send({status: 'ok'});
    }catch(error){
        return res.json({error: "user's expense were not updated"})
    }
})

// get packing items
app.get("/get-expense-items", async (req,res) =>{
    const username = req.headers['username'];
    try{
        const user = await User.findOne(
            {username: username}
        )
        return res.json(user.expenseItems);
    }catch(error){
        return res.json({error: "user not gotten"})
    }
})

app.listen(5000, () => {
    console.log("Listening on " + port);
})

// run it by using node index
// currently using sample data with mongodb