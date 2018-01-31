import React, { Component } from 'react';
import styles from '../styles/SearchArtistForm.scss';

export default class SearchArtistForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchTerm = this.onSearchTerm.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onSearchTerm(event) {
    event.preventDefault();

    this.props.onSearchArtist(this.state.term);

    this.setState({ term: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSearchTerm} noValidate>
        <span className="input input--haruki">
          <input id="input-1" type="text"
                 className="input__field input__field--haruki"
                 value={this.state.term}
                 onChange={this.onInputChange}/>
          <label htmlFor="input-1"
                 className={`input__label input__label--haruki ${(this.state.term !== '') ? 'input--filled' : ''}`}>
            <span className="input__label-content input__label-content--haruki">Artist name</span>
          </label>
        </span>
      </form>
    );
  }
};
