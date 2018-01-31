import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArtistInfo, updateLoadingArtistState } from '../actions/homeActions';
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
          <SearchArtistForm
            searchArtist={this.props.getArtistInfo}
            updateLoadingArtistState={this.props.updateLoadingArtistState}/>
          <Spinner isLoading={this.props.isLoading}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { isLoading: state.home.isLoadingArtistInfo };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getArtistInfo, updateLoadingArtistState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
