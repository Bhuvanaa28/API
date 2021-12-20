require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { getMaxListeners } = require("process");
const app = express();
app.use(bodyParser.json());

const route = express.Router();
const port = process.env.PORT || 5000;
//app.get('/api', (req, res) => res.send('Running!'));
app.use('/api', route);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 465,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

route.post("/mail",(req, res) =>{
    const {to,subject,text} = req.body;
    const mailOptions = {
        from: process.env.USER, //'from_address@example.com',
        to: to,  //'to_address@example.com',
        subject: 'Email Subject',
        text: 'Hi, Hello there'
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
        {
          console.log(err)
          let msg = { 
                    "success": false, 
                    "message": "Error message"
                    }      
          res.send(msg);  
        }
        else
        {
          let msg = { 
                    "success": true, 
                    "message": "Email sent successfully"  
                    }
                    
          res.status(200).send(msg);
          console.log(info);
        }      
    });
});
