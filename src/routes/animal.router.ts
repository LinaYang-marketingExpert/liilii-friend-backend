import express from 'express';
import { AnimalController } from '../controllers/animal.controller';

const router = express.Router();

const animalController = new AnimalController();


export default router;