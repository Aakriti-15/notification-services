import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import { Worker } from 'bullmq';

const connection = {
  host: '127.0.0.1',   // or your Redis server host
  port: 6379,          // default Redis port
  maxRetriesPerRequest: null // ✅ THIS LINE IS CRITICAL
};
//const connection = new Redis(); // Connects to localhost:6379 by default



export const notificationQueue = new Queue('notificationQueue', {
  connection,
});
