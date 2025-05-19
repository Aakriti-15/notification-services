import { notificationWorker } from './queue/notificationWorker';


// Optional: Log worker events
notificationWorker.on('completed', (job) => {
  console.log(`✅ Job completed: ${job.id}`);
});

notificationWorker.on('failed', (job, err) => {
  console.error(`❌ Job failed: ${job?.id}`, err);
});
