const nodemailer = require("nodemailer");
const ApiError = require("../error/ApiError");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "babykinlink@gmail.com",
        pass: "vtfv ajou iqjy nxcn",
      },
    });
  }

  async sendActivationPasswordMail(to, password) {
    console.log("to=>", to);
    console.log("passsword=>", password);
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: "Activation Password",
        text: `Your activation password: ${password}`,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  
}

module.exports = new MailService();
