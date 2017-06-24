import React, { Component } from 'react';
import InventoryClient, { TokenManager as tm } from '../utils/InventoryClient';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: [] };
    this.client = new InventoryClient();
  }

  componentWillMount() {
    this.client.getAlbums().subscribe(albums => this.setState({albums: albums}));
  }

  showAlbums() {
    return this.state.albums.map(album => {
      return (
      <li key={album._id}>
        <div>
          <h2>{album.title}</h2>
          <p>{album.genre}</p>
          <p>{album.artist}</p>
        </div>
      </li>
      )
    })
  }

  render() {
      return (
      <div className="row">
        <h1>Albums</h1>
        <ul>
          {this.showAlbums()}
        </ul>
        <input onClick={(e) => { e.preventDefault(); tm.removeToken(); window.location = '/login';}} type="submit" className="btn btn-default" value="Sign Out"/>
      </div>
    );
  }
}

export default Albums;
