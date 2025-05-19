"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
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
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // App password
    },
});
const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log('Email sent:', info.messageId);
    }
    catch (error) {
        console.error('Email sending error:', error);
        throw error;
    }
};
exports.sendEmail = sendEmail;
