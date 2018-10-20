import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Description from './MovieDescription.jsx';
import './MovieCard.less';
import { putMoviePreference } from '../../Utils/PutMoviePreference';
import AppStore from '../../Store/AppStore'; 

class MovieCard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      movies: props.movies, 
      width: props.cardWidth,
      allUsers: AppStore.getAllUsers(),
      ...props 
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      movies: newProps.movies,
      width: newProps.cardWidth,
      user: newProps.user
    });
  }

  // static getDerivedStateFromProps(props) {
  //   return {
  //     ...props
  //   };
  // }

  onHoverEvent(i) {
    this.setState({
      index: i
    }); 
  }

  _handleKeyDown(event) {
    switch( event.keyCode ) {
    case 87:
      break;
    default: 
      break;
    }
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  handleInterest(movie) {
    const user = AppStore.getUser();
    if (user !== 'User' && user !== undefined) {
      putMoviePreference(user, movie, movie);
    }
  }

  getUsersName(userId) {
    const { allUsers } = this.state;

    if (allUsers === undefined) { return; }

    let user; 
    allUsers.forEach(element => {
      if(element._id.$oid === userId) {
        user = element.name; 
      }
    });

    return user; 
  }

  render() {
    const { movies, allUsers } = this.state;
    const minWidth = AppStore.getMobile() ? '-webkit-fill-available' : '280px';
    const filteredMovies = movies.filter((movie) => {
      return movie.name !== undefined; 
    });
    return (
      <div>
        { filteredMovies.map((movie, i) => (
          <div className="gallery" key={'card' + i} style={{width: this.state.width, minWidth }} onMouseOver={this.onHoverEvent.bind(this, i)} onClick={this.handleInterest.bind(this, movie)}>
            <div className="leftPanel">
              <Description imgSrc={movie.image} 
                movie={movie} 
                movieDescription={movie.description} 
                movieId={movie.id} date={movie.date} 
                name={movie.name} 
                allUsers={allUsers}
                listView={this.props.listView}
                rottenTomatoesScore={movie.rottenTomatoesScore}/>
            </div>
            <div className="rightPanel">
              <img src={movie.image} />
            </div>
          </div>
        )) }
      </div>
    );
  }
}

export default MovieCard;

MovieCard.propTypes = {
  listView: PropTypes.bool,
  movies: PropTypes.array, 
  cardWidth: PropTypes.string,
};
  