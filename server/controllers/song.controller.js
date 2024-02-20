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
// export const updateSong = async (req, res,next) => {

// }
export const getSongs = async (req, res,next) => {
try{
const listing = await Song.find(req.body).sort({ createdAt: -1 });
res.status(200).json(listing);
}catch(error){
    next(error);
}
};
