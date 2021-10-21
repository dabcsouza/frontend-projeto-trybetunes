import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicsList: [],
      artistName: '',
      albumName: '',
      loading: false,
      checkboxActive: [],
    };
    this.getMusicsList = this.getMusicsList.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.getMusicsList();
  }

  async handleLoading(loading) {
    this.setState({
      loading,
    });
  }

  handleCheckbox(index, value) {
    const { checkboxActive, musicsList } = this.state;
    const changeList = [...checkboxActive];
    changeList[index] = value;
    this.setState({ checkboxActive: changeList });
    if (!value) {
      removeSong(musicsList[index]);
    }
  }

  async getMusicsList() {
    const { match: { params: { id } } } = this.props;
    const musicsList = await getMusics(id);
    const checkboxActive = musicsList.map(() => false);
    this.setState({
      musicsList,
      artistName: musicsList[0].artistName,
      albumName: musicsList[0].collectionName,
      checkboxActive,
    });
    this.getFavorites();
  }

  async getFavorites() {
    const { musicsList, checkboxActive } = this.state;
    const thisCheckboxActive = [...checkboxActive];
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false });
    musicsList.forEach(({ trackId }, index) => {
      const iD = trackId;
      if (favorites.some((track) => (track.trackId === iD))) {
        thisCheckboxActive[index] = true;
      }
    });
    this.setState({
      checkboxActive: thisCheckboxActive,
    });
  }

  render() {
    const { musicsList, artistName, albumName, loading, checkboxActive } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading ? <Loading /> : (
            <div className="complete-album">
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
                            key={ music.trackId }
                            trackName={ music.trackName }
                            previewUrl={ music.previewUrl }
                            trackId={ music.trackId }
                            musicObj={ musicsList[index] }
                            handleLoading={ this.handleLoading }
                            handleCheckbox={ this.handleCheckbox }
                            index={ index }
                            checked={ checkboxActive[index] }
                          />
                        );
                      }
                      return false;
                    })
                  }
                </section>
              </div>
            </div>
          )
        }
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
