import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicsList: [],
      loading: false,
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

  handleCheckbox(index) {
    const { musicsList } = this.state;
    const updateFavorite = [...musicsList];
    removeSong(musicsList[index]);
    updateFavorite.splice(index, 1);
    this.setState({
      musicsList: updateFavorite,
    });
  }

  async getMusicsList() {
    const musicsList = await getFavoriteSongs();
    this.setState({
      musicsList,
    });
    this.getFavorites();
  }

  async getFavorites() {
    this.setState({ loading: true });
    await getFavoriteSongs();
    this.setState({ loading: false });
  }

  render() {
    const { musicsList, loading } = this.state;
    const active = true;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading ? <Loading /> : (
            musicsList.map((music, index) => (
              <MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                musicObj={ musicsList[index] }
                handleLoading={ this.handleLoading }
                handleCheckbox={ this.handleCheckbox }
                index={ index }
                checked={ active }
              />
            ))
          )
        }
      </div>
    );
  }
}
