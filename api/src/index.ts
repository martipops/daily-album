import express from 'express';
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const app = express();
const PORT = 2121;

app.use(express.json());

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
