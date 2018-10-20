import React, { Component } from 'react';
import { isEmpty } from 'lodash'; 

import MovieContainer from './MovieContainer.js';
import AppStore from '../Store/AppStore'; 
import GetMovies from '../Utils/GetMovies.js';
import BottomScrollListener from 'react-bottom-scroll-listener'; 

import { searchForMovie } from '../Utils/SearchMovie.js';
import { getMoviesWithGenre } from '../Utils/GetMovieGenres'; 

import './Discover.less'; 

class Discover extends Component {
  constructor() {
    super();

    this.state = {
      data: {}, 
      listData: {},
      query: '&sort_by=popularity.desc&include_adult=false&include_video=false&page=',
      pageNumber: 1, 
      user: AppStore.getUser(),
      users: 'Conor, Rory, Brian, Ben, Karl, Tim',
      loading: false,
      inputValue: '',
      showAlert: false, 
      searchMovie: false, 
      searchGenreFLag: false, 
      currentPage: 'Discover',
      cardWidth: '31%',
    }; 

    this.changeMovieData = this.changeMovieData.bind(this); 
    this.updateMovies = this.updateMovies.bind(this); 
    this.returnMovies = this.returnMovies.bind(this); 
    this.searchMovie = this.searchMovie.bind(this);
    this.searchGenre = this.searchGenre.bind(this);
  }

  returnMovies(movie) {
    let { data } = this.state; 
    data = isEmpty(data) ? [] : data; 
    data.push(movie); 

    this.setState({
      loading: false, 
      data 
    });
  } 

  getCurrentUser(newUser) {
    const { allUsers } = this.state;
    const currentUserId = allUsers.find((user) => {
      return user.name === newUser; 
    });

    return currentUserId;
  }

  componentDidMount() {
    this.paginateRequest();
  }

  changeMovieData(data) { 
    this.setState({
      data
    });
  }

  searchMovie(inputValue) {
    this.setState({
      searchMovie: true, 
      pageNumber: 2, 
      inputValue, 
      searchGenreFLag: false
    });

    searchForMovie(inputValue, 1, this.changeMovieData); 
  }

  searchGenre(id) {
    this.setState({
      searchGenreFLag: true, 
      searchMovie: false,
      pageNumber: 2, 
      data: {}, 
      currentGenre: id
    });

    getMoviesWithGenre(id, 1, this.returnMovies); 
  }
  
  appMainPage(data, isListView) {
    const { inputValue, loading, cardWidth, user } = this.state; 
    return ( 
      <MovieContainer inputValue={inputValue}
        loading={loading}
        cardWidth={cardWidth}
        data={data} 
        user={user}
        listView={isListView}
        searchGenre={this.searchGenre}
        searchMovie={this.searchMovie} /> 
    );
  }

  updateMovies(newData){
    const { data } = this.state;
    const combinedData = data.concat(newData);

    this.setState({
      data: combinedData
    });
  }

  paginateRequest() {
    let { pageNumber, query } = this.state;
    GetMovies(this.returnMovies, pageNumber, query);
    this.setState({pageNumber: pageNumber+1});
  }

  paginateSearch() {
    let { inputValue, pageNumber } = this.state; 
    searchForMovie(inputValue, pageNumber, this.updateMovies); 
    this.setState({pageNumber: pageNumber+1});
  }

  paginateGenre() {
    let { pageNumber, currentGenre } = this.state; 
    getMoviesWithGenre(currentGenre, pageNumber, this.returnMovies);
    this.setState({pageNumber: pageNumber+1});
  }

  onBottom() {
    const { searchMovie, searchGenreFLag } = this.state; 

    if (searchMovie) {
      this.paginateSearch(); 
    } else if (searchGenreFLag) {
      this.paginateGenre(); 
    } else {
      this.paginateRequest(); 
    }
  }

  render() {
    const { data } = this.state; 
    return ( 
      <div>
        { this.appMainPage(data, false) }
        <BottomScrollListener onBottom={this.onBottom.bind(this)} />
      </div> 
    ); 
  }
}
export default Discover;
