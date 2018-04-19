import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

export default class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  render(){
    return (
      <div className='Playlist'>
        <input onChange={this.handleNameChange} value={this.props.playlistName}/>
        <TrackList onDel={this.props.onDel} isRemoval={true} tracks={this.props.playlistTracks}/>
        <a onClick={this.props.onSave} className='Playlist-save'>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}