import React, { Component } from 'react';
import MovieContainer from './MovieContainer.js';
import { getAllMovies } from '../Utils/GetMoviePreferences.js';
import './LikedMovies.less'; 

class LikedMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardWidth: '31%',
      inputValue: 'Conor', 
      loading: false,
      user: 'Conor',
      allUsers: '',
      data: {},
      ...props
    }; 
  }

  componentDidMount() {
    getAllMovies(this.getListMovies.bind(this));
  }

  getListMovies(returnedMovies) {
    const movieData = returnedMovies.data.movies; 
    this.setState({
      data: movieData
    });
  }

  render() {
    const { inputValue, loading, cardWidth, user, data, allUsers } = this.state; 
    return ( 
      <MovieContainer inputValue={inputValue}
        loading={loading}
        cardWidth={cardWidth}
        data={data} 
        user={user}
        allUsers={allUsers}
        listView={true} /> 
    ); 
  }
}
export default LikedMovies;
