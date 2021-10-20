import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicsList: [],
      artistName: '',
      albumName: '',
    };
    this.getMusicsList = this.getMusicsList.bind(this);
  }

  componentDidMount() {
    this.getMusicsList();
  }

  async getMusicsList() {
    const { match: { params: { id } } } = this.props;
    const musicsList = await getMusics(id);
    this.setState({
      musicsList,
      artistName: musicsList[0].artistName,
      albumName: musicsList[0].collectionName,
    });
  }

  render() {
    const { musicsList, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3
          data-testid="artist-name"
          className="title-results"
        >
          { artistName }
        </h3>
        <div
          data-testid="album-name"
          className="card-board"
        >
          <section className="presentation-board">
            <p>{ albumName }</p>
            <p>{ artistName }</p>
          </section>
          <section className="audio-presentation-board">
            {
              musicsList.map((music, index) => {
                if (index > 0) {
                  return (
                    <MusicCard
                      key={ index }
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                    />
                  );
                }
                return false;
              })
            }
          </section>

        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
