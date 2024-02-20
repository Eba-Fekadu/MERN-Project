import express from 'express';
import {create, deleteSong, getSongs, updateSong, getSong} from '../controllers/song.controller.js'

const router = express.Router();

router.post('/create', create);
// router.post('/update/:id', updateSong);
router.get('/listings', getSongs);
router.delete('/delete/:id', deleteSong);
router.post('/update/:id', updateSong);
router.get('/get/:id', getSong);
export default router;
