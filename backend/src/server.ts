import express from 'express';
import type { Request, Response } from 'express';
import prisma from './prismaClient.js';

const app = express();
const PORT = 2121;

app.use(express.json());

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
