/*import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // use your email provider
  auth: {
    user: process.env.EMAIL_USER,      // your email address
    pass: process.env.EMAIL_PASS,      // your email password or app password
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
  console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};*/
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // App password
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

