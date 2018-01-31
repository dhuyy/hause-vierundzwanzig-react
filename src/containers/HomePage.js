import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArtistInfo } from '../actions/homeActions';
import SearchArtistForm from '../components/SearchArtistForm';
import Spinner from '../components/Spinner';
import styles from '../styles/HomePage.scss';

class HomePage extends Component {
  render() {
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
          <SearchArtistForm onSearchArtist={this.props.getArtistInfo}/>
          <Spinner isLoading={true}/>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArtistInfo }, dispatch);
}

export default connect(null, mapDispatchToProps)(HomePage);
