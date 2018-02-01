import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import { getArtistInfo, getArtistInfoFromCache } from "../actions/homeActions";
import facebookUrlFilter from '../utils/facebookUrlFilter';

import styles from '../styles/detailPage.scss';

const MAX_VIDEOS_RESULTS = 30;
const NUMBER_OF_VIDEOS_TO_LOAD = 5;

class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: []
    };

    this.renderChunkOfVideos = this.renderChunkOfVideos.bind(this);
  }

  componentWillMount() {
    if (this.props.currentSearch) {
      this.renderChunkOfVideos();
      return;
    }

    if (localStorage.getItem('lastSearch')) {
      this.props.getArtistInfoFromCache()
        .then(() => {
          this.renderChunkOfVideos();
        });
      return;
    }

    this.props.history.push('/');
  }

  // componentDidUpdate() {
  //   this.renderChunkOfVideos();
  // }

  componentWillUnmount() {
    this.setState({ videos: [] });
  }

  renderChunkOfVideos() {
    const loadedVideos = this.props.currentSearch.videos;
    const resultsLength = loadedVideos.length;
    const videosRenderedLength = this.state.videos.length;

    if (videosRenderedLength < resultsLength) {
      const chunk = loadedVideos.slice(videosRenderedLength, videosRenderedLength + NUMBER_OF_VIDEOS_TO_LOAD);

      this.setState({
        videos: this.state.videos.concat(chunk)
      })
    }
  }

  render() {
    if (this.props.currentSearch === null)
      return '';

    const { history, currentSearch } = this.props;

    return (
      <div className="detail-page">
        <div className="back-button" onClick={() => { history.push('/'); }}>
          <i className="fa fa-arrow-left" aria-hidden="true"/>
          <span>Back</span>
        </div>
        <div className="artist">
          <div className="details">
            <div className="picture">
              <img src={ currentSearch.details.thumb_url } alt="Artist Picture" />
            </div>
            <div className="information">
              <h1 className="name">{ currentSearch.details.name }</h1>
              <div className="facebook">
              <img src="../assets/images/facebook_icon.png" alt="Facebook Icon" className="icon"/>
              {(() => {
                if (currentSearch.details.facebook_page_url === '') {
                  return <span className="url">No facebok profile.</span>;
                } else {
                  return (<a target="_blank" href={ currentSearch.details.facebook_page_url } className="url">
                    { facebookUrlFilter(currentSearch.details.facebook_page_url) }</a>);
                }
              })()}
              </div>
            </div>
          </div>
          <hr/>
          <div className="events">
            {(() => {
              if (currentSearch.events.length > 0) {
                return <h4>EVENTS</h4>
              } else if (currentSearch.events.length === 0) {
                return <h4>NO EVENTS AVAILABLE</h4>
              }
            })()}
            <div className="events-wrapper">
              {currentSearch.events.map((event) => {
                const dateTime = moment(event.datetime).format('MM/DD/YYYY');

                return (<div key={event.id} className="event">
                  <a href={ event.offers[0].url } target="_blank">
                    <div className="event-wrapper">
                    <span className="venue">{ event.venue.name }</span>
                      <div>
                        <span className="date">{ dateTime }</span>
                        <span className="location">{ event.venue.city } - { event.venue.country }</span>
                      </div>
                    </div>
                  </a>
                </div>);
              })}
            </div>
          </div>
        </div>
        <hr className="visible-xs-block"/>
        <div className="artist-videos">
          <h4>RELATED VIDEOS</h4>
          {this.state.videos.map(video => {
            return(
              <div key={video.id.videoId} className="video">
                <div className="thumb">
                  <a target="_blank" href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
                    <img src={ video.snippet.thumbnails.medium.url } alt="Youtube Video Thumbnail"/>
                  </a>
                </div>
                <div className="name">
                  <a target="_blank" className="title" href={`https://www.youtube.com/watch?v=${ video.id.videoId }`}>
                    { video.snippet.title }
                  </a>
                  <span className="channel">{ video.snippet.channelTitle }</span>
                </div>
              </div>
            );
          })}
          { (this.state.videos.length !== MAX_VIDEOS_RESULTS) ?
            <button className="btn bnt-lg btn-default btn-show-more"
                    onClick={this.renderChunkOfVideos}>Show More</button> : ''
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentSearch: state.home.currentSearch }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArtistInfo, getArtistInfoFromCache }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailPage));
