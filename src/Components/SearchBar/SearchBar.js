import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e){
    this.setState({term:e.target.value});
  }

  render(){
    return (
      <div className='SearchBar'>
        <input onChange={this.handleTermChange} type='text' placeholder='Enter A Song, Album, or Artist' />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
}