import BaseRepository from './BaseRepository';
import mongoose from 'mongoose';
import Album from '../models/album';

class AlbumRepository extends BaseRepository {
  constructor() {
    super(Album);
  }

  save(album) {
    const newAlbum = new Album({
        title: album.title,
        releaseDate: album.releaseDate,
        recordedDate: album.recordedDate,
        studio: album.studio,
        genre: album.genre,
        label: album.label,
        producer: album.producer,
        artist: album.artist
      });
      return super.save(newAlbum);
  }
}

export default new AlbumRepository();
