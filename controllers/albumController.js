import mongoose from 'mongoose';
import AlbumRepository from '../repositories/AlbumRepository';

const Album = mongoose.model('Album');

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

  AlbumRepository.save(album).subscribe((album) => {
    res.status(201).json({message: 'Added album'});
  }, err => {
    res.staus(500).json({message: 'Error' + err });
  })
}

// Get Albums
module.exports.getAlbums = (req, res) => {
  AlbumRepository.find().subscribe((albums) => {
    res.json(albums);
  }, (err) => {
    res.status(500).json({message: 'Error' + err });
  })
}

// Get Single Album
module.exports.getAlbum = (req, res) => {
  AlbumRepository.findById(req.params.id).subscribe((album) => {
    res.json(album)
  }, (err) => {
    res.status(500).json({message: `Error ${err}`})
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

  AlbumRepository.update(req.params.id, req.body).subscribe((album) => {
    res.status(201).json({message: `Updated Album ${req.body.title}`});
  }, err => {
    res.status(500).json({message: `Error ${err}`});
  });
}

// Delete Album
module.exports.deleteAlbum = (req, res) => {

  AlbumRepository.delete(req.params.id).subscribe((album) => {
    res.json({message: `Deleted: ${req.params.id}`});
  }, err => {
    res.status(500).json({message: `Error: ${err}`});
  });
}
