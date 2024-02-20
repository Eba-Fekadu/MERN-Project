import express from 'express';
import {create, deleteSong, getSongs} from '../controllers/song.controller.js'

const router = express.Router();

router.post('/create', create);
// router.post('/update/:id', updateSong);
router.get('/listings', getSongs);
router.delete('/delete/:id', deleteSong);

export default router;
