import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [], playlistName: "New Playlist", playlistTracks: []}

    this.addTrack = this.addTrack.bind(this);
    this.delTrack = this.delTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if (this.state.playlistTracks.find(plTrack => plTrack.id === track.id)) {
      return;
    } else {
      let playlist = this.state.playlistTracks;
      playlist.push(track);
      this.setState({playlistTracks: playlist});
    }
  }

  delTrack(track){
    let playlist=this.state.playlistTracks.filter(plTrack => plTrack.id !== track.id);
    this.setState({playlistTracks: playlist});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.updatePlaylistName("New Playlist");
    this.setState({playlistTracks: []});
  }

  search(term) {
    Spotify.search(term).then(response => {this.setState({searchResults: response});});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onDel={this.delTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;