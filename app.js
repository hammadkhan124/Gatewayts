
const express = require('express');
const app= express();
const path= require('path');
const nodemailer=require('nodemailer');
const ejs = require("ejs");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");



//adding static functionality for images
app.use(bodyParser.urlencoded({extended: true}));



app.get('/video', function(req,res) {
  res.sendFile(__dirname + '/video.html');
 });



app.get('/',(req,res)=>{
    res.render('index')
});

app.get("/contact", function(req, res){
  res.render("contact");
});

// mail api

app.post("/", function (req, res) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "gatewayacademy456@gmail.com", // this should be YOUR GMAIL account
        pass: "jfkzuuhuwzelvsfz", // this should be your password
      },
    });
    var textBody = `FROM: ${req.body.name} EMAIL: ${req.body.email} PHONENO: ${req.body.phone} Message: ${req.body.message} `;
    var htmlBody = `<h2> Mail From  Campsite </h2><p>from:<a href="mailto:${req.body.email}">${req.body.email}</a></p><h3>NAME:</h3><p>${req.body.name}</p><h3>Phone No:</h3><p>${req.body.phone}</p><h3>Message:</h3><p>${req.body.message}</p>`;
    var mail = {
      from: "gatewayacademy456@gmail.com", // sender address
      to: "gatewayacademy456@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
      subject: "Mail From Visitor ", // Subject line
      text: textBody,
      html: htmlBody,
    };
    transporter.sendMail(mail, function (err, info) {
      if (err) {
        console.log(err);
        res.json({
          message:
            "message not sent: an error occured; check the server's console log",
        });
      } else {
        //res.json({ message: `message sent: ${info.messageId}`});
        res.redirect("/");
        //res.send(prompt("we receive your email,please wait for our reponse.we send you confirmation mail."))
      }
    });
  });

 



app.listen(process.env.PORT || 3000,()=>{
    console.log('server is listening on port')
})