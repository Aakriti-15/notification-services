import express from 'express';
import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendSMS } from '../utils/sms';
import { sendEmail } from '../utils/email';
import { notificationQueue } from '../queue/notificationQueue';
const router: Router = express.Router();
const prisma = new PrismaClient();
import twilio from 'twilio';
const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);


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
router.post('/', async (req: Request, res: Response) => {
  const { userId, type, message } = req.body;
  

  if (!userId || !type || !message) {
    return res.status(400).json({ error: 'userId, type, and message are required.' });
  }

    

  try { 
    if(type ==='sms'){
      console.log('Sending SMS...');
      await sendSMS(userId,message);
    }

    if (type === 'email') {
  console.log('Sending Email...');
  await sendEmail(userId, 'Notification from App', message);
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
  } catch (error) {
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
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
});
export const sendNotification = async (req: Request, res: Response) => {
  const { userId, type, message } = req.body;

  try {
    // Add job to queue
    await notificationQueue.add('sendNotification', {
      userId,
      type,
      message,
    });

    await notificationQueue.add('notification', {
  attempts: 5, // retry 5 times if job fails
  backoff: {
    type: 'exponential', // delay grows exponentially between retries
    delay: 5000,         // start delay 5 seconds
  },
  removeOnComplete: true, // remove successful jobs from Redis for cleanup
  removeOnFail: false,    // keep failed jobs in Redis so you can inspect them
});


    res.status(200).json({ message: 'Notification queued for delivery' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to queue notification' });
  }
};

export default router;
