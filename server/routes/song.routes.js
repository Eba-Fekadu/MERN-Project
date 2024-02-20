import express from 'express';
import {create, getSongs} from '../controllers/song.controller.js'

const router = express.Router();

router.post('/create', create);
// router.post('/update/:id', updateSong);
router.get('/listings', getSongs);

export default router;
