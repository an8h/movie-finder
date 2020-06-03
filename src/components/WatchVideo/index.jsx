/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/forbid-prop-types */
/*
Importing dependencies and CSS file(s) required for UI customization
*/
import React from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import 'shaka-player/dist/controls.css';
import styles from './style.css';
import { VIDEO_URL } from '../../config';

const shaka = require('shaka-player/dist/shaka-player.ui.js');

class WatchMovie extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { closeButtonClicked: false };

    // Creating reference to store video component on DOM
    this.videoComponent = React.createRef();

    // Creating reference to store video container on DOM
    this.videoContainer = React.createRef();

    // Initializing reference to error handlers
    this.onErrorEvent = this.onErrorEvent.bind(this);
    this.onError = this.onError.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const linkOfVideo = VIDEO_URL;

    // Getting reference to video and video container on DOM
    const video = this.videoComponent.current;
    const videoContainer = this.videoContainer.current;

    // Initialize shaka player
    const player = new shaka.Player(video);

    // Setting up shaka player UI
    const ui = new shaka.ui.Overlay(player, videoContainer, video);
    ui.getControls();

    // Listen for error events
    player.addEventListener('error', this.onErrorEvent);

    // Try to load a link
    player
      .load(linkOfVideo)
      .then(() => {
        // This runs if the asynchronous load is successful
        console.log('The video has now been loaded!');
        video.requestFullscreen().catch((err) => {
          console.log(err);
        });
      })
      .catch(this.onError);
  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }

  handleClick() {
    this.setState({
      closeButtonClicked: true,
    });
  }

  render() {
    const { closeButtonClicked } = this.state;

    /*
		Returning video with a container. 
		*/
    return (
      <div className={styles.container} ref={this.videoContainer}>
        <video
          className={styles.video}
          autoPlay
          ref={this.videoComponent}
        >
          <track
            kind="captions"
            srcLang="en"
            label="english_captions"
          />
        </video>
        <Button
          className={styles.button}
          close
          onClick={() => {
            this.handleClick(true);
          }}
        />
        {closeButtonClicked ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

export default WatchMovie;
