import React from "react";
import nodemailer from "nodemailer";

const sendEMail = async ({ myEmail, body }: any) => {
  const { MAIL_USER, MAIL_PASS } = process.env;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: '"Oluyemi 💻" <adedokunoluyemi1@gmail.com>', // sender address
    to: myEmail, // list of receivers
    subject: "Sign Up Authentication", // Subject line
    html: body, // html body
  });
};

export default sendEMail;
