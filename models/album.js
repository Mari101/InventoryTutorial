import mongoose, { Schema } from 'mongoose'

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  recordedDate: {
    type: String,
    required: true
  },
  studio: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  producer: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  coverURL: String
})

const Album = mongoose.model('Album', AlbumSchema, 'albums');

export default Album
