import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardAlbum extends Component {
  render() {
    const { artistName, collectionName,
      trackNumber, albumImage } = this.props;
    const titleLimit = 18;
    return (
      <div className="card-container">
        <p className="card-title album-name">
          { collectionName.length >= titleLimit ? `${collectionName
            .substring(0, titleLimit)}...` : collectionName }
        </p>
        <div className="img-album">
          <img
            src={ albumImage }
            alt={ collectionName }
            className="img-container img-album"
          />
        </div>
        <p className="card-subtitle artist-name">{ artistName }</p>
        <p className="card-number">
          Nº de faixas:
          {'  '}
          {trackNumber}
        </p>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
  albumImage: PropTypes.string.isRequired,
};
