import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getArtistInfo, getArtistInfoFromCache, updateLoadingArtistState } from '../actions/homeActions';
import SearchArtistForm from '../components/SearchArtistForm';
import Spinner from '../components/Spinner';

import styles from '../styles/homePage.scss';

class HomePage extends Component {
  componentWillMount() {
    if (localStorage.getItem('lastSearch'))
      this.props.getArtistInfoFromCache();
  }

  render() {
    const { history, currentSearch } = this.props;

    const onSearchArtist = (term) => {
      this.props.updateLoadingArtistState(true);

      this.props.getArtistInfo(term)
        .then((response) => {
          localStorage.setItem('lastSearch', JSON.stringify(response.payload));

          this.props.updateLoadingArtistState(false);
          history.push('/detail');
        });
    };

    return (
      <div className="home-page">
        <a className="home24-logo" href="http://www.home24.com" target="_blank">
          <img src="../assets/images/home24_logo.png" alt="Home24 Logo"/>
        </a>
        <div className="title">
          <h1>
            Artist Finder
            <span>Here you can find everything about any artist.</span>
          </h1>
        </div>
        <div className="input">
          <SearchArtistForm
            onSearchArtist={onSearchArtist}/>
          <Spinner isLoading={this.props.isLoading}/>
          {(() => {
            if (currentSearch) {
              return(
                <div className="last-search">
                  <span className="title hidden-xs">LAST SEARCH</span>
                  <div className="last-artist">
                    <Link className="go-to-detail-page" to="/detail">
                      <img className="last-search-thumb" src={ currentSearch.details.thumb_url } alt="Artist Thumbnail"/>
                      <span className="last-search-name">{ currentSearch.details.name }</span>
                    </Link>
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { isLoading: state.home.isLoadingArtistInfo, currentSearch: state.home.currentSearch };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArtistInfo, getArtistInfoFromCache, updateLoadingArtistState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
