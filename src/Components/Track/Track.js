import React from 'react';
import './Track.css';

export default class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.delTrack = this.delTrack.bind(this);
  }
  addTrack(){
    this.props.onAdd(this.props.track);
  }
  delTrack(){
    this.props.onDel(this.props.track);
  }
  render(){
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.props.isRemoval?
          <a onClick={this.delTrack} className='Track-action'>-</a>
        :
          <a onClick={this.addTrack} className='Track-action'>+</a>
        }
      </div>
    )
  }
}