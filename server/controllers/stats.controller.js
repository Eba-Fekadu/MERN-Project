import Song from "../models/song.model.js"

export const overallStats = async (req, res, next) => {
  try {
    const overallStats = await Song.aggregate([
      {
        $group: {
          _id: null,
          totalSongs: { $sum: 1 },
          totalArtists: { $addToSet: "$Artist" },
          totalAlbums: { $addToSet: "$Album" },
          totalGenres: { $addToSet: "$Genre" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSongs: 1,
          totalArtists: { $size: "$totalArtists" },
          totalAlbums: { $size: "$totalAlbums" },
          totalGenres: { $size: "$totalGenres" },
        },
      },
    ])

    res.status(200).json(overallStats)
  } catch (error) {
    next(error)
  }
}

export const genreCounts = async (req, res, next) => {
  try {
    const genreCount = await Song.aggregate([
      {
        $group: {
          _id: "$Genre",
          count: { $sum: 1 },
        },
      },
    ])

    res.status(200).json(genreCount)
  } catch (error) {
    next(error)
  }
}

export const artistStats = async (req, res, next) => {
  try {
    const artistStats = await Song.aggregate([
      {
        $group: {
          _id: "$Artist",
          totalSongs: { $sum: 1 },
          uniqueAlbums: { $addToSet: "$Album" },
        },
      },
      {
        $project: {
          _id: 0,
          artist: "$_id",
          totalSongs: 1,
          totalAlbums: { $size: "$uniqueAlbums" },
        },
      },
    ])

    res.status(200).json(artistStats)
  } catch (error) {
    next(error)
  }
}

export const albumCounts = async (req, res, next) => {
  try {
    const albumCount = await Song.aggregate([
      {
        $group: {
          _id: "$Album",
          count: { $sum: 1 },
        },
      },
    ])

    res.status(200).json(albumCount)
  } catch (error) {
    next(error)
  }
}
