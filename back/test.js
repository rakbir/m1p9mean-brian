const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ekaly.brian@gmail.com',
    pass: 'ekaly123456'
  }
}); 
 
var mailOptions = {
  from: 'ekaly.brian@gmail.com',
  to: 'brianrakotoarisoa@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

  
transporter.sendMail(mailOptions, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});