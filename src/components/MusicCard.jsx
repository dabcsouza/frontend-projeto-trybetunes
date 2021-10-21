import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.checkboxHandle = this.checkboxHandle.bind(this);
  }

  async checkboxHandle({ target: { checked } }) {
    const { musicObj, handleLoading, handleCheckbox, index } = this.props;
    handleLoading(true);
    await addSong(musicObj);
    handleLoading(false);
    handleCheckbox(index, checked);
  }

  render() {
    const { trackName, previewUrl, trackId, checked } = this.props;
    return (
      <div className="music-playing">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label
          className="form-check-label form-check"
          htmlFor={ `checkbox-music-${trackId}` }
        >
          <input
            data-testid={ `checkbox-music-${trackId}` }
            className="form-check-input"
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            onChange={ this.checkboxHandle }
            checked={ checked }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleLoading: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  musicObj: PropTypes.shape({
    wrapperType: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    artistId: PropTypes.number.isRequired,
    collectionId: PropTypes.number.isRequired,
    trackId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    collectionCensoredName: PropTypes.string.isRequired,
    trackCensoredName: PropTypes.string.isRequired,
    artistViewUrl: PropTypes.string.isRequired,
    collectionViewUrl: PropTypes.string.isRequired,
    trackViewUrl: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    artworkUrl30: PropTypes.string.isRequired,
    artworkUrl60: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    trackPrice: PropTypes.number.isRequired,
    releaseDate: PropTypes.string.isRequired,
    collectionExplicitness: PropTypes.string.isRequired,
    trackExplicitness: PropTypes.string.isRequired,
    discCount: PropTypes.number.isRequired,
    discNumber: PropTypes.number.isRequired,
    trackCount: PropTypes.number.isRequired,
    trackNumber: PropTypes.number.isRequired,
    trackTimeMillis: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    primaryGenreName: PropTypes.string.isRequired,
    isStreamable: PropTypes.bool.isRequired,
  }).isRequired,
};
