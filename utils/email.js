const fs = require('fs')
const nodemailer = require("nodemailer");


const userEmailAddress = "mahammedgaber19@gmail.com"; // Add your Gmail 
const htmlContent = fs.readFileSync(__dirname + '/welcomeEmail.html', 'utf8')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: userEmailAddress,
        pass: "ccdijblbptkizawb",// Add your Password
    },
});

const sendEmail = async ( anothorPerson ) => {
    const info = await transporter.sendMail({
        // from: `"Node Mailler From Gaber" <${userEmailAddress}>`,
        from: 'Welcome to Malaz - Your Destination for Accommodation Bookings',
        to: `${anothorPerson}`, // Add  Gmail for sending to him
        subject: 'Welcome to Malaz',
        // text: text,
        html: htmlContent,
    });
    console.log(info);
}

module.exports = sendEmail;