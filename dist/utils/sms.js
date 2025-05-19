"use strict";
/*import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (to: string, message: string) => {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE,
    to,
  });
};*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
const twilio_1 = __importDefault(require("twilio"));
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;
const client = (0, twilio_1.default)(accountSid, authToken);
const sendSMS = async (to, body) => {
    try {
        const message = await client.messages.create({
            body,
            from: '+18575753234', // Twilio verified US number
            to: '+918377880665' // The recipient's verified number
        });
        console.log('SMS sent:', message.sid);
    }
    catch (err) {
        console.error('Twilio error:', err);
        throw err;
    }
};
exports.sendSMS = sendSMS;
