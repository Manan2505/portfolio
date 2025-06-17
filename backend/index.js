const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");
require('dotenv').config();
const app = express();
const PORT = 3000; // or your preferred port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle form submission
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    // ✅ Save to file (or database in real apps)
    const dataLine = `${new Date().toISOString()} | Name: ${name}, Email: ${email}, Message: ${message}\n`;
    fs.appendFile("submissions.txt", dataLine, (err) => {
        if (err) {
            console.error("Error saving data:", err);
        } else {
            console.log("Data saved to submissions.txt");
        }
    });

    // ✅ Send email using Nodemailer
    // const nodemailer = require("nodemailer");

try{
    let transporter=nodemailer.createTransport({
        host:process.env.MAIL_HOST, 
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })
    let info= transporter.sendMail({
        from:email,
        to:process.env.MAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        html: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    })
    console.log("INFO ",info);
}catch(err){
    console.log(err)
}
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get('/',(req,res)=>{
res.send('app running');
})