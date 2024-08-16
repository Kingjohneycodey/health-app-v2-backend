import nodemailer from "nodemailer"

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com', // Your SMTP server hostname
    port: 587, // Port
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'healthappcorp@gmail.com', // Your email address
        pass: 'jdgd hzih gspz yloc', // Your email password
    },
    tls: {
        rejectUnauthorized: false // Allows Nodemailer to use TLS when connecting to server
    }
});

// Function to send email
const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const mailOptions = {
            from: 'your-email@example.com', // Sender address
            to, // List of recipients
            subject, // Subject line
            html, // HTML content
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        throw new Error('Error sending email');
    }
};

export default sendEmail;
