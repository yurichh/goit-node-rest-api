import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text, html) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.MAILTRAP_SENDER_EMAIL, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
};
