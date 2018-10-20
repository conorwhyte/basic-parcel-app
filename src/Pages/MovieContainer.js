import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete'; 

import MovieCard from '../Components/MovieCard/MovieCard'; 
import { RingLoader } from 'react-spinners';
import { getAllMovieGenres } from '../Utils/GetMovieGenres';

import './MovieContainer.less'; 

class MovieConatiner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: [{ id: 'foo', label: 'foo' }],
      ...props
    }; 

    this.setMovieGenres = this.setMovieGenres.bind(this); 
    this.searchMovie = this.searchMovie.bind(this); 
  }

  componentWillReceiveProps(newProps) {
    let newData = newProps.listView ? this.normaliseData(newProps.data) : newProps.data;
    this.setState({
      data: newData, 
      user: newProps.user
    });
  }

  normaliseData(data) {
    const newData = data.map((movie) => {
      return {
        name: movie.name, 
        rating: movie.Ratings, 
        description: movie.overview, 
        image: movie.image_source, 
        date: movie.date, 
        genre: movie.Genre,
        actors: movie.Actors,
        runtime: movie.runtime,
        imdbRating: movie.imdb,
        rottenTomatoesScore: movie.rotten_tomatoes, 
        ...movie
      }; 
    });
    return newData;
  }

  setMovieGenres(movieGenres) {
    let newGenres = [];

    movieGenres.genres.map((genre) => {
      const newGenre = {
        id: genre.name, 
        label: genre.name,
        genreId: genre.id
      };
      newGenres.push(newGenre);
    });

    this.setState({
      items: newGenres
    });
  }

  componentDidMount() {
    getAllMovieGenres(this.setMovieGenres); 
  }

  searchMovie() {
    const { value, items } = this.state;
    let isMovieGenre = false; 
    let searchGenre; 
    items.forEach((genre) => { 
      if (genre.id === value) { 
        isMovieGenre = true; 
        searchGenre = genre.genreId;
        return false; 
      }  
    });

    isMovieGenre ? 
      this.props.searchGenre(searchGenre) 
      : this.props.searchMovie(value);
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.searchMovie();
    }
  }

  searchBar() {
    const { items } = this.state;
    return (
      <div className='Autocomplete' onKeyPress={this._handleKeyPress.bind(this)}>
        <Autocomplete
          items={items}
          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={item => item.label}
          renderItem={(item, highlighted) =>
            <div
              key={item.id}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
            >
              {item.label}
            </div>
          }
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
          onSelect={value => this.setState({ value })}
        />
      </div>
    ); 
  }
  
  render() {
    const { data, loading, cardWidth, listView, user } = this.state; 
    return (
      <div>
        <div className='cardsHeader'>
          {
            listView ? null : this.searchBar()
          }
        </div>
        <div className='Movies-loading'>
          <RingLoader
            color={'#123abc'} 
            loading={loading} 
          />
        </div>
        <div className='movieCards'> 
          { data.length > 1 && 
              <MovieCard listView={this.props.listView} cardWidth={cardWidth} movies={data} user={user}/> } 
        </div> 
      </div>
    );
  }
}
export default MovieConatiner;

MovieConatiner.propTypes = {
  listView: PropTypes.bool,
  searchGenre: PropTypes.func, 
  searchMovie: PropTypes.func,
};