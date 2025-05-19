"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import type {Request, Response} from 'express';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Health check route
app.get('/users/:id/notifications', async (req: Request, res: Response) => {
  res.send(' Notification Service is running!');
});

// POST /notifications - Create a new notification
app.post('/notifications', async (req: Request, res: Response) => {
  const { userId, type, content } = req.body;

  // Basic validation
  if (!userId || !type || !content) {
    return res.status(400).json({ error: 'userId, type, and content are required.' });
  }

  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        content,
      },
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error(' Error creating notification:', error);
    res.status(500).json({ error: 'Failed to create notification.' });
  }
});

// GET /users/:id/notifications - Fetch notifications by user ID
app.get('/users/:id/notifications', async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { sentAt: 'desc' },
    });

    res.json({ notifications });
  } catch (error) {
    console.error(' Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/
const express_1 = __importDefault(require("express"));
const notification_1 = __importDefault(require("./routes/notification"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
//import swaggerJsdoc from 'swagger-jsdoc';
const swaggerJsdoc = require('swagger-jsdoc');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Server is working!');
});
// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notification Service API',
            version: '1.0.0',
            description: 'API for sending notifications (Email, SMS, In-App)',
        },
        servers: [
            {
                url: 'http://localhost:${PORT}',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Make sure path matches your route file
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use(express_1.default.json());
// Routes
app.use('/notifications', notification_1.default);
app.post('/notifications', (req, res) => {
    console.log("✅ Request body:", req.body); // You’ll see this in your terminal
    res.status(200).json({ message: "Received!" });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
