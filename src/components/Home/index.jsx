/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { mapDispachToProps } from '../../redux/Store';
import Slider from '../Slider/index';
import styles from './style.css';
import DetailPage from '../DetailPage/index';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const {
      getConfig,
      getGenres,
      getPopularMovies,
      getPopularSeries,
    } = this.props;
    getConfig();
    getGenres();
    getPopularMovies();
    getPopularSeries();
  }

  handleClick(item, postersToShow) {
    this.setState({
      clicked: true,
      clickedItem: item,
      postersToShow,
    });
  }

  render() {
    const { config } = this.props;
    const {
      base_url = 'https://image.tmdb.org/t/p/',
    } = config.images;
    const { poster_sizes } = config.images;
    const { popularMovies } = this.props;
    const popularMoviesData = popularMovies.data;
    const { popularSeries } = this.props;
    const popularSeriesData = popularSeries.data;
    const { genres } = this.props;
    const familyGenre = genres.family;
    const familyGenreData = familyGenre.data;
    const documentaryGenre = genres.documentary;
    const documentaryGenreData = documentaryGenre.data;
    const { clickedItem } = this.state;

    const correctPosterSize = poster_sizes
      ? poster_sizes.filter((item) => item === 'w185')
      : 'w185';

    const posterSize = correctPosterSize
      ? correctPosterSize[0]
      : 'w185';

    const moviesPosterPath = popularMoviesData.map((item) => {
      return `${base_url}${posterSize}${item.poster_path}`;
    });
    const moviesTitle = popularMoviesData.map((item) => {
      return item.title;
    });
    const seriesPosterPath = popularSeriesData.map((item) => {
      return `${base_url}${posterSize}${item.poster_path}`;
    });
    const seriesTitle = popularSeriesData.map((item) => {
      return item.name;
    });
    const familyPosterPath = familyGenreData.map((item) => {
      return `${base_url}${posterSize}${item.poster_path}`;
    });
    const familyTitle = familyGenreData.map((item) => {
      return item.title;
    });
    const documentaryPosterPath = documentaryGenreData.map((item) => {
      return `${base_url}${posterSize}${item.poster_path}`;
    });
    const documentaryTitle = documentaryGenreData.map((item) => {
      return item.title;
    });
    const { clicked } = this.state;
    const { postersToShow } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.categoryTitle}>Popular Movies</div>
        <div className={styles.horizontalRow}>
          {moviesPosterPath.map((moviePosterPath, index) => (
            <Slider
              key={popularMoviesData[index].id}
              postersToShow={moviePosterPath}
              title={moviesTitle[index]}
              onClick={() =>
                this.handleClick(
                  popularMoviesData[index],
                  moviePosterPath,
                )
              }
            />
          ))}
        </div>
        <div className={styles.categoryTitle}>Popular Series</div>
        <div className={styles.horizontalRow}>
          {seriesPosterPath.map((moviePosterPath, index) => (
            <Slider
              key={popularSeriesData[index].id}
              postersToShow={moviePosterPath}
              title={seriesTitle[index]}
            />
          ))}
        </div>
        <div className={styles.categoryTitle}>Family</div>
        <div className={styles.horizontalRow}>
          {familyPosterPath.map((genrePosterPath, index) => (
            <Slider
              key={familyGenreData[index].id}
              postersToShow={genrePosterPath}
              title={familyTitle[index]}
            />
          ))}
        </div>
        <div className={styles.categoryTitle}>Documentary</div>
        <div className={styles.horizontalRow}>
          {documentaryPosterPath.map((genrePosterPath, index) => (
            <Slider
              key={documentaryGenreData[index].id}
              postersToShow={genrePosterPath}
              title={documentaryTitle[index]}
            />
          ))}
        </div>
        {clicked ? (
          <DetailPage
            clickedItem={clickedItem}
            postersToShow={postersToShow}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    config: state.config,
    genres: state.genres,
    popularMovies: state.popularMovies,
    popularSeries: state.popularSeries,
  };
};

Home.propTypes = {
  getConfig: PropTypes.func.isRequired,
  getGenres: PropTypes.func.isRequired,
  getPopularMovies: PropTypes.func.isRequired,
  getPopularSeries: PropTypes.func.isRequired,
  popularMovies: PropTypes.object.isRequired,
  popularSeries: PropTypes.object.isRequired,
  genres: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispachToProps)(Home);
