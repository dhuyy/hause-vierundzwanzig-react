import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import styles from '../styles/DetailPage.scss';

class HomePage extends Component {
  render() {
    const { history, currentSearch } = this.props;

    const facebookUrl = (url) => {
      if (url.indexOf('pages') >= 0)
        return '@'.concat(
          url.replace('http://www.facebook.com/pages/', '')
            .replace(/%20/g, '')
            .split('/')[0]
        );
      else
        return '@'.concat(
          url.replace('https://www.facebook.com/', '').replace('/', '')
        );
    };

    return (
      <div className="detail-page">
        <div className="back-button" onClick={() => { history.push('/'); }}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
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
                if (currentSearch.details.facebook_page_url == '') {
                  return <span ng-if="vm.artist.details.facebook_page_url == ''" className="url">No facebok profile.</span>;
                } else {
                  return (<a target="_blank" href={ currentSearch.details.facebook_page_url } className="url">
                    { facebookUrl(currentSearch.details.facebook_page_url) }</a>);
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



      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentSearch: state.home.currentSearch }
}

export default connect(mapStateToProps)(withRouter(HomePage));
