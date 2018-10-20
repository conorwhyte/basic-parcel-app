import React, { Component } from 'react';
import './MovieDescription.less';
import { downloadMovie } from '../../Utils/DownloadMovie';
import AppStore from '../../Store/AppStore'; 

const RT = 'https://d2c6f0i3nohwc6.cloudfront.net/rotten_tomatoes.png';
const IMDB = 'https://d2c6f0i3nohwc6.cloudfront.net/imdb_icon.svg';
const DOWNLOAD = 'https://s3-eu-west-1.amazonaws.com/conorwhyte-assets/dowload.png';

class Description extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ...props
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      ...props
    };
  }

  downloadMovieRequest() {
    const { date, name } = this.state; 
    downloadMovie(name, date);
  }

  getUsersName(userId) {
    const { allUsers } = this.state;

    if (allUsers !== undefined) {
      let user; 
      allUsers.forEach(element => {
        if(element._id.$oid === userId) {
          user = element.name; 
        }
      });
      return user; 
    }
  }

  render() { 
    let { rottenTomatoesScore, name, date, movie, listView } = this.state; 
    const userName = AppStore.getUser();
    const showDownload = userName && userName.name === 'Conor';
    return (
      <div className="descriptionContainer"> 
        <div className="descriptionBodyContainer"> 
          <h3> {name} &nbsp;<div className="date"> {date} </div> </h3>        
          <div className="description">{this.state.movieDescription}</div>
          <div className="genre"> {`${movie.genre} · ${movie.runtime}`} </div>
          <div className="actors"> {movie.actors} </div>
          <div className="ratings">
            <div className="rtImg">
              <img src={RT}/> 
            </div>
            <div className="rtScore">
              { rottenTomatoesScore }
            </div>
            <div className="imdbImg">
              <img src={IMDB}/> 
            </div>
            <div className="imdbScore">
              { movie.imdbRating }
            </div>
            { showDownload &&
            <div className="dwnImg" onClick={this.downloadMovieRequest.bind(this)}>
              <img src={DOWNLOAD}/>  
            </div> }
          </div>
          <div className='likedUsers'>
            { listView && 
              movie.interested_ids.map((user, index) => {
                const userName = this.getUsersName(user.$oid);
                return (
                  <div key={`key${index}`} className='userContainer'>
                    <img  src={`https://d2c6f0i3nohwc6.cloudfront.net/${userName.toLowerCase()}.jpg`} />
                    <div> {userName} </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
export default Description;
  