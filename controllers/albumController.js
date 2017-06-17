import mongoose from 'mongoose';

const Album = mongoose.model('Album');

// Get Albums
module.exports.getAlbums = (req, res) => {
  Album.find({}, (err, albums) => {
    if (err) {
      res.staus(500).json({message: 'Error' + err });
      return;
    }
    res.json(albums);
  })
}

// Get Single Album
module.exports.getAlbum = (req, res) => {
  Album.findById({_id: req.params.id}, (err, album) => {
    if (err) {
      res.status(500).json({message: `Error ${err}`})
      return;
    }
    res.json(album)
  })
}

// Add Album
module.exports.addAlbum = (req, res) => {
  if (!req.body.title) {res.status(400).json({message: "enter a release title"}); return; }
  if (!req.body.releaseDate) {res.status(400).json({message: "enter a release date"}); return; }
  if (!req.body.recordedDate) {res.status(400).json({message: "enter a recording date"}); return }
  if (!req.body.studio) {res.status(400).json({message: "enter a studio"}); return; }
  if (!req.body.genre) {res.status(400).json({message: "enter a genre"}); return; }
  if (!req.body.label) {res.status(400).json({message: "enter a label"}); return;}
  if (!req.body.producer) {res.status(400).json({message: "enter a producer"}); return;}
  if (!req.body.artist) {res.status(400).json({message: "enter a artist"}); return;}

  let album = new Album({
    title: req.body.title,
    releaseDate: req.body.releaseDate,
    recordedDate: req.body.recordedDate,
    studio: req.body.studio,
    genre: req.body.genre,
    label: req.body.label,
    producer: req.body.producer,
    artist: req.body.artist
  });

  album.save( (err) => {
    if (err) {
      res.staus(500).json({message: 'Error' + err })
      return ;
    }
    res.status(201).json({message: 'Added album'});
  })
}

// Update Album
module.exports.updateAlbum = (req, res) => {
  if (!req.body.title) {res.status(400).json({message: "enter a release title"}); return; }
  if (!req.body.releaseDate) {res.status(400).json({message: "enter a release date"}); return; }
  if (!req.body.recordedDate) {res.status(400).json({message: "enter a recording date"}); return }
  if (!req.body.studio) {res.status(400).json({message: "enter a studio"}); return; }
  if (!req.body.genre) {res.status(400).json({message: "enter a genre"}); return; }
  if (!req.body.label) {res.status(400).json({message: "enter a label"}); return;}
  if (!req.body.producer) {res.status(400).json({message: "enter a producer"}); return;}
  if (!req.body.artist) {res.status(400).json({message: "enter a artist"}); return;}

  Album.update({_id: req.params.id}, req.body, (err, album) => {
    if (err) {
      res.status(500).json({message: `Error ${err}`});
      return;
    }
    res.status(201).json({message: `Updated Album ${req.body.title}`});
  })
}

// Delete Album
module.exports.deleteAlbum = (req, res) => {
  Album.remove({_id: req.params.id}, (err, album) => {
    if (err) {
      res.status(500).json({message: `Error: ${err}`});
      return;
    }
    res.json({message: `Deleted: ${req.params.id}`})
  })
}
