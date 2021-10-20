import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardAlbum extends Component {
  render() {
    const { artistName, collectionName,
      trackNumber, albumImage, releaseDate } = this.props;
    return (
      <div className="card-container">
        <img
          src={ albumImage }
          alt={ collectionName }
          className="img-container img-album"
        />
        <p className="card-title album-name">{ collectionName }</p>
        <p className="card-subtitle artist-name">{ artistName }</p>
        <p className="card-number">
          Nº de faixas:
          {'  '}
          {trackNumber}
        </p>
        <p className="card-date">
          Lançamento:
          {releaseDate}
        </p>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
  releaseDate: PropTypes.string.isRequired,
  albumImage: PropTypes.string.isRequired,
};
