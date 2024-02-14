import Song from '../models/song.model.js';

export const create = async (req,res, next)=>{
    // res.json({
    //     message: 'Hello World from Controller!',
    // });
   const { Title, Artist, Album, Genre } = req.body;
   const newSong = new Song({ Title, Artist, Album, Genre});
   try {
    await newSong.save();
    res.status(201).json('Song Created Successfully!');
   } catch(error){
   next(error);
   }
};