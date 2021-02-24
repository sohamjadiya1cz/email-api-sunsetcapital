var express = require('express');
var app = express();
app.use(express.bodyParser());
const nodemailer = require('nodemailer');
require('dotenv').config()

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

app.post('/', function (req, res) {
	
	let EMAIL_CONFIG = {
		pool: true,
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			// type:'PLAIN',
			user: process.env.ADMINEMAIL, // generated ethereal user
			pass: process.env.ADMINPASS,  // generated ethereal password
		}
	};
	
	let {name,email,message} = req.body;
	
	let mailOptions = {
		from: email, // sender address
		to: process.env.ADMINEMAIL, // list of receivers
		subject: "SOLAR ENERGY: CONTACT US!", // Subject line
		text: '', // plain text body
		html: `Hello,<br>ContactUS Details:<br>Name: <b>${name}</b><br>Email: <b>${email}</b><br>Message: <b>${message}</b>"` // html body
	};
	
	let transporter = nodemailer.createTransport(EMAIL_CONFIG)
	transporter.sendMail(mailOptions);
	res.json({code : 200,message: 'mail send sucessfully'})
});


var server = app.listen(process.env.PORT, process.env.IP,function () {
	console.log(`Listening on ${process.env.IP} : ${process.env.PORT}`);
});

