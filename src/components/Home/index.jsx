import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { mapDispachToProps } from '../../redux/Store';

class Home extends React.Component {
  componentDidMount() {
    const { getConfig, getGenres } = this.props;
    getConfig();
    getGenres();
  }

  render() {
    console.log(this.props);
    return <div>Hello there</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    config: state.config,
    genres: state.genres,
  };
};

Home.propTypes = {
  getConfig: PropTypes.func.isRequired,
  getGenres: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispachToProps)(Home);
