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

export const deleteSong = async(req, res, next) => {
    const listing = await Song.findById(req.params.id);
    // if(!listing){
    //     return next('Listing not found');
    // }
    try{
        await Song.findByIdAndDelete(req.params.id);
        res.status(200).json('Song has been deleted');
    }
    catch(error){

        next(error);
    }
};

export const updateSong = async(req,res,next) => {
    const listing = await Song.findById(req.params.id);
    // if(!listing){
    //     return next('Listing not found');
    // }
    try{
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body,{new: true});
        // await Song.findByIdAndUpdate(req.params.id);
        res.status(200).json(updatedSong);
    }
    catch(error){

        next(error);
    }

}
export const getSong = async (req, res, next) => {
    try{
        const listing = await Song.findById(req.params.id);
        res.status(200).json(listing);
    }
    catch(error){
        next(error);
    }
};

export const getSearch = async (req, res, next) => {

    

    try{
        // const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const searchTerm = req.query.searchTerm || '';

        // const sort = req.query.sort || 'createdAt';
    
        // const order = req.query.order || 'desc';
    
        const listings = await Song.find({
            Genre: { $regex: searchTerm, $options: 'i' }
        })
          .skip(startIndex);
    
        return res.status(200).json(listings);
    }
    catch(error){
        next(error);
    }
};


