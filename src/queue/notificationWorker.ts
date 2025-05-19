import { Worker, Job, JobProgress } from 'bullmq';
import { Redis } from 'ioredis';
import { sendEmail } from '../utils/email';
import { sendSMS } from '../utils/sms';
import { prisma } from '../prismaClient';
import { sendNotification } from 'routes/notification';

 
//const connection = new Redis();
const connection = {
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null
};

const worker = new Worker(
  'notification-queue',
  async job => {
  try{
    await sendNotificationToService(job.data);
  }catch(error){
    throw error;
  }
  
  }
);

worker.on('completed', (job: Job) => {
  console.log(`Job ${job.id} completed successfully.`);
});
worker.on('failed', (job: Job | undefined, error: Error, prev:string) => {
   if (!job) return;
  console.error(`Job ${job.id} failed after ${job.attemptsMade} attempts. Error:`, error);
});

worker.on('progress', (job: Job, progress: JobProgress) => {
  console.log(`Job ${job.id} is ${progress}% complete.`);
});

worker.on('stalled', (jobId: string, prev: string) => {
  console.warn(`Job ${jobId} stalled and will be retried.`);
});



export const notificationWorker = new Worker(
  'notificationQueue',
  async (job) => {
    const { userId, type, message } = job.data;

    if (type === 'email') {
      await sendEmail(userId, 'Notification', message);
    } else if (type === 'sms') {
      await sendSMS(userId, message);
    } else if (type === 'in-app') {
      await prisma.notification.create({
        data: {
          userId,
          type,
          message,
        },
      });
    }
  },
  { connection }
);
function sendNotificationToService(data: any) {
  throw new Error('Function not implemented.');
}

