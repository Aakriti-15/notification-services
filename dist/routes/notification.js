"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const sms_1 = require("../utils/sms");
const email_1 = require("../utils/email");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const twilio_1 = __importDefault(require("twilio"));
const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for sending and retrieving notifications
 */
/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Send a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - type
 *               - message
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [email, sms, in-app]
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    const { userId, type, message } = req.body;
    if (!userId || !type || !message) {
        return res.status(400).json({ error: 'userId, type, and message are required.' });
    }
    try {
        if (type === 'sms') {
            console.log('Sending SMS...');
            await (0, sms_1.sendSMS)(userId, message);
        }
        if (type === 'email') {
            console.log('Sending Email...');
            await (0, email_1.sendEmail)(userId, 'Notification from App', message);
        }
        const notification = await prisma.notification.create({
            data: {
                userId,
                type,
                message,
            },
        });
        res.status(200).json({
            message: 'Notification sent successfully.',
            data: notification,
        });
    }
    catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/users/:id/notifications', async (req, res) => {
    const userId = req.params.id;
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { sentAt: 'desc' },
        });
        res.json({ notifications });
    }
    catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed to fetch notifications.' });
    }
});
exports.default = router;
