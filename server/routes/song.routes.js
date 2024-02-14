import express from 'express';
import {create} from '../controllers/song.controller.js'

const router = express.Router();

router.post('/create', create
);

export default router;
